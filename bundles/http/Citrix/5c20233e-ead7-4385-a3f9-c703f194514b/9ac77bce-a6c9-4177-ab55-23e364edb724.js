const ENDPOINT = "/incidents";
const LIMIT = 100;
let PAGES = 1000;

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
                        "type": "STRING"
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

function replacer(key, value) {
    let str = value;
    if (key === "body") {
        str = str.replace(/<[^>]+>/gm, '');
        str = str.replace('\n&nbsp;', '');
    }
    return str;
}

function parserURL(urlEndpoint, strDate) {
    if (urlEndpoint.indexOf(strDate) > 0) {
        let start = urlEndpoint.indexOf('T');
        let end = urlEndpoint.indexOf('Z');
        let removeStr = urlEndpoint.slice(start, end + 1);
        let parts = urlEndpoint.split(removeStr);
        urlEndpoint = parts[0] + parts[1];
    }
    return urlEndpoint
}

async function updateComments({dataStore, client, latestSynchronizationTime}) {
    let incidentComments = "";
    let queryFields = "";
    let exit = false;
    let latestSync = new Date(latestSynchronizationTime);

    if (latestSynchronizationTime === undefined)
        queryFields = '?per_page=' + LIMIT + '&page=';
    else {
        queryFields = '?q=lastUpdateDate>=' + latestSync.toISOString() + '&per_page=' + LIMIT + '&page=';
    }

    //Get page count
    let urlEndpoint = ENDPOINT + queryFields + 0;
    let resp = await client.fetch(urlEndpoint);
    if (resp.ok) {
        PAGES = resp.headers["map"]["x-total-pages"];
    }

    //Loop through all pages
    for (j = 0; j < PAGES; j++) {
        let urlEndpoint = ENDPOINT + queryFields + j;

        if (exit === true) {
            break;
        }

        urlEndpoint = parserURL(urlEndpoint, 'lastUpdateDate');
        let resp = await client.fetch(urlEndpoint);

        if (resp.ok) {
            var incidents = await resp.json();
            var jsonIncidents = JSON.stringify(incidents, null, '\t');
            var parsedIncidents = JSON.parse(jsonIncidents);
            if (parsedIncidents.length === 0) {
                exit = true;
            }

            //Loop through each incident
            for (i = 0; i < parsedIncidents.length; i++) {

                let commentEndpoint = "";

                if (latestSynchronizationTime === undefined)
                    commentEndpoint = ENDPOINT + '/' + parsedIncidents[i].id + '/comments';
                else {
                    commentEndpoint = ENDPOINT + '/' + parsedIncidents[i].id + '/comments' + '?q=updated_at>=' + latestSync.toISOString();
                }

                commentEndpoint = parserURL(commentEndpoint, 'updated_at');

                var response = await client.fetch(commentEndpoint);

                console.log('i = ' + i +
                    '\tticket id = ' + parsedIncidents[i].id +
                    '\tticket number = ' + parsedIncidents[i].number +
                    '\tstate = ' + parsedIncidents[i].state);

                if (response.ok) {
                    let comments = await response.json();
                    let updatedComments = JSON.stringify(comments, replacer, '\t');
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