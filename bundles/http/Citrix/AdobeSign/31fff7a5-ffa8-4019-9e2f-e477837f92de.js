const moment = library.load('moment-timezone');
const uuid = library.load('uuid')

function getStatus(status) {
    return status.split('_').reduce((initialValue, currentValue) => {
        return initialValue + (currentValue[0].toUpperCase() + (currentValue.toLowerCase()).substring(1, currentValue
            .length) + ' ')
    }, '').trimEnd()
}

async function syncUsers(dataStore, client, integrationParameters) {
    let userids = []
    const PAGE_SIZE = 100
    let cursor
    let url = `/api/rest/v6/groups/${integrationParameters.GroupId}/users?pageSize=${PAGE_SIZE}`
    do {
        const activeUsers = []
        const response = await client.fetch(url);
        const json = await response.json();

        if (!response.ok) {
            throw new Error(JSON.stringify(json))
        }
        const data = json.userInfoList ?? []
        cursor = json.page.nextCursor ?? null
        url = `/api/rest/v6/groups/${integrationParameters.GroupId}/users?pageSize=${PAGE_SIZE}&cursor=${cursor}`
        for (const user of data) {
            const response = await client.fetch(`api/rest/v6/users/${user.id}`)
            const json = await response.json()
            if (json.status === "ACTIVE") {
                userids.push(user.id);
                activeUsers.push({
                    "id": user.id,
                    "email": user.email,
                    "company": user.company,
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "accountId": user.accountId
                })
            }
        }
        dataStore.save("Users", activeUsers);
    } while (cursor != null)
    return userids
}

async function syncAgreements(dataStore, client, userids, integrationParameters, latestSynchronizationTime = null) {
    const PAGE_SIZE = integrationParameters.AgreementCount
    let i = 0
    let agreements = new Map()
    if (userids.length === 0) {
        return agreements
    }
    do {
        const response = await client.fetch(`/api/rest/v6/agreements?pageSize=${PAGE_SIZE}`, {
            headers: {
                "x-api-user": `userid:${userids[i]}`,
            }
        })
        const json = await response.json()
        if (!response.ok) {
            throw new Error(JSON.stringify(json))
        }
        let agreementsData = json.userAgreementList?.filter(agreement => {
            if (latestSynchronizationTime != null) {
                return (moment(new Date(agreement.displayDate)).isAfter(moment(latestSynchronizationTime)) && agreement.status != "DRAFT" && agreement.status != "WAITING_FOR_MY_SIGNATURE" && agreement.type == "AGREEMENT")
            } else {
                return agreement.status != "DRAFT" && agreement.status != "WAITING_FOR_MY_SIGNATURE" && agreement.type == "AGREEMENT"
            }
        }).map(agreement => {
            agreements.set(agreement.id, { "userid": userids[i], "name": agreement.name })
            return {
                "id": agreement.id,
                "displayDate": new Date(agreement.displayDate),
                "esign": Boolean(agreement.esign),
                "type": agreement.type,
                "name": agreement.name,
                "latestVersionId": agreement.latestVersionId,
                "status": getStatus(agreement.status),
                "hidden": Boolean(agreement.hidden),
                "groupId": agreement.groupId,
                "userId": userids[i]
            }
        })

        dataStore.save("agreements", agreementsData ?? []);
        i++
    } while (i < userids.length)
    return agreements
}

