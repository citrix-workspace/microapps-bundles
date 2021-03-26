const pageSize = 100

function fullSync ({ client, dataStore, integrationParameters }) {
  const credentials = getCredentials(client, integrationParameters)

  syncProjects({client, dataStore, credentials})
  syncUsers({client, dataStore, credentials})
  syncViews({ client, dataStore, credentials })
  syncWorkbooks({client, dataStore, credentials})
}

async function syncProjects({ client, dataStore, credentials }) {
  let pageNumber = 0
  let totalAvailable = 0

  do {
    pageNumber++

    console.log('projects page ' + pageNumber)

    await request(client, 'projects', credentials, pageNumber)
    .then(body => {
      totalAvailable = parseInt(body.pagination.totalAvailable)
      const projects = body.projects.project
      
      if (body.projects !== undefined && Array.isArray(projects) && projects.length > 0){
        dataStore.save('projects', projects)
      } else {
        console.log('WARNING: Endpoint projects - Bad or empty response')
      }
      
      if (body.pagination == undefined || totalAvailable == null||undefined) {
        console.log('WARNING: Endpoint projects - No pagination attribute in response')
        totalAvailable = 0
      }
    })
  } while (pageSize * pageNumber < totalAvailable)
}

async function syncUsers({ client, dataStore, credentials }) {
  let pageNumber = 0
  let totalAvailable = 0

  do {
    pageNumber++

    console.log('users page ' + pageNumber)

    await request(client, 'users', credentials, pageNumber)
    .then(body => {
      totalAvailable = parseInt(body.pagination.totalAvailable)
      const users = body.users.user

      if (body.users !== undefined && Array.isArray(users) && users.length > 0){
        dataStore.save('users', users)
      } else {
        console.log('WARNING: Endpoint users - Bad or empty response')
      }
      
      if (body.pagination == undefined || totalAvailable == null||undefined) {
        console.log('WARNING: Endpoint users - No pagination attribute in response')
        totalAvailable = 0
      }
    })
  } while (pageSize * pageNumber < totalAvailable)
}

async function syncViews({ client, dataStore, credentials }) {
  let pageNumber = 0
  let totalAvailable = 0

  do {
    pageNumber++
    console.log('views page ' + pageNumber)

    await request(client, 'views', credentials, pageNumber)
    .then(body => {
      totalAvailable = parseInt(body.pagination.totalAvailable)
      const views = body.views.view

      if (body.views !== undefined && Array.isArray(views) && views.length > 0) {
        views.forEach(view => { // flaten nested JSONs
          flatJson(view, 'workbook', 'workbook_')
          flatJson(view, 'owner', 'owner_')
          flatJson(view, 'project', 'project_')
        })
        dataStore.save('views', views)
      } else {
        console.log('WARNING: Endpoint views - Bad or empty response')
      }

      if (body.pagination == undefined || totalAvailable == null||undefined) {
          console.log('WARNING: Endpoint views - No pagination attribute in response')
          totalAvailable = 0
      }
    })
  } while (pageSize * pageNumber < totalAvailable)
}

async function syncWorkbooks ({ client, dataStore, credentials }) {
  let pageNumber = 0
  let totalAvailable = 0

  do {
    pageNumber++
    console.log('workbooks page ' + pageNumber)

    await request(client, 'workbooks', credentials, pageNumber)
    .then(body => {
      totalAvailable = parseInt(body.pagination.totalAvailable)
      const workbooks = body.workbooks.workbook

      if (body.workbooks !== undefined && Array.isArray(workbooks) && workbooks.length > 0) {
        workbooks.forEach(workbook => { // flaten nested JSONs
          flatJson(workbook, 'owner', 'owner_')
          flatJson(workbook, 'project', 'project_')

          // convert showTabs to boolean
          if (workbook.showTabs === 'true') {
            workbook.showTabs = true
          } else { workbook.showTabs = false }

          // convert size to integer
          const workbookSize = parseInt(workbook.size)
          if (!isNaN(workbookSize)) {
            workbook.size = workbookSize
          } else {
            delete workbook.size
          }
        })
        dataStore.save('workbooks', workbooks)
      } else {
        console.log('WARNING: Endpoint workbooks - Bad or empty response')
      }

      if (body.pagination == undefined || totalAvailable == null||undefined) {
        console.log('WARNING: Endpoint workbooks - No pagination attribute in response')
        totalAvailable = 0
      }
    })
  } while (pageSize * pageNumber < totalAvailable)
}

