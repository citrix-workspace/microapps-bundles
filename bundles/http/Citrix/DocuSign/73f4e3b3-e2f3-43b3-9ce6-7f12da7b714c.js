const moment = library.load('moment-timezone');
const uuid = library.load('uuid');

integration.define({
    synchronizations: [
        {
            name: "docusign",
            fullSyncFunction: fullSync,
            incrementalSyncFunction: incrementalSync
        }
    ],
    integrationParameters: [
        { name: "account_Id", type: "STRING", label: "Docusign Account Id", required: true, description: "Enter the DocuSign Account Id, for More Details See \'Configure OAuth server\' section of Docusign Documentation" }
    ],
    model: {
        tables: [
            {
                name: "envelopes",
                columns: [
                    { name: "completed_date_time", type: "DATETIME" },
                    { name: "created_date_time", type: "DATETIME" },
                    { name: "declined_date_time", type: "DATETIME" },
                    { name: "delivered_date_time", type: "DATETIME" },
                    { name: "email_subject", type: "STRING", length: 255 },
                    { name: "envelope_id", type: "STRING", length: 255, primaryKey: true },
                    { name: "envelope_uri", type: "STRING", length: 255 },
                    { name: "expire_after", type: "INTEGER" },
                    { name: "expire_date_time", type: "DATETIME" },
                    { name: "initial_sent_date_time", type: "DATETIME" },
                    { name: "last_modified_date_time", type: "DATETIME" },
                    { name: "purge_state", type: "STRING", length: 255 },
                    { name: "sender_account_id", type: "STRING", length: 255 },
                    { name: "sender_email", type: "STRING", length: 255 },
                    { name: "sender_user_id", type: "STRING", length: 255 },
                    { name: "sender_user_name", type: "STRING", length: 255 },
                    { name: "sent_date_time", type: "DATETIME" },
                    { name: "status", type: "STRING", length: 255 },
                    { name: "status_changed_date_time", type: "DATETIME" },
                    { name: "voidedDateTime", type: "DATETIME" },
                    { name: "voidedReason", type: "STRING", length: 255 },
                ]
            },
            {
                name: "envelopes_recipients_signers",
                columns: [
                    { name: "delivered_date_time", type: "DATETIME" },
                    { name: "email", type: "STRING", length: 255 },
                    { name: "first_name", type: "STRING", length: 255 },
                    { name: "last_name", type: "STRING", length: 255 },
                    { name: "name", type: "STRING", length: 255 },
                    { name: "recipient_id", type: "INTEGER" },
                    { name: "recipient_id_guid", type: "STRING", primaryKey: true, length: 255 },
                    { name: "role_name", type: "STRING", length: 255 },
                    { name: "routing_order", type: "INTEGER" },
                    { name: "signed_date_time", type: "DATETIME" },
                    { name: "status", type: "STRING", length: 255 },
                    { name: "user_id", type: "STRING", length: 255 },
                    { name: "parent_envelope_id", type: "STRING", length: 255 },
                ]
            },
            {
                name: "templates",
                columns: [
                    { name: "created", type: "DATETIME" },
                    { name: "description", type: "STRING", length: 255 },
                    { name: "email_subject", type: "STRING", length: 255 },
                    { name: "last_modified", type: "DATETIME" },
                    { name: "last_used", type: "DATETIME" },
                    { name: "name", type: "STRING", length: 255 },
                    { name: "owner_email", type: "STRING", length: 255 },
                    { name: "owner_user_id", type: "STRING", length: 255 },
                    { name: "owner_user_name", type: "STRING", length: 255 },
                    { name: "template_id", type: "STRING", primaryKey: true, length: 255 },
                ]
            },
            {
                name: "templates_documents",
                columns: [
                    { name: "document_id", type: "INTEGER" },
                    { name: "name", type: "STRING", length: 255 },
                    { name: "parent_template_id", type: "STRING", length: 255 },
                    { name: "unique_id", type: "STRING", primaryKey: true, length: 255 },
                ]
            },
            {
                name: "templates_folder_ids",
                columns: [
                    { name: "value", type: "STRING", length: 255 },
                    { name: "parent_template_id", type: "STRING", length: 255 },
                    { name: "unique_id", type: "STRING", primaryKey: true, length: 255 },
                ]
            },
            {
                name: "users",
                columns: [
                    { name: "created_date_time", type: "DATETIME" },
                    { name: "email", type: "STRING", length: 255 },
                    { name: "first_name", type: "STRING", length: 255 },
                    { name: "job_title", type: "STRING", length: 255 },
                    { name: "last_name", type: "STRING", length: 255 },
                    { name: "user_id", type: "STRING", length: 255, primaryKey: true },
                    { name: "user_name", type: "STRING", length: 255 },
                    { name: "user_status", type: "STRING", length: 255 },
                    { name: "user_type", type: "STRING", length: 255 },
                ]

            },
            {
                name: "Envelopeview",
                columns: [
                    { name: "url", type: "STRING", length: 3000 },
                    { name: "email", type: "STRING", length: 255, primaryKey: true },
                    { name: "envelope_id", type: "STRING", length: 255 }
                ]
            }
        ],
        relationships: [
            {
                name: "nested_table_1",
                primaryTable: "templates",
                foreignTable: "templates_documents",
                columnPairs: [
                    {
                        primaryKey: "template_id",
                        foreignKey: "parent_template_id"
                    }
                ]
            },
            {
                name: "nested_table_2",
                primaryTable: "templates",
                foreignTable: "templates_folder_ids",
                columnPairs: [
                    {
                        primaryKey: "template_id",
                        foreignKey: "parent_template_id"
                    }
                ]
            },
            {
                name: "nested_table_3",
                primaryTable: "envelopes",
                foreignTable: "envelopes_recipients_signers",
                columnPairs: [
                    {
                        primaryKey: "envelope_id",
                        foreignKey: "parent_envelope_id"
                    }
                ]
            }
        ]
    },
    actions: [
        {
            name: "Add_Recipient",
            parameters: [
                { name: "envelope_Id", type: "STRING", required: true },
                { name: "recipient_Name", type: "STRING" },
                { name: "recipient_Email", type: "STRING" },
                { name: "role_Name", type: "STRING" },
                { name: "recipient_Email_Unknown", type: "STRING" },
                { name: "user_Id", type: "STRING", required: true },
            ],
            function: addRecipient
        },
        {
            name: "Update_Or_Resend_Envelope",
            parameters: [
                { name: "envelope_Id", type: "STRING", required: true },
                { name: "recipient_Name", type: "STRING" },
                { name: "recipient_Id", type: "STRING", required: true },
                { name: "recipient_Email", type: "STRING" },
                { name: "user_Id", type: "STRING", required: true },
                { name: "method_Name", type: "STRING", required: true },
            ],
            function: updateOrResendEnvelope
        },
        {
            name: "Send_Envelope",
            parameters: [
                { name: "role_Name_one", type: "STRING", required: true },
                { name: "role_Name_two", type: "STRING" },
                { name: "role_Name_three", type: "STRING" },
                { name: "recipient_Name_one", type: "STRING", required: true },
                { name: "recipient_Name_two", type: "STRING" },
                { name: "recipient_Name_three", type: "STRING" },
                { name: "recipient_Email_one", type: "STRING", required: true },
                { name: "recipient_Email_two", type: "STRING" },
                { name: "recipient_Email_three", type: "STRING" },
                { name: "template_Id", type: "STRING", required: true },
                { name: "email_Subject", type: "STRING" },
                { name: "recipient_Email_one_Unknown", type: "STRING", required: true },
                { name: "recipient_Email_two_Unknown", type: "STRING" },
                { name: "recipient_Email_three_Unknown", type: "STRING" },
                { name: "user_Id", type: "STRING", required: true },
                { name: "add_second_recipient", type: "BOOLEAN", required: true },
                { name: "add_third_recipient", type: "BOOLEAN", required: true },
            ],
            function: sendTemplateThreeRecipient
        },
        {
            name: "Delete_Recipient",
            parameters: [
                { name: "envelope_Id", type: "STRING", required: true },
                { name: "recipient_Id", type: "STRING", required: true },
                { name: "user_Id", type: "STRING", required: true },
            ],
            function: deleteRecipient
        },
        {
            name: "Envelopeview",
            parameters: [
                { name: "envelope_Id", type: "STRING", required: true },
                { name: "email", type: "STRING" },
                { name: "userName", type: "STRING" }
            ],
            function: envelopeview
        }
    ]

});

