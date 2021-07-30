integration.define({
    "synchronizations": [
        {
            "name": "Users",
            "fullSyncFunction": getUsers,
            "incrementalSyncFunction": getUsers
        },
        {
            "name": "Customers",
            "fullSyncFunction": getCustomers,
            "incrementalSyncFunction": getCustomers
        },
        {
            "name": "Incidents",
            "fullSyncFunction": getIncidents,
            "incrementalSyncFunction": getIncidents
        },
        {
            "name": "ServiceRequests",
            "fullSyncFunction": getServiceRequests,
            "incrementalSyncFunction": getServiceRequests
        },
        {
            "name": "Comments",
            "fullSyncFunction": getComments,
            "incrementalSyncFunction": getComments
        },
        {
            "name": "Statuses",
            "fullSyncFunction": getIncidentStatuses,
            "incrementalSyncFunction": getIncidentStatuses
        },
        {
            "name": "Services",
            "fullSyncFunction": getIncidentServices,
            "incrementalSyncFunction": getIncidentServices
        },
        {
            "name": "Categories",
            "fullSyncFunction": getIncidentCategories
        },
        {
            "name": "SubCategories",
            "fullSyncFunction": getIncidentSubCategories
        },
        {
            "name": "Priorities",
            "fullSyncFunction": getIncidentPriorities,
            "incrementalSyncFunction": getIncidentPriorities
        },
        {
            "name": "Sources",
            "fullSyncFunction": getIncidentSources,
            "incrementalSyncFunction": getIncidentSources
        },
        {
            "name": "ServicesIncidentTypes",
            "fullSyncFunction": getServicesIncidentTypes
        },
        {
            "name": "CategoriesIncidentTypes",
            "fullSyncFunction": getCategoriesIncidentTypes
        }
    ],
    "actions": [
        {
            name: 'createComment',
            parameters: [
                {
                    name: 'incident_id',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'comment',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'username',
                    type: 'STRING',
                    required: true
                }
            ],
            "function": createComment
        },
        {
            name: 'createIncident',
            parameters: [
                {
                    name: 'Service',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'Category',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'Subcategory',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'Description',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'CustomerDisplayName',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'CreatedByEmail',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'CallSource',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'PortalAffectsPrimaryFunction',
                    type: 'BOOLEAN',
                    required: true
                },
                {
                    name: 'PortalAffectsMultipleUsers',
                    type: 'BOOLEAN',
                    required: true
                }
            ],
            "function": createIncident
        },
        {
            name: 'createServiceRequest',
            parameters: [
                {
                    name: 'Service',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'Category',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'Subcategory',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'Description',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'CustomerDisplayName',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'CreatedByEmail',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'CallSource',
                    type: 'STRING',
                    required: true
                }
            ],
            "function": createServiceRequest
        },
        {
            name: 'withdrawIncident',
            parameters: [
                {
                    name: 'incident_id',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'username',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'datetime',
                    type: 'DATETIME',
                    required: true
                },
                {
                    name: 'comment',
                    type: 'STRING',
                    required: true
                }
            ],
            "function": withdrawIncident
        }
    ],
    "model": {
        "tables": [
            {
                "name": "users",
                "columns": [
                    {
                        "name": "RecID",
                        "type": "STRING",
                        "length": 45,
                        "primaryKey": true
                    },
                    {
                        "name": "CreatedDateTime",
                        "type": "DATETIME",
                    },
                    {
                        "name": "CreatedBy",
                        "type": "STRING",
                        "length": 64,
                    },
                    {
                        "name": "LastModifiedDateTime",
                        "type": "DATETIME"
                    },
                    {
                        "name": "FullName",
                        "type": "STRING",
                        "length": 64
                    },
                    {
                        "name": "Department",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "Email",
                        "type": "STRING",
                        "length": 64
                    },
                    {
                        "name": "DefaultTeamName",
                        "type": "STRING",
                        "length": 64
                    }
                ]
            },
            {
                "name": "customers",
                "columns": [
                    {
                        "name": "RecID",
                        "type": "STRING",
                        "length": 45,
                        "primaryKey": true
                    },
                    {
                        "name": "CreatedDateTime",
                        "type": "DATETIME",
                    },
                    {
                        "name": "CreatedBy",
                        "type": "STRING",
                        "length": 64
                    },
                    {
                        "name": "LastModDateTime",
                        "type": "DATETIME"
                    },
                    {
                        "name": "FullName",
                        "type": "STRING",
                        "length": 64
                    },
                    {
                        "name": "Department",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "Email",
                        "type": "STRING",
                        "length": 64
                    },
                    {
                        "name": "DefaultTeamName",
                        "type": "STRING",
                        "length": 64
                    }
                ]
            },
            {
                "name": "incidents",
                "columns": [
                    {
                        "name": "RecID",
                        "type": "STRING",
                        "length": 45,
                        "primaryKey": true
                    },
                    {
                        "name": "IncidentID",
                        "type": "INTEGER"
                    },
                    {
                        "name": "CreatedDateTime",
                        "type": "DATETIME",
                    },
                    {
                        "name": "CreatedBy",
                        "type": "STRING",
                        "length": 64
                    },
                    {
                        "name": "Status",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "Service",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "Category",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "Subcategory",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "Description",
                        "type": "STRING",
                        "length": 255
                    },
                    {
                        "name": "Priority",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "AssignedTeam",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "AssignedTo",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "AssignedToID",
                        "type": "STRING",
                        "length": 64
                    },
                    {
                        "name": "LastModifiedDateTime",
                        "type": "DATETIME"
                    },
                    {
                        "name": "IncidentType",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "CreatedByEmail",
                        "type": "STRING",
                        "length": 64
                    },
                    {
                        "name": "Stat_SLAResponseBreached",
                        "type": "BOOLEAN"
                    },
                    {
                        "name": "Stat_SLAResolutionBreached",
                        "type": "BOOLEAN"
                    },
                    {
                        "name": "CallSource",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "SLAResponseWarning",
                        "type": "DATETIME"
                    },
                    {
                        "name": "SLAResolutionWarning",
                        "type": "DATETIME"
                    }
                ]
            },
            {
                "name": "service_requests",
                "columns": [
                    {
                        "name": "RecID",
                        "type": "STRING",
                        "length": 45,
                        "primaryKey": true
                    },
                    {
                        "name": "IncidentID",
                        "type": "INTEGER"
                    },
                    {
                        "name": "CreatedDateTime",
                        "type": "DATETIME",
                    },
                    {
                        "name": "CreatedBy",
                        "type": "STRING",
                        "length": 64
                    },
                    {
                        "name": "Status",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "Service",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "Category",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "Subcategory",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "Description",
                        "type": "STRING",
                        "length": 255
                    },
                    {
                        "name": "Priority",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "AssignedTeam",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "AssignedTo",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "AssignedToID",
                        "type": "STRING",
                        "length": 64
                    },
                    {
                        "name": "LastModifiedDateTime",
                        "type": "DATETIME"
                    },
                    {
                        "name": "IncidentType",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "CreatedByEmail",
                        "type": "STRING",
                        "length": 64
                    },
                    {
                        "name": "Stat_SLAResponseBreached",
                        "type": "BOOLEAN"
                    },
                    {
                        "name": "Stat_SLAResolutionBreached",
                        "type": "BOOLEAN"
                    },
                    {
                        "name": "CallSource",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "SLAResponseWarning",
                        "type": "DATETIME"
                    },
                    {
                        "name": "SLAResolutionWarning",
                        "type": "DATETIME"
                    }
                ]
            },
            {
                "name": "comments",
                "columns": [
                    {
                        "name": "RecID",
                        "type": "STRING",
                        "length": 45,
                        "primaryKey": true
                    },
                    {
                        "name": "JournalTypeName",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "CreatedDateTime",
                        "type": "DATETIME",
                    },
                    {
                        "name": "LastModifiedDateTime",
                        "type": "DATETIME"
                    },
                    {
                        "name": "LastModBy",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "ParentRecID",
                        "type": "STRING",
                        "length": 64
                    },
                    {
                        "name": "Details",
                        "type": "STRING",
                        "length": 1024
                    }
                ]
            },
            {
                "name": "statuses",
                "columns": [
                    {
                        "name": "RecID",
                        "type": "STRING",
                        "length": 45,
                        "primaryKey": true
                    },
                    {
                        "name": "Status",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "NextStatus",
                        "type": "STRING",
                        "length": 32
                    }
                ]
            },
            {
                "name": "services",
                "columns": [
                    {
                        "name": "RecID",
                        "type": "STRING",
                        "length": 45,
                        "primaryKey": true
                    },
                    {
                        "name": "Service",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "Description",
                        "type": "STRING",
                        "length": 510
                    }
                ]
            },
            {
                "name": "categories",
                "columns": [
                    {
                        "name": "RecID",
                        "type": "STRING",
                        "length": 45,
                        "primaryKey": true
                    },
                    {
                        "name": "IncidentCategory",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "CategoryDescription",
                        "type": "STRING",
                        "length": 1024
                    },
                    {
                        "name": "Service",
                        "type": "STRING",
                        "length": 32
                    }
                ]
            },
            {
                "name": "subcategories",
                "columns": [
                    {
                        "name": "RecID",
                        "type": "STRING",
                        "length": 45,
                        "primaryKey": true
                    },
                    {
                        "name": "Category",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "Subcategory",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "Service",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "IncidentType",
                        "type": "STRING",
                        "length": 32
                    }
                ]
            },
            {
                "name": "servicesIncidentTypes",
                "columns": [
                    {
                        "name": "id",
                        "type": "LONG",
                        "primaryKey": true
                    },
                    {
                        "name": "Service",
                        "type": "STRING",
                        "length": 32
                    },
                    {
                        "name": "IncidentType",
                        "type": "STRING",
                        "length": 32
                    }
                ]
            },
            {
                "name": "categoriesIncidentTypes",
                "columns": [
                    {
                        "name": "id",
                        "type": "LONG",
                        "primaryKey": true
                    },
                    {
                        "name": "Category",
                        "type": "STRING",
                        "length": 64
                    },
                    {
                        "name": "IncidentType",
                        "type": "STRING",
                        "length": 64
                    }
                ]
            },
            {
                "name": "sources",
                "columns": [
                    {
                        "name": "RecID",
                        "type": "STRING",
                        "length": 45,
                        "primaryKey": true
                    },
                    {
                        "name": "Source",
                        "type": "STRING",
                        "length": 64
                    }
                ]
            },
            {
                "name": "priorities",
                "columns": [
                    {
                        "name": "RecID",
                        "type": "STRING",
                        "length": 45,
                        "primaryKey": true
                    },
                    {
                        "name": "Priority",
                        "type": "INTEGER"
                    }
                ]
            }
        ]
    }
});

