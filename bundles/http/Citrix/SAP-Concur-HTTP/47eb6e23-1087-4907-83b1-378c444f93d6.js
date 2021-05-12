const _ = library.load('lodash')

// this function only takes actionParameters and stores them to itiner_sharedWithOthers table
async function shareItinerary({dataStore, actionParameters}) {
    // console.log(`shareItinerary(${JSON.stringify(actionParameters)})`)
    const itinerary = _.pick(actionParameters, [
        'shareItineraryId',
        'Comment',
        'sharedWithEmail',
        'sharedByEmail',
        'sharedByName',
    ])
    dataStore.save('itiner_sharedWithOthers', itinerary)
}

integration.define({
    actions: [
        {
            name: 'shareItinerary',
            parameters: [
                {
                    name: 'shareItineraryId',
                    type: 'STRING',
                    required: true,
                },
                {
                    name: 'Comment',
                    type: 'STRING',
                },
                {
                    name: 'sharedWithEmail',
                    type: 'STRING',
                    required: true,
                },
                {
                    name: 'sharedByEmail',
                    type: 'STRING',
                    required: true,
                },
                {
                    name: 'sharedByName',
                    type: 'STRING',
                },
            ],
            function: shareItinerary,
        },
    ],
    model: {
        tables: [
            {
                name: 'itiner_sharedWithOthers',
                columns: [
                    {name: 'shareItineraryId', type: 'STRING', length: 255, primaryKey: true},
                    {name: 'Comment', type: 'STRING'},
                    {name: 'sharedWithEmail', type: 'STRING', length: 255, primaryKey: true},
                    {name: 'sharedByEmail', type: 'STRING'},
                    {name: 'sharedByName', type: 'STRING'},
                ],
            },
        ],
        relationships: [],
    },
})