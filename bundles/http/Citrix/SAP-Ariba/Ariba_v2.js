const limitApprovables = 100 // limit number of records per page for pagination approvables
const limitGroups = 1000  // limit number of records for resolving group members
const limitChanges = 50 // limit number of records per page for pagination changers
const maxNoOfPages = 100000 //  limit number of pages for pagination

function calculateNumberOfPages(totalrecords, limit) {
    if (Number.isInteger(totalrecords)) {
        let totalpages = totalrecords / limit
        if (totalpages > maxNoOfPages) {
            console.log(`Warning: Number of pages for pagination exceed set value ${maxNoOfPages}. Total number of pages needed: ${totalpages}`)
            totalpages = maxNoOfPages
        }
        return totalpages
    }
    else {
        console.log(`Warning: unable to calculate number of pages, total records returs as: ${totalrecords}`)
        return 0
    }
}

function flatComments(comments) {
    for (let i = 0; i < comments.length; i++) {
        //this will move key/value pairs from json.comments[j].user object to the json.comments[j] and add user_ prefix
        comments[i] = flatJsonObject(comments[i], 'user', 'user_')
    }
    return comments
}

function flatLineItems(items) {
    for (let i = 0; i < items.length; i++) {
        items[i] = flatJsonObject(items[i], 'supplier', 'supp_')
        items[i] = flatJsonObject(items[i], 'accountCategory', 'acc_cat_')
        items[i] = flatJsonObject(items[i], 'description', 'desc_')
        items[i] = flatJsonObject(items[i], 'desc_price', 'desc_pr_')
    }
    return items
}

function flatLineItemsAccountings(accountings) {
    for (let i = 0; i < accountings.length; i++) {
        accountings[i] = flatJsonObject(accountings[i], 'generalLedger', 'gl_')
        accountings[i] = flatJsonObject(accountings[i], 'costCenter', 'cc_')
        accountings[i] = flatJsonObject(accountings[i], 'amount', 'am_')
    }
    return accountings
}

function flatRequisition(requisition) {
    requisition = flatJsonObject(requisition, 'totalCost', 'tc_')
    requisition = flatJsonObject(requisition, 'requester', 'rq_')
    return requisition
}

async function parseAndStoreApprovalRequests(sync, json, totalCost, groups) {
    //this function is resolving approvers for requisitions and copy necessary informations to create notifications
    let rqUserList = []
    for (let appReqsr of json) {
        for (let approvers of appReqsr.approvers) {
            if (['user', 'group'].includes(approvers.type)) {
                try {
                    approvers.approvalRequired = appReqsr.approvalRequired
                    approvers.approvalState = appReqsr.approvalState
                    approvers.reason = appReqsr.reason
                    approvers.state = appReqsr.state
                    approvers.totalCostAmount = totalCost.amount
                    approvers.totalCostCurrency = totalCost.currency
                    if (approvers.type === 'user') { //if approver is a user
                        approvers = flatJsonObject(approvers, 'user', '')
                        rqUserList.push(approvers)
                    }
                    if (approvers.type === 'group') { //if approver is a group
                        let groupMembers = await resolveGroupMembers(sync, approvers.id, groups);
                        rqUserList = rqUserList.concat(resolveGroupApproval(approvers, groupMembers, approvers.id))
                    }
                }
                catch (e) {
                    console.log(`Warning: unable to get all requisition data for ${approvers.type}: ${e.message}`)
                }
            }
        }
    }
    sync.dataStore.save('pendingApprovablesRequisitions', rqUserList) //saving approvers
    return groups
}

async function resolveGroupMembers(sync, groupId, groups) {
    if (groups.has(groupId)) {
       // console.log(`Found group ${groupId} in groups cache`);
        return groups.get(groupId);
    }
    let responseData = await sync.client.fetch('groups/' + groupId + '/members?realm=' + sync.integrationParameters.realm + '&limit=' + limitGroups, {
        headers: {
            'apikey': sync.integrationParameters.apiKey
        }
    });

    if (responseData.ok) {
        let memberList = (await responseData.json()).map(({emailAddress,phone,name,uniqueName,passwordAdapter}) => 
        ({emailAddress,phone,name,uniqueName,passwordAdapter}))
        
        groups.set(groupId, memberList);

        console.log(`Adding group ${groupId} with member list size ${memberList.length}, total group count: ${groups.size}`);
        
        return memberList;
    } else {
        console.log('Warning: unable to get Group with ID:' + groupId + ':' + responseData.statusText);
        return [];
    }

}