const pageSize = 200;

async function getUsers({ dataStore, client, latestSynchronizationTime }) {    
    let page = 1;
    let moreRecords = true;
    let date = '';
    let fieldName = '';

    if (latestSynchronizationTime === undefined) {
        date = '1900-01-01';
        fieldName = 'CreatedDateTime';
    } else {
        date = new Date(latestSynchronizationTime).toISOString();
        fieldName = 'LastModifiedDateTime';
    }

    let body = {
        filters: [
            {
                "range": {
                    "fieldName": fieldName,
                    "gte": date
                }
            }
        ]
    }

    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(body)
    };

    while (moreRecords) {
        let endpoint = '/V1/object/UserInfo/search?page=' + page + '&pageSize=' + pageSize;
        let resp = await client.fetch(endpoint, requestOptions);
        if (resp.ok) {
            if (resp.status === 200) {
                let usersData = await resp.json();
                let users = [];
                for (let i = 0; i < usersData.records.length; i++) {
                    users[i] = JSON.parse(usersData.records[i]);
                    users[i].CreatedDateTime = new Date(users[i].CreatedDateTime);
                    users[i].LastModifiedDateTime = new Date(users[i].LastModifiedDateTime);
                }
                let jsonUsers = JSON.stringify(users, null, '\t');
                dataStore.save("users", jsonUsers);
                if (usersData.recordCount < usersData.pageSize) {
                    moreRecords = false;
                } else {
                    page++;
                }
            } else {
                moreRecords = false;
            }
        } else {
            moreRecords = false;
        }
    }
}