function getCredentials (client, params) {
  const request = {
    credentials: {
      name: `${params.username}`,
      password: `${params.password}`,
      site: {
        contentUrl: `${params.site}`
      }
    }
  }

  const credentialsResponse = client.fetchSync('/api/3.7/auth/signin', {
    method: 'POST',
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!credentialsResponse.ok) {
    throw new Error(`Auth Request failed(${credentialsResponse.status}: ${credentialsResponse.statusText})`)
  }

  return credentialsResponse.jsonSync().credentials
}

function request(client, entity, credentials, pageNumber) {
  let path

  if (entity === 'users') {
    path = 'api/3.7/sites/' + credentials.site.id + '/' + entity + '?fields=_all_&pageSize=' + pageSize + '&pageNumber=' + pageNumber
  } else {
    path = 'api/3.7/sites/' + credentials.site.id + '/' + entity + '?pageSize=' + pageSize + '&pageNumber=' + pageNumber
  }

  const response = client.fetchSync(path,
    {
      headers: {
        'X-Tableau-Auth': credentials.token
      }
    })

  if (!response.ok) {
    console.log(`WARNING: Endpoint ${entity} - Request failed(${response.status}: ${response.statusText})`)
  }
  console.log(entity + ' response received, status: ' + response.status)

  return response.json()
}

function flatJson (json, oName, prefix) { // currently we are able to store only flat json object, so all nested object must be flattened
  if (json[oName] !== undefined) {
    Object.entries(json[oName]).forEach(
      ([key, value]) => { json[prefix + key] = value })
    delete json[oName]
  }
  return json
}

integration.define({
  synchronizations: [
    {
      name: 'fullSync',
      fullSyncFunction: fullSync
    }
  ],
  model: {
    tables: [
      {
        name: 'projects',
        columns: [
          {
            name: 'id',
            type: 'STRING',
            length: 100,
            primaryKey: true
          },
          {
            name: 'name',
            type: 'STRING',
            length: 255
          },
          {
            name: 'description',
            type: 'STRING',
            length: 255
          },
          {
            name: 'content_permissions',
            type: 'STRING',
            length: 100
          }
        ]
      },
      {
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'STRING',
            length: 100,
            primaryKey: true
          },
          {
            name: 'name',
            type: 'STRING',
            length: 255
          },
          {
            name: 'fullName',
            type: 'STRING',
            length: 255
          },
          {
            name: 'siteRole',
            type: 'STRING',
            length: 100
          },
          {
            name: 'authSetting',
            type: 'STRING',
            length: 100
          },
          {
            name: 'externalAuthUserId',
            type: 'STRING',
            length: 100
          },
          {
            name: 'lastLogin',
            type: 'DATETIME'
          },
          {
            name: 'email',
            type: 'STRING',
            length: 100
          }
        ]
      },
      {
        name: 'views',
        columns: [
          {
            name: 'id',
            type: 'STRING',
            length: 100,
            primaryKey: true
          },
          {
            name: 'workbook_id',
            type: 'STRING',
            length: 100
          },
          {
            name: 'owner_id',
            type: 'STRING',
            length: 100
          },
          {
            name: 'project_id',
            type: 'STRING',
            length: 100
          },
          {
            name: 'name',
            type: 'STRING',
            length: 255
          },
          {
            name: 'contentUrl',
            type: 'STRING',
            length: 255
          },
          {
            name: 'viewUrlName',
            type: 'STRING',
            length: 255
          },
          {
            name: 'createdAt',
            type: 'DATETIME'
          },
          {
            name: 'updatedAt',
            type: 'DATETIME'
          }
        ]
      },
      {
        name: 'workbooks',
        columns: [
          {
            name: 'id',
            type: 'STRING',
            length: 100,
            primaryKey: true
          },
          {
            name: 'project_id',
            type: 'STRING',
            length: 100
          },
          {
            name: 'owner_id',
            type: 'STRING',
            length: 100
          },
          {
            name: 'name',
            type: 'STRING',
            length: 255
          },
          {
            name: 'contentUrl',
            type: 'STRING',
            length: 255
          },
          {
            name: 'size',
            type: 'INTEGER'
          },
          {
            name: 'showTabs',
            type: 'BOOLEAN'
          },
          {
            name: 'createdAt',
            type: 'DATETIME'
          },
          {
            name: 'updatedAt',
            type: 'DATETIME'
          }
        ]
      }
    ]
  },
  integrationParameters: [
    {
      name: 'username',
      label: 'Username',
      type: 'STRING',
      required: true
    },
    {
      name: 'password',
      label: 'Password',
      type: 'STRING',
      required: true,
      secret: true
    },
    {
      name: 'site',
      label: 'Site',
      type: 'STRING',
      required: true
    }
  ]
})