async function syncLibraryDocuments(dataStore, client, userids) {
    const PAGE_SIZE = 100
    let cursor = " "
    let i = 0
    if (userids.length == 0) {
        return false
    }
    let url = `/api/rest/v6/libraryDocuments?pageSize=${PAGE_SIZE}`
    do {
        const response = await client.fetch(url, {
            headers: {
                "x-api-user": `userid:${userids[i]}`,
            }
        })
        const json = await response.json()
        if (!response.ok) {
            throw new Error(JSON.stringify(json))
        }
        cursor = json.page.nextCursor ?? null
        url = `/api/rest/v6/libraryDocuments?pageSize=${PAGE_SIZE}&cursor=${cursor}`
        let templateData = json.libraryDocumentList?.map(template => {
            let templateTypesData = template.templateTypes?.map(templateType => {
                return {
                    "templateType": templateType,
                    "parentId": template.id,
                    "uniqueId": uuid.v4()
                }
            })
            dataStore.save('templateTypes', templateTypesData ?? [])
            return {
                "id": template.id,
                "name": template.name,
                "creatorEmail": template.creatorEmail,
                "ownerEmail": template.ownerEmail,
                "modifiedDate": new Date(template.modifiedDate),
                "sharingMode": template.sharingMode,
                "hidden": Boolean(template.hidden),
                "groupId": template.groupId,
                "status": getStatus(template.status)
            }
        })

        dataStore.save("libraryDocuments", templateData ?? []);

        if (cursor == null) {
            i++
            url = `/api/rest/v6/libraryDocuments?page_size=${PAGE_SIZE}`
        }

    } while (i < userids.length)
}

async function syncArgreementDetails(client, dataStore, agreements) {
    for (const [agreementId, value] of agreements) {
        const response = await client.fetch(`/api/rest/v6/agreements/${agreementId}/members`, {
            headers: {
                "x-api-user": `userid:${value.userid}`,
            }
        })
        const json = await response.json()
        if (!response.ok) {
            throw new Error(JSON.stringify(json))
        }
        json.participantSets?.forEach(participantSet => {
            let data = participantSet.memberInfos?.map(member => {
                return {
                    "agreement_id": agreementId,
                    "agreement_name": value.name,
                    "participant_email": member.email,
                    "participant_id": member.id,
                    "participant_role": participantSet.role,
                    "participant_status": getStatus(participantSet.status),
                    "sender_company": member.company,
                    "sender_email": json.senderInfo?.email,
                    "sender_name": json.senderInfo?.name,
                    "status": getStatus(json.senderInfo?.status),
                    "userid": json.senderInfo?.userId,
                    "createdDate": json.senderInfo?.createdDate
                }
            })
            dataStore.save("agreementDetails", data ?? [])
        })
    }
}

async function fullSync({ dataStore, client, integrationParameters }) {
    const userids = await syncUsers(dataStore, client, integrationParameters);
    const agreements = await syncAgreements(dataStore, client, userids, integrationParameters);
    await Promise.all([
        syncLibraryDocuments(dataStore, client, userids),
        syncArgreementDetails(client, dataStore, agreements)
    ])
}

async function incrementalSync({ dataStore, client, integrationParameters, latestSynchronizationTime }) {
    const userids = await syncUsers(dataStore, client, integrationParameters,);
    const agreements = await syncAgreements(dataStore, client, userids, integrationParameters, latestSynchronizationTime);
    await syncArgreementDetails(client, dataStore, agreements)
}

async function libraryDocumentView({ client, dataStore, actionParameters }) {
    const response = await client.fetch(`/api/rest/v6/libraryDocuments/${actionParameters.libraryDocumentId}/views`, {
        method: 'POST',
        headers: {
            "x-api-user": `email:${actionParameters.email}`,
        },
        body: JSON.stringify({
            name: actionParameters.name,
            commonViewConfiguration: {
                autoLoginUser: true
            }
        })
    })
    const json = await response.json()
    if (!response.ok) {
        throw new Error(JSON.stringify(json))
    }
    const libraryViewList = json['libraryViewList'] ?? []
    let data = libraryViewList.map(libraryView => {
        return {
            "libraryDocumentId": actionParameters.libraryDocumentId,
            "email": actionParameters.email,
            "url": libraryView.url,
            "embeddedCode": libraryView.embeddedCode,
            "name": libraryView.name,
            "isCurrent": libraryView.isCurrent
        }
    })
    dataStore.save("libraryDocumentViews", data)
}