async function getCustomers({ dataStore, client, latestSynchronizationTime }) {    
    let page = 1;
    let moreRecords = true;
    let date = '';
    let fieldName = '';

    if (latestSynchronizationTime === undefined) {
        date = '1900-01-01';
        fieldName = 'CreatedDateTime';
    } else {
        date = new Date(latestSynchronizationTime).toISOString();
        fieldName = 'LastModDateTime';
    }

    let body = {
        filters: [
            {
                "range": {
                    "fieldName": fieldName,
                    "gte": date
                }
            }
        ]
    }

    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(body)
    };

    while (moreRecords) {
        let endpoint = '/V1/object/Customer/search?page=' + page + '&pageSize=' + pageSize;
        let resp = await client.fetch(endpoint, requestOptions);
        if (resp.ok) {
            if (resp.status === 200) {
                let customersData = await resp.json();
                let customers = [];
                for (let i = 0; i < customersData.records.length; i++) {
                    customers[i] = JSON.parse(customersData.records[i]);
                    customers[i].CreatedDateTime = new Date(customers[i].CreatedDateTime);
                    customers[i].LastModDateTime = new Date(customers[i].LastModDateTime);
                }
                let jsonCustomers = JSON.stringify(customers, null, '\t');
                dataStore.save("customers", jsonCustomers);
                if (customersData.recordCount < customersData.pageSize) {
                    moreRecords = false;
                } else {
                    page++;
                }
            } else {
                moreRecords = false;
            }
        } else {
            moreRecords = false;
        }
    }
}

