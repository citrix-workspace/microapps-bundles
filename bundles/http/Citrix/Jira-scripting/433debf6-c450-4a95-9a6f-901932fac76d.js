let _ = library.load("lodash");
let moment = library.load("moment-timezone");

function syncTickets(dataStore, client, jql) {
    var searchParameters = {
        "startAt": 0,
        "maxResults": 50,
        "fields": ["issuetype", "summary", "status", "reporter", "assignee", "priority", "description", "comment", "timetracking", "created", "updated", "fixVersions", "versions", "components", "labels", "project", "parent"],
        jql,
    }

    do {
        console.log(`syncTickets(startAt=${searchParameters.startAt}, jql=${jql})`);
        var ret = client.fetchSync("rest/api/2/search", {method: "POST", body: JSON.stringify(searchParameters)});

        currentResponse = ret.jsonSync();
        console.log("ticket response received, status: " + ret.status + ", total: " + currentResponse.total);

        let issues = currentResponse.issues.map(issue => {
            return {
                "id": parseInt(issue.id),
                "key": issue.key,
                "summary": issue.fields.summary,
                "created": moment.utc(issue.fields.created).toDate(),
                "project": issue.fields.summary,
                "reporter_email": issue.fields.reporter?.emailAddress ?? null,
                "reporter_name": issue.fields.reporter?.displayName ?? null,
                "status": issue.fields.status.name,
            }
        });

        console.log(`Saving ${issues.length} to data store, [${issues.map(({project, summary}) => JSON.stringify({project, summary})).join(", ")}]`);

        dataStore.save("tickets", issues);
        searchParameters.startAt += searchParameters.maxResults;
    } while (searchParameters.startAt < currentResponse.total)
}

function fullSyncTickets({dataStore, client}) {
    const jql = 'updated >= -30d'
    return syncTickets(dataStore, client, jql);
}

function incrementalSyncTickets({dataStore, client, latestSynchronizationTime}) {
    print(`JIRA inc sync at ${latestSynchronizationTime}`)
    const updatedDateTime = moment(new Date(latestSynchronizationTime)).format('YYYY-MM-DD HH:mm');
    const jql = `updated >= '${updatedDateTime}'`
    return syncTickets(dataStore, client, jql)
}

function fullSyncProjects({dataStore, client}) {
    console.log('Full synchronization projects start')
    const response = client.fetchSync("/rest/api/2/project/search")
    const convertProject = project => {
        const result = _.pick(project, ['id', 'key', 'name', 'isPrivate']);
        return {...result, id: parseInt(result.id, 10)}
    }
    const projects = response.jsonSync().values.map(convertProject);
    print(`sync projects saving ${projects.length} projects: [${projects.map(p => p.name).join(', ')}]`)
    dataStore.save("projects", projects);
}

const incrementalSyncProjects = fullSyncProjects

integration.define({
    "synchronizations": [
        {
            "name": "tickets", // Logical name
            "fullSyncFunction": fullSyncTickets,
            "incrementalSyncFunction": incrementalSyncTickets,
        },
        {
            "name": "projects", // Logical name
            "fullSyncFunction": fullSyncProjects,
            "incrementalSyncFunction": incrementalSyncProjects,
        }
    ],
    "model": {
        "tables": [
            {
                "name": "tickets",
                "columns": [
                    {"name": "id", "type": "INTEGER", "primaryKey": true},
                    {"name": "key", "type": "STRING", "length": 100},
                    {"name": "summary", "type": "STRING", "length": 100},
                    {"name": "created", "type": "DATETIME"},
                    {"name": "project", "type": "STRING", "length": 100},
                    {"name": "reporter_email", "type": "STRING", "length": 100},
                    {"name": "reporter_name", "type": "STRING", "length": 100},
                    {"name": "status", "type": "STRING", "length": 100},
                ]
            },
            {
                "name": "projects",
                "columns": [
                    {"name": "id", "type": "INTEGER", "primaryKey": true},
                    {"name": "key", "type": "STRING", "length": 100},
                    {"name": "name", "type": "STRING", "length": 100},
                    {"name": "isPrivate", "type": "BOOLEAN"}
                ]
            }
        ]
    }
})
