var apiKey = 'MUoj9GyLeQYmImDtli805eZOK7a8wk8W' // please see ariba documentation
var realm = 'citrix-T' // please see ariba documentation
var limit = 10 // limit number of records per page for pagination
var lastChangeId = 18800  // Ariba internal change id, usually 1, please see ariba documentation
var maxNoOfPages = 1 //  limit number of pages for pagination
var lastApprovalDateValue = 1


function flatJsonObject(json, oName, prefix) {  //currently we are able to store only flat json object, so all nested object must be flattened
    if (json[oName] != undefined) {
            Object.entries(json[oName]).forEach(
		        ([key, value]) => json[prefix + key] = value)
            delete json[oName]
        }
    return json
}

function storeRequisition(dataStore, client, requisition) {
	// getting requisition details and additional data
	for (let i = 0; i < requisition.length; i++) {
		responseData = client.fetchSync('requisitions/' + requisition[i] + '?realm=' + realm, {headers: {'apikey':apiKey}})
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
            
            //parsing requisition line items and line items accounting, li and li accounting are stored in arrary      
            if (json.lineItems != undefined) {
                for (let j = 0; j < json.lineItems.length; j++) {
                    for (let k=0; k < json.lineItems[j].accountings.length; k++ ) {
                        json.lineItems[j].accountings[k] = flatJsonObject(json.lineItems[j].accountings[k], 'generalLedger', 'gl_') 
                        json.lineItems[j].accountings[k] = flatJsonObject(json.lineItems[j].accountings[k], 'costCenter', 'cc_')
                        json.lineItems[j].accountings[k] = flatJsonObject(json.lineItems[j].accountings[k], 'amount', 'am_')
                
                    }
                    dataStore.save('rq_li_accountings', json.lineItems[j].accountings)
                    delete json.lineItems[j].accountings //saving li accounting
					
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
			dataStore.save('scr_requisition_details', json)
		}
	}
}

function storeInvoice(dataStore, client, invoice) {
 	// getting invoice details
    for (let j = 0; j < invoice.length; j++) {
        responseData = client.fetchSync('invoices/' + invoice[j] + '?realm='+ realm, { headers: {'apikey':apiKey}})
        if (responseData.status == 200) {
            json = responseData.jsonSync()[invoice[j]] //remove root path object
			
			if (json.LineItems != undefined) {
                for (let i = 0; i < json.LineItems.length; i++) {
                    /**for (let k=0; k < json.LineItems[j].SplitAccountings.length; k++ ) {
                        json.lineItems[j].accountings[k] = flatJsonObject(json.LineItems[j].SplitAccountings[k], 'GeneralLedger', 'gl_') 
                        json.lineItems[j].accountings[k] = flatJsonObject(json.lineItems[j].accountings[k], 'costCenter', 'cc_')
                        json.lineItems[j].accountings[k] = flatJsonObject(json.lineItems[j].accountings[k], 'amount', 'am_')
                
                    }
                    dataStore.save('rq_li_accountings', json.lineItems[j].accountings)
                    delete json.lineItems[j].accountings //saving li accounting  **/
			
			json.LineItems[i].Amount = flatJsonObject(json.LineItems[i].Amount, 'Currency', 'cur_')
                    json.LineItems[i] = flatJsonObject(json.LineItems[i], 'Amount', 'am_')
                   // json.LineItems[j] = flatJsonObject(json.lineItems[j], 'description', 'desc_')
					//json.LineItems[j] = flatJsonObject(json.lineItems[j], 'desc_price', 'desc_pr_')
					
					
                }
				dataStore.save('inv_lineitems', json.LineItems)
				delete json.LineItems
			}
			
            json = flatJsonObject(json, 'TotalInvoiced','ti_')
            json = flatJsonObject(json, 'ti_Currency','ti_cr_')
            dataStore.save('scr_invoice_details', json)
        }
	}
}



function Sync(dataStore, client, context, incrementalSync) 
{
	console.log('Ariba sync started')
		
	let requi = [] //list of requisition
	let invoice = [] //list of invoices
    let noOfPages = 1
    let newApprovalDateValue = 1

    // reading stored lastChangeSequenceId for incremental sync

    if (incrementalSync && context.lastApprovalDateValue > 0) {
        lastApprovalDateValue = context.lastApprovalDateValue
    }
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
				if (json[j].documentType == 'ariba.purchasing.core.Requisition') {
					requi.push(json[j].uniqueName)
				}
				if (json[j].documentType == 'ariba.invoicing.core.Invoice') {
					invoice.push(json[j].UniqueName)
				}                            
                json[j].assignedDateValue = +json[j].assignedDate.replace(/-/g,'') // converting api dates strings to value (2021-01-10 to 20210110)
                if (newApprovalDateValue < json[j].assignedDateValue) {                  //getting max value of the newApprovalDateValue for incremental sync from page
                    newApprovalDateValue = json[j].assignedDateValue
                }
			}
			dataStore.save('pendingApprovablesRequisitions', json.filter (json => json.documentType === 'ariba.purchasing.core.Requisition'))
            dataStore.save('pendingApprovablesInvoices', json.filter (json => json.documentType === 'ariba.invoicing.core.Invoice'))
		}
	}
    
    if (newApprovalDateValue > lastApprovalDateValue ) {   
        context.lastApprovalDateValue = newApprovalDateValue  //saveing max value of the newApprovalDateValue for incremental sync from page
    }
    
   	console.log('Total number of pendingApprovables endpont pages ' + noOfPages)
   
    let newChangeId = 1
    noOfPages = 1

    if (incrementalSync && context.lastChangeSequenceId > 0) {     // reading stored lastChangeSequenceId for incremental sync
        lastChangeId = context.lastChangeSequenceId
    }
    // quering channg endpoint to get all requisition and invoices uniq names 
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
			dataStore.save('scr_changes', json)
		}
	}
   if (newChangeId > lastChangeId ) { 
        context.lastChangeSequenceId = newChangeId
    }
    requi = [...new Set(requi)] //creating uniq list
    storeRequisition(dataStore, client, requi)

	invoice = [...new Set(invoice)] //creating uniq list
    storeInvoice(dataStore, client, invoice)
    
    //saving  lastChangeSequenceId for incremental sync into context
    if (newChangeId > lastChangeId ) {
        context.lastChangeSequenceId = newChangeId
    }
    
    console.log('Max Change ID ' + context.lastChangeSequenceId)
	console.log('Total number of change endpont pages ' + noOfPages)
	console.log('Total number of requisitions ' + requi.length)
	console.log('Total number of invoices ' + invoice.length)
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
                        'name': 'uniqueName',
                        'type': 'STRING',
                        'length': 32,
                        'primaryKey': true
                    },
                    {
                        'name': 'documentType',
                        'type': 'STRING',
                        'length': 64
                    },
                    {
                        'name': 'description',
                        'type': 'STRING',
                        'length': 4096
                    },
                    {
                        'name': 'assignedDate',
                        'type': 'STRING',
                        'length': 32
                    },
                    {
                        'name': 'approver',
                        'type': 'STRING',
                        'length': 32,
                        'primaryKey': true
                    },
                    {
                        'name': 'fullURL',
                        'type': 'STRING',
                        'length': 2048
                    },
                    {
                        'name': 'email',
                        'type': 'STRING',
                        'length': 64
                    }
                ]
            },
            {
                'name': 'pendingApprovablesInvoices',
                'columns': [
                    {
                        'name': 'uniqueName',
                        'type': 'STRING',
                        'length': 32,
                        'primaryKey': true
                    },
                    {
                        'name': 'documentType',
                        'type': 'STRING',
                        'length': 64
                    },
                    {
                        'name': 'description',
                        'type': 'STRING',
                        'length': 4096
                    },
                    {
                        'name': 'assignedDate',
                        'type': 'STRING',
                        'length': 32
                    },
                    {
                        'name': 'approver',
                        'type': 'STRING',
                        'length': 32,
                        'primaryKey': true
                    },
                    {
                        'name': 'fullURL',
                        'type': 'STRING',
                        'length': 2048
                    },
                    {
                        'name': 'email',
                        'type': 'STRING',
                        'length': 64
                    }
                ]
            },
            {
                'name': 'scr_changes',
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
                'name': 'scr_requisition_details',
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
                        'name': 'lastModified',
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
                'name': 'scr_invoice_details',
                'columns': [
                    {
                        'name': 'UniqueName',
                        'type': 'STRING',
                        'length': 32,
                        'primaryKey': true
                    },
                    {
                        'name': 'Name',
                        'type': 'STRING',
                        'length': 512
                    },
                    {
                        'name': 'StatusString',
                        'type': 'STRING',
                        'length': 16
                    },
                    {
                        'name': 'SubmitDate',
                        'type': 'STRING',
                        'length': 32
                    },   
                    {
                        'name': 'LastModified',
                        'type': 'STRING',
                        'length': 32
                    },
                    {
                        'name': 'InvoiceDate',
                        'type': 'STRING',
                        'length': 32
                    },
                    {
                        'name': 'ApprovedState',
                        'type': 'STRING',
                        'length': 16
                    },
					{
                        'name': 'ti_Amount',
                        'type': 'DOUBLE'
                    },
					{
                        'name': 'ti_cr_UniqueName',
                        'type': 'STRING',
						'length': 16
                    },
					{
                        'name': 'Category',
                        'type': 'INTEGER'
                    },
					{
                        'name': 'InvoiceState',
                        'type': 'STRING',
						'length': 16
                    },
					{
                        'name': 'InvoicePurpose',
                        'type': 'STRING',
						'length': 16
                    },
					{
                        'name': 'InvoiceSubmissionMethod',
                        'type': 'STRING',
						'length': 16
                    },
					{
                        'name': 'InvoiceNumber',
                        'type': 'STRING',
						'length': 16
					}
                ]
            },
			{
                'name': 'inv_lineitems',
                'columns': [
                    {
                        'name': 'Category',
                        'type': 'INTEGER',
                        'primaryKey': true
                    },
					{
                        'name': 'am_Amount',
                        'type': 'DOUBLE'
                    },
                    {
                        'name': 'am_cur_UniqueName',
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
                "primaryTable": "scr_requisition_details",
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
                "primaryTable": "scr_requisition_details",
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
                "primaryTable": "scr_requisition_details",
                "foreignTable": "pendingApprovablesRequisitions",
                "columnPairs": [
                    {
                        "primaryKey": "uniqueName",
                        "foreignKey": "uniqueName"
                    }
                ] 
            },
            {
                "name": "pending_rq_lineitems",
                "primaryTable": "pendingApprovablesRequisitions",
                "foreignTable": "rq_lineitems",
                "columnPairs": [
                    {
                        "primaryKey": "uniqueName",
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
                        "primaryKey": "uniqueName",
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