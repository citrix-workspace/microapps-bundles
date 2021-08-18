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
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(body)
    };
    const resp = await client.fetch(endpoint, requestOptions);

    if (resp.ok && resp.status === 200) {
        const data = await resp.json();
        const dataArray = data.records.map(obj => {
            let rObj = JSON.parse(obj);
            rObj.CreatedDateTime = new Date(obj.CreatedDateTime);
            rObj.LastModifiedDateTime = new Date(obj.LastModifiedDateTime);
            rObj.LastModDateTime = new Date(obj.LastModDateTime);
            rObj.SLAResponseWarning = new Date(obj.SLAResponseWarning);
            rObj.SLAResolutionWarning = new Date(obj.SLAResolutionWarning);
            return rObj;
        });

        if (moduleName == 'servicesIncidentTypes' || moduleName == 'categoriesIncidentTypes') {
            let types = dataArray.map(obj => {
                const rType = {
                    Service: obj.Service,
                    IncidentType: obj.IncidentType,
                    Category: obj.Category
                };
                return rType;
            });;

            if (moduleName == 'categoriesIncidentTypes') {
                types = _.uniqBy(types, 'Category');
            } else {
                types = _.uniqBy(types, 'Service');
            }

            dataStore.save(moduleName, types);
        } else {
            dataStore.save(moduleName, dataArray);
        }

        return data.recordCount >= data.pageSize;
    } else {
        return false;
    }
}

