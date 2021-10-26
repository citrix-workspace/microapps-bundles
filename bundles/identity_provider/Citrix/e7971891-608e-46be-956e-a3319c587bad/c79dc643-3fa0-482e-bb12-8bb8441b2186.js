const {User, Group, UserGroupMapping} = library.load("microapp-user-groups")
const {pick} = library.load("lodash");

function fullSync(params) {
    fullSyncUsers(params)
    fullSyncGroups(params)
}

function fullSyncUsers({client, dataStore}) {
    const searchParameters = {
        "startAt": 0,
        "maxResults": 50
    };

    let currentResult;
    do {
        console.log(`fullSyncUsers(startAt=${searchParameters.startAt})`);
        const response = client.fetchSync(
            `/rest/api/2/users/search?startAt=${searchParameters.startAt}&maxResults=${searchParameters.maxResults}`);

        currentResult = response.jsonSync();

        console.log(`User response received, status: ${response.status}, total: ${currentResult.length}`);

        const users = currentResult
            .filter(isUserValid)
            .map(user => {
                return {
                    "account_name": user.displayName,
                    "display_name": user.displayName,
                    "email": user.emailAddress,
                    "domain": null,
                    "user_principal_name": user.displayName,
                    "user_id": user.accountId,
                }
            })

        console.log(
            `Saving ${users.length} users to data store, ${JSON.stringify(
                users.map(user => pick(user, ["user_id", "account_name", "email"]))
            )}`
        );
        dataStore.save(User.tableModel, users);

        searchParameters.startAt = searchParameters.startAt + searchParameters.maxResults

    } while (currentResult.length > 0);
}

function fullSyncGroups({client, dataStore}) {
    const searchParameters = {
        "startAt": 0,
        "maxResults": 50
    };

    let currentResult;
    do {
        console.log(`fullSyncGroups(startAt=${searchParameters.startAt})`);
        const response = client.fetchSync(
            `/rest/api/2/group/bulk?startAt=${searchParameters.startAt}&maxResults=${searchParameters.maxResults}`);

        currentResult = response.jsonSync();

        console.log(`Group response received, status: ${response.status}, total: ${currentResult.total}`);

        const groups = currentResult.values.map(group =>
            new Group(group.name, group.name, null, group.name, group.groupId, null));

        console.log(`Saving ${groups.length} groups to data store, ${JSON.stringify(groups)}`);
        dataStore.save(Group.tableModel, groups);

        groups.map(group => {
            console.log(`Group ${JSON.stringify(pick(group, ["account_name", "group_id"]))}`);
            mapUserGroup(client, dataStore, group)
        });

        searchParameters.startAt += searchParameters.maxResults;

    } while (searchParameters.startAt < currentResult.total);
}

function mapUserGroup(client, dataStore, group) {
    const searchParameters = {
        "startAt": 0,
        "maxResults": 50
    };

    let currentResult;
    do {
        console.log(`userGroupMapping(startAt=${searchParameters.startAt})`);
        const response = client.fetchSync(`/rest/api/2/group/member?groupname=${group.account_name}` +
            `&startAt=${searchParameters.startAt}&maxResults=${searchParameters.maxResults}`);

        if (!response.ok) {
            // Some of the queries for user group mapping return HTTP 404
            console.log(`User group mapping sync failed ${response.status}:${response.statusText}.`);
            return;
        } else {
            currentResult = response.jsonSync();

            console.log(`User group mapping response received, status: ${response.status}, total: ${currentResult.total}`);

            const userGroupMappings = currentResult.values
                .filter(isUserValid)
                .map(user => {
                    return new UserGroupMapping(group.group_id, user.accountId)
                });

            console.log(
                `Saving ${userGroupMappings.length} userGroupMapping to data store, ${JSON.stringify(userGroupMappings)}`
            );
            dataStore.save(UserGroupMapping.tableModel, userGroupMappings);
        }
        searchParameters.startAt += searchParameters.maxResults;
    } while (searchParameters.startAt < currentResult.total);
}

const isUserValid = (user) => {
    return user.active && user.emailAddress != null && user.accountType === "atlassian";
}

integration.define({
    synchronizations: [
        {
            name: "jiraUserGroups",
            fullSyncFunction: fullSync,
        }
    ],
    model: {
        tables: [
            {
                name: "User",
                columns: [
                    {
                        name: "account_name",
                        type: "STRING",
                        length: 255,
                    },
                    {
                        name: "display_name",
                        type: "STRING",
                        length: 255,
                    },
                    {
                        name: "email",
                        type: "STRING",
                        length: 255,
                    },
                    {
                        name: "domain",
                        type: "STRING",
                        length: 255,
                    },
                    {
                        name: "user_principal_name",
                        type: "STRING",
                        length: 255,
                    },
                    {
                        name: "user_id", // accountId is longer than User.tableModel with max 36 chars for user_id
                        type: "STRING",
                        length: 100,
                        primaryKey: true,
                    },
                ]
            },
            Group.tableModel,
            UserGroupMapping.tableModel
        ]
    }
})