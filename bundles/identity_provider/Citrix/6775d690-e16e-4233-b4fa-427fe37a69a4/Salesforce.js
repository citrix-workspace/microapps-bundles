const { User, Group, UserGroupMapping } = library.load("microapp-user-groups");
const _ = library.load('lodash');

function fullSync(params) {
    fullSyncUsers(params);
    fullSyncGroups(params);
    fullSyncUserGroupMapping(params);
}

function fullSyncUsers({ client, dataStore }) {

    const fetchPage = (url) => {
        const response = client.fetchSync(
            url
        );
        if (!response.ok) {
            console.log("Error status:", response.status, response.statusText);
            console.log("Error body:", response.textSync());
            throw new Error("Network response was not ok");
        }
        console.log("fetch done");
        const data = response.jsonSync()
        const users = data.records;

        let filteredUsers = _.uniqBy(users, 'Email');



        filteredUsers.map((user) =>
            console.log(
                user.Id,
                user.Name,
                user.Email,
                user.Username
            )
        );

        let MappedUsers = filteredUsers.map(
            (user) =>
                new User(
                    user.Username,
                    user.Name,
                    user.Email,
                    user.Department,
                    user.Username,
                    user.Id
                )
        );



        console.log(filteredUsers.length, users.length)

        dataStore.save(User.tableModel, MappedUsers);
        MappedUsers = MappedUsers.splice(-1)
        console.log(JSON.stringify(MappedUsers))

        console.log("next URL", data.nextRecordsUrl)
        if (data.nextRecordsUrl) {
            fetchPage(data.nextRecordsUrl)

        }
    }


    fetchPage(`/services/data/v51.0/query?q=Select%20Id,%20Email,%20Name,%20Username,%20Department%20From%20User%20where%20IsActive=true%20ORDER%20BY%20Email%20ASC`)

}

function fullSyncGroups({ client, dataStore }) {
    const fetchPage = (url) => {
        const response = client.fetchSync(
            url
        );
        if (!response.ok) {
            console.log("Error status:", response.status, response.statusText);
            console.log("Error body:", response.textSync());
            throw new Error("Network response was not ok");
        }
        console.log("fetch done");
        const data = response.jsonSync()
        const groups = data.records;




        dataStore.save(
            Group.tableModel,
            groups.map(
                (group) =>
                    new Group(
                        group.Id,
                        group.Name,
                        "/",
                        group.OwnerId,
                        group.Id,
                        null
                    )
            )
        );



        console.log("next URL", data.nextRecordsUrl)
        if (data.nextRecordsUrl) {
            fetchPage(data.nextRecordsUrl)

        }
    }


    fetchPage(`/services/data/v51.0/query?q=Select%20Id,%20Name,%20OwnerId%20From%20Group%20where%20type%20=%20%27Regular%27`)

}

function fullSyncUserGroupMapping({ client, dataStore }) {
    const fetchPage = (url) => {
        const response = client.fetchSync(
            url
        );
        if (!response.ok) {
            console.log("Error status:", response.status, response.statusText);
            console.log("Error body:", response.textSync());
            throw new Error("Network response was not ok");
        }
        console.log("fetch done");
        const data = response.jsonSync()
        const mappings = data.records;


        mappings.map((mapping) =>
            console.log(mapping.UserOrGroupId, mapping.GroupId)
        );
        dataStore.save(
            UserGroupMapping.tableModel,
            mappings.map(
                (mapping) =>
                    new UserGroupMapping(mapping.UserOrGroupId, mapping.GroupId)
            )
        );





        console.log("next URL", data.nextRecordsUrl)
        if (data.nextRecordsUrl) {
            fetchPage(data.nextRecordsUrl)

        }
    }


    fetchPage(`services/data/v51.0/query?q=Select%20Id,%20UserOrGroupId,%20GroupId%20From%20GroupMember`)

}


integration.define({
    synchronizations: [
        {
            name: "salesforceUserGroups", // Logical name
            fullSyncFunction: fullSync,
        },
    ],
    model: {
        tables: [User.tableModel, Group.tableModel, UserGroupMapping.tableModel],
    },
});