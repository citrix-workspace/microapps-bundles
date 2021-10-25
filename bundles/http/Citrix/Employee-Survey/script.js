const moment = library.load('moment-timezone')
const _ = library.load('lodash')
const uuid = library.load('uuid')
integration.define({
    synchronizations: [
        {
            name: "integrationSync",
            fullSyncFunction: syncFunction
        }
    ],
    integrationParameters: [
        { name: "surveyAdminAppId", type: "STRING", label: "Survey Admin App Id", required: true }
    ],
    model: {
        tables: [
            {
                name: "survey_app_data",
                columns: [
                    { name: "response_app_id", type: "INTEGER", primaryKey: true },
                    { name: "app_item_id", type: "INTEGER", primaryKey: true },
                    { name: "name", type: "STRING", length: 255 },
                    { name: "status", type: "STRING", length: 255 },
                    { name: "notification_date", type: "DATE" },
                    { name: "launch_date", type: "DATE" },
                    { name: "expire_after", type: "DATE" },
                    { name: "webform_link", type: "STRING", length: 255 },
                    { name: "survey_description", type: "STRING", length: 2000 },
                ]
            }
        ]
    },
    actions: [
        {
            name: "update_survey",
            parameters: [
                { name: "app_item_id", type: "INTEGER", required: true },
                { name: "launch_date", type: "DATE", required: true },
                { name: "expire_after", type: "DATE" },
                { name: "status", type: "INTEGER" , required:true}
            ],
            function: updateSurvey
        }
    ]
})

async function syncFunction({ client, dataStore, integrationParameters }) {
    await getSurveyData({ client, dataStore, integrationParameters }, false);
}

async function validateResponse(response, surveyName) {
    const body = await response.text()
    if (response.headers.map['content-type']?.toLowerCase()?.includes("application/json")) {
        const jsonBody = JSON.parse(body)
        if (!response.ok) {
            if(response.status === 403){
                throw new Error(`Unable to process the request, Invalid 'Response App Id' passed for '${surveyName}'`)
            }
            else{
                console.log(JSON.stringify(jsonBody.error_description))
                throw new Error(jsonBody.error_description)
            }            
        } else {
            return { responseBody: jsonBody}
        }
    } else {
        console.log(body)
        throw new Error('Unable to process the request')
    }
}

async function getSurveyData(param, dataUpdateAfterAction) {
    const { client, dataStore, integrationParameters } = param
    const limit = 100
    let offset = 0
    let total = 0
    do {
        const itemsResponse = await client.fetch(`item/app/${integrationParameters.surveyAdminAppId}/filter`, {
            method: "POST",
            body: JSON.stringify({
                limit: limit,
                offset: offset,
                sort_by: "app_item_id",
                sort_desc: true
            })
        })
        const { responseBody} = await validateResponse(itemsResponse)
        for (const item of responseBody.items ?? []) {
            const launchDate = getDate(item?.fields ?? [], 'Launch Date') ?? null
            const responseAppId = getTextValue(item?.fields ?? [], 'text', 'Response App Id') ?? null
            const name = getTextValue(item?.fields ?? [], 'text', 'Survey Name')
            const webFormId = responseAppId !== null ? await getAppWebFormIds(client, responseAppId, name) : null
            dataStore.save('survey_app_data', {
                "response_app_id": parseInt(responseAppId),
                "app_item_id": item.item_id,
                "name": name,
                "status": getCategoryData(item?.fields ?? [], 'Status'),
                "notification_date": launchDate !== null ? moment(launchDate).subtract(1, 'd').format('YYYY-MM-DD') : null,
                "launch_date": launchDate,
                "expire_after": getDate(item?.fields ?? [], 'Expire After'),
                "webform_link": responseAppId !== null ? `https://podio.com/webforms/${responseAppId}/${webFormId.form_id}` : null,
                "survey_description": getTextValue(item?.fields ?? [], 'text', 'Survey Description'),
            })
        }
        offset += limit
    } while (dataUpdateAfterAction !== true && offset <= total)
}

async function getAppWebFormIds(client, responseAppId, surveyName) {
    const webForm = {}
    const appWebFormsResponse = await client.fetch(`form/app/${responseAppId}`)
    const { responseBody } = await validateResponse(appWebFormsResponse, surveyName);
    (responseBody ?? []).forEach(app => {
        webForm.form_id = app?.form_id ?? null
    })
    return webForm
}

async function updateSurvey(param) {
    const { client, actionParameters } = param
    let fields = {
        "launch-date": {
            "start": moment(actionParameters.launch_date).format('YYYY-MM-DD HH:mm:ss')
        },
        "status": actionParameters.status,
    }
    if(actionParameters.expire_after != null){
        fields['expire-after'] =  {
            "start": moment(actionParameters.expire_after).format('YYYY-MM-DD HH:mm:ss')
        }
    }
    const updateRecordResonse = await client.fetch(`/item/${actionParameters.app_item_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            fields: fields
        })
    })
    const { responseBody } = await validateResponse(updateRecordResonse)
    await getSurveyData(param, true)
}

function getDate(dataItems, label) {
    const date = dataItems.find(item => item.type === 'date' && item.label === label)
    return date != undefined ? new Date(date.values[0].start_date) : null
}

function getCategoryData(dataItems, label) {
    const confirmation = dataItems.find(item => item.type === 'category' && item.label === label)
    return confirmation?.values[0]?.value?.text ?? null
}

function getTextValue(dataItems, type, label) {
    const textValue = dataItems.find(item => item.type === 'text' && item.label === label)
    return textValue?.values[0]?.value ?? null
}
