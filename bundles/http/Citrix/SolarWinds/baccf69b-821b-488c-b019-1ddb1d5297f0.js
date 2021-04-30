const LIMIT = 100;
let moment = library.load("moment-timezone");

integration.define({
    "synchronizations": [
        {
            "name": "UpdateComments",
            "fullSyncFunction": updateComments,
            "incrementalSyncFunction": updateComments
        }
    ],
    "model": {
        "tables": [
            {
                "name": "updated_comments",
                "columns": [
                    {
                        "name": "id",
                        "type": "INTEGER",
                        "primaryKey": true
                    },
                    {
                        "name": "body",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "created_at",
                        "type": "DATETIME"
                    },
                    {
                        "name": "commenter_id",
                        "type": "INTEGER"
                    },
                    {
                        "name": "user_name",
                        "type": "STRING"

                    },
                    {
                        "name": "user_email",
                        "type": "STRING"
                    }
                ]
            }
        ]
    }
});

async function updateComments({dataStore, client, latestSynchronizationTime}) {
    let incidentComments = [];
    let latestSync = new Date(latestSynchronizationTime);
    let updatedAt = latestSynchronizationTime ? '' : `?q=updated_at>=${moment(latestSync).format('YYYY-MM-DD')}`;

    let queryFields = `?per_page=${LIMIT}`;

    if (!latestSynchronizationTime) {
        queryFields = `${queryFields}&q=lastUpdateDate>=${moment(latestSync).format('YYYY-MM-DD')}`;
    }

    const incidentsResp = await client.fetch(`/incidents${queryFields}`);

    const pages = incidentsResp.ok && incidentsResp.headers["map"]["x-total-pages"] ? incidentsResp.headers["map"]["x-total-pages"] : 1000;

    //Loop through all pages
    for (let j = 0; j < pages; j++) {

        const incidentsPaginationResp = await client.fetch(`/incidents${queryFields}&page=${j}`);

        if (incidentsPaginationResp.ok) {

            var incidents = await incidentsPaginationResp.json();

            if (incidents.length === 0) {
                break;
            }

            //Loop through each incident
            for (let i = 0; i < incidents.length; i++) {

                let commentsResponse = await client.fetch(`/incidents/${incidents[i].id}/comments${updatedAt}`);

                if (commentsResponse.ok) {
                    let commentsJson = await commentsResponse.json();

                    if (commentsJson) {
                        commentsJson.forEach(comment => {
                            incidentComments.push({
                                id: comment.id,
                                body: comment.body.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, ''),
                                created_at: new Date(comment.created_at),
                                commenter_id: comment.commenter_id,
                                user_name: comment.user.name,
                                user_email: comment.user.email
                            })
                        });
                    }
                } else {
                    throw new Error(`Could not retrieve comments (${commentsResponse.status}: ${commentsResponse.statusText})`);
                }
            }
        } else {
            throw new Error(`Could not retrieve incidents (${incidentsPaginationResp.status}: ${incidentsPaginationResp.statusText})`);
        }
    }

    if (incidentComments.length > 0) {
        dataStore.save("updated_comments", incidentComments);
    }
}