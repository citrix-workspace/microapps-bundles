const moment = library.load('moment-timezone')
const _ = library.load('lodash')
const uuid = library.load('uuid')
integration.define({
    synchronizations: [
        {
            name: "syncPodio",
            fullSyncFunction: syncApp
        }
    ],
    model: {
        tables: [
            {
                name: "items",
                columns: [
                    { name: "employeeName", type: "STRING", length: 255 },
                    { name: "email", type: "STRING", length: 255, primaryKey: true },
                    { name: "confirmation", type: "STRING", length: 255 },
                    { name: "createdOn", type: "DATETIME" },
                    { name: "appItemId", type: "INTEGER" },
                    { name: "region", type: "STRING", length: 255 },
                    { name: "country", type: "STRING", length: 255 },
                ]
            },
            {
                name: "country",
                columns: [
                    { name: "uniqueId", type: "STRING", length: 255, primaryKey: true },
                    { name: "country", type: "STRING", length: 255 },
                    { name: "region", type: "STRING", length: 255 },
                ]
            },
            {
                name: "region",
                columns: [
                    { name: "uniqueId", type: "STRING", length: 255, primaryKey: true },
                    { name: "guidelines", type: "STRING", length: 3000 },
                    { name: "region", type: "STRING", length: 255 },
                    { name: "image", type: "STRING", length: 255 }
                ]
            }
        ]
    },
    integrationParameters: [
        { name: "covidAppId", type: "INTEGER", label: "Covid Self Certification App Id", required: true },
        { name: "viewId", type: "INTEGER", label: "Covid Self Certification View Id", required: true },
        { name: "countryDataAppId", type: "INTEGER", label: "Country Data App Id", required: true },
    ],
    actions: [
        {
            name: "covidSelfCertify",
            parameters: [
                { name: "email", type: "STRING", required: true },
                { name: "status", type: "INTEGER", required: true },
                { name: "country", type: "STRING", required: true },
                { name: "city", type: "STRING", required: true },
                { name: "appItemId", type: "STRING" }
            ],
            function: covidSelfCertify
        }
    ]
})

async function validateResponse(response){
    const body = await response.text()
    if(response.headers.map['content-type'].toLowerCase().includes("application/json")){
        const jsonBody = JSON.parse(body)
        if(!response.ok){
            return {responseBody:jsonBody,errorMessage:jsonBody.error_description,errorStatus:true}
        }else{
            return {responseBody:jsonBody,errorStatus:false}
        }
    }else{
        return {responseBody:body,errorMessage:'Unable to process the request',errorStatus:true}
    }
}

async function syncApp({ client, dataStore, integrationParameters }) {
    await Promise.all([
        getItems(client, dataStore, integrationParameters, false),
        getRegionData(client, dataStore, integrationParameters)
    ])
}

async function getItems(client, dataStore, integrationParameters, dataUpdateAfterAction = false) {
    const limit = 100
    let offset = 0
    let total = 0
    const userEmails = new Set()
    do {
        const itemsResponse = await client.fetch(`item/app/${integrationParameters.covidAppId}/filter/${integrationParameters.viewId}`, {
            method: "POST",
            body: JSON.stringify({
                limit: limit,
                offset: offset,
                sort_by: "app_item_id",
                sort_desc: true
            })
        })
        const {responseBody,errorMessage,errorStatus} = await validateResponse(itemsResponse)
        if (errorStatus) {
            console.log(JSON.stringify(responseBody),errorMessage)
            throw new Error(errorMessage)
        }
        total = responseBody.total
        const items = (responseBody.items ?? []).map(item => {
            return {
                "employeeName": getTextValue(item.fields, 'text', 'Name') ?? null,
                "email": getTextValue(item.fields, 'email') ?? null,
                "confirmation": getCategoryValue(item.fields) ?? null,
                "createdOn": getTimestamp(item.fields) ?? null,
                "appItemId": item.app_item_id,
                "region": getTextValue(item.fields, 'text', 'Region') ?? null,
                "country": getTextValue(item.fields, 'text', 'Country') ?? null,
            }
        })
        const uniqueItems = _.uniqBy(items,'email')
        dataStore.save('items',uniqueItems)
        offset += limit
    } while (dataUpdateAfterAction != true && offset <= total)
}

