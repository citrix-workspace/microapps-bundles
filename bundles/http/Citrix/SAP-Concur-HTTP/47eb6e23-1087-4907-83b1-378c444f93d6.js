let _ = library.load("lodash");
let moment = library.load("moment-timezone");

function SyncSharedItineraries(dataStore, client) {

}

function fullSyncSharedItineraries({dataStore, client}) {
    return SyncSharedItineraries(dataStore, client);
}

async function shareItinerary({client, dataStore, actionParameters}) {
    //console.log(`shareItinerary(${JSON.stringify(actionParameters)})`)
    const {shareItineraryId, Comment,sharedWithEmail,sharedByEmail,sharedByName} = actionParameters
    dataStore.save("itiner_sharedWithOthers", actionParameters)
}

integration.define({
    "synchronizations": [
        {
            "name": "itiner_sharedWithOthers", // Logical name
            "fullSyncFunction": fullSyncSharedItineraries,
        }
    ],
    actions: [
        {
            name: 'shareItinerary',
            parameters: [
                {
                    name: 'shareItineraryId',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'Comment',
                    type: 'STRING'
                },
                {
                    name: 'sharedWithEmail',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'sharedByEmail',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'sharedByName',
                    type: 'STRING'
                }
            ],
            function: shareItinerary,
        }
    ],
    "model": {
        "tables": [
            {
                "name": "itiner_sharedWithOthers",
                "columns": [
                    {"name": "shareItineraryId", "type": "STRING", "length": 255, "primaryKey": true},
                    {"name": "Comment", "type": "STRING"},
                    {"name": "sharedWithEmail", "type": "STRING", "length": 255, "primaryKey": true},
                    {"name": "sharedByEmail", "type": "STRING"},
                    {"name": "sharedByName", "type": "STRING"}
                ]
            }
        ],
        "relationships": []
    }
})