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

        const users = currentResult
            .filter(user => user.active)
            .map(user => {
                // Account id contains ID that is longer than destination table user with max 36 chars for userId
                // "accountId": "557058:73ba846a-2e13-4020-9898-57cfab0e00b9"
                const userId = trimIdPrefix(user.accountId);
                // Some users have missing mandatory email
                const email = user.emailAddress ?? userId;
                // Domain value not set for user
                return new User(user.displayName, user.displayName, email, null, user.name, userId);
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
        const response = client.fetchSync(
            `/rest/api/2/group/member?groupname=${group.account_name}&startAt=${searchParameters.startAt}&maxResults=${searchParameters.maxResults}`);

        if (!response.ok) {
            const message = `User group mapping sync failed ${response.status}:${response.statusText}.`;
            console.log(message);
            console.log(`Error body: ${response.textSync()}`);
            // Some of the queries for group return HTTP 404
            return;
        } else {
            currentResult = response.jsonSync();

            const userGroupMappings = currentResult.values
                .filter(user => user.active)
                .map(user => {
                    return new UserGroupMapping(group.group_id, trimIdPrefix(user.accountId))
                });

            console.log(
                `Saving ${userGroupMappings.length} userGroupMapping to data store, ${JSON.stringify(userGroupMappings)}`
            );
            dataStore.save(UserGroupMapping.tableModel, userGroupMappings);
        }
        searchParameters.startAt += searchParameters.maxResults;
    } while (searchParameters.startAt < currentResult.total);
}

const trimIdPrefix = (id) => {
    const elementPosition = id.indexOf(":");
    return elementPosition !== -1 ? id.slice(elementPosition + 1) : id;
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
            User.tableModel,
            Group.tableModel,
            UserGroupMapping.tableModel
        ]
    }
})