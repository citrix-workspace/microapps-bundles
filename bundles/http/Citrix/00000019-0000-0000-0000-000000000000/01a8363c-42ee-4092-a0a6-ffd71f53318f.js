var apiKey = 'MUoj9GyLeQYmImDtli805eZOK7a8wk8W' // please see ariba documentation
var realm = 'citrix-T' // please see ariba documentation
var limit = 100 // limit number of records per page for pagination
var lastChangeId = 19000 // Ariba internal change id, usually 1, please see ariba documentation
var maxNoOfPages = 10000 //  limit number of pages for pagination
var groupMembers = [] // list of users group membership
var groupList = [] //list of all groups

function flatJsonObject(json, oName, prefix) {  //currently we are able to store only flat json object, so all nested object must be flattened
    if (json[oName] != undefined) {
            Object.entries(json[oName]).forEach(
		        ([key, value]) => json[prefix + key] = value)
            delete json[oName]
        }
    return json
}

function resolveApprovalRequests(client, json) {  //this function is resolving approvers for requisitions and copy necessary informations to create notifications
    let approvesList = []
    
    json.forEach(function (appReqsr) {
        appReqsr.approvers.forEach(function (approvers) {
            if (approvers.type != undefined) { 
                approvers.approvalRequired = appReqsr.approvalRequired
                approvers.approvalState = appReqsr.approvalState
                approvers.reason = appReqsr.reason
                approvers.state = appReqsr.state

                if (approvers.type == 'user') { 
                    approvers = flatJsonObject(approvers, 'user', '')  
                    approvesList.push(approvers)
                }
                if (approvers.type == 'group') {
                    approvesList = approvesList.concat(resolveGroupApproval(client, approvers))
                }
            }
        })
    })
    return approvesList
}

function resolveGroupApproval(client ,json) {  //currently we are able to store only flat json object, so all nested object must be flattened
    let groupFound = false
    let userList =[]
    let groupId = json.id
    
    for (let group of groupList) {  //checking if we already resolve the group
        if (groupId == group) {
            groupFound = true
            break
        }
    } 
            
    if (groupFound) { //creating member list
       userList = groupMembers.filter(function(group){return group.group == groupId})
    }
   
    else { //adding new group and member to groupmembers
        responseData = client.fetchSync('groups/'+ groupId +'/members?realm='+ realm, {headers: {'apikey':apiKey}})
        groupList.push(groupId)
        userList = responseData.jsonSync()
        
        for (let user of userList) {
            user.group = groupId 
        }
        groupMembers =  groupMembers.concat(userList)
    }

    for (let user of userList) { //creating list of approvers
        user.approvalRequestId = json.approvalRequestId
        user.approvalRequired = json.approvalRequired
        user.approvalState = json.approvalState
        user.requisitionId = json.requisitionId
        user.reason = json.reason
        user.state = json.state
     }
        
    return userList
}
function storeRequisition(dataStore, client, requisitionList) {
	// getting requisition details and additional data
	for (let requisition of requisitionList) {
		responseData = client.fetchSync('requisitions/' + requisition + '?realm=' + realm, {headers: {'apikey':apiKey}})
        json = responseData.jsonSync()
		
        if (responseData.status == 200 ) {
            //parsing requisition comments, comments are stored in arrary     
            if (json.comments != undefined) {
                for (let j = 0; j < json.comments.length; j++) {
				    json.comments[j] = flatJsonObject(json.comments[j], 'user', 'user_') //this will move key/value pairs from json.comments[j].user object to the json.comments[j] and add user_ prefix
			
                }
            
                dataStore.save('rq_comments', json.comments) //saving comments 
			    delete json.comments //deleting comments from json to gain better performance
            }
            
            if (json.approvalRequests != undefined) {
                let testtest= resolveApprovalRequests(client, json.approvalRequests)
                dataStore.save('pendingApprovablesRequisitions', testtest)
                delete json.approvalRequests //deleting approvalRequests from json to gain better performance
            }

            //parsing requisition line items and line items accounting, li and li accounting are stored in arrary      
            if (json.lineItems != undefined) {
                for (let j = 0; j < json.lineItems.length; j++) {
                    for (let k=0; k < json.lineItems[j].accountings.length; k++ ) {
                        json.lineItems[j].accountings[k] = flatJsonObject(json.lineItems[j].accountings[k], 'generalLedger', 'gl_') 
                        json.lineItems[j].accountings[k] = flatJsonObject(json.lineItems[j].accountings[k], 'costCenter', 'cc_')
                        json.lineItems[j].accountings[k] = flatJsonObject(json.lineItems[j].accountings[k], 'amount', 'am_')
                    }
                    dataStore.save('rq_li_accountings', json.lineItems[j].accountings) //saving li accounting
                    delete json.lineItems[j].accountings //deleting accountings from json to gain better performance
					
                    json.lineItems[j] = flatJsonObject(json.lineItems[j], 'supplier', 'supp_')
                    json.lineItems[j] = flatJsonObject(json.lineItems[j], 'accountCategory', 'acc_cat_')
                    json.lineItems[j] = flatJsonObject(json.lineItems[j], 'description', 'desc_')
					json.lineItems[j] = flatJsonObject(json.lineItems[j], 'desc_price', 'desc_pr_')
                }

			    dataStore.save('rq_lineitems', json.lineItems) //saving line items
			    delete json.lineItems //deleting line items from json to gain better performance
            }

            json = flatJsonObject(json, 'totalCost', 'tc_')
			json = flatJsonObject(json, 'requester', 'rq_')
			dataStore.save('requisition_details', json)
		}
	}
}

