const ENDPOINT = "/incidents";
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

function replaceBodyCharacters(key, value) {
    let str = value;
    if (key === "body") {
        str = str.replace(/<[^>]+>/gm, '');
        str = str.replace('\n&nbsp;', '');
    }
    return str;
}

async function updateComments({dataStore, client, latestSynchronizationTime}) {
    let incidentComments = "";
    let queryFields = "";
    let exit = false;
    let latestSync = new Date(latestSynchronizationTime);

    if (latestSynchronizationTime === undefined)
        queryFields = '?per_page=' + LIMIT + '&page=';
    else {
        queryFields = '?q=lastUpdateDate>=' + moment(latestSync).format('YYYY-MM-DD') + '&per_page=' + LIMIT + '&page=';
    }

    //Get page count
    let urlEndpoint = ENDPOINT + queryFields + 0;
    let resp = await client.fetch(urlEndpoint);
    const pages = resp.ok && resp.headers["map"]["x-total-pages"] ? resp.headers["map"]["x-total-pages"] : 1000;

    //Loop through all pages
    for (j = 0; j < pages; j++) {

        if (exit) {
            break;
        }

        let incidentsEndpoint = ENDPOINT + queryFields + j;

        let resp = await client.fetch(incidentsEndpoint);

        if (resp.ok) {
            var incidents = await resp.json();

            if (incidents.length === 0) {
                exit = true;
            }

            //Loop through each incident
            for (i = 0; i < incidents.length; i++) {

                let commentEndpoint = "";

                if (latestSynchronizationTime === undefined)
                    commentEndpoint = ENDPOINT + '/' + incidents[i].id + '/comments';
                else {
                    commentEndpoint = ENDPOINT + '/' + incidents[i].id + '/comments' + '?q=updated_at>=' + moment(latestSync).format('YYYY-MM-DD');
                }

                var response = await client.fetch(commentEndpoint);

                if (response.ok) {
                    let comments = await response.json();
                    let updatedComments = JSON.stringify(comments, replaceBodyCharacters, '\t');
                    let parsedComments = JSON.parse(updatedComments);

                    if (parsedComments) {
                        parsedComments.forEach(comment => {
                            comment["user_name"] = comment.user.name;
                            comment["user_email"] = comment.user.email;
                            incidentComments += JSON.stringify(comment, null, '\t') + ', \n';
                        });
                    }

                } else {
                    throw new Error(`Could not retrieve comments (${response.status}: ${response.statusText})`);
                }
            }
        } else {
            throw new Error(`Could not retrieve incidents (${response.status}: ${response.statusText})`);
        }
    }

    if (incidentComments.length > 0) {
        incidentComments = '[\n' + incidentComments;
        incidentComments = incidentComments.substring(0, incidentComments.length - 3);
        incidentComments = incidentComments + '\n]';
        dataStore.save("updated_comments", incidentComments);
    }
}