async function agreementview({ client, dataStore, actionParameters }) {
    const response = await client.fetch(`/api/rest/v6/agreements/${actionParameters.agreementId}/views`, {
        method: 'POST',
        headers: {
            "x-api-user": `email:${actionParameters.email}`,
        },
        body: JSON.stringify({
            name: actionParameters.name,
            commonViewConfiguration: {
                autoLoginUser: true
            }
        })
    })
    const json = await response.json()
    if (!response.ok) {
        throw new Error(JSON.stringify(json))
    }
    const agreementViewList = json['agreementViewList'] ?? []
    let data = agreementViewList.map(agreementView => {
        return {
            "agreement_id": actionParameters.agreementId,
            "email": actionParameters.email,
            "url": agreementView.url,
            "embeddedCode": agreementView.embeddedCode,
            "expiration": agreementView.expiration,
            "name": agreementView.name,
            "isCurrent": agreementView.isCurrent
        }
    })
    dataStore.save("agreementViews", data)
}

async function sendAgreement({ dataStore, client, actionParameters, integrationParameters }) {
    let transientDocuments = null
    let fileInfos = {
        "libraryDocumentId": `${actionParameters.libraryDocumentId}`
    }
    if (actionParameters.libraryDocumentId == null) {
        let transientDocument = await uploadFiles(dataStore, client, actionParameters)
        delete fileInfos.libraryDocumentId
        fileInfos.transientDocumentId = transientDocument
    }
    let participantSetsInfo = [
        {
            memberInfos: [
                {
                    email: actionParameters.email1 ?? actionParameters.emailUnknown1
                }
            ],
            role: actionParameters.role1,
            order: actionParameters.order == 'inorder' ? actionParameters.order1 : 1
        }
    ]
    if (actionParameters.addrecipient2) {
        participantSetsInfo.push({
            memberInfos: [
                {
                    email: actionParameters.email2 ?? actionParameters.emailUnknown2
                }
            ],
            role: actionParameters.role2,
            order: actionParameters.order == 'inorder' ? actionParameters.order2 : 1
        })
    }
    if (actionParameters.addrecipient3) {
        participantSetsInfo.push({
            memberInfos: [
                {
                    email: actionParameters.email3 ?? actionParameters.emailUnknown3
                }
            ],
            role: actionParameters.role3,
            order: actionParameters.order == 'inorder' ? actionParameters.order3 : 1
        })
    }
    const response = await client.fetch('/api/rest/v6/agreements', {
        method: "POST",
        headers: {
            "x-api-user": `userid:${actionParameters.userid}`
        },
        body: JSON.stringify(
            {
                fileInfos: [
                    fileInfos
                ],
                name: `${actionParameters.agreementName}`,
                participantSetsInfo: participantSetsInfo,
                signatureType: 'ESIGN',
                state: 'IN_PROCESS'

            }
        )
    })
    const json = await response.json()
    if (!response.ok) {
        throw new Error(JSON.stringify(json))
    }
    const {id} = json
    let agreement = new Map([[id, { "userid": actionParameters.userid, "name": actionParameters.agreementName }]])
    await Promise.all([
        syncAgreements(dataStore, client, [actionParameters.userid], integrationParameters),
        syncArgreementDetails(client, dataStore, agreement),
    ])
}

async function shareAgreement({ dataStore, client, actionParameters}) {
    const response = await client.fetch(`/api/rest/v6/agreements/${actionParameters.agreementId}/members/share`, {
        method: 'POST',
        headers: {
            "x-api-user": `userid:${actionParameters.userid}`,
        },
        body: JSON.stringify({
            shareCreationInfo: [
                {
                    email: actionParameters.email != "" ? actionParameters.email : actionParameters.emailUnknown,
                    message: actionParameters.message
                }
            ]
        })
    })
    if (!response.ok) {
        throw new Error(await response.text())
    }
}

