integration.define({
    "synchronizations": [
        {
            "name": "Broadcasts",
            "fullSyncFunction": GetBroadcasts
        },
    ],
    "actions": [
        {
            name: 'completeTask',
            parameters: [
                {
                    name: 'Broadcast_id',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'date',
                    type: 'DATETIME',
                    required: true
                }
            ],
            "function": completeTask
        },
    ],
    "model": {
        "tables": [
            {
                "name": "broadcasts",
                "columns": [
                    {
                        "name": "id",
                        "type": "STRING",
                        "length": 255,
                        "primaryKey": true
                    },
                    {
                        "name": "email",
                        "type": "STRING",
                    },
                    {
                        "name": "Task",
                        "type": "STRING"
                    },
                    {
                        "name": "assigned_email",
                        "type": "STRING"
                    },
                    {
                        "name": "completedOn",
                        "type": "DATETIME"
                    },
                    {
                        "name": "owner",
                        "type": "STRING"
                    },
                    {
                        "name": "Description",
                        "type": "STRING"
                    },
                    {
                        "name": "Due_Date",
                        "type": "DATETIME"
                    },
                    {
                        "name": "Broadcast_GroupID",
                        "type": "STRING"
                    },
                    {
                        "name": "URL",
                        "type": "STRING"
                    }
                ]
            }
        ]
    }


});

async function GetBroadcasts({ dataStore, client }) {
    let pageSize = 100;
    let page = 1;
    let moreRecords = true;
    let broadcasts = [];
    while (moreRecords) {
        let urlEndpoint = 'sheets/354480714737540?pageSize=' + pageSize + '&page=' + page;
        let resp = await client.fetch(urlEndpoint);
        if (resp.ok) {
            if (resp.status === 200) {
                let sheet = await resp.json();
                let sheetArray = [];
                for (let i = 0; i < sheet.rows.length; i++) {
                    sheetArray[i] = {};
                    for (let j = 0; j < sheet.rows[i].cells.length; j++) {
                        if (sheet.rows[i].cells[j].value === undefined) {
                            sheet.rows[i].cells[j].value = '';
                        }
                        if (sheet.columns[j].title === 'completedOn' || sheet.columns[j].title === 'Due_date') {
                            sheetArray[i][sheet.columns[j].title] = new Date(sheet.rows[i].cells[j].value);
                        } else {
                            sheetArray[i][sheet.columns[j].title] = new String(sheet.rows[i].cells[j].value);
                        }
                    }
                    sheetArray[i]['id'] = sheetArray[i]['ID'];
                }
                sheet.rows = {};
                sheet.columns = {};
                sheet.formatedSheet = sheetArray;
                broadcasts.push(...sheetArray);
                let jsonSheet = JSON.stringify(sheet.formatedSheet, null, '\t');
                dataStore.save("broadcasts", jsonSheet);
                if (sheet.totalRowCount < pageSize * page) {
                    moreRecords = false;
                } else {
                    page++;
                }
            } else {
                moreRecords = false;
            }
        } else {
            moreRecords = false;
        }
    }
    return broadcasts;
}


async function completeTask({ dataStore, client, actionParameters }) {
    let rowId = await getRowIdWithColumnValue(client, 354480714737540, 8403766893406084, actionParameters.Broadcast_id);
    let body =
        [{
            "id": rowId,
            "cells": [{
                "columnId": "60775304849284",
                "value": actionParameters.date
            }]
        }];
    let requestOptions = {
        method: 'PUT',
        body: JSON.stringify(body)
    };
    let endpoint = 'sheets/354480714737540/rows';
    await client.fetch(endpoint, requestOptions);
    await GetBroadcasts({ dataStore, client });
}

async function getRowIdWithColumnValue(client, sheetId, column_id, colum_value) {
    let pageSize = 100;
    let page = 1;
    let moreRecords = true;
    let arr = [];
    while (moreRecords) {
        let urlEndpoint = 'sheets/' + sheetId + '?pageSize=' + pageSize + '&page=' + page;
        let resp = await client.fetch(urlEndpoint);
        if (resp.ok) {
            if (resp.status === 200) {
                let sheet = await resp.json();
                let sheetArray = [];
                for (let i = 0; i < sheet.rows.length; i++) {
                    sheetArray[i] = {};
                    for (let j = 0; j < sheet.rows[i].cells.length; j++) {
                        if (sheet.rows[i].cells[j].value === undefined) {
                            sheet.rows[i].cells[j].value = '';
                        }
                        sheetArray[i]['rowId'] = sheet.rows[i].id;
                        sheetArray[i][sheet.rows[i].cells[j].columnId] = new String(sheet.rows[i].cells[j].value);
                    }
                }
                sheet.rows = {};
                sheet.columns = {};
                sheet.formatedSheet = sheetArray;
                arr.push(...sheetArray);
                if (sheet.totalRowCount < pageSize * page) {
                    moreRecords = false;
                } else {
                    page++;
                }
            } else {
                moreRecords = false;
            }
        } else {
            moreRecords = false;
        }
    }
    let row = arr.find(element => element[column_id] == colum_value);
    return row ? row.rowId : null;
}