async function getUsers({ dataStore, client, latestSynchronizationTime }) {
    let page = 1;
    let moreRecords = true;
    const filters = await buildFilters('Users', latestSynchronizationTime);
    const body = {
        filters: [
            {
                range: {
                    fieldName: filters.fieldName,
                    gte: filters.date
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
    const filters = await buildFilters('Customers', latestSynchronizationTime);
    const body = {
        filters: [
            {
                range: {
                    fieldName: filters.fieldName,
                    gte: filters.date
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
    const filters = await buildFilters('Incidents', latestSynchronizationTime);
    const body = {
        filters: [
            {
                field: {
                    fieldName: 'IncidentType',
                    searchTerm: 'Incident'
                },
                range: {
                    fieldName: filters.fieldName,
                    gte: filters.date
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
    const filters = await buildFilters('ServiceRequests', latestSynchronizationTime);
    const body = {
        filters: [
            {
                field: {
                    fieldName: 'IncidentType',
                    searchTerm: 'Service Request'
                },
                range: {
                    fieldName: filters.fieldName,
                    gte: filters.date
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
    const filters = await buildFilters('Comments', latestSynchronizationTime);
    const body = {
        filters: [
            {
                field: {
                    fieldName: 'ShowInSelfService',
                    searchTerm: 'true'
                },
                range: {
                    fieldName: filters.fieldName,
                    gte: filters.date
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
    const filters = await buildFilters('IncidentServices', latestSynchronizationTime);
    const body = {
        filters: [
            {
                field: {
                    fieldName: 'VisibleInPortal',
                    searchTerm: 'true'
                },
                range: {
                    fieldName: filters.fieldName,
                    gte: filters.date
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
    const body = {
        filters: [
            {
                field: {
                    fieldName: 'VisibleInPortal',
                    searchTerm: 'true'
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
    const body = {
        filters: [
            {
                field: {
                    fieldName: 'VisibleInPortal',
                    searchTerm: 'true'
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
    const body = {
        filters: [
            {
                field: {
                    fieldName: 'VisibleInPortal',
                    searchTerm: 'true'
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
    const body = {
        filters: [
            {
                field: {
                    fieldName: 'VisibleInPortal',
                    searchTerm: 'true'
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
    const body = {
        filters: [
            {
                field: {
                    fieldName: 'Source',
                    searchTerm: 'Portal'
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
    const filters = await buildFilters('IncidentPriorities', latestSynchronizationTime);
    const body = {
        filters: [
            {
                range: {
                    fieldName: filters.fieldName,
                    gte: filters.date
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
    const filters = await buildFilters('IncidentStatuses', latestSynchronizationTime);
    const body = {
        filters: [
            {
                range: {
                    fieldName: filters.fieldName,
                    gte: filters.date
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

async function createComment({ dataStore, client, actionParameters }) {
    const body = {
        comment: actionParameters.username + ': ' + actionParameters.comment
    }
    const endpoint = 'V1/object/Incident/' + actionParameters.incident_id + '/comments';
    const resp = await postRequest({ client }, body, endpoint);
    if (resp.ok && resp.status === 200) {
        let dt = new Date();
        dt.setHours(dt.getHours() - 1);
        const latestSynchronizationTime = dt.toLocaleString();
        await getComments({ dataStore, client, latestSynchronizationTime });
    } else {
        throw new Error(`Create comment Error (${resp.status}: ${resp.statusText})`);
    }
}

async function createIncident({ dataStore, client, actionParameters }) {
    const body = {
        Service: actionParameters.Service,
        Category: actionParameters.Category,
        Subcategory: actionParameters.Subcategory,
        Description: actionParameters.Description,
        CallSource: actionParameters.CallSource,
        CustomerDisplayName: actionParameters.CustomerDisplayName,
        CreatedByEmail: actionParameters.CreatedByEmail,
        PortalAffectsPrimaryFunction: actionParameters.PortalAffectsPrimaryFunction,
        PortalAffectsMultipleUsers: actionParameters.PortalAffectsMultipleUsers,
        IncidentType: 'Incident'
    };
    const endpoint = 'V1/object/Incident';
    const resp = await postRequest({ client }, body, endpoint);
    if (resp.ok && resp.status === 200) {
        let dt = new Date();
        dt.setHours(dt.getHours() - 1);
        const latestSynchronizationTime = dt.toLocaleString();
        await getIncidents({ dataStore, client, latestSynchronizationTime });
    } else {
        throw new Error(`Create Incident Error (${resp.status}: ${resp.statusText})`);
    }
}

async function withdrawIncident({ dataStore, client, actionParameters }) {
    actionParameters.datetime = actionParameters.datetime.toLocaleDateString() + ' ' + actionParameters.datetime.toLocaleTimeString();
    const body = {
        comment: 'Request to cancel by ' + actionParameters.username + ' on ' + actionParameters.datetime + ' via Self Service Portal.\n ' + actionParameters.comment
    };
    const endpoint = 'V1/object/incident/' + actionParameters.incident_id + '/comments';
    const resp = await postRequest({ client }, body, endpoint);
    if (resp.ok && resp.status === 200) {
        const withdrawBody = {
            Status: 'Resolved'
        }
        const withdrawEndpoint = 'V1/object/incident/' + actionParameters.incident_id;
        const withdrawResp = await patchRequest({ client }, withdrawBody, withdrawEndpoint);
        if (withdrawResp.ok && withdrawResp.status === 200) {
            let dt = new Date();
            dt.setHours(dt.getHours() - 1);
            const latestSynchronizationTime = dt.toLocaleString();
            await getIncidents({ dataStore, client, latestSynchronizationTime });
            await getServiceRequests({ dataStore, client, latestSynchronizationTime });
        }
    } else {
        throw new Error(`Withdraw Incident Error (${resp.status}: ${resp.statusText})`);
    }
}

async function createServiceRequest({ dataStore, client, actionParameters }) {
    const body = {
        Service: actionParameters.Service,
        Category: actionParameters.Category,
        Subcategory: actionParameters.Subcategory,
        Description: actionParameters.Description,
        CallSource: actionParameters.CallSource,
        CustomerDisplayName: actionParameters.CustomerDisplayName,
        CreatedByEmail: actionParameters.CreatedByEmail,
        IncidentType: 'Service Request'
    };
    const endpoint = 'V1/object/Incident';
    const resp = await postRequest({ client }, body, endpoint);
    if (resp.ok && resp.status === 200) {
        let dt = new Date();
        dt.setHours(dt.getHours() - 1);
        const latestSynchronizationTime = dt.toLocaleString();
        await getServiceRequests({ dataStore, client, latestSynchronizationTime });
    } else {
        throw new Error(`Create Service Request Error (${resp.status}: ${resp.statusText})`);
    }
}

//Aux Functions
async function postRequest({ client }, body, endpoint) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(body)
    };
    return await client.fetch(endpoint, requestOptions);
}

async function patchRequest({ client }, body, endpoint) {
    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify(body)
    };
    return await client.fetch(endpoint, requestOptions);
}

async function buildFilters(functionName, latestSynchronizationTime) {
    let date = '';
    let fieldName = '';
    const latestSynchronizationDate = new Date(latestSynchronizationTime).toISOString();

    switch (functionName) {
        case 'IncidentStatuses':
            date = latestSynchronizationTime === undefined ? '2000-01-01' : latestSynchronizationDate;
            fieldName = 'LastModifiedDateTime';
            break;
        case 'IncidentPriorities':
            date = latestSynchronizationTime === undefined ? '1900-01-01' : latestSynchronizationDate;
            fieldName = 'LastModDateTime';
            break;
        case 'Customers':
            date = latestSynchronizationTime === undefined ? '1900-01-01' : latestSynchronizationDate;
            fieldName = latestSynchronizationTime === undefined ? 'CreatedDateTime' : 'LastModDateTime';
            break;
        default:
            date = latestSynchronizationTime === undefined ? '1900-01-01' : latestSynchronizationDate;
            fieldName = latestSynchronizationTime === undefined ? 'CreatedDateTime' : 'LastModifiedDateTime';
            break;
    }
    return { fieldName, date }
}