async function validateResponse(response) {
    const body = await response.text()
    if (response.headers.map['content-type']?.toLowerCase()?.includes("application/json")) {
        const jsonBody = JSON.parse(body)
        if (!response.ok) {
            console.log(JSON.stringify(jsonBody))
            throw new Error(jsonBody.message)
        } else {
            return { responseBody: jsonBody}
        }
    } else {
        console.log(body)
        throw new Error('Unable to process the request')
    }
}

async function fullSync({ client, dataStore, integrationParameters, context }) {
    const ACCOUNT_ID = integrationParameters.account_Id
    const userids = await syncUsers(client, dataStore, ACCOUNT_ID)
    await Promise.all([
        syncTemplates(client, dataStore, ACCOUNT_ID),
        syncEnvelopes(client, dataStore, ACCOUNT_ID, userids)
    ])
}

async function incrementalSync({ client, dataStore, integrationParameters, latestSynchronizationTime }) {
    const ACCOUNT_ID = integrationParameters.account_Id
    const userids = await syncUsers(client, dataStore, ACCOUNT_ID)
    await Promise.all([
        syncTemplates(client, dataStore, ACCOUNT_ID, latestSynchronizationTime),
        syncEnvelopes(client, dataStore, ACCOUNT_ID, userids, latestSynchronizationTime)
    ])
}