async function covidSelfCertify({ client, dataStore, integrationParameters, actionParameters }) {
    if (actionParameters.appItemId !== null) {
        dataStore.deleteById('items', actionParameters.email)
    }
    const response = await client.fetch(`item/app/${integrationParameters.covidAppId}`, {
        method: "POST",
        body: JSON.stringify({
            "fields": {
                "email": [{ "type": "work", "value": actionParameters.email }],
                "title": [{ "value": getTitleFromEmail(actionParameters.email)}],
                "confirmation": actionParameters.status,
                "createdon": {
                    "start": moment().format('YYYY-MM-DD HH:mm:ss')
                },
                "country": [{ "value": actionParameters.country }],
                "city": [{ "value": actionParameters.city }]
            }
        })
    })
    if (!response.ok) {
        throw new Error(await response.text())
    }
    await getItems(client, dataStore, integrationParameters, true)
}

async function getRegionData(client, dataStore, integrationParameters) {
    const limit = 100
    let offset = 0
    let total = 0
    do {
        const countryDataResponse = await client.fetch(`item/app/${integrationParameters.countryDataAppId}/filter`, {
            method: "POST",
            body: JSON.stringify({
                limit: limit,
                offset: offset
            })
        })
        const {responseBody,errorMessage,errorStatus} = await validateResponse(countryDataResponse)
        if (errorStatus) {
            console.log(JSON.stringify(responseBody),errorMessage)
            throw new Error(errorMessage)
        }
        total = responseBody.total
        const items = responseBody.items ?? []
        items.forEach(item => {
            const fields = item.fields ?? []
            const region = getTextValue(item.fields, 'text', 'Region') ?? null
            const countries = _.uniq(String(getTextValue(item.fields, 'text', 'Countries')).split(','))
            countries?.forEach(country => {
                dataStore.save("country", {
                    "uniqueId": uuid.v4(),
                    "country": country,
                    "region": region
                })
            })

            dataStore.save('region', {
                "uniqueId": uuid.v4(),
                "region": region,
                "guidelines": convertHtmlTagsToStringEscapeSequence(getTextValue(item.fields,'text','Guidelines')) ?? null,
                "image":getImage(item.fields,'Image') ?? null
            })

        })
        offset += limit
    } while (offset <= total)
}

function getTextValue(dataItems, type, label = null) {
    const item = dataItems.find(item => (label != null && item.label == label && item.type === type) || (label == null && item.type == type))
    return item?.values[0]?.value ?? null
}

function getCategoryValue(dataItems) {
    const confirmation = dataItems.find(item => item.type === 'category')
    return confirmation?.values[0]?.value?.text ?? null
}

function convertHtmlTagsToStringEscapeSequence(conditions) {
    return conditions?.replaceAll('<br/>', '\r\n').replaceAll('</p>', '\r\n').replaceAll('<p>', '') ?? null
}

function getTimestamp(dataItems) {
    const date = dataItems.find(item => item.type === 'date')
    return date != undefined ? new Date(date.values[0].start) : null
}

function getImage(dataItems,label) {
    const image = dataItems.find(item => item.type === 'embed' && item.label === label)
    return image?.values[0]?.embed?.url ?? null
}

function getTitleFromEmail(email){
    return email.substring(0, email.indexOf('@')).split('.').reduce((initialvalue, currentvalue) => { return initialvalue + (currentvalue[0].toUpperCase() + currentvalue.substring(1, currentvalue.length) + ' ') }, '').trimEnd() 
}