function resolveGroupApproval(json, groupMembers, groupId) {
    //currently we are able to store only flat json object, so all nested object must be flattened
    return groupMembers.map(member => {
        return {
            emailAddress: member.emailAddress,
            phone: member.phone,
            name: member.name,
            uniqueName: member.uniqueName,
            passwordAdapter: member.passwordAdapter,
            groupId: groupId,
            approvalRequestId: json.approvalRequestId,
            approvalRequired: json.approvalRequired,
            approvalState: json.approvalState,
            requisitionId: json.requisitionId,
            reason: json.reason,
            state: json.state,
            totalCostAmount: json.totalCostAmount,
            totalCostCurrency: json.totalCostCurrency
        }
    })
}

async function storeRequisition(sync, requisitions, groups = new Map()) {
    console.log("Loading requisition details, count: " + requisitions.length)
    for (let requisition of requisitions) { // getting requisition details and additional data
        let responseData = await sync.client.fetch('requisitions/' + requisition + '?realm=' + sync.integrationParameters.realm, {
            headers: {
                'apikey': sync.integrationParameters.apiKey
            }
        })
        let json = await responseData.json()
        if (responseData.ok && isObject(json)) {
            if (notEmptyArray(json.comments)) {
                sync.dataStore.save('rq_comments', flatComments(json.comments)) //saving comments
                delete json.comments //deleting comments from json to gain better performance
            }
            if (notEmptyArray(json.approvalRequests)) {
                await parseAndStoreApprovalRequests(sync, json.approvalRequests, json.totalCost, groups)
                delete json.approvalRequests
            }
            if (notEmptyArray(json.lineItems)) { //saving line items
                for (let j = 0; j < json.lineItems.length; j++) {
                    if (notEmptyArray(json.lineItems[j].accountings)) {
                        sync.dataStore.save('rq_li_accountings', flatLineItemsAccountings(json.lineItems[j].accountings)) //saving li accounting
                        delete json.lineItems[j].accountings
                    }
                }
                sync.dataStore.save('rq_lineitems', flatLineItems(json.lineItems)) //saving line items
                delete json.lineItems
            }
            sync.dataStore.save('requisition_details', flatRequisition(json))
        }
    }
}

function parseApprovablesGetDocIds(json, documentsLists) {
    for (let i = 0; i < json.length; i++) {
        if (json[i].documentType === 'ariba.purchasing.core.Requisition') {
            documentsLists.requisitions.push(json[i].uniqueName)
        }
        if (json[i].documentType === 'ariba.invoicing.core.Invoice') {
            documentsLists.invoices.push(json[i].uniqueName)
        }
    }
    return documentsLists
}

function queryParameters(sync, i, limit) {
    return `realm=${sync.integrationParameters.realm}&limit=${limit}&offset=${limit * i}`
}

async function fetchApprovablesAndGetDocuments(sync, documentsLists) {
    let noOfPages = 1
    for (let i = 0; i < noOfPages; i++) {
        let responseData = await sync.client.fetch('/pendingApprovables?' + queryParameters(sync, i, limitApprovables), {
            headers: {
                'apikey': sync.integrationParameters.apiKey
            }
        })
        if (responseData.ok) {
            let json = await responseData.json()
            if (notEmptyArray(json)) {
                if (i === 0) {
                    noOfPages = calculateNumberOfPages(+responseData.headers.get('X-Total-Count'), limitApprovables) //calculating number of pages for pagination
                    console.log('Total number of pending approvables ' + responseData.headers.get('X-Total-Count'))
                    console.log('Total number of pages for pendingApprovables endpoint ' + noOfPages)
                }
                documentsLists = parseApprovablesGetDocIds(json,
                    documentsLists) //creating list on requisition and invoices
            }
            else {
            console.log('Warning: ariba return empty response for pendingApprovables endpoint')
            }
        }
        else {
            console.log('Warning: unable to get pendingApprovables page: ' + i + ' :' + responseData.statusText)
        }
    }
    return documentsLists
}

