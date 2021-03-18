const apiKey = 'MUoj9GyLeQYmImDtli805eZOK7a8wk8W' // please see ariba documentation
const realm = 'citrix-T' // please see ariba documentation
const limit = 100 // limit number of records per page for pagination
const maxNoOfPages = 10000  //  limit number of pages for pagination
var lastChangeId = 19300 // Ariba internal change id, usually 1, please see ariba documentation
var groupMembers = [] // list of users group membership, this data is not stored
var groupList = [] //list of all groups, this data is not stored

function flatJsonObject(json, oName, prefix) {  //currently we are able to store only flat json object, so all nested object must be flattened
    if (json[oName] != undefined) {
            Object.entries(json[oName]).forEach(
		        ([key, value]) => json[prefix + key] = value)
            delete json[oName]
        }
    return json
}

function isArray(json){
    if (json != undefined && json.length > 0) {
        return true
    }
    else {
        return false
    }
}

function calculateNumberOfPages(totalrecords){
    totalrecords = totalrecords/limit
    if (totalrecords > maxNoOfPages) {
        console.log('Number of pages for pagination exceed set value ' + maxNoOfPages + '. Total number of pages needed: ' + totalrecords)
        totalrecords = maxNoOfPages
    }
    return totalrecords
}

function parseComments(json) {
    for (let i = 0; i < json.length; i++) {
        json[i] = flatJsonObject(json[i], 'user', 'user_') //this will move key/value pairs from json.comments[j].user object to the json.comments[j] and add user_ prefix
    }
    return json
}

function parseLineItems(json) {
    for (let i=0; i < json.length; i++ ) {
        json[i] = flatJsonObject(json[i], 'supplier', 'supp_')
        json[i] = flatJsonObject(json[i], 'accountCategory', 'acc_cat_')
        json[i] = flatJsonObject(json[i], 'description', 'desc_')
        json[i] = flatJsonObject(json[i], 'desc_price', 'desc_pr_')
    }
        return json
}

function parseLineItemsAccountings(json) {
    for (let i=0; i < json.length; i++ ) {
        json[i] = flatJsonObject(json[i], 'generalLedger', 'gl_') 
        json[i] = flatJsonObject(json[i], 'costCenter', 'cc_')
        json[i] = flatJsonObject(json[i], 'amount', 'am_')
    }
    return json
}

function parseRequisition(json) {
    json = flatJsonObject(json, 'totalCost', 'tc_')
    json = flatJsonObject(json, 'requester', 'rq_')
    return json
}

function parseApprovalRequests(client, json, totalCost) {  //this function is resolving approvers for requisitions and copy necessary informations to create notifications
    let approvesList = []
    
    json.forEach(function (appReqsr) {
        appReqsr.approvers.forEach(function (approvers) {
            if (approvers.type != undefined) { 
                approvers.approvalRequired = appReqsr.approvalRequired
                approvers.approvalState = appReqsr.approvalState
                approvers.reason = appReqsr.reason
                approvers.state = appReqsr.state
                approvers.totalCostAmount = totalCost.amount
                approvers.totalCostCurrency = totalCost.currency

                if (approvers.type == 'user') {  //if approver is a user
                    approvers = flatJsonObject(approvers, 'user', '')  
                    approvesList.push(approvers)
                }
                if (approvers.type == 'group') { //if approver is a group
                    approvesList = approvesList.concat(resolveGroupApproval(client, approvers))
                }
            }
        })
    })
    return approvesList
}

