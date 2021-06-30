const limit = 50
const isDebugLogsEnabled = false

function debugMsg(message) {
    if (isDebugLogsEnabled) {
        console.log(message)
    }
}

// Synchronization functions

async function fullSync(params) {
    params.context.siteIds = await getSiteIds(params)

    await Promise.all([syncMachines(params), syncSessions(params)])
}

async function incrementalSync(params) {
    await Promise.all([syncSessions(params)])
}

async function syncMachines(params) {
    let continuationToken
    const fields =
        'Id,AgentVersion,AssociatedUsers,MachineCatalog,DeliveryGroup,' +
        'DnsName,InMaintenanceMode,IPAddress,MachineType,LastConnectionFailure,' +
        'LastConnectionTime,LastConnectionUser,LastDeregistrationReason,LastDeregistrationTime,' +
        'LastErrorReason,LastErrorTime,Name,OSType,OSVersion,PersistUserChanges,PowerState,' +
        'ProvisioningType,RegistrationState,ScheduledReboot,SessionClientAddress,' +
        'SessionClientName,SessionCount,SessionProtocol,SessionStartTime,SessionState,' +
        'SessionStateChangeTime,SessionSupport,SessionUserName,SummaryState,' +
        'WillShutdownAfterUse,WindowsConnectionSetting,Zone,FaultState'

    let body = {}

    if (params.latestSynchronizationTime) {
        body = {
            SearchFilters: [
                {
                    Property: 'FaultState',
                    Value: 'None',
                    Operator: 'NotEquals',
                },
            ],
        }
        debugMsg('Incremental sync of Machines started.')
    } else {
        debugMsg('Sync of Machines started.')
    }

    for (const siteId of params.context.siteIds) {
        do {
            const response = await searchRequest(
                siteId,
                params,
                'Machines',
                continuationToken,
                fields,
                body,
            )

            try {
                continuationToken = response.ContinuationToken ?? null

                const machines = response.Items

                if (Array.isArray(machines) && machines.length > 0) {
                    for (const machine of machines) {
                        shapeMachine(machine, params.dataStore, siteId)
                    }
                    params.dataStore.save('machine', machines)
                } else {
                    console.log(
                        'WARNING: Endpoint Machines - Response is empty or in wrong format.',
                    )
                }
            } catch (error) {
                throw new Error(`Syncing Machines failed: (${error})`)
            }
        } while (continuationToken)
    }

    debugMsg('Sync of Machines finished.')
}

async function syncSessions(params) {
    let continuationToken
    const fields =
        'Id,ApplicationsInUse,AppState,Client,Connection,' +
        'Machine,SessionType,StartTime,State,StateChangeTime,User'

    let body = {
        SearchFilters: [
            {
                Property: 'SessionStateChangeTime',
                Value: 'LastMonth',
                Operator: 'IsWithin',
            },
        ],
    }

    if (params.latestSynchronizationTime) {
        body = {
            SearchFilters: [
                {
                    Property: 'SessionStateChangeTime',
                    Value: 'Last30Minutes',
                    Operator: 'IsWithin',
                },
            ],
        }
        debugMsg('Incremental sync of Sessions started.')
    } else {
        debugMsg('Sync of Sessions started.')
    }

    for (const siteId of params.context.siteIds) {
        do {
            const response = await searchRequest(
                siteId,
                params,
                'Sessions',
                continuationToken,
                fields,
                body,
            )

            try {
                continuationToken = response.ContinuationToken ?? null

                const sessions = response.Items

                if (Array.isArray(sessions) && sessions.length > 0) {
                    for (const session of sessions) {
                        shapeSession(session, params.dataStore, siteId)
                    }
                    params.dataStore.save('session', sessions)
                } else {
                    console.log(
                        'WARNING: Endpoint Sessions - Response is empty or in wrong format.',
                    )
                }
            } catch (error) {
                throw new Error(`Syncing Sessions failed: (${error})`)
            }
        } while (continuationToken)
    }

    debugMsg('Sync of Sessions finished.')
}

async function getSiteIds({client, integrationParameters}) {
    debugMsg('Started getting Site Ids.')

    let response = await client.fetch('/me', {
        headers: {
            'Citrix-CustomerId': integrationParameters.customerId,
        },
    })

    if (!response.ok) {
        console.log('Error body: ', await response.text())
        throw new Error(`Getting Site IDs failed(${response.status}: ${response.statusText})`)
    }

    response = await response.json()

    const siteIds = []

    try {
        response.Customers.forEach(customer =>
            customer.Sites.forEach(site => siteIds.push(site.Id)),
        )
    } catch (err) {
        console.error(err)
    }

    debugMsg('Finished getting Site IDs')

    return siteIds
}