function parseChangesGetDocIds(json, documentsLists) {
    for (let j = 0; j < json.length; j++) {
        if (json[j].restResourceName === 'requisitions') {
            documentsLists.requisitions.push(json[j].approvableUniqueName)
        }
        if (json[j].restResourceName === 'invoices') {
            documentsLists.invoices.push(json[j].approvableUniqueName)
        }
    }
    return documentsLists
}

async function fetchChangesGetDocumentsAndGetLastId(sync, documentsLists) {
    let noOfPages = 1
    for (let i = 0; i < noOfPages; i++) {
        let responseData = await sync.client.fetch('/changes?needTotal=true&' + queryParameters(sync, i, limitChanges) + '&lastChangeId=' + documentsLists.lastChangeId, {
            headers: {
                'apikey': sync.integrationParameters.apiKey
            }
        })
        if (responseData.ok) {
            let json = await responseData.json()
            if (notEmptyArray(json)) {
                if (i === 0) { //calculating number of pages for pagination
                    noOfPages = calculateNumberOfPages(+responseData.headers.get('X-Total-Count'), limitChanges)
                    console.log('Total number of changes ' + responseData.headers.get('X-Total-Count'))
                    console.log('Total number of pages for changes endpoint ' + noOfPages)
                    console.log('First item with change ID ',json[0].changeSequenceId)
                }
                              
                try {
                    const currentItem = json[json.length - 1]
                    if (currentItem && documentsLists.newChangeId < +(currentItem.changeSequenceId)) { //getting the  lastChangeSequenceId for incremental sync from page
                        documentsLists.newChangeId = +(currentItem.changeSequenceId)
                    }
                }
                catch (e) {
                    console.log(`Warning: unable to get newChangeId from change api response}`)
                }

                documentsLists = parseChangesGetDocIds(json, documentsLists) //creating list on requisition and invoices
                sync.dataStore.save('changes',json)
            }
            else { 
                console.log('Warning: ariba return empty response for change endpoint')    
            }
        }
        else {
            console.log('Warning: unable to get changes: ' + responseData.statusText)
        }
    }
    return documentsLists
}

async function syncAriba(sync, incrementalSync) {
    console.log('Ariba sync started')
    let documentsLists = { //creating lists od rq and invc ids
        requisitions: [],
        invoices: [],
        lastChangeId: sync.integrationParameters.lastChangeId,
        newChangeId: 1
    }
    if (incrementalSync) {
        if (sync.context.lastChangeSequenceId > documentsLists.lastChangeId) { // reading stored lastChangeSequenceId for incremental sync
            documentsLists.lastChangeId = sync.context.lastChangeSequenceId
        }
    }
    else {
        documentsLists = await fetchApprovablesAndGetDocuments(sync,
            documentsLists) //geting documents id, this endpoint is used only in full sync hold documents for open approvals infinitely
    }
    documentsLists = await fetchChangesGetDocumentsAndGetLastId(sync,
        documentsLists) //geting documents id, this endpoint is used for full and incr, hold all data only for last 90 days
    documentsLists.requisitions = [...new Set(documentsLists.requisitions)] //creating uniq list
    documentsLists.invoices = [...new Set(documentsLists.invoices)] //creating uniq list
    await storeRequisition(sync, documentsLists.requisitions) //storing requisitions and resolve group approvables
    if (documentsLists.newChangeId > documentsLists.lastChangeId) {
        sync.context.lastChangeSequenceId = documentsLists.newChangeId
    } //saving  lastChangeSequenceId for incremental sync into context
    console.log('Max Change ID ' + documentsLists.newChangeId)
    console.log('Total number of requisitions ' + documentsLists.requisitions.length)
    console.log('Total number of invoices ' + documentsLists.invoices.length)
    console.log('Sync finished')
}

function fullSync(sync) {
    return syncAriba(sync, false)
}

function incrSync(sync) {
    return syncAriba(sync, true)
}