async function syncUsers(client, dataStore, account_id) {
    const COUNT = 100
    let start_position = 0
    let totalSetSize = 0
    let userids = []
    do {
        const userResponse = await client.fetch(`/accounts/${account_id}/users?count=${COUNT}&start_position=${start_position}`)
        const { responseBody, errorMessage, errorStatus } = await validateResponse(userResponse)
        const userData = (responseBody?.users ?? []).map(user => {
            userids.push(user.userId)
            return {
                "created_date_time": new Date(user.createdDateTime),
                "email": user.email,
                "first_name": user.firstName,
                "job_title": user.jobTitle,
                "last_name": user.lastName,
                "user_id": user.userId,
                "user_name": user.userName,
                "user_status": user.userStatus,
                "user_type": user.userType
            }
        })

        dataStore.save('users', userData)

        start_position += COUNT;
        totalSetSize = responseBody.totalSetSize;
    } while (start_position < totalSetSize)
    return userids;
}

async function syncTemplates(client, dataStore, account_id, latestSynchronizationTime = null) {
    const COUNT = 100
    let start_position = 0
    let totalSetSize = 0
    const MODIFIED_FROM_DATE = moment(latestSynchronizationTime).utc().format()
    do {
        let url = `/accounts/${account_id}/templates?count=${COUNT}&order_by=modified&order=desc&include=documents&start_position=${start_position}`
        if (latestSynchronizationTime !== null) {
            url += `&modified_from_date=${MODIFIED_FROM_DATE}`
        }
        const templateResponse = await client.fetch(url)
        const { responseBody, errorMessage, errorStatus } = await validateResponse(templateResponse)
        
        const templateData = (responseBody.envelopeTemplates ?? []).map(template => {
            const documentData = (template?.documents ?? []).map(document => {
                return {
                    "document_id": +document.documentId,
                    "name": document.name,
                    "parent_template_id": template.templateId,
                    "unique_id": uuid.v4(),
                }
            })

            dataStore.save("templates_documents", documentData)

            const folderData = (template?.folderIds ?? []).map(folderId => {
                return {
                    "value": folderId,
                    "parent_template_id": template.templateId,
                    "unique_id": uuid.v4(),
                }
            })

            dataStore.save("templates_folder_ids", folderData)

            return {
                "created": new Date(template.created),
                "description": template.description,
                "email_subject": template.emailSubject,
                "last_modified": new Date(template.lastModified),
                "last_used": template.lastUsed !== undefined ? new Date(template.lastUsed) : null,
                "name": template.name,
                "owner_email": template.owner.email,
                "owner_user_id": template.owner.userId,
                "owner_user_name": template.owner.userName,
                "template_id": template.templateId
            }
        })

        dataStore.save('templates', templateData)

        start_position += COUNT;
        totalSetSize = responseBody.totalSetSize;
    } while (start_position < totalSetSize)
}