async function getIncidents({ dataStore, client, latestSynchronizationTime }) {    
    let page = 1;
    let moreRecords = true;
    let date = '';
    let fieldName = '';

    if (latestSynchronizationTime === undefined) {
        date = '1900-01-01';
        fieldName = 'CreatedDateTime';
    } else {
        date = new Date(latestSynchronizationTime).toISOString();
        fieldName = 'LastModifiedDateTime';
    }

    let body = {
        filters: [
            {
                "field": {
                    "fieldName": "IncidentType",
                    "searchTerm": "Incident"
                },
                "range": {
                    "fieldName": fieldName,
                    "gte": date
                }
            }
        ]
    }

    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(body)
    };

    while (moreRecords) {
        let endpoint = '/V1/object/Incident/search?page=' + page + '&pageSize=' + pageSize;
        let resp = await client.fetch(endpoint, requestOptions);
        if (resp.ok) {
            if (resp.status === 200) {
                let incidentsData = await resp.json();
                let incidents = [];
                for (let i = 0; i < incidentsData.records.length; i++) {
                    incidents[i] = JSON.parse(incidentsData.records[i]);
                    incidents[i].CreatedDateTime = new Date(incidents[i].CreatedDateTime);
                    incidents[i].LastModifiedDateTime = new Date(incidents[i].LastModifiedDateTime);
                    incidents[i].SLAResponseWarning = new Date(incidents[i].SLAResponseWarning);
                    incidents[i].SLAResolutionWarning = new Date(incidents[i].SLAResolutionWarning);
                }
                let jsonIncidents = JSON.stringify(incidents, null, '\t');
                dataStore.save("incidents", jsonIncidents);
                if (incidentsData.recordCount < incidentsData.pageSize) {
                    moreRecords = false;
                } else {
                    page++;
                }
            } else {
                moreRecords = false;
            }
        } else {
            moreRecords = false;
        }
    }
}

async function getServiceRequests({ dataStore, client, latestSynchronizationTime }) {    
    let page = 1;
    let moreRecords = true;
    let date = '';
    let fieldName = '';

    if (latestSynchronizationTime === undefined) {
        date = '1900-01-01';
        fieldName = 'CreatedDateTime';
    } else {
        date = new Date(latestSynchronizationTime).toISOString();
        fieldName = 'LastModifiedDateTime';
    }

    let body = {
        filters: [
            {
                "field": {
                    "fieldName": "IncidentType",
                    "searchTerm": "Service Request"
                },
                "range": {
                    "fieldName": fieldName,
                    "gte": date
                }
            }
        ]
    }

    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(body)
    };

    while (moreRecords) {
        let endpoint = '/V1/object/Incident/search?page=' + page + '&pageSize=' + pageSize;
        let resp = await client.fetch(endpoint, requestOptions);
        if (resp.ok) {
            if (resp.status === 200) {
                let serviceRequestData = await resp.json();
                let serviceRequests = [];
                for (let i = 0; i < serviceRequestData.records.length; i++) {
                    serviceRequests[i] = JSON.parse(serviceRequestData.records[i]);
                    serviceRequests[i].CreatedDateTime = new Date(serviceRequests[i].CreatedDateTime);
                    serviceRequests[i].LastModifiedDateTime = new Date(serviceRequests[i].LastModifiedDateTime);
                    serviceRequests[i].SLAResponseWarning = new Date(serviceRequests[i].SLAResponseWarning);
                    serviceRequests[i].SLAResolutionWarning = new Date(serviceRequests[i].SLAResolutionWarning);
                }
                let jsonServiceRequest = JSON.stringify(serviceRequests, null, '\t');
                dataStore.save("service_requests", jsonServiceRequest);
                if (serviceRequestData.recordCount < serviceRequestData.pageSize) {
                    moreRecords = false;
                } else {
                    page++;
                }
            } else {
                moreRecords = false;
            }
        } else {
            moreRecords = false;
        }
    }
}

async function getComments({ dataStore, client, latestSynchronizationTime }) {    
    let page = 1;
    let moreRecords = true;
    let date = '';
    let fieldName = '';

    if (latestSynchronizationTime === undefined) {
        date = '1900-01-01';
        fieldName = 'CreatedDateTime';
    } else {
        date = new Date(latestSynchronizationTime).toISOString();
        fieldName = 'LastModifiedDateTime';
    }

    let body = {
        filters: [
            {
                "field": {
                    "fieldName": "ShowInSelfService",
                    "searchTerm": "True"
                },
                "range": {
                    "fieldName": fieldName,
                    "gte": date
                }
            }
        ]
    }

    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(body)
    };

    while (moreRecords) {
        let endpoint = '/V1/object/Journal/search?page=' + page + '&pageSize=' + pageSize;
        let resp = await client.fetch(endpoint, requestOptions);
        if (resp.ok) {
            if (resp.status === 200) {
                let commentsData = await resp.json();
                let comments = [];
                for (let i = 0; i < commentsData.records.length; i++) {
                    comments[i] = JSON.parse(commentsData.records[i]);
                    comments[i].CreatedDateTime = new Date(comments[i].CreatedDateTime);
                    comments[i].LastModifiedDateTime = new Date(comments[i].LastModifiedDateTime);
                }
                let jsonComments = JSON.stringify(comments, null, '\t');
                dataStore.save("comments", jsonComments);
                if (commentsData.recordCount < commentsData.pageSize) {
                    moreRecords = false;
                } else {
                    page++;
                }
            } else {
                moreRecords = false;
            }
        } else {
            moreRecords = false;
        }
    }
}