async function cancelAgreement({ dataStore, client, actionParameters, integrationParameters }) {
    const response = await client.fetch(`/api/rest/v6/agreements/${actionParameters.agreementId}/state`, {
        method: 'PUT',
        headers: {
            "x-api-user": `userid:${actionParameters.userid}`,
        },
        body: JSON.stringify({
            state: "CANCELLED"
        })
    })

    if (!response.ok) {
        throw new Error(await response.text())
    }
    let agreement = new Map([[actionParameters.agreementId, { "userid": actionParameters.userid, "name": actionParameters.agreementName }]])
    await Promise.all([
        syncAgreements(dataStore, client, [actionParameters.userid], integrationParameters),
        syncArgreementDetails(client, dataStore, agreement),
    ])
}
async function uploadFiles(dataStore, client, actionParameters) {
    console.log(JSON.stringify(actionParameters.attachments))
    const formData = new FormData()
    if(!actionParameters.attachments || actionParameters.attachments.length === 0){
        throw new Error("File not selected")
    }
    actionParameters.attachments?.forEach(file => {
        formData.append('File', file)
        formData.append('File-Name', file.name)
    })
    
    const response = await client.fetch(`/api/rest/v6/transientDocuments`, {
        method: "POST",
        body: formData,
        headers: {
            "x-api-user": `userid:${actionParameters.userid}`
        }
    })
    const json = await response.json()
    if (!response.ok) {
        throw new Error(JSON.stringify(json))
    }
    return json.transientDocumentId;
}