async function syncEnvelopes(client, dataStore, account_id, userids, latestSynchronizationTime = null) {
    const COUNT = 100
    const FROM_DATE = latestSynchronizationTime === null ? moment().subtract(4, 'M').utc().format() : moment(latestSynchronizationTime).utc().format()
    let start_position = 0
    let totalSetSize = 0
    let i = 0
    do {
        const envelopeResponse = await client.fetch(`/accounts/${account_id}/envelopes?from_date=${FROM_DATE}&include=recipients&count=${COUNT}&order=desc&order_by=created&user_id=${userids[i]}&status=any&start_position=${start_position}`)
        const { responseBody, errorMessage, errorStatus } = await validateResponse(envelopeResponse)
        const templateData = (responseBody.envelopes ?? []).map(envelope => {
            const recipientsData = (envelope.recipients?.signers ?? []).map(recipient => {
                return {
                    "delivered_date_time": recipient.deliveredDateTime !== undefined ? new Date(recipient.deliveredDateTime) : null,
                    "email": recipient.email,
                    "first_name": recipient.firstName,
                    "last_name": recipient.lastName,
                    "name": recipient.name,
                    "recipient_id": +recipient.recipientId,
                    "recipient_id_guid": recipient.recipientIdGuid,
                    "role_name": recipient.roleName,
                    "routing_order": +recipient.routingOrder,
                    "signed_date_time": recipient.signedDateTime !== undefined ? new Date(recipient.signedDateTime) : null,
                    "status": recipient.status,
                    "user_id": recipient.userId,
                    "parent_envelope_id": envelope.envelopeId
                }
            })

            dataStore.save("envelopes_recipients_signers", recipientsData)

            return {
                "completed_date_time": envelope.completedDateTime !== undefined ? new Date(envelope.completedDateTime) : null,
                "created_date_time": envelope.createdDateTime !== undefined ? new Date(envelope.createdDateTime) : null,
                "declined_date_time": envelope.declinedDateTime !== undefined ? new Date(envelope.declinedDateTime) : null,
                "delivered_date_time": envelope.deliveredDateTime !== undefined ? new Date(envelope.deliveredDateTime) : null,
                "email_subject": envelope.emailSubject,
                "envelope_id": envelope.envelopeId,
                "envelope_uri": envelope.envelopeUri,
                "expire_after": +envelope.expireAfter,
                "expire_date_time": envelope.expireDateTime !== undefined ? new Date(envelope.expireDateTime) : null,
                "initial_sent_date_time": envelope.initialSentDateTime !== undefined ? new Date(envelope.initialSentDateTime) : null,
                "last_modified_date_time": envelope.lastModifiedDateTime !== undefined ? new Date(envelope.lastModifiedDateTime) : null,
                "purge_state": envelope.purgeState,
                "sender_account_id": envelope.sender.accountId,
                "sender_email": envelope.sender.email,
                "sender_user_id": envelope.sender.userId,
                "sender_user_name": envelope.sender.userName,
                "sent_date_time": envelope.sentDateTime !== undefined ? new Date(envelope.sentDateTime) : null,
                "status": envelope.status,
                "status_changed_date_time": envelope.statusChangedDateTime !== undefined ? new Date(envelope.statusChangedDateTime) : null,
                "voidedDateTime": envelope.voidedDateTime !== undefined ? new Date(envelope.voidedDateTime) : null,
                "voidedReason": envelope.voidedReason
            }
        })
        dataStore.save('envelopes', templateData)

        start_position += COUNT;
        totalSetSize = responseBody.totalSetSize;
        if (start_position > totalSetSize || totalSetSize === 0) {
            i++;
            start_position = 0
            totalSetSize = 0
        }
    } while (i < userids.length)
}
//Service Actions
async function addRecipient({ client, dataStore, integrationParameters, actionParameters }) {
    const ACCOUNT_ID = integrationParameters.account_Id;
    const RESEND_ENVELOPE = true
    const response = await client.fetch(`accounts/${ACCOUNT_ID}/envelopes/${actionParameters.envelope_Id}/recipients?resend_envelope=${RESEND_ENVELOPE}`, {
        method: "POST",
        body: JSON.stringify({
            "signers": [
                {
                    email: actionParameters.recipient_Email ?? actionParameters.recipient_Email_Unknown,
                    name: actionParameters.recipient_Name,
                    recipientId: `1${moment().format('Hms')}`,
                    roleName: actionParameters.role_Name,
                }
            ]
        })
    })

    if (!response.ok) {
        throw new Error(await response.text())
    }
    await syncEnvelopes(client, dataStore, ACCOUNT_ID, [actionParameters.user_Id])
}
async function updateOrResendEnvelope({ client, dataStore, integrationParameters, actionParameters }) {
    const ACCOUNT_ID = integrationParameters.account_Id;
    const RESEND_ENVELOPE = true
    const response = await client.fetch(`accounts/${ACCOUNT_ID}/envelopes/${actionParameters.envelope_Id}/recipients?resend_envelope=${RESEND_ENVELOPE}`, {
        method: `${actionParameters.method_Name}`,
        body: JSON.stringify({
            "signers": [
                {
                    email: actionParameters.recipient_Email ?? actionParameters.recipient_Email_Unknown,
                    name: actionParameters.recipient_Name,
                    recipientId: actionParameters.recipient_Id,
                }
            ]
        })
    })

    if (!response.ok) {
        throw new Error(await response.text())
    }
    await syncEnvelopes(client, dataStore, ACCOUNT_ID, [actionParameters.user_Id])
}

