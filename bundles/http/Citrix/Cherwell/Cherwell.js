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
                        "type": "STRING",
                        "length": 16
                    },
                    {
                        "name": "Stat_SLAResolutionBreached",
                        "type": "STRING",
                        "length": 16
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
                        "type": "STRING",
                        "length": 16
                    },
                    {
                        "name": "Stat_SLAResolutionBreached",
                        "type": "STRING",
                        "length": 16
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

async function getRequest({ dataStore, client }, moduleName, body, endpoint) {
    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(body)
    };

    let resp = await client.fetch(endpoint, requestOptions);
    let moreRecords = true;
    if (resp.ok && resp.status === 200) {
        let data = await resp.json();
        let dataArray = [];
        let types = [];
        for (let i = 0, j = 0; i < data.records.length; i++) {
            dataArray[i] = JSON.parse(data.records[i]);
            dataArray[i].CreatedDateTime = new Date(dataArray[i].CreatedDateTime);
            dataArray[i].LastModifiedDateTime = new Date(dataArray[i].LastModifiedDateTime);
            dataArray[i].LastModDateTime = new Date(dataArray[i].LastModDateTime);
            dataArray[i].SLAResponseWarning = new Date(dataArray[i].SLAResponseWarning);
            dataArray[i].SLAResolutionWarning = new Date(dataArray[i].SLAResolutionWarning);

            if (moduleName == 'servicesIncidentTypes' || moduleName == 'categoriesIncidentTypes') {
                let obj = {
                    Service: dataArray[i].Service,
                    IncidentType: dataArray[i].IncidentType,
                    Category: dataArray[i].Category
                };
                let contains = false;
                if (moduleName == 'categoriesIncidentTypes') {
                    contains = await containsObjectCategories(obj, types);
                } else {
                    contains = await containsObjectServices(obj, types);
                }

                if (!contains) {
                    obj.id = j;
                    types.push(obj);
                    j++;
                }
            }
        }

        if (moduleName == 'servicesIncidentTypes' || moduleName == 'categoriesIncidentTypes') {
            dataArray = types;
        }

        let json = JSON.stringify(dataArray, null, '\t');
        dataStore.save(moduleName, json);
        if (data.recordCount < data.pageSize) {
            moreRecords = false;
        } else {
            moreRecords = true;
        }
    } else {
        moreRecords = false;
    }
    return moreRecords;
}

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

    while (moreRecords) {
        let endpoint = '/V1/object/UserInfo/search?page=' + page + '&pageSize=' + pageSize;
        moreRecords = await getRequest({ dataStore, client }, 'users', body, endpoint);
        page++;
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

    while (moreRecords) {
        let endpoint = '/V1/object/Customer/search?page=' + page + '&pageSize=' + pageSize;
        moreRecords = await getRequest({ dataStore, client }, 'customers', body, endpoint);
        page++;
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

    while (moreRecords) {
        let endpoint = '/V1/object/Incident/search?page=' + page + '&pageSize=' + pageSize;
        moreRecords = await getRequest({ dataStore, client }, 'incidents', body, endpoint);
        page++;
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

    while (moreRecords) {
        let endpoint = '/V1/object/Incident/search?page=' + page + '&pageSize=' + pageSize;
        moreRecords = await getRequest({ dataStore, client }, 'service_requests', body, endpoint);
        page++;
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

    while (moreRecords) {
        let endpoint = '/V1/object/Journal/search?page=' + page + '&pageSize=' + pageSize;
        moreRecords = await getRequest({ dataStore, client }, 'comments', body, endpoint);
        page++;
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

    while (moreRecords) {
        let endpoint = '/V1/object/Service/search?page=' + page + '&pageSize=' + pageSize;
        moreRecords = await getRequest({ dataStore, client }, 'services', body, endpoint);
        page++;
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

    while (moreRecords) {
        let endpoint = '/V1/object/IncidentCategory/search?page=' + page + '&pageSize=' + pageSize;
        moreRecords = await getRequest({ dataStore, client }, 'categories', body, endpoint);
        page++;
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

    while (moreRecords) {
        let endpoint = '/V1/object/IncidentSubCategory/search?page=' + page + '&pageSize=' + pageSize;
        moreRecords = await getRequest({ dataStore, client }, 'subcategories', body, endpoint);
        page++;
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

    while (moreRecords) {
        let endpoint = '/V1/object/IncidentSubCategory/search?page=' + page + '&pageSize=' + pageSize;
        moreRecords = await getRequest({ dataStore, client }, 'servicesIncidentTypes', body, endpoint);
        page++;
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

    while (moreRecords) {
        let endpoint = '/V1/object/IncidentSubCategory/search?page=' + page + '&pageSize=' + pageSize;
        moreRecords = await getRequest({ dataStore, client }, 'categoriesIncidentTypes', body, endpoint);
        page++;
    }
}

async function getIncidentSources({ dataStore, client }) {
    let page = 1;
    let moreRecords = true;
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

    while (moreRecords) {
        let endpoint = '/V1/object/Source/search?page=' + page + '&pageSize=' + pageSize;
        moreRecords = await getRequest({ dataStore, client }, 'sources', body, endpoint);
        page++;
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

    while (moreRecords) {
        let endpoint = '/V1/object/MobilePriority/search?page=' + page + '&pageSize=' + pageSize;
        moreRecords = await getRequest({ dataStore, client }, 'priorities', body, endpoint);
        page++;
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

    while (moreRecords) {
        let endpoint = '/V1/object/IncidentStatus/search?page=' + page + '&pageSize=' + pageSize;
        moreRecords = await getRequest({ dataStore, client }, 'statuses', body, endpoint);
        page++;
    }
}

async function postRequest({ client }, body, endpoint) {
    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(body)
    };
    return await client.fetch(endpoint, requestOptions);
}

async function patchRequest({ client }, body, endpoint) {
    let requestOptions = {
        method: 'PATCH',
        body: JSON.stringify(body)
    };
    return await client.fetch(endpoint, requestOptions);
}

async function createComment({ dataStore, client, actionParameters }) {
    let body = {
        comment: actionParameters.username + ': ' + actionParameters.comment
    }
    let endpoint = 'V1/object/Incident/' + actionParameters.incident_id + '/comments';
    let resp = await postRequest({ client }, body, endpoint);
    if (resp.ok) {
        if (resp.status === 200) {
            let dt = new Date();
            dt.setHours(dt.getHours() - 1);
            let latestSynchronizationTime = dt.toLocaleString();
            await getComments({ dataStore, client, latestSynchronizationTime });
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
    let endpoint = 'V1/object/Incident';
    let resp = await postRequest({ client }, body, endpoint);
    if (resp.ok) {
        if (resp.status === 200) {
            let dt = new Date();
            dt.setHours(dt.getHours() - 1);
            let latestSynchronizationTime = dt.toLocaleString();
            await getIncidents({ dataStore, client, latestSynchronizationTime });
        }
    }
}

async function withdrawIncident({ dataStore, client, actionParameters }) {
    actionParameters.datetime = actionParameters.datetime.toLocaleDateString() + " " + actionParameters.datetime.toLocaleTimeString();
    let body = {
        comment: "Request to cancel by " + actionParameters.username + " on " + actionParameters.datetime + " via Self Service Portal.\n " + actionParameters.comment
    };
    let endpoint = 'V1/object/incident/' + actionParameters.incident_id + '/comments';
    let resp = await postRequest({ client }, body, endpoint);
    if (resp.ok) {
        if (resp.status === 200) {
            let withdrawBody = {
                Status: "Resolved"
            }
            let withdrawEndpoint = 'V1/object/incident/' + actionParameters.incident_id;
            let withdrawResp = await patchRequest({ client }, withdrawBody, withdrawEndpoint);
            if (withdrawResp.ok) {
                if (withdrawResp.status === 200) {
                    let dt = new Date();
                    dt.setHours(dt.getHours() - 1);
                    let latestSynchronizationTime = dt.toLocaleString();
                    await getIncidents({ dataStore, client, latestSynchronizationTime });
                    await getServiceRequests({ dataStore, client, latestSynchronizationTime });
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
    let endpoint = 'V1/object/Incident';
    let resp = await postRequest({ client }, body, endpoint);
    if (resp.ok) {
        if (resp.status === 200) {
            let dt = new Date();
            dt.setHours(dt.getHours() - 1);
            let latestSynchronizationTime = dt.toLocaleString();
            await getServiceRequests({ dataStore, client, latestSynchronizationTime });
        }
    }
}

//Aux Functions
async function containsObjectServices(obj, list) {
    let i;
    for (i = 0; i < list.length; i++) {
        if (list[i].Service === obj.Service && list[i].IncidentType === obj.IncidentType) {
            return true;
        }
    }
    return false;
}

async function containsObjectCategories(obj, list) {
    let i;
    for (i = 0; i < list.length; i++) {
        if (list[i].Category === obj.Category && list[i].IncidentType === obj.IncidentType) {
            return true;
        }
    }
    return false;
}