async function searchRequest(
    siteId,
    {client, integrationParameters},
    entity,
    continuationToken,
    fields,
    body,
) {
    let path = `${siteId}/${entity}/$search?fields=${fields}&limit=${limit}`

    if (continuationToken) {
        path = `${path}&continuationToken=${continuationToken}`
    }
    const response = await client.fetch(path, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Citrix-CustomerId': integrationParameters.customerId,
        },
    })

    if (!response.ok) {
        console.log('Error body: ', await response.text())
        throw new Error(
            `Endpoint ${entity} - Request failed(${response.status}: ${response.statusText})`,
        )
    }
    console.log(entity + ' - response received, status: ' + response.status)

    return response.json()
}

function shapeMachine(machine, dataStore, siteId) {
    flatJson(machine, 'DeliveryGroup')
    flatJson(machine, 'LastConnectionUser')
    flatJson(machine, 'MachineCatalog')
    flatJson(machine, 'Zone')
    machine.Site_Id = siteId
    machine.LastConnectionTime = makeDate(machine.LastConnectionTime)
    machine.LastDeregistrationTime = makeDate(machine.LastDeregistrationTime)
    machine.LastErrorTime = makeDate(machine.LastErrorTime)
    machine.SessionStartTime = makeDate(machine.SessionStartTime)
    machine.SessionStateChangeTime = makeDate(machine.SessionStateChangeTime)

    // Store Associated Users for the Machine.
    if (machine.AssociatedUsers?.length > 0) {
        const machineAssociatedUsers = machine.AssociatedUsers.map(user => {
            user.Machine_Id = machine.Id
            return user
        })
        dataStore.save('machine_associated_user', machineAssociatedUsers)
    }

    return machine
}

function shapeSession(session, dataStore, siteId) {
    flatJson(session, 'Client')
    flatJson(session, 'Connection')
    flatJson(session, 'User')
    flatJson(session, 'Machine')
    flatJson(session, 'Machine_DeliveryGroup')
    flatJson(session, 'Machine_MachineCatalog')
    flatJson(session, 'Machine_Zone')
    session.Site_Id = siteId
    session.StartTime = makeDate(session.StartTime)
    session.StateChangeTime = makeDate(session.StateChangeTime)

    // Store Applications In Use for the Session.
    if (session.ApplicationsInUse?.length > 0) {
        const sessionsApplicationsInUse = session.ApplicationsInUse.map(app => {
            app.Session_Id = session.Id
            return app
        })
        dataStore.save('session_app_in_use', sessionsApplicationsInUse)
    }

    return session
}

function makeDate(date) {
    return date ? new Date(date) : null
}

function flatJson(json, oName) {
    if (json[oName] != null) {
        Object.entries(json[oName]).map(([key, value]) => (json[oName + '_' + key] = value))
        delete json[oName]
    }
    return json
}

// Actions functions

async function toggleMaintenanceMode(params) {
    const {actionParameters, integrationParameters, client} = params
    const path = `${actionParameters.siteId}/Machines/${actionParameters.id}`
    const body = {
        InMaintenanceMode: actionParameters.inMaintenanceMode,
    }

    const response = await client.fetch(path, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
            'Citrix-CustomerId': integrationParameters.customerId,
        },
    })

    if (!response.ok) {
        console.log('Error body: ', await response.text())
        throw new Error(
            `Setting maintenance mode failed (${response.status}: ${response.statusText})`,
        )
    }
}

async function rebootMachine(params) {
    const {actionParameters, integrationParameters, client, dataStore} = params
    const path = `${actionParameters.siteId}/Machines/${actionParameters.id}/$reboot?force=${actionParameters.force}`

    let machine = await client.fetch(path, {
        method: 'POST',
        headers: {
            'Citrix-CustomerId': integrationParameters.customerId,
        },
    })

    if (!machine.ok) {
        console.log('Error body: ', await machine.text())
        throw new Error(`Machine reboot failed (${machine.status}: ${machine.statusText})`)
    }

    try {
        machine = await machine.json()
        machine = shapeMachine(machine, dataStore, actionParameters.siteId)
        machine.SummaryState = 'Restarting'
        dataStore.save('machine', machine)
        debugMsg('Machine update was successful.')
    } catch (er) {
        throw new Error(`Storing Machine failed (${er})`)
    }
}