function resolveGroupApproval(client ,json) {  //currently we are able to store only flat json object, so all nested object must be flattened
    let userList =[]
    const groupId = json.id
                 
    if (groupList.includes(groupId)) { //creating member list
       userList = groupMembers.filter(function(group){return group.group == groupId})
    }
   
    else {
        groupList.push(groupId) //if group not found then we try to ask ariba
        let responseData = client.fetchSync('groups/'+ groupId +'/members?realm='+ realm, {headers: {'apikey':apiKey}})
        
        if (responseData.ok) {
            userList = responseData.jsonSync()
            for (let user of userList) {
                user.group = groupId 
            }
            groupMembers =  groupMembers.concat(userList) //adding new group data 
        }
    }

    for (let user of userList) { //creating list of approvers with additionl data from requisition
        user.approvalRequestId = json.approvalRequestId
        user.approvalRequired = json.approvalRequired
        user.approvalState = json.approvalState
        user.requisitionId = json.requisitionId
        user.reason = json.reason
        user.state = json.state
        user.totalCostAmount = json.totalCostAmount
        user.totalCostCurrency = json.totalCostCurrency
    }
    return userList 
}

function storeRequisition(dataStore, client, requisitions) {
    requisitions = [...new Set(requisitions)] //creating uniq list

    for (let requisition of requisitions) { 	// getting requisition details and additional data
		let responseData = client.fetchSync('requisitions/' + requisition + '?realm=' + realm, {headers: {'apikey':apiKey}})
        let json = responseData.jsonSync()
		
        if (responseData.ok && json) {

            if (isArray(json.comments)) {
                dataStore.save('rq_comments', parseComments(json.comments)) //saving comments 
                delete json.comments //deleting comments from json to gain better performance
            }
            
            if (isArray(json.approvalRequests)) {
                dataStore.save('pendingApprovablesRequisitions', parseApprovalRequests(client, json.approvalRequests, json.totalCost)) //saving approvers
                delete json.approvalRequests 
            }

            if (isArray(json.lineItems)) { //saving line items
                for (let j = 0; j < json.lineItems.length; j++) {
                    if (isArray(json.lineItems[j].accountings)) {
                        dataStore.save('rq_li_accountings', parseLineItemsAccountings(json.lineItems[j].accountings)) //saving li accounting
                        delete json.lineItems[j].accountings 
                    }
                }
			    dataStore.save('rq_lineitems', parseLineItems(json.lineItems)) //saving line items
			    delete json.lineItems 
            }

           	dataStore.save('requisition_details', parseRequisition(json))
		}
	}
    return
}

function parseApprovablesGetDocIds(json, documentsLists) {
    for (let i= 0; i < json.length; i++) {
        if (json[i].documentType == 'ariba.purchasing.core.Requisition') {
            documentsLists.requisitions.push(json[i].uniqueName)
        }
        if (json[i].documentType == 'ariba.invoicing.core.Invoice') {
            documentsLists.invoices.push(json[i].uniqueName)
        }
    }                
    return documentsLists
}

function fetchApprovablesAndGetDocuments(client, documentsLists) {
    let noOfPages = 1
    for (let i = 0; i < noOfPages; i++) {  
	    let responseData = client.fetchSync('/pendingApprovables?realm='+ realm +'&limit=' + limit + '&offset=' + limit*i, {headers: {'apikey':apiKey}})
        let json = responseData.jsonSync()
            
        if (responseData.ok && isArray(json)) {
            if (i == 0) {
                noOfPages = calculateNumberOfPages(+responseData.headers.get('X-Total-Count')) //calculating number of pages for pagination
            } 
           documentsLists = parseApprovablesGetDocIds(json, documentsLists) //creating list on requisition and invoices                                          
        }
	}
    return documentsLists 
}

function parseChangesGetDocIds(json, documentsLists) {
    for (let j = 0; j < json.length; j++) {
        if (json[j].restResourceName == 'requisitions') {
            documentsLists.requisitions.push(json[j].approvableUniqueName)
        }
        if (json[j].restResourceName == 'invoices') {
            documentsLists.invoices.push(json[j].approvableUniqueName)
        }
    }
    return documentsLists
}   