async function sendTemplateThreeRecipient({ client, dataStore, integrationParameters, actionParameters }) {
    const ACCOUNT_ID = integrationParameters.account_Id;
    let templateRoles = [{
        roleName: actionParameters.role_Name_one,
        name: actionParameters.recipient_Name_one,
        email: actionParameters.recipient_Email_one !== "" && actionParameters.recipient_Email_one !== undefined ? actionParameters.recipient_Email_one : actionParameters.recipient_Email_one_Unknown,
    }]

    if (actionParameters.add_second_recipient) {
        templateRoles.push({
            roleName: actionParameters.role_Name_two,
            name: actionParameters.recipient_Name_two,
            email: actionParameters.recipient_Email_two !== "" && actionParameters.recipient_Email_two !== undefined ? actionParameters.recipient_Email_two : actionParameters.recipient_Email_two_Unknown,
        })
    }
    if (actionParameters.add_third_recipient) {
        templateRoles.push({
            roleName: actionParameters.role_Name_three,
            name: actionParameters.recipient_Name_three,
            email: actionParameters.recipient_Email_three !== "" && actionParameters.recipient_Email_three !== undefined ? actionParameters.recipient_Email_three : actionParameters.recipient_Email_three_Unknown,
        })
    }
    const response = await client.fetch(`accounts/${ACCOUNT_ID}/envelopes`, {
        method: "POST",
        body: JSON.stringify({
            "emailSubject": `${actionParameters.email_Subject}`,
            "templateId": `${actionParameters.template_Id}`,
            "templateRoles": templateRoles,
            "status": "sent"
        })
    })

    if (!response.ok) {
        throw new Error(await response.text())
    }
    await syncEnvelopes(client, dataStore, ACCOUNT_ID, [actionParameters.user_Id])
}

async function deleteRecipient({ client, dataStore, integrationParameters, actionParameters }) {
    const ACCOUNT_ID = integrationParameters.account_Id;
    const response = await client.fetch(`accounts/${ACCOUNT_ID}/envelopes/${actionParameters.envelope_Id}/recipients/${actionParameters.recipient_Id}`, {
        method: "DELETE",
    })

    if (!response.ok) {
        throw new Error(await response.text())
    }
    dataStore.deleteById('envelopes_recipients_signers', actionParameters.recipient_Id)
}
async function envelopeview({ client, dataStore, integrationParameters, actionParameters }) {
    const ACCOUNT_ID = integrationParameters.account_Id;
    const envelopeViewResponse = await client.fetch(`accounts/${ACCOUNT_ID}/envelopes/${actionParameters.envelope_Id}/views/recipient`,
        {
            method: "POST",
            body: JSON.stringify(
                {
                    "userName": `${actionParameters.userName}`,
                    "email": `${actionParameters.email}`,
                    "returnUrl": 'https://docusign.github.io/returnUrl/',
                    "authenticationMethod": "None"
                })
        })

    const { responseBody, errorMessage, errorStatus } = await validateResponse(envelopeViewResponse)
    
    const result = {
        "envelope_id": actionParameters.envelope_Id,
        "url": responseBody.url,
        "email": actionParameters.email
    }
    dataStore.save('Envelopeview', result)
}