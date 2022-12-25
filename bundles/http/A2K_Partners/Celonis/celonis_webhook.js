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
                        "length": 60
                    },
                    {
                        "name": "Task",
                        "type": "STRING",
                        "length": 255
                    },
                    {
                        "name": "assigned_email",
                        "type": "STRING",
                        "length": 60
                    },
                    {
                        "name": "completedOn",
                        "type": "DATETIME"
                    },
                    {
                        "name": "owner",
                        "type": "STRING",
                        "length": 60
                    },
                    {
                        "name": "Description",
                        "type": "STRING",
                        "length": 1024
                    },
                    {
                        "name": "Due_Date",
                        "type": "DATETIME"
                    },
                    {
                        "name": "Broadcast_GroupID",
                        "type": "STRING",
                        "length": 60
                    },
                    {
                        "name": "url",
                        "type": "STRING",
                        "length": 255
                    }
                ]
            }
        ]
    }


});

async function GetBroadcasts({ dataStore, client }) {
    const pageSize = 100;
    let page = 1;
    let moreRecords = true;
    const broadcasts = [];
    while (moreRecords) {
        const urlEndpoint = `sheets/354480714737540?pageSize=${pageSize}&page=${page}`;
        const resp = await client.fetch(urlEndpoint);
        if (resp.ok && resp.status === 200) {
            const sheet = await resp.json();
            const sheetArray = [];
            for (let i = 0; i < sheet.rows.length; i++) {
                sheetArray[i] = {};
                for (let j = 0; j < sheet.rows[i].cells.length; j++) {
                    if (sheet.columns[j].title === 'completedOn' || sheet.columns[j].title === 'Due_date') {
                        sheetArray[i][sheet.columns[j].title] = new Date(sheet.rows[i].cells[j].value);
                    } else {
                        sheetArray[i][sheet.columns[j].title] = String(sheet.rows[i].cells[j].value);
                    }
                }
                sheetArray[i]['id'] = sheetArray[i]['ID'];
                sheetArray[i]['url'] = sheetArray[i]['URL'];
            }
            dataStore.save("broadcasts", sheetArray);
            if (sheet.totalRowCount < pageSize * page) {
                moreRecords = false;
            } else {
                page++;
            }
        } else {
            moreRecords = false;
            throw new Error(`GetBroadcasts Error (${resp.status}: ${resp.statusText})`);
        }
    }
    return broadcasts;
}

async function completeTask({ dataStore, client, actionParameters }) {
    const rowId = await getRowIdWithColumnValue(client, 354480714737540, 8403766893406084, actionParameters.Broadcast_id);
    await client.fetch('sheets/354480714737540/rows', {
        method: 'PUT',
        body: JSON.stringify([{
            id: rowId,
            cells: [{
                columnId: '60775304849284',
                value: actionParameters.date
            }]
        }])
    });
    await GetBroadcasts({ dataStore, client });
}

async function getRowIdWithColumnValue(client, sheetId, column_id, colum_value) {
    const pageSize = 100;
    let page = 1;
    let moreRecords = true;
    while (moreRecords) {
        const urlEndpoint = `sheets/${sheetId}?pageSize=${pageSize}&page=${page}`;
        const resp = await client.fetch(urlEndpoint);
        if (resp.ok) {
            if (resp.status === 200) {
                const sheet = await resp.json();
                const sheetArray = [];
                for (const row of sheet.rows) {
                    for (const cell of row.cells) {
                        sheetArray.push({
                            rowId: row.id,
                            [cell.columnId]: String(cell.value),
                        })
                    }
                }
                const row = sheetArray.find(element => element[column_id] == colum_value);
                if (row) {
                    return row.rowId;
                }
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
    return null;
}