async function updateMachine(params) {
    const {actionParameters, client, integrationParameters, dataStore} = params
    const path = `${actionParameters.siteId}/Machines/${actionParameters.id}`

    let machine = await client.fetch(path, {
        headers: {
            'Citrix-CustomerId': integrationParameters.customerId,
        },
    })

    if (!machine.ok) {
        console.log('Error body: ', await machine.text())
        throw new Error(`Machine update failed (${machine.status}: ${machine.statusText})`)
    }

    try {
        machine = await machine.json()
        machine = shapeMachine(machine, dataStore, actionParameters.siteId)
        dataStore.save('machine', machine)
        debugMsg('Machine update was successful.')
    } catch (er) {
        throw new Error(`Storing Machine failed (${er})`)
    }
}

async function disconnectSession(params) {
    const state = await updateSession(params)

    if (state !== 404 && state !== 'Disconnected') {
        await sessionRequest(params, 'disconnect')
        const session = await updateSession(params)
        session.State = 'Diconnected'
        params.dataStore.save('session', session)
        debugMsg('Session was successfully disconnected.')
    }
}

async function logoffSession(params) {
    const state = await updateSession(params)
    const {dataStore, actionParameters} = params

    if (state !== 404) {
        await sessionRequest(params, 'logoff')
        dataStore.deleteById('session', actionParameters.id)
        debugMsg('Session was successfully logged off.')
    }
}

async function sessionRequest(params, action) {
    const {client, integrationParameters, actionParameters} = params
    const path = `${actionParameters.siteId}/Sessions/${actionParameters.id}/$${action}`

    const response = await client.fetch(path, {
        method: 'POST',
        headers: {
            'Citrix-CustomerId': integrationParameters.customerId,
        },
    })

    if (!response.ok) {
        console.log('Error body: ', await response.text())
        throw new Error(
            `Session disconnect / logoff failed (${response.status}: ${response.statusText})`,
        )
    }

    debugMsg('Session request was successful.')
}

async function updateSession(params) {
    const {actionParameters, client, integrationParameters, dataStore} = params
    const path = `${actionParameters.siteId}/Sessions/${actionParameters.id}`

    let session = await client.fetch(path, {
        headers: {
            'Citrix-CustomerId': integrationParameters.customerId,
        },
    })

    if (session.status === 404) {
        dataStore.deleteById('session', actionParameters.id)
        console.log('WARNING: The session was not found and was deleted from cache.')
        return session.status
    } else {
        if (!session.ok) {
            console.log('Error body: ', await session.text())
            throw new Error(`Session update failed (${session.status}: ${session.statusText})`)
        }

        try {
            session = await session.json()
            session = shapeSession(session, dataStore, actionParameters.siteId)
            dataStore.save('session', session)
            debugMsg('Session update was successful.')
            return session
        } catch (er) {
            throw new Error(`Storing Session failed (${er})`)
        }
    }
}

// Definitions