async function getIncidentServices({ dataStore, client, latestSynchronizationTime }) {    
    let page = 1;
    let moreRecords = true;
    let fieldName = '';
    let date = '';

    if (latestSynchronizationTime === undefined) {
        date = '1900-01-01';
        fieldName = 'CreatedDateTime';
    } else {
        date = new Date(latestSynchronizationTime).toISOString();
        fieldName = 'LastModifiedDateTime';
    }

    let body = {
        filters: [
            {
                field: {
                    fieldName: "VisibleInPortal",
                    searchTerm: "true"
                },
                "range": {
                    "fieldName": fieldName,
                    "gte": date
                }
            }
        ]
    }

    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(body)
    };

    while (moreRecords) {
        let endpoint = '/V1/object/Service/search?page=' + page + '&pageSize=' + pageSize;
        let resp = await client.fetch(endpoint, requestOptions);
        if (resp.ok) {
            if (resp.status === 200) {
                let servicesData = await resp.json();
                let services = [];
                for (let i = 0; i < servicesData.records.length; i++) {
                    services[i] = JSON.parse(servicesData.records[i]);
                }
                let jsonServices = JSON.stringify(services, null, '\t');
                dataStore.save("services", jsonServices);
                if (servicesData.recordCount < servicesData.pageSize) {
                    moreRecords = false;
                } else {
                    page++;
                }
            } else {
                moreRecords = false;
            }
        } else {
            moreRecords = false;
        }
    }
}

async function getIncidentCategories({ dataStore, client }) {
    
    let page = 1;
    let moreRecords = true;
    let body = {
        filters: [
            {
                field: {
                    fieldName: "VisibleInPortal",
                    searchTerm: "true"
                }
            }
        ]
    }

    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(body)
    };

    while (moreRecords) {
        let endpoint = '/V1/object/IncidentCategory/search?page=' + page + '&pageSize=' + pageSize;
        let resp = await client.fetch(endpoint, requestOptions);
        if (resp.ok) {
            if (resp.status === 200) {
                let categoriesData = await resp.json();
                let categories = [];
                for (let i = 0; i < categoriesData.records.length; i++) {
                    categories[i] = JSON.parse(categoriesData.records[i]);
                }
                let jsonCategories = JSON.stringify(categories, null, '\t');
                dataStore.save("categories", jsonCategories);
                if (categoriesData.recordCount < categoriesData.pageSize) {
                    moreRecords = false;
                } else {
                    page++;
                }
            } else {
                moreRecords = false;
            }
        } else {
            moreRecords = false;
        }
    }
}

async function getIncidentSubCategories({ dataStore, client }) {    
    let page = 1;
    let moreRecords = true;
    let body = {
        filters: [
            {
                field: {
                    fieldName: "VisibleInPortal",
                    searchTerm: "true"
                }
            }
        ]
    }

    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(body)
    };

    while (moreRecords) {
        let endpoint = '/V1/object/IncidentSubCategory/search?page=' + page + '&pageSize=' + pageSize;
        let resp = await client.fetch(endpoint, requestOptions);
        if (resp.ok) {
            if (resp.status === 200) {
                let subcategoriesData = await resp.json();
                let subcategories = [];
                for (let i = 0; i < subcategoriesData.records.length; i++) {
                    subcategories[i] = JSON.parse(subcategoriesData.records[i]);
                }
                let jsonSubcategories = JSON.stringify(subcategories, null, '\t');
                dataStore.save("subcategories", jsonSubcategories);
                if (subcategoriesData.recordCount < subcategoriesData.pageSize) {
                    moreRecords = false;
                } else {
                    page++;
                }
            } else {
                moreRecords = false;
            }
        } else {
            moreRecords = false;
        }
    }
}

async function getServicesIncidentTypes({ dataStore, client }) {    
    let page = 1;
    let moreRecords = true;
    let body = {
        filters: [
            {
                field: {
                    fieldName: "VisibleInPortal",
                    searchTerm: "true"
                }
            }
        ]
    }

    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(body)
    };

    while (moreRecords) {
        let endpoint = '/V1/object/IncidentSubCategory/search?page=' + page + '&pageSize=' + pageSize;
        let resp = await client.fetch(endpoint, requestOptions);
        if (resp.ok) {
            if (resp.status === 200) {
                let servicesIncidentTypesData = await resp.json();
                let servicesIncidentTypes = [];
                for (let i = 0, j = 0; i < servicesIncidentTypesData.records.length; i++) {
                    let jsonObj = JSON.parse(servicesIncidentTypesData.records[i])
                    let obj = {
                        Service: jsonObj.Service,
                        IncidentType: jsonObj.IncidentType,
                    };
                    let contains = await containsObjectServices(obj, servicesIncidentTypes);
                    if (!contains) {
                        obj.id = j;
                        servicesIncidentTypes.push(obj);
                        j++;
                    }
                }
                let jsonServicesIncidentTypes = JSON.stringify(servicesIncidentTypes, null, '\t');
                dataStore.save("servicesIncidentTypes", jsonServicesIncidentTypes);
                if (servicesIncidentTypesData.recordCount < servicesIncidentTypesData.pageSize) {
                    moreRecords = false;
                } else {
                    page++;
                }
            } else {
                moreRecords = false;
            }
        } else {
            moreRecords = false;
        }
    }
}

