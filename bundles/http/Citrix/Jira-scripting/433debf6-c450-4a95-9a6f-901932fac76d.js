const { pick } = library.load("lodash");
const moment = library.load("moment-timezone");

function syncTickets(dataStore, client, jql) {
    const searchParameters = {
        startAt: 0,
        maxResults: 50,
        fields: [
            "assignee",
            "comment",
            "components",
            "created",
            "description",
            "fixVersions",
            "issuetype",
            "labels",
            "parent",
            "priority",
            "project",
            "reporter",
            "status",
            "summary",
            "timetracking",
            "updated",
            "versions",
        ],
        jql,
    };

    let currentResult;
    do {
        console.log(`syncTickets(startAt=${searchParameters.startAt}, jql=${jql})`);

        const response = client.fetchSync("rest/api/2/search", {
            method: "POST",
            body: JSON.stringify(searchParameters),
        });
        currentResult = response.jsonSync();

        console.log(
            `Ticket response received, status: ${response.status}, total: ${currentResult.total}`
        );

        const issues = currentResult.issues.map(issue => ({
            id: parseInt(issue.id, 10),
            key: issue.key,
            summary: issue.fields.summary,
            created: moment.utc(issue.fields.created).toDate(),
            project: issue.fields.summary,
            reporter_email: issue.fields.reporter?.emailAddress ?? null,
            reporter_name: issue.fields.reporter?.displayName ?? null,
            status: issue.fields.status.name,
        }));

        console.log(
            `Saving ${issues.length} tickets to data store, ${JSON.stringify(
                issues.map(issue => pick(issue, ["project", "summary"]))
            )}`
        );

        dataStore.save("tickets", issues);
        searchParameters.startAt += searchParameters.maxResults;
    } while (searchParameters.startAt < currentResult.total);
}

function fullSyncTickets({ dataStore, client }) {
    console.log("Full sync of tickets started");

    const jql = "updated >= -30d";
    syncTickets(dataStore, client, jql);
}

function incrementalSyncTickets({ dataStore, client, latestSynchronizationTime }) {
    console.log(`Incremental sync of tickets started, last sync at ${latestSynchronizationTime}`);

    const updatedDateTime = moment(new Date(latestSynchronizationTime)).format("YYYY-MM-DD HH:mm");
    const jql = `updated >= '${updatedDateTime}'`;
    return syncTickets(dataStore, client, jql);
}

function fullSyncProjects({ dataStore, client }) {
    console.log("Full sync of projects started");

    const response = client.fetchSync("/rest/api/2/project/search");
    const projects = response.jsonSync().values.map(project => ({
        id: parseInt(project.id, 10),
        ...pick(project, ["key", "name", "isPrivate"]),
    }));

    console.log(
        `Saving ${projects.length} projects to data store, ${JSON.stringify(
            projects.map(project => project.name)
        )}`
    );

    dataStore.save("projects", projects);
}

const incrementalSyncProjects = fullSyncProjects;

integration.define({
    synchronizations: [
        {
            name: "tickets",
            fullSyncFunction: fullSyncTickets,
            incrementalSyncFunction: incrementalSyncTickets,
        },
        {
            name: "projects",
            fullSyncFunction: fullSyncProjects,
            incrementalSyncFunction: incrementalSyncProjects,
        },
    ],
    model: {
        tables: [
            {
                name: "tickets",
                columns: [
                    { name: "id", type: "INTEGER", primaryKey: true },
                    { name: "key", type: "STRING", length: 100 },
                    { name: "summary", type: "STRING", length: 100 },
                    { name: "created", type: "DATETIME" },
                    { name: "project", type: "STRING", length: 100 },
                    { name: "reporter_email", type: "STRING", length: 100 },
                    { name: "reporter_name", type: "STRING", length: 100 },
                    { name: "status", type: "STRING", length: 100 },
                ],
            },
            {
                name: "projects",
                columns: [
                    { name: "id", type: "INTEGER", primaryKey: true },
                    { name: "key", type: "STRING", length: 100 },
                    { name: "name", type: "STRING", length: 100 },
                    { name: "isPrivate", type: "BOOLEAN" },
                ],
            },
        ],
    },
});