integration.define({
    synchronizations: [
        {
            name: 'sync',
            fullSyncFunction: fullSync,
            incrementalSyncFunction: incrementalSync,
        },
    ],
    actions: [
        {
            name: 'Toggle Maintenance Mode',
            parameters: [
                {
                    name: 'id',
                    type: 'STRING',
                    required: true,
                },
                {
                    name: 'inMaintenanceMode',
                    type: 'BOOLEAN',
                    required: true,
                },
                {
                    name: 'siteId',
                    type: 'STRING',
                    required: true,
                },
            ],
            function: toggleMaintenanceMode,
        },
        {
            name: 'Reboot Machine',
            parameters: [
                {
                    name: 'id',
                    type: 'STRING',
                    required: true,
                },
                {
                    name: 'force',
                    type: 'BOOLEAN',
                    required: true,
                },
                {
                    name: 'siteId',
                    type: 'STRING',
                    required: true,
                },
            ],
            function: rebootMachine,
        },
        {
            name: 'Disconnect Session',
            parameters: [
                {
                    name: 'id',
                    type: 'STRING',
                    required: true,
                },
                {
                    name: 'siteId',
                    type: 'STRING',
                    required: true,
                },
            ],
            function: disconnectSession,
        },
        {
            name: 'Logoff Session',
            parameters: [
                {
                    name: 'id',
                    type: 'STRING',
                    required: true,
                },
                {
                    name: 'siteId',
                    type: 'STRING',
                    required: true,
                },
            ],
            function: logoffSession,
        },
        {
            name: 'Update Session',
            parameters: [
                {
                    name: 'id',
                    type: 'STRING',
                    required: true,
                },
                {
                    name: 'siteId',
                    type: 'STRING',
                    required: true,
                },
            ],
            function: updateSession,
        },
        {
            name: 'Update Machine',
            parameters: [
                {
                    name: 'id',
                    type: 'STRING',
                    required: true,
                },
                {
                    name: 'siteId',
                    type: 'STRING',
                    required: true,
                },
            ],
            function: updateMachine,
        },
    ],
    model: {
        tables: [
            {
                name: 'machine',
                columns: [
                    {
                        name: 'AgentVersion',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'DeliveryGroup_Id',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'DeliveryGroup_Name',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'DnsName',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'FaultState',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'Id',
                        type: 'STRING',
                        length: 255,
                        primaryKey: true,
                    },
                    {
                        name: 'InMaintenanceMode',
                        type: 'BOOLEAN',
                    },
                    {
                        name: 'IPAddress',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'LastConnectionFailure',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'LastConnectionTime',
                        type: 'DATETIME',
                    },
                    {
                        name: 'LastConnectionUser_DisplayName',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'LastConnectionUser_Domain',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'LastConnectionUser_Name',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'LastConnectionUser_PrincipalName',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'LastDeregistrationReason',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'LastDeregistrationTime',
                        type: 'DATETIME',
                    },
                    {
                        name: 'LastErrorReason',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'LastErrorTime',
                        type: 'DATETIME',
                    },
                    {
                        name: 'MachineCatalog_Id',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'MachineCatalog_Name',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'MachineType',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'Name',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'OSType',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'OSVersion',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'PersistUserChanges',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'PowerState',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'ProvisioningType',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'RegistrationState',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'ScheduledReboot',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'SessionClientAddress',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'SessionClientName',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'SessionCount',
                        type: 'INTEGER',
                    },
                    {
                        name: 'SessionProtocol',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'SessionStartTime',
                        type: 'DATETIME',
                    },
                    {
                        name: 'SessionState',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'SessionStateChangeTime',
                        type: 'DATETIME',
                    },
                    {
                        name: 'SessionSupport',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'SessionUserName',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'SummaryState',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'WillShutdownAfterUse',
                        type: 'BOOLEAN',
                    },
                    {
                        name: 'WindowsConnectionSetting',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'Zone_Id',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'Zone_Name',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'Site_Id',
                        type: 'STRING',
                        length: 255,
                    },
                ],
            },
            {
                name: 'machine_associated_user',
                columns: [
                    {
                        name: 'Machine_Id',
                        type: 'STRING',
                        length: 255,
                        primaryKey: true,
                    },
                    {
                        name: 'DisplayName',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'Domain',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'Name',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'PrincipalName',
                        type: 'STRING',
                        length: 255,
                        primaryKey: true,
                    },
                ],
            },
            {
                name: 'session',
                columns: [
                    {
                        name: 'AppState',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'Client_Name',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'Connection_ConnectionMode',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'Id',
                        type: 'STRING',
                        length: 255,
                        primaryKey: true,
                    },
                    {
                        name: 'Machine_DeliveryGroup_Name',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'Machine_DnsName',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'Machine_MachineCatalog_Name',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'Machine_Name',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'Machine_SessionCount',
                        type: 'INTEGER',
                    },
                    {
                        name: 'Machine_SessionSupport',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'Machine_SummaryState',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'Machine_Zone_Name',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'SessionType',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'StartTime',
                        type: 'DATETIME',
                    },
                    {
                        name: 'State',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'StateChangeTime',
                        type: 'DATETIME',
                    },
                    {
                        name: 'User_DisplayName',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'User_Name',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'User_PrincipalName',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'Site_Id',
                        type: 'STRING',
                        length: 255,
                    },
                ],
            },
            {
                name: 'session_app_in_use',
                columns: [
                    {
                        name: 'Session_Id',
                        type: 'STRING',
                        length: 255,
                        primaryKey: true,
                    },
                    {
                        name: 'Id',
                        type: 'STRING',
                        length: 255,
                    },
                    {
                        name: 'Name',
                        type: 'STRING',
                        length: 255,
                        primaryKey: true,
                    },
                ],
            },
        ],
        relationships: [
            {
                name: 'machine_user',
                primaryTable: 'machine',
                foreignTable: 'machine_associated_user',
                columnPairs: [
                    {
                        primaryKey: 'Id',
                        foreignKey: 'Machine_Id',
                    },
                ],
            },
            {
                name: 'session_app',
                primaryTable: 'session',
                foreignTable: 'session_app_in_use',
                columnPairs: [
                    {
                        primaryKey: 'Id',
                        foreignKey: 'Session_Id',
                    },
                ],
            },
        ],
    },
    integrationParameters: [
        {
            name: 'customerId',
            label: 'Customer ID',
            type: 'STRING',
            required: true,
        },
    ],
})
