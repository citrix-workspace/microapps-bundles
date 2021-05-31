const pageSize = 100

async function fullSync ({ client, dataStore, integrationParameters }) {
  const credentials = await getCredentials(client, integrationParameters)

  await Promise.all([
    syncProjects({client, dataStore, credentials}),
    syncUsers({client, dataStore, credentials}),
    syncViews({client, dataStore, credentials}),
    syncWorkbooks({client, dataStore, credentials})
  ])

}

async function syncProjects({ client, dataStore, credentials }) {
  let pageNumber = 0
  let totalAvailable

  do {
    pageNumber++

    const body = await request(client, 'projects', credentials, pageNumber)
    
    try {
      const projects = body.projects.project
      totalAvailable = validateTotalAvailable(body, 'projects')
      
      if (Array.isArray(projects) && projects.length > 0){
        dataStore.save('projects', projects)
      } else {
        console.log('WARNING: Endpoint projects - Bad or empty response')
      }

    } catch (error) {
      console.error(error)
    }
    
  } while (pageSize * pageNumber < totalAvailable)
}

async function syncUsers({ client, dataStore, credentials }) {
  let pageNumber = 0
  let totalAvailable

  do {
    pageNumber++

    const body = await request(client, 'users', credentials, pageNumber)
    
    try {
      const users = body.users.user
      totalAvailable = validateTotalAvailable(body, 'users')

      if (Array.isArray(users) && users.length > 0){
        dataStore.save('users', users)
      } else {
        console.log('WARNING: Endpoint users - Bad or empty response')
      }
      
    } catch (error) {
      console.error(error)
    }

  } while (pageSize * pageNumber < totalAvailable)
}

async function syncViews({ client, dataStore, credentials }) {
  let pageNumber = 0
  let totalAvailable

  do {
    pageNumber++

    const body = await request(client, 'views', credentials, pageNumber)

    try {
      const views = body.views.view
      totalAvailable = validateTotalAvailable(body, 'views') 

      if (Array.isArray(views) && views.length > 0) {
        views.forEach(view => { // flatten nested JSONs
          flatJson(view, 'workbook')
          flatJson(view, 'owner')
          flatJson(view, 'project')
          view.contentUrl = view.contentUrl.replace('/sheets', '')
        })
        dataStore.save('views', views)
      } else {
        console.log('WARNING: Endpoint views - Bad or empty response')
      }

    } catch (error) {
      console.error(error)
    }

  } while (pageSize * pageNumber < totalAvailable)
}

async function syncWorkbooks ({ client, dataStore, credentials }) {
  let pageNumber = 0
  let totalAvailable

  do {
    pageNumber++

    const body = await request(client, 'workbooks', credentials, pageNumber)
    
    try {
      const workbooks = body.workbooks.workbook
      totalAvailable = validateTotalAvailable(body, 'workbooks')

      if (Array.isArray(workbooks) && workbooks.length > 0) {
        workbooks.forEach(workbook => { // flatten nested JSONs
          flatJson(workbook, 'owner')
          flatJson(workbook, 'project')

          // convert showTabs to boolean
          workbook.showTabs = workbook.showTabs === 'true'

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

    } catch (error) {
      console.error(error)
    }

  } while (pageSize * pageNumber < totalAvailable)
}

async function getCredentials (client, params) {
  const request = {
    credentials: {
      name: `${params.username}`,
      password: `${params.password}`,
      site: {
        contentUrl: `${params.site}`
      }
    }
  }

  console.log("authorization request sent")

  let response = await client.fetch('/api/3.7/auth/signin', {
    method: 'POST',
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error(`Auth Request failed(${response.status}: ${response.statusText})`)
  }

  response = await response.json()

  console.log("authorization finished")

  return response.credentials
}

async function request(client, entity, credentials, pageNumber) {
  console.log('sync of ' + entity + ' page ' + pageNumber + ' started')

  let path =`api/3.7/sites/${credentials.site.id}/${entity}?pageSize=${pageSize}&pageNumber=${pageNumber}` 
  
  if (entity === "users") { 
    path = `${path}&fields=_all_`; 
  }

  const response = await client.fetch(path,
    {
      headers: {
        'X-Tableau-Auth': credentials.token
      }
    })

  if (!response.ok) {
    console.log(`WARNING: Endpoint ${entity} - Request failed(${response.status}: ${response.statusText})`)
    //throw new Error(`Endpoint ${entity} - Request failed(${response.status}: ${response.statusText})`)
  }
  console.log(entity + ' page ' + pageNumber + ' - response received, status: ' + response.status)

  return response.json()
}

function validateTotalAvailable (body, entity) {
  if (body.pagination == null || body.pagination.totalAvailable == null) {
    console.log('WARNING: Endpoint ' + entity + ' - No pagination attribute in response')
    return 0
  } else {
    return body.pagination.totalAvailable
  }
}

function flatJson (json, oName) { // currently we are able to store only flat json object, so all nested object must be flattened
  if (json[oName] !== undefined) {
    json[`${oName}_id`] = json[oName].id;
    delete json[oName];
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