integration.define({
    synchronizations: [
        {
            name: "fullSync",
            fullSyncFunction: fullSync,
            incrementalSyncFunction: incrementalSync
        }
    ],
    integrationParameters: [
        { name: "GroupId", type: "STRING", label: "AdobeSign GroupId", required: true },
        { name: "AgreementCount", type: "STRING", label: "Agreements Per User", required: true, description: "No of Agreements to stored per user in cache table" }
    ],
    model: {
        tables: [
            {
                name: "agreements",
                columns: [
                    { name: "id", type: "STRING", primaryKey: true, length: 255 },
                    { name: "displayDate", type: "DATETIME" },
                    { name: "esign", type: "BOOLEAN" },
                    { name: "type", type: "STRING", length: 255 },
                    { name: "name", type: "STRING", length: 255 },
                    { name: "groupId", type: "STRING", length: 255 },
                    { name: "userId", type: "STRING", length: 255, primaryKey: true },
                    { name: "latestVersionId", type: "STRING", length: 255 },
                    { name: "status", type: "STRING", length: 255 },
                    { name: "hidden", type: "BOOLEAN" },
                ]
            },
            {
                name: "libraryDocuments",
                columns: [
                    { name: "id", type: "STRING", primaryKey: true, length: 255 },
                    { name: "name", type: "STRING", length: 255 },
                    { name: "creatorEmail", type: "STRING", length: 255 },
                    { name: "ownerEmail", type: "STRING", length: 255 },
                    { name: "modifiedDate", type: "DATETIME" },
                    { name: "sharingMode", type: "STRING", length: 255 },
                    { name: "groupId", type: "STRING", length: 255 },
                    { name: "status", type: "STRING", length: 255 },
                    { name: "hidden", type: "BOOLEAN" },
                ]
            },
            {
                name: "templateTypes",
                columns: [
                    { name: "templateType", type: "STRING", length: 255 },
                    { name: "parentId", type: "STRING", length: 255 },
                    { name: "uniqueId", type: "STRING", length: 255, primaryKey: true }
                ]
            },
            {
                name: "Users",
                columns: [
                    { name: "id", type: "STRING", primaryKey: true, length: 255 },
                    { name: "email", type: "STRING", length: 255 },
                    { name: "company", type: "STRING", length: 255 },
                    { name: "firstName", type: "STRING", length: 255 },
                    { name: "lastName", type: "STRING", length: 255 },
                ]
            },
            {
                name: "agreementDetails",
                columns: [
                    { name: "agreement_id", type: "STRING", length: 255 },
                    { name: "agreement_name", type: "STRING", length: 255 },
                    { name: "participant_email", type: "STRING", length: 255 },
                    { name: "participant_id", type: "STRING", length: 255, primaryKey: true },
                    { name: "participant_role", type: "STRING", length: 255 },
                    { name: "participant_status", type: "STRING", length: 255 },
                    { name: "sender_company", type: "STRING", length: 255 },
                    { name: "sender_email", type: "STRING", length: 255 },
                    { name: "sender_name", type: "STRING", length: 255 },
                    { name: "status", type: "STRING", length: 255 },
                    { name: "userid", type: "STRING", length: 255 },
                    { name: "createdDate", type: "DATETIME" },
                ]
            },

            {
                name: "agreementViews",
                columns: [
                    { name: "agreement_id", type: "STRING", length: 255, primaryKey: true },
                    { name: "embeddedCode", type: "STRING", length: 1000 },
                    { name: "expiration", type: "DATETIME" },
                    { name: "url", type: "STRING", length: 255 },
                    { name: "name", type: "STRING", length: 255 },
                    { name: "isCurrent", type: "BOOLEAN" },
                    { name: "email", type: "STRING", length: 255, primaryKey: true },
                ]
            },
            {
                name: "libraryDocumentViews",
                columns: [
                    { name: "libraryDocumentId", type: "STRING", length: 255, primaryKey: true },
                    { name: "embeddedCode", type: "STRING", length: 1000 },
                    { name: "url", type: "STRING", length: 255 },
                    { name: "name", type: "STRING", length: 255 },
                    { name: "isCurrent", type: "BOOLEAN" },
                    { name: "email", type: "STRING", length: 255, primaryKey: true },
                ]
            },
        ],
        relationships: [
            {
                name: "user_agreements",
                primaryTable: "Users",
                foreignTable: "agreementDetails",
                columnPairs: [
                    {
                        primaryKey: "email",
                        foreignKey: "participant_email"
                    }
                ]
            },
            {
                name: "Get_Agreements",
                primaryTable: "agreementDetails",
                foreignTable: "agreements",
                columnPairs: [
                    {
                        primaryKey: "agreement_id",
                        foreignKey: "id"
                    },
                    {
                        primaryKey: "userid",
                        foreignKey: "userId"
                    }
                ]
            }
        ]
    },
    actions: [
        {
            name: "ShareAgreement",
            parameters: [
                { name: "agreementId", type: "STRING", required: true },
                { name: "userid", type: "STRING", required: true },
                { name: "email", type: "STRING", required: true },
                { name: "emailUnknown", type: "STRING" },
                { name: "message", type: "STRING" }
            ],
            function: shareAgreement
        },
        {
            name: "CancelAgreement",
            parameters: [
                { name: "agreementId", type: "STRING", required: true },
                { name: "userid", type: "STRING", required: true },
                { name: "agreementName", type: "STRING" }
            ],
            function: cancelAgreement
        },
        {
            name: "sendAgreement",
            parameters: [
                { name: "libraryDocumentId", type: "STRING" },
                { name: 'attachments', type: 'FILES' },
                { name: "agreementName", type: "STRING" },
                { name: "email1", type: "STRING" },
                { name: "role1", type: "STRING" },
                { name: "emailUnknown1", type: "STRING" },
                { name: "email2", type: "STRING" },
                { name: "role2", type: "STRING" },
                { name: "emailUnknown2", type: "STRING" },
                { name: "email3", type: "STRING" },
                { name: "role3", type: "STRING" },
                { name: "emailUnknown3", type: "STRING" },
                { name: "addrecipient2", type: "BOOLEAN" },
                { name: "addrecipient3", type: "BOOLEAN" },
                { name: "order", type: "STRING" },
                { name: "order1", type: "STRING" },
                { name: "order2", type: "STRING" },
                { name: "order3", type: "STRING" },
                { name: "userid", type: "STRING" },
            ],
            function: sendAgreement
        },
        {
            name: "agreementView",
            parameters: [
                { name: "agreementId", type: "STRING", required: true },
                { name: "userid", type: "STRING", required: true },
                { name: "name", type: "STRING", required: true },
                { name: "email", type: "STRING", required: true }
            ],
            function: agreementview
        },
        {
            name: "libraryDocumentView",
            parameters: [
                { name: "libraryDocumentId", type: "STRING", required: true },
                { name: "name", type: "STRING", required: true },
                { name: "email", type: "STRING", required: true }
            ],
            function: libraryDocumentView
        }
    ]
});