function fetchChangesGetDocumentsAndGetLastId(client, documentsLists) {
    let noOfPages = 1
   
    for (let i = 0; i < noOfPages; i++) {  
        let responseData = client.fetchSync('/changes?needTotal=true&realm='+ realm +'&limit=' + limit + '&offset=' + limit*i + '&lastChangeId=' + lastChangeId, {headers: {'apikey':apiKey}})
        let json = responseData.jsonSync()

        if (responseData.ok && isArray(json)) {
            
            if (i == 0) { //calculating number of pages for pagination
				noOfPages = calculateNumberOfPages(+responseData.headers.get('X-Total-Count'))
			}

            if (documentsLists.newChangeId < +json[json.length - 1].changeSequenceId) { //getting the  lastChangeSequenceId for incremental sync from page
				documentsLists.newChangeId = +json[json.length - 1].changeSequenceId
            }

            documentsLists = parseChangesGetDocIds(json, documentsLists) //creating list on requisition and invoices
		}
	}
    return documentsLists
}   

function syncAriba(dataStore, client, context, incrementalSync) 
{
	console.log('Ariba sync started')
    
    let documentsLists  = { //creating lists od rq and invc ids
        requisitions: [],
        invoices: [],
        newChangeId: lastChangeId
       }
    
    if (incrementalSync) {     
        if (context.lastChangeSequenceId > lastChangeId) {     // reading stored lastChangeSequenceId for incremental sync
            lastChangeId = context.lastChangeSequenceId
        }
    }
    else {
        documentsLists = fetchApprovablesAndGetDocuments(client, documentsLists) //geting documents id, this endpoint is used only in full sync hold documents for open approvals infinitely
    }
            
    documentsLists = fetchChangesGetDocumentsAndGetLastId(client, documentsLists) //geting documents id, this endpoint is used for full and incr, hold all data only for last 90 days 

    storeRequisition(dataStore, client, documentsLists.requisitions) //storing requisitions and resolve group approvables
          
    if (documentsLists.newChangeId > lastChangeId ) {context.lastChangeSequenceId = documentsLists.newChangeId}     //saving  lastChangeSequenceId for incremental sync into context
    
    console.log('Max Change ID ' + context.lastChangeSequenceId)
	console.log('Total number of requisitions ' + documentsLists.requisitions.length)
	console.log('Total number of invoices ' + documentsLists.invoices.length)
    console.log('Sync finished')
    return
}

function fullSync ({dataStore, client, context}) {
    return syncAriba(dataStore, client, context, false)
}

function incrSync ({dataStore, client, context}) {
    return syncAriba(dataStore, client, context, true)
}

function approveDenyRequisition ({dataStore, serviceClient, actionParameters}) {
      
    const {approvableId, passwordAdapter, action, user, visibleToSupplier, comment, totalCostAmount, totalCostCurrency} = actionParameters
    const approveDenyRequest = {
        'approvableId': approvableId,
        'comment': comment,
        'visibleToSupplier': visibleToSupplier
    }
    
    let responseData = serviceClient.fetchSync('requisitions/' + approvableId + '?realm=' + realm, {headers: {'apikey':apiKey}})
    let json = responseData.jsonSync()
	if (responseData.ok && json) {
        if (Math.round(json.totalCost.amount) == Math.round(totalCostAmount) && json.totalCost.currency == totalCostCurrency) {
                console.log('Validation ok, total cost and currency match')
                responseData = serviceClient.fetchSync('/operations/rest/requisitions/'+ action +'?realm=' + realm + '&user='+ user +'&passwordadapter=' + passwordAdapter,{
                    method: 'POST', 
                    headers: {'apikey':apiKey}, 
                    body: JSON.stringify(approveDenyRequest)
                }
            )
        }
        else
        {
            console.log('Validation fail, total cost or currency has been changed')
        }
    }
    
    storeRequisition(dataStore, serviceClient, [approvableId]) 

    if (responseData.ok) {
       
    }
    else {
        throw new Error('Unable to pocess the requisition: ' + approveDenyResponse.statusText)
    }   
            
    return
}

integration.define({
    'synchronizations': [
        {
            'name': 'SyncChanges', 
            'fullSyncFunction': fullSync,
            'incrementalSyncFunction': incrSync
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
                        'length': 32
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