async function approveDenyRequisition(sync) {
    const {
        approvableId,
        passwordAdapter,
        action,
        user,
        visibleToSupplier,
        comment,
        totalCostAmount,
        totalCostCurrency
    } = sync.actionParameters
    const approveDenyRequest = {
        'approvableId': approvableId,
        'comment': comment,
        'visibleToSupplier': visibleToSupplier
    }

    let responseData = await sync.serviceClient.fetch('requisitions/' + approvableId + '?realm=' + sync.integrationParameters.realm, {
        headers: {
            'apikey': sync.integrationParameters.apiKey
        }
    })
    try {
        if (responseData.ok) {
            let json = await responseData.json()
            if (isObject(json)
                && Math.abs(json.totalCost.amount - totalCostAmount) < 0.01
                && json.totalCost.currency === totalCostCurrency)
            { // validation of total costs and currency
                console.log('Validation ok, total cost and currency match')
                responseData = await sync.serviceClient.fetch('/operations/rest/requisitions/' + action + '?realm=' + sync.integrationParameters.realm +
                    '&user=' + user + '&passwordadapter=' + passwordAdapter, {
                    method: 'POST',
                    headers: {
                        'apikey': sync.integrationParameters.apiKey
                    },
                    body: JSON.stringify(approveDenyRequest)
                })
                if (responseData.ok) {
                    console.log('Requisition approval/deny submitted to Ariba')
                }
                else {
                    throw new Error('Unable to pocess the requisition in Ariba: ' + responseData.statusText)
                }
            }
            else {
                throw new Error('Validation fail: Unable to process the requisition, the total cost did not match, please wait for data update')
            }
        }
    }
    finally {
        await storeRequisition(sync, [approvableId])
    }
}

function flatJsonObject(json, oName, prefix) {
    //currently we are able to store only flat json object, so all nested object must be flattened
    if (json[oName] != undefined) {
        Object.entries(json[oName]).forEach(
            ([key, value]) => json[prefix + key] = value)
        delete json[oName]
    }
    return json
}

function isObject(json) {
    return json != null && typeof json === 'object'
}

function notEmptyArray(json) {
    return Array.isArray(json) && json.length > 0 && json[0] !== undefined
}