async function getCategoriesIncidentTypes({ dataStore, client }) {    
    let page = 1;
    let moreRecords = true;
    let body = {
        filters: [
            {
                field: {
                    fieldName: "VisibleInPortal",
                    searchTerm: "true"
                }
            }
        ]
    }

    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(body)
    };

    while (moreRecords) {
        let endpoint = '/V1/object/IncidentSubCategory/search?page=' + page + '&pageSize=' + pageSize;
        let resp = await client.fetch(endpoint, requestOptions);
        if (resp.ok) {
            if (resp.status === 200) {
                let categoriesIncidentTypesData = await resp.json();
                let categoriesIncidentTypes = [];
                for (let i = 0, j = 0; i < categoriesIncidentTypesData.records.length; i++) {
                    let jsonObj = JSON.parse(categoriesIncidentTypesData.records[i])
                    let obj = {
                        Category: jsonObj.Category,
                        IncidentType: jsonObj.IncidentType,
                    };
                    let contains = await containsObjectCategories(obj, categoriesIncidentTypes);
                    if (!contains) {
                        obj.id = j;
                        categoriesIncidentTypes.push(obj);
                        j++;
                    }
                }
                let jsonCategoriesIncidentTypes = JSON.stringify(categoriesIncidentTypes, null, '\t');
                dataStore.save("categoriesIncidentTypes", jsonCategoriesIncidentTypes);
                if (categoriesIncidentTypesData.recordCount < categoriesIncidentTypesData.pageSize) {
                    moreRecords = false;
                } else {
                    page++;
                }
            } else {
                moreRecords = false;
            }
        } else {
            moreRecords = false;
        }
    }
}

async function getIncidentSources({ dataStore, client, latestSynchronizationTime }) {    
    let page = 1;
    let moreRecords = true;
    let date = '';

    if (latestSynchronizationTime === undefined) {
        date = '1900-01-01';
    } else {
        date = new Date(latestSynchronizationTime).toISOString();
    }

    let body = {
        filters: [
            {
                field: {
                    fieldName: "Source",
                    searchTerm: "Portal"
                }
            }
        ]
    }

    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(body)
    };

    while (moreRecords) {
        let endpoint = '/V1/object/Source/search?page=' + page + '&pageSize=' + pageSize;
        let resp = await client.fetch(endpoint, requestOptions);
        if (resp.ok) {
            if (resp.status === 200) {
                let sourcesData = await resp.json();
                let sources = [];
                for (let i = 0; i < sourcesData.records.length; i++) {
                    sources[i] = JSON.parse(sourcesData.records[i]);
                }
                let jsonSources = JSON.stringify(sources, null, '\t');
                dataStore.save("sources", jsonSources);
                if (sourcesData.recordCount < sourcesData.pageSize) {
                    moreRecords = false;
                } else {
                    page++;
                }
            } else {
                moreRecords = false;
            }
        } else {
            moreRecords = false;
        }
    }
}

async function getIncidentPriorities({ dataStore, client, latestSynchronizationTime }) {    
    let page = 1;
    let moreRecords = true;
    let date = '';

    if (latestSynchronizationTime === undefined) {
        date = '1900-01-01';
    } else {
        date = new Date(latestSynchronizationTime).toISOString();
    }

    let body = {
        filters: [
            {
                range: {
                    fieldName: "LastModDateTime",
                    gte: date
                }
            }
        ]
    }

    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(body)
    };

    while (moreRecords) {
        let endpoint = '/V1/object/MobilePriority/search?page=' + page + '&pageSize=' + pageSize;
        let resp = await client.fetch(endpoint, requestOptions);
        if (resp.ok) {
            if (resp.status === 200) {
                let prioritiesData = await resp.json();
                let priorities = [];
                for (let i = 0; i < prioritiesData.records.length; i++) {
                    priorities[i] = JSON.parse(prioritiesData.records[i]);
                }
                let jsonPriorities = JSON.stringify(priorities, null, '\t');
                dataStore.save("priorities", jsonPriorities);
                if (prioritiesData.recordCount < prioritiesData.pageSize) {
                    moreRecords = false;
                } else {
                    page++;
                }
            } else {
                moreRecords = false;
            }
        } else {
            moreRecords = false;
        }
    }
}