function Sync(dataStore, client, context, incrementalSync) 
{
	console.log('Ariba sync started')
		
	let requi = [] //list of requisition
	let invoice = [] //list of invoices
    let noOfPages = 1

    // quering pendingApprovables endpoint to get all requisition and invoices uniq names 
    for (i = 0; i < noOfPages; i++) {  
	    responseData = client.fetchSync('/pendingApprovables?realm='+ realm +'&limit=' + limit + '&offset=' + limit*i, {headers: {'apikey':apiKey}})
        json = responseData.jsonSync()

        if (responseData.status = 200 && json.length > 0 ) {
			//calculating number of pages for pagination
            if (i == 0) {
				noOfPages = (+responseData.headers.get('X-Total-Count')) / limit
                if (noOfPages > maxNoOfPages) {
                    console.log('Number of pages for pagination exceed set value ' + maxNoOfPages + '. Total number of pages needed: ' + noOfPages)
                    noOfPages = maxNoOfPages
                } 
			}
            //creating list on requisition and invoices
			for (let j = 0; j < json.length; j++) {
				if (incrementalSync === false) {
                    if (json[j].documentType == 'ariba.purchasing.core.Requisition') {
					    requi.push(json[j].uniqueName)
				    }
				    if (json[j].documentType == 'ariba.invoicing.core.Invoice') {
					    invoice.push(json[j].UniqueName)
				    }                            
                }                     
            }
		}
	}
    
    // quering channg endpoint to get all requisition and invoices uniq names 
  
    if (incrementalSync && context.lastChangeSequenceId > 0) {     // reading stored lastChangeSequenceId for incremental sync
        lastChangeId = context.lastChangeSequenceId
    }

    let newChangeId = 1
    noOfPages = 1

    for (i = 0; i < noOfPages; i++) {  
		
        responseData = client.fetchSync('/changes?needTotal=true&realm='+ realm +'&limit=' + limit + '&offset=' + limit*i + '&lastChangeId=' + lastChangeId, {headers: {'apikey':apiKey}})
        json = responseData.jsonSync()

        if (responseData.status = 200 && json.length > 0 ) {
			//calculating number of pages for pagination
            if (i == 0) {
				noOfPages = (+responseData.headers.get('X-Total-Count')) / limit
                if (noOfPages > maxNoOfPages) {
                    console.log('Number of pages for pagination exceed set value ' + maxNoOfPages + '. Total number of pages needed: ' + noOfPages)
                    noOfPages = maxNoOfPages
                } 
			}
            //getting the  lastChangeSequenceId for incremental sync from page
			if (newChangeId < +json[json.length - 1].changeSequenceId) { 
				newChangeId = +json[json.length - 1].changeSequenceId
            }
            //creating list on requisition and invoices
			for (let j = 0; j < json.length; j++) {
				if (json[j].restResourceName == 'requisitions') {
					requi.push(json[j].approvableUniqueName)
				}
				if (json[j].restResourceName == 'invoices') {
					invoice.push(json[j].approvableUniqueName)
				}
			}
			dataStore.save('changes', json)
		}
	}

    if (newChangeId > lastChangeId ) { 
        context.lastChangeSequenceId = newChangeId
    }

    requi = [...new Set(requi)] //creating uniq list
    storeRequisition(dataStore, client, requi)

    invoice = [...new Set(invoice)] //creating uniq list
  
    //saving  lastChangeSequenceId for incremental sync into context
    if (newChangeId > lastChangeId ) {
        context.lastChangeSequenceId = newChangeId
    }
    
    console.log('Max Change ID ' + context.lastChangeSequenceId)
	console.log('Total number of requisitions ' + requi.length)
	//console.log('Total number of invoices ' + invoice.length)
    console.log('Sync finished')
}

function fullSync ({dataStore, client, context}) {
    Sync(dataStore, client, context, false)
}

function incrSync ({dataStore, client, context}) {
    Sync(dataStore, client, context, true)
}

integration.define({
    'synchronizations': [
        {
            'name': 'SyncChanges', 
            'fullSyncFunction': fullSync,
            'incrementalSyncFunction': incrSync
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
                        'length': 32
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
                        'type': 'LONG',
                        'primaryKey': true
                    },
                    {
                        'name': 'reason',
                        'type': 'STRING',
                        'length': 4096
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
                    }
                ]
            },
            {
                'name': 'changes',
                'columns': [
                    {
                        'name': 'changeSequenceId',
                        'type': 'STRING',
                        'length': 16,
                        'primaryKey': true
                    },
                    {
                        'name': 'approvableUniqueName',
                        'type': 'STRING',
                        'length': 32
                    },
                    {
                        'name': 'restResourceName',
                        'type': 'STRING',
                        'length': 16
                    },
                    {
                        'name': 'changeType',
                        'type': 'STRING',
                        'length': 32
                    },
                    {
                        'name': 'approvableBaseID',
                        'type': 'STRING',
                        'length': 32
                    },
                    {
                        'name': 'changeParameters',
                        'type': 'STRING',
                        'length': 512
                    },
                    {
                        'name': 'realm',
                        'type': 'STRING',
                        'length': 32
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