integration.define({
    'synchronizations': [
        {
            'name': 'SyncChanges',
            'fullSyncFunction': fullSync,
            'incrementalSyncFunction': incrSync
        }
    ],
    'integrationParameters': [
        {
            name: 'apiKey',
            type: 'STRING',
            label: 'Ariba apiKey',
            description: 'Please see Ariba Api documentation',
            required: true,
            secret: true

        },
        {
            name: 'realm',
            type: 'STRING',
            label: 'Ariba realm',
            description: 'Please see Ariba Api documentation',
            required: true,
            secret: false

        },
        {
            name: 'lastChangeId',
            type: 'LONG',
            label: 'Ariba lastChangeId',
            description: 'Please see Ariba Api documentation',
            required: true,
            defaultValue: 1
        }
    ],
    actions: [
        {
            name: 'approveDenyRequisition',
            parameters: [
                {
                    name: 'approvableId',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'passwordAdapter',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'action',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'user',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'visibleToSupplier',
                    type: 'BOOLEAN',
                    required: true
                },
                {
                    name: 'totalCostAmount',
                    type: 'DOUBLE',
                    required: true
                },
                {
                    name: 'totalCostCurrency',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'comment',
                    type: 'STRING'

                }
            ],
            function: approveDenyRequisition,
        }
    ],

    'model': {
        'tables': [
            {
                'name': 'pendingApprovablesRequisitions',
                'columns': [
                    {
                        'name': 'approvalRequestId',
                        'type': 'STRING',
                        'length': 32,
                        'primaryKey': true
                    },
                    {
                        'name': 'requisitionId',
                        'type': 'STRING',
                        'length': 32,
                        'primaryKey': true
                    },
                    {
                        'name': 'approvalState',
                        'type': 'STRING',
                        'length': 32
                    },
                    {
                        'name': 'approvalRequired',
                        'type': 'BOOLEAN'
                    },
                    {
                        'name': 'state',
                        'type': 'INTEGER'
                    },
                    {
                        'name': 'reason',
                        'type': 'STRING',
                        'length': 2048
                    },
                    {
                        'name': 'uniqueName',
                        'type': 'STRING',
                        'length': 32,
                        'primaryKey': true
                    },
                    {
                        'name': 'realm',
                        'type': 'STRING',
                        'length': 64
                    },
                    {
                        'name': 'passwordAdapter',
                        'type': 'STRING',
                        'length': 64
                    },
                    {
                        'name': 'emailAddress',
                        'type': 'STRING',
                        'length': 64
                    },
                    {
                        'name': 'totalCostCurrency',
                        'type': 'STRING',
                        'length': 8
                    },
                    {
                        'name': 'totalCostAmount',
                        'type': 'DOUBLE'
                    }
                ]
            },
            {
                'name': 'changes',
                'columns': [
                    {
                        'name': 'changeSequenceId',
                        'type': 'STRING',
                        'length': 64,
                        'primaryKey': true
                    },
                    {
                        'name': 'approvableBaseID',
                        'type': 'STRING',
                        'length': 64
                    },
                    {
                        'name': 'changeType',
                        'type': 'STRING',
                        'length': 64
                    },
                    {
                        'name': 'restResourceName',
                        'type': 'STRING',
                        'length': 64
                    },
                    {
                        'name': 'approvableUniqueName',
                        'type': 'STRING',
                        'length': 64
                    }
                ]
            },
            {
                'name': 'requisition_details',
                'columns': [
                    {
                        'name': 'uniqueName',
                        'type': 'STRING',
                        'length': 32,
                        'primaryKey': true
                    },
                    {
                        'name': 'requesterName',
                        'type': 'STRING',
                        'length': 64
                    },
                    {
                        'name': 'statusString',
                        'type': 'STRING',
                        'length': 16
                    },
                    {
                        'name': 'submitDate',
                        'type': 'LONG'
                    },
                    {
                        'name': 'timeUpdated',
                        'type': 'LONG'
                    },
                    {
                        'name': 'lineItemCount',
                        'type': 'LONG'
                    },
                    {
                        'name': 'title',
                        'type': 'STRING',
                        'length': 512
                    },
                    {
                        'name': 'site',
                        'type': 'STRING',
                        'length': 512
                    },
                    {
                        'name': 'rq_emailAddress',
                        'type': 'STRING',
                        'length': 64
                    },
                    {
                        'name': 'rq_phone',
                        'type': 'STRING',
                        'length': 32
                    },
                    {
                        'name': 'isPinned',
                        'type': 'BOOLEAN'
                    },
                    {
                        'name': 'version',
                        'type': 'INTEGER'
                    },
                    {
                        'name': 'activeApproverCount',
                        'type': 'INTEGER'
                    },
                    {
                        'name': 'activeApprovalRequestIds',
                        'type': 'STRING',
                        'length': 32
                    },
                    {
                        'name': 'realm',
                        'type': 'STRING',
                        'length': 16
                    },
                    {
                        'name': 'rq_uniqueName',
                        'type': 'STRING',
                        'length': 32
                    },
                    {
                        'name': 'tc_amount',
                        'type': 'DOUBLE'
                    },
                    {
                        'name': 'tc_currency',
                        'type': 'STRING',
                        'length': 16
                    }
                ]
            },

            {
                'name': 'rq_comments',
                'columns': [
                    {
                        'name': 'id',
                        'type': 'STRING',
                        'length': 32,
                        'primaryKey': true
                    },
                    {
                        'name': 'requisitionId',
                        'type': 'STRING',
                        'length': 32
                    },
                    {
                        'name': 'user_name',
                        'type': 'STRING',
                        'length': 255
                    },
                    {
                        'name': 'user_emailAddress',
                        'type': 'STRING',
                        'length': 64
                    },
                    {
                        'name': 'user_passwordAdapter',
                        'type': 'STRING',
                        'length': 255
                    },
                    {
                        'name': 'text',
                        'type': 'STRING',
                        'length': 4096
                    },
                    {
                        'name': 'attachedToLine',
                        'type': 'LONG'
                    },
                    {
                        'name': 'date',
                        'type': 'LONG'
                    }
                ]
            },
            {
                'name': 'rq_lineitems',
                'columns': [
                    {
                        'name': 'requisitionId',
                        'type': 'STRING',
                        'length': 32,
                        'primaryKey': true
                    },
                    {
                        'name': 'numberInCollection',
                        'type': 'INTEGER',
                        'primaryKey': true
                    },
                    {
                        'name': 'commonCommodityCode',
                        'type': 'STRING',
                        'length': 255
                    },
                    {
                        'name': 'deliverTo',
                        'type': 'STRING',
                        'length': 255
                    },
                    {
                        'name': 'itemCategory',
                        'type': 'STRING',
                        'length': 255
                    },
                    {
                        'name': 'desc_shortName',
                        'type': 'STRING',
                        'length': 512
                    },
                    {
                        'name': 'desc_description',
                        'type': 'STRING',
                        'length': 4096
                    },
                    {
                        'name': 'desc_unitOfMeasure',
                        'type': 'STRING',
                        'length': 32
                    },
                    {
                        'name': 'quantity',
                        'type': 'DOUBLE'
                    },
                    {
                        'name': 'desc_pr_amount',
                        'type': 'DOUBLE'
                    },
                    {
                        'name': 'desc_pr_currency',
                        'type': 'STRING',
                        'length': 16
                    },
                    {
                        'name': 'acc_cat_description',
                        'type': 'STRING',
                        'length': 64
                    },
                    {
                        'name': 'acc_cat_uniqueName',
                        'type': 'STRING',
                        'length': 32
                    },
                    {
                        'name': 'needBy',
                        'type': 'DOUBLE'
                    },
                    {
                        'name': 'splitAccountingType',
                        'type': 'STRING',
                        'length': 32
                    },
                    {
                        'name': 'supp_name',
                        'type': 'STRING',
                        'length': 64
                    }
                ]
            },
            {
                'name': 'rq_li_accountings',
                'columns': [
                    {
                        'name': 'requisitionId',
                        'type': 'STRING',
                        'length': 32,
                        'primaryKey': true
                    },
                    {
                        'name': 'lineItem',
                        'type': 'INTEGER',
                        'primaryKey': true
                    },
                    {
                        'name': 'numberInCollection',
                        'type': 'INTEGER',
                        'primaryKey': true
                    },
                    {
                        'name': 'gl_generalLedgerDescription',
                        'type': 'STRING',
                        'length': 255
                    },
                    {
                        'name': 'gl_uniqueName',
                        'type': 'STRING',
                        'length': 255
                    },
                    {
                        'name': 'cc_uniqueName',
                        'type': 'STRING',
                        'length': 255
                    },
                    {
                        'name': 'cc_costCenterDescription',
                        'type': 'STRING',
                        'length': 4096
                    },
                    {
                        'name': 'am_amount',
                        'type': 'DOUBLE'
                    },
                    {
                        'name': 'am_currency',
                        'type': 'STRING',
                        'length': 16
                    },
                    {
                        'name': 'percentage',
                        'type': 'DOUBLE'
                    },
                    {
                        'name': 'quantity',
                        'type': 'DOUBLE'
                    }
                ]
            }

        ],
        "relationships": [
            {
                "name": "requisition_lineitems",
                "primaryTable": "requisition_details",
                "foreignTable": "rq_lineitems",
                "columnPairs": [
                    {
                        "primaryKey": "uniqueName",
                        "foreignKey": "requisitionId"
                    }
                ]
            },
            {
                "name": "requisition_comments",
                "primaryTable": "requisition_details",
                "foreignTable": "rq_comments",
                "columnPairs": [
                    {
                        "primaryKey": "uniqueName",
                        "foreignKey": "requisitionId"
                    }
                ]
            },
            {
                "name": "pending_rq_details",
                "primaryTable": "requisition_details",
                "foreignTable": "pendingApprovablesRequisitions",
                "columnPairs": [
                    {
                        "primaryKey": "uniqueName",
                        "foreignKey": "requisitionId"
                    }
                ]
            },
            {
                "name": "pending_rq_lineitems",
                "primaryTable": "pendingApprovablesRequisitions",
                "foreignTable": "rq_lineitems",
                "columnPairs": [
                    {
                        "primaryKey": "requisitionId",
                        "foreignKey": "requisitionId"
                    }
                ]
            },
            {
                "name": "pending_rq_comments",
                "primaryTable": "pendingApprovablesRequisitions",
                "foreignTable": "rq_comments",
                "columnPairs": [
                    {
                        "primaryKey": "requisitionId",
                        "foreignKey": "requisitionId"
                    }
                ]
            },
            {
                "name": "rq_li_accountings",
                "primaryTable": "rq_lineitems",
                "foreignTable": "rq_li_accountings",
                "columnPairs": [
                    {
                        "primaryKey": "requisitionId",
                        "foreignKey": "requisitionId"
                    },
                    {
                        "primaryKey": "numberInCollection",
                        "foreignKey": "lineItem"
                    }
                ]
            }

        ]
    }
})