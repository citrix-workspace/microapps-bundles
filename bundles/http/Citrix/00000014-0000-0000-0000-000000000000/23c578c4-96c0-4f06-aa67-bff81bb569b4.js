function onlyUnique(value, index, self) {
    return self.indexOf(value) === index
}

function getChanges(client, limit, offset, lastChangeId) {
    Headers = library.load("fetch-api").Headers
    let myHeaders = new Headers()
    myHeaders.append('apikey', 'MUoj9GyLeQYmImDtli805eZOK7a8wk8W')
    return client.fetchSync("/changes?realm=citrix-T&needTotal=true&limit=" + limit + "&offset=" + offset + "&lastChangeId=" + lastChangeId , { headers: myHeaders })
}

function storeRequisition(dataStore,client, requisition) {
    Headers = library.load("fetch-api").Headers
    let myHeaders = new Headers()
    myHeaders.append('apikey', 'MUoj9GyLeQYmImDtli805eZOK7a8wk8W')
    
    for (let j=0; j<requisition.length; j++) {
        responseData = client.fetchSync("requisitions/"+ requisition[j] +"?realm=citrix-T" , { headers: myHeaders })
        dataStore.save("scr_requisition_details",responseData.jsonSync())
       }
}

function storeInvoice(dataStore,client, invoice) {
    Headers = library.load("fetch-api").Headers
    let myHeaders = new Headers()
    myHeaders.append('apikey', 'MUoj9GyLeQYmImDtli805eZOK7a8wk8W')
    
    for (let j=0; j<invoice.length; j++) {
        responseData = client.fetchSync("invoices/"+ invoice[j] +"?realm=citrix-T" , { headers: myHeaders })
        dataStore.save("scr_invoice_details",Object.values(responseData.jsonSync()))  //remove root path object
       }
}

function Sync({dataStore, client, context, incrementalSync}) {
         
    console.log("Ariba sync started")
    
    let limit = 1000
    let noOfPages = 1
    let requi=[]
    let invoice=[]
    let maxChangeId = 0
    if ( incrementalSync && context.lastChangeSequenceId > 0 ) {maxChangeId = context.lastChangeSequenceId}

    for (i = 0; i < noOfPages; i++) {
        responseData = getChanges(client, limit, limit*i,0)

        if (i == 0 ) {
            noOfPages = (+responseData.headers.get("x-total-count").replace(/[\]\[]/g, ""))/limit
            }
        json = responseData.jsonSync()
        if (maxChangeId < +json[json.length-1].changeSequenceId) {maxChangeId = +json[json.length-1].changeSequenceId}
        for (let j=0; j<json.length; j++) {
            if (json[j].restResourceName == "requisitions" ) {requi.push(json[j].approvableUniqueName)}
            if (json[j].restResourceName == "invoices" ) {invoice.push(json[j].approvableUniqueName)}
            }

        dataStore.save("changes",json)
           
    }
    requi = requi.filter(onlyUnique)
    invoice = invoice.filter(onlyUnique)
    context.lastChangeSequenceId = maxChangeId
    
    storeRequisition(dataStore, client, requi)
    storeInvoice(dataStore, client, invoice)

    console.log("Max Change ID " + maxChangeId)
    console.log("Total number of change endpint pages " + noOfPages)
    console.log("Total number of requisitions "+ requi.length)
    console.log("Total number of invoices " + invoice.length)  
    console.log("Sync finished")
}

function fullSync (dataStore, client, context) {
    Sync(dataStore, client, context, false)
}

function incrSync (dataStore, client, context) {
    Sync(dataStore, client, context, true)
}

integration.define({
    "synchronizations": [
        {
            "name": "SyncChanges", // Logical name
            "fullSyncFunction": fullSync,
            "incrementalSyncFunction": incrSync
             }
    ],
    "model": {
        "tables": [
            {
                "name": "changes",
                "columns": [
                    {
                        "name": "changeSequenceId",
                        "type": "STRING",
                        "length": 16,
                        "primaryKey": true
                    },
                    {
                        "name": "approvableUniqueName",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "restResourceName",
                        "type": "STRING",
                        "length": 16
                    },
                    {
                        "name": "changeType",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "approvableBaseID",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "changeParameters",
                        "type": "STRING",
                        "length": 255
                    },
                    {
                        "name": "realm",
                        "type": "STRING",
                        "length": 32
                    }
                ]
            },
            {
                "name": "scr_requisition_details",
                "columns": [
                    {
                        "name": "uniqueName",
                        "type": "STRING",
                        "length": 16,
                        "primaryKey": true
                    },
                    {
                        "name": "requesterName",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "statusString",
                        "type": "STRING",
                        "length": 16
                    },
                    {
                        "name": "submitDate",
                        "type": "LONG"
                    },   
                    {
                        "name": "lastModified",
                        "type": "LONG"
                    },
                    {
                        "name": "lineItemCount",
                        "type": "LONG"
                    },
                    {
                        "name": "title",
                        "type": "STRING",
                        "length": 255
                    }
                ]
            },
            {
                "name": "scr_invoice_details",
                "columns": [
                    {
                        "name": "UniqueName",
                        "type": "STRING",
                        "length": 16,
                        "primaryKey": true
                    },
                    {
                        "name": "Name",
                        "type": "STRING",
                        "length": 255
                    },
                    {
                        "name": "StatusString",
                        "type": "STRING",
                        "length": 16
                    },
                    {
                        "name": "TimeCreated",
                        "type": "STRING",
                        "length": 32
                    },   
                    {
                        "name": "TimeUpdated",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "InvoiceDate",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "ApprovedState",
                        "type": "STRING",
                        "length": 16
                    }
                ]
            }

        ]
    }
})