async function getIncidentStatuses({ dataStore, client, latestSynchronizationTime }) {    
    let page = 1;
    let moreRecords = true;
    let date = '';

    if (latestSynchronizationTime === undefined) {
        date = '2000-01-01';
    } else {
        date = new Date(latestSynchronizationTime).toISOString();
    }

    let body = {
        filters: [
            {
                range: {
                    fieldName: "LastModifiedDateTime",
                    gte: date
                }
            }
        ]
    }

    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(body)
    };

    while (moreRecords) {
        let endpoint = '/V1/object/IncidentStatus/search?page=' + page + '&pageSize=' + pageSize;
        let resp = await client.fetch(endpoint, requestOptions);
        if (resp.ok) {
            if (resp.status === 200) {
                let statusesData = await resp.json();
                let statuses = [];
                for (let i = 0; i < statusesData.records.length; i++) {
                    statuses[i] = JSON.parse(statusesData.records[i]);
                }
                let jsonStatuses = JSON.stringify(statuses, null, '\t');
                dataStore.save("statuses", jsonStatuses);
                if (statusesData.recordCount < statusesData.pageSize) {
                    moreRecords = false;
                } else {
                    page++;
                }
            } else {
                moreRecords = false;
            }
        } else {
            moreRecords = false;
        }
    }
}

async function createComment({ dataStore, client, actionParameters }) {
    let body = {
        comment: actionParameters.username + ': ' + actionParameters.comment
    }
    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(body)
    };
    let endpoint = 'V1/object/Incident/' + actionParameters.incident_id + '/comments';
    let resp = await client.fetch(endpoint, requestOptions);
    if (resp.ok) {
        if (resp.status === 200) {
            let commentBody = {
                filters: [
                    {
                        "field": {
                            "fieldName": "RecId",
                            "searchTerm": JSON.parse(resp._bodyInit).messages.commentid
                        }
                    }
                ]
            }
            let commentRequestOptions = {
                method: 'POST',
                body: JSON.stringify(commentBody)
            };
            let commentEndpoint = '/V1/object/Journal/search?page=1&pageSize=1';
            let commentResp = await client.fetch(commentEndpoint, commentRequestOptions);
            if (commentResp.ok) {
                if (commentResp.status === 200) {
                    let commentsData = await commentResp.json();
                    let comments = [];
                    for (let i = 0; i < commentsData.records.length; i++) {
                        comments[i] = JSON.parse(commentsData.records[i]);
                        comments[i].CreatedDateTime = new Date(comments[i].CreatedDateTime);
                        comments[i].LastModifiedDateTime = new Date(comments[i].LastModifiedDateTime);
                    }
                    let jsonComments = JSON.stringify(comments, null, '\t');
                    dataStore.save("comments", jsonComments);
                }
            }
        }
    }
}

async function createIncident({ dataStore, client, actionParameters }) {
    let body = {
        Service: actionParameters.Service,
        Category: actionParameters.Category,
        Subcategory: actionParameters.Subcategory,
        Description: actionParameters.Description,
        CallSource: actionParameters.CallSource,
        CustomerDisplayName: actionParameters.CustomerDisplayName,
        CreatedByEmail: actionParameters.CreatedByEmail,
        PortalAffectsPrimaryFunction: actionParameters.PortalAffectsPrimaryFunction,
        PortalAffectsMultipleUsers: actionParameters.PortalAffectsMultipleUsers,
        IncidentType: "Incident"
    };
    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(body)
    };
    let endpoint = 'V1/object/Incident';
    let resp = await client.fetch(endpoint, requestOptions);
    if (resp.ok) {
        if (resp.status === 200) {
            let incidentBody = {
                filters: [
                    {
                        "field": {
                            "fieldName": "RecId",
                            "searchTerm": JSON.parse(resp._bodyInit).busObRecId
                        }
                    }
                ]
            }
            let incidentRequestOptions = {
                method: 'POST',
                body: JSON.stringify(incidentBody)
            };
            let incidentEndpoint = '/V1/object/Incident/search?page=1&pageSize=1';
            let incidentResp = await client.fetch(incidentEndpoint, incidentRequestOptions);
            if (incidentResp.ok) {
                if (incidentResp.status === 200) {
                    let incidentsData = await incidentResp.json();
                    let incidents = [];
                    for (let i = 0; i < incidentsData.records.length; i++) {
                        incidents[i] = JSON.parse(incidentsData.records[i]);
                        incidents[i].CreatedDateTime = new Date(incidents[i].CreatedDateTime);
                        incidents[i].LastModifiedDateTime = new Date(incidents[i].LastModifiedDateTime);
                        incidents[i].SLAResponseWarning = new Date(incidents[i].SLAResponseWarning);
                        incidents[i].SLAResolutionWarning = new Date(incidents[i].SLAResolutionWarning);
                    }
                    let jsonincidents = JSON.stringify(incidents, null, '\t');
                    dataStore.save("incidents", jsonincidents);
                }
            }
        }
    }
}

