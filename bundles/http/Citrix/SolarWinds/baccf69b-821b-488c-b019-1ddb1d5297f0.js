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
    const incidentComments = [];
    const latestSyncDate = new Date(latestSynchronizationTime);
    const latestSync = moment(latestSyncDate).format('YYYY-MM-DD');
    const updatedAt = latestSynchronizationTime ? `?q=updated_at>=${latestSync}` : '';
    const lastUpdateDate = latestSynchronizationTime ? `?q=lastUpdateDate>=${latestSync}` : '';

    const incidentsResp = await client.fetch(`/incidents?per_page=${LIMIT}${lastUpdateDate}`);

    if (!incidentsResp.ok) {
        throw new Error(`Could not retrieve incidents count (${incidentsResp.status}: ${incidentsResp.statusText})`);
    }

    const pagesCount = incidentsResp.headers['map']['x-total-pages'] ?? 1000;

    //Loop through all pages
    for (let j = 0; j < pagesCount; j++) {
        const incidentsPaginationResp = await client.fetch(`/incidents?per_page=${LIMIT}${lastUpdateDate}&page=${j}`);

        if (!incidentsPaginationResp.ok) {
            throw new Error(`Could not retrieve incidents (${incidentsPaginationResp.status}: ${incidentsPaginationResp.statusText})`);
        }

        const incidents = await incidentsPaginationResp.json();
        if (incidents.length === 0) {
            break;
        }

        //Loop through each incident
        for (const incident of incidents) {
            const commentsResponse = await client.fetch(`/incidents/${incident.id}/comments${updatedAt}`);

            if (!commentsResponse.ok) {
                throw new Error(`Could not retrieve comments (${commentsResponse.status}: ${commentsResponse.statusText})`);
            }

            let commentsJson = await commentsResponse.json();

            if (commentsJson) {
                commentsJson.forEach(comment => {
                    incidentComments.push({
                        id: comment.id,
                        body: comment.body.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, ''),
                        created_at: new Date(comment.created_at),
                        commenter_id: comment.commenter_id,
                        user_name: comment.user.name,
                        user_email: comment.user.email,
                    });
                });
            }
        }
    }

    if (incidentComments.length > 0) {
        dataStore.save('updated_comments', incidentComments);
    }
}