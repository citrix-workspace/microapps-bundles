const {User, Group, UserGroupMapping} = library.load("microapp-user-groups")
const uuid = library.load("uuid")

function fullSync(params) {
    fullSyncUsers(params)
    fullSyncGroups(params)
}

function fullSyncUsers({client, dataStore}) {
    var searchParameters = {
        "startAt": 0,
        "maxResults": 50
    }
    let pageUserCount = 0

    do {
        console.log(`fullSyncUsers(startAt=${searchParameters.startAt})`)
        const response = client.fetchSync(`/rest/api/2/users/search?username=.&startAt=${searchParameters.startAt}&maxResults=${searchParameters.maxResults}`)
        if (!response.ok) {
            const errorMessage = `Users sync failed ${response.status}:${response.statusText}.`
            console.log(errorMessage)
            console.log(`Error body: ${response.textSync()}`)
            throw new Error(errorMessage)
        } else {
            let responseUsers = response.jsonSync()
            pageUserCount = responseUsers.length
            console.log(`Users on page=${pageUserCount} offset=${searchParameters.startAt}`)
            console.log(`Users received data: (${JSON.stringify(responseUsers)})`)

            // TODO missing mandatory email?
            let users = responseUsers.map(user => {
                const userId = trimIdPrefix(user.accountId)
                const email = user.emailAddress ?? userId
                return new User(user.displayName, user.displayName, email, "domain", user.name, userId)
            })

            console.log(`Users data: (${JSON.stringify(users)})`)
            dataStore.save(User.tableModel, users)
        }
        searchParameters.startAt = searchParameters.startAt + searchParameters.maxResults

    } while (pageUserCount == searchParameters.maxResults) //TODO

    console.log(`Total users=${searchParameters.startAt}`)
}

function trimIdPrefix(id) {
    const elementPosition = id.indexOf(":")
    return elementPosition != -1 ? id.slice(elementPosition + 1) : id
}

function fullSyncGroups({client, dataStore}) {
    var searchParameters = {
        "startAt": 0,
        "maxResults": 50
    }

    do {
        console.log(`fullSyncGroups(startAt=${searchParameters.startAt})`)
        var response = client.fetchSync("/rest/api/2/group/bulk")

        if (!response.ok) {
            const errorMessage = `Groups sync failed ${response.status}:${response.statusText}.`
            console.log(errorMessage)
            console.log(`Error body: ${response.textSync()}`)
            throw new Error(errorMessage)
        } else {
            responseGroups = response.jsonSync()
            console.log(`Group response received, total: ${responseGroups.total}`)
            console.log(`Group received data: (${JSON.stringify(responseGroups)})`)

            let groups = responseGroups.values.map(group => {
                return new Group(group.name, group.name, "domain", group.name, group.groupId, null)
            })

            console.log(`Saving ${groups.length} to data store`)

            dataStore.save(Group.tableModel, groups)
            console.log(`Groups data: (${JSON.stringify(groups)})`)
            groups.map(group => {
                console.log(`Group account_name=${group.account_name} group_id=${group.group_id}`)
                userGroupMapping(client, dataStore, group)
            })
            searchParameters.startAt += searchParameters.maxResults
        }
    } while (searchParameters.startAt < responseGroups.total)
}

function userGroupMapping(client, dataStore, group) {
    var searchParameters = {
        "startAt": 0,
        "maxResults": 5
    }

    do {
        console.log(`userGroupMapping(startAt=${searchParameters.startAt})`)
        var response = client.fetchSync(`/rest/api/2/group/member?groupname=${group.account_name}&startAt=${searchParameters.startAt}&maxResults=${searchParameters.maxResults}`)
        //TODO ?account_name

        if (!response.ok) {
            const message = `Groups sync failed ${response.status}:${response.statusText}.`
            console.log(message)
            console.log(`Error body: ${response.textSync()}`)
            return
        } else {
            responseMappings = response.jsonSync()
            console.log(`Group mappings response received, total: ${responseMappings.total}`)
            console.log(`Group received data: (${JSON.stringify(responseMappings)})`)

            let userGroupMappings = responseMappings.values.map(user => {
                return new UserGroupMapping(group.group_id, trimIdPrefix(user.accountId))
            })

            console.log(`Group mappings data: (${JSON.stringify(userGroupMappings)})`)
            console.log(`Saving ${userGroupMappings.length} to data store`)
            dataStore.save(UserGroupMapping.tableModel, userGroupMappings)

        }
        searchParameters.startAt += searchParameters.maxResults
    } while (searchParameters.startAt < responseMappings.total)
}

integration.define({
    synchronizations: [
        {
            name: "jiraUserGroups", // Logical name
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