async function withdrawIncident({ dataStore, client, actionParameters }) {
    actionParameters.datetime = actionParameters.datetime.toLocaleDateString() + " " + actionParameters.datetime.toLocaleTimeString();
    let body = {
        comment: "Request to cancel by " + actionParameters.username + " on " + actionParameters.datetime + " via Self Service Portal.\n " + actionParameters.comment
    };
    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(body)
    };
    let endpoint = 'V1/object/incident/' + actionParameters.incident_id + '/comments';
    let resp = await client.fetch(endpoint, requestOptions);
    if (resp.ok) {
        if (resp.status === 200) {
            let withdrawBody = {
                Status: "Resolved"
            }
            let withdrawRequestOptions = {
                method: 'PATCH',
                body: JSON.stringify(withdrawBody)
            };
            let withdrawEndpoint = 'V1/object/incident/' + actionParameters.incident_id;
            let withdrawResp = await client.fetch(withdrawEndpoint, withdrawRequestOptions);
            if (withdrawResp.ok) {
                if (withdrawResp.status === 200) {
                    let incidentBody = {
                        filters: [
                            {
                                "field": {
                                    "fieldName": "RecId",
                                    "searchTerm": actionParameters.incident_id
                                }
                            }
                        ]
                    }
                    let incidentRequestOptions = {
                        method: 'POST',
                        body: JSON.stringify(incidentBody)
                    };
                    let incidentEndpoint = '/V1/object/Incident/search?page=1&pageSize=1';
                    let incidentResp = await client.fetch(incidentEndpoint, incidentRequestOptions);
                    if (incidentResp.ok) {
                        if (incidentResp.status === 200) {
                            let incidentsData = await incidentResp.json();
                            let incidents = [];
                            for (let i = 0; i < incidentsData.records.length; i++) {
                                incidents[i] = JSON.parse(incidentsData.records[i]);
                                incidents[i].CreatedDateTime = new Date(incidents[i].CreatedDateTime);
                                incidents[i].LastModifiedDateTime = new Date(incidents[i].LastModifiedDateTime);
                                incidents[i].SLAResponseWarning = new Date(incidents[i].SLAResponseWarning);
                                incidents[i].SLAResolutionWarning = new Date(incidents[i].SLAResolutionWarning);
                            }
                            let jsonincidents = JSON.stringify(incidents, null, '\t');
                            if (incidents[0].IncidentType == 'Incident') {
                                dataStore.save("incidents", jsonincidents);
                            } else {
                                dataStore.save("service_requests", jsonincidents);
                            }
                        }
                    }
                }
            }
        }
    }
}

async function createServiceRequest({ dataStore, client, actionParameters }) {
    let body = {
        Service: actionParameters.Service,
        Category: actionParameters.Category,
        Subcategory: actionParameters.Subcategory,
        Description: actionParameters.Description,
        CallSource: actionParameters.CallSource,
        CustomerDisplayName: actionParameters.CustomerDisplayName,
        CreatedByEmail: actionParameters.CreatedByEmail,
        IncidentType: "Service Request"
    };
    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(body)
    };
    let endpoint = 'V1/object/Incident';
    let resp = await client.fetch(endpoint, requestOptions);
    if (resp.ok) {
        if (resp.status === 200) {
            let serviceRequestBody = {
                filters: [
                    {
                        "field": {
                            "fieldName": "RecId",
                            "searchTerm": JSON.parse(resp._bodyInit).busObRecId
                        }
                    }
                ]
            }
            let serviceRequestRequestOptions = {
                method: 'POST',
                body: JSON.stringify(serviceRequestBody)
            };
            let serviceRequestEndpoint = '/V1/object/Incident/search?page=1&pageSize=1';
            let serviceRequestResp = await client.fetch(serviceRequestEndpoint, serviceRequestRequestOptions);
            if (serviceRequestResp.ok) {
                if (serviceRequestResp.status === 200) {
                    let serviceRequestsData = await serviceRequestResp.json();
                    let serviceRequests = [];
                    for (let i = 0; i < serviceRequestsData.records.length; i++) {
                        serviceRequests[i] = JSON.parse(serviceRequestsData.records[i]);
                        serviceRequests[i].CreatedDateTime = new Date(serviceRequests[i].CreatedDateTime);
                        serviceRequests[i].LastModifiedDateTime = new Date(serviceRequests[i].LastModifiedDateTime);
                        serviceRequests[i].SLAResponseWarning = new Date(serviceRequests[i].SLAResponseWarning);
                        serviceRequests[i].SLAResolutionWarning = new Date(serviceRequests[i].SLAResolutionWarning);
                    }
                    let jsonserviceRequests = JSON.stringify(serviceRequests, null, '\t');
                    dataStore.save("service_requests", jsonserviceRequests);
                }
            }
        }
    }
}

async function containsObjectServices(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].Service === obj.Service && list[i].IncidentType === obj.IncidentType) {
            return true;
        }
    }
    return false;
}

async function containsObjectCategories(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].Category === obj.Category && list[i].IncidentType === obj.IncidentType) {
            return true;
        }
    }
    return false;
}