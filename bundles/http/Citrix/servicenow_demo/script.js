/**Libraries, used in this project*/
const _ = library.load('lodash')
const moment = library.load('moment-timezone')
/**Change values in arrays, in order to change displayed data*/
const names = ["Aline Gomes", "Billy Taylor", "Danielle Ledford", "Diana Sarkozy", "Erberto Tirado"]
const descriptions = ["OS failure", "Laptop replacement", "Local installation assistance", "Network storage unavailable", "HDD issues", "Credentials error"]
const asignee = ["John Doe", "Jane Doe", "Josef Antos", "Nathan Zaitsev"]
const states = ["Active", "New", "Awaiting User Info", "Awaiting Evidence"]
const location = ["Prague", "London", "Berlin", "Paris", "San Francisco", "Moscow", "Malaga"]
const company = ["Citrix", "Wrike", "Sapho", "Microsoft", "Apple", "Google", "Oracle"]
const contact = ["Email", "Phone", "Slack", "Teams"]
const priority = ["Low", "Medium", "High"]
/**Approvals Descriptions*/
const descApproval = ["SSD Replacement", "New Laptop Request", "New Monitor Request", "Docking Station Request", "IntelliJ Idea License Request"]



/** Function, that generates data for the table, using random values, both for incremental and full sync */
async function getData(dataStore, context, fullSync) {
  const fullSyncIterations = 16
  const incSyncIterations = 3
  /**Regulation of behavior of loop, depending on sync type*/
  const { iterations, dateRandom, key } = fullSync
    ? ({
      key: 1,
      iterations: fullSyncIterations,
      dateRandom: true
    })
    : ({
      key: context.iterations,
      iterations: context.iterations + incSyncIterations,
      dateRandom: false
    })
  context.iterations = key
  /** Incidents data generator */
  const incidentsReport = _.range(context.iterations, iterations).map(ID => {
    /**Init date instance and check, if we need to randomize dates*/
    let date
    if (dateRandom) {
      date = moment().subtract(Math.random() * 10, 'days').toISOString()
    }
    else {
      date = moment().toISOString()
    }
    /** Incidents Data Object */
    const incident = {
      Description: descriptions[Math.floor(Math.random() * (descriptions.length))],
      ID: ID,
      Name: names[Math.floor(Math.random() * (names.length))],
      Asignee: asignee[Math.floor(Math.random() * (asignee.length))],
      Location: location[Math.floor(Math.random() * (location.length))],
      Company: company[Math.floor(Math.random() * (company.length))],
      Contact: contact[Math.floor(Math.random() * (contact.length))],
      Impact: priority[Math.floor(Math.random() * (priority.length))],
      Urgency: priority[Math.floor(Math.random() * (priority.length))],
      Severity: priority[Math.floor(Math.random() * (priority.length))],
      Priority: priority[Math.floor(Math.random() * (priority.length))],
      Number: `INC${ID}`,
      OpenedAt: date,
      State: states[Math.floor(Math.random() * (states.length))],
      IncidentState: states[Math.floor(Math.random() * (states.length))],
      Active: true,
      IMG: "https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/ticket_assign.760c8db6db27596531b2337171bed63d.svg"
    };
    /** Assigning Priority Number, for sorting purposes in list component */
    incident.PriorityNum = incident['Priority'] == "High" ? 1 : incident['Priority'] == "Low" ? 3 : 2

    return incident
  })
  /** Approvals data generator */
  const approvalsReport = _.range(context.iterations, iterations).map(ID => {
    /**Init date instance and check, if we need to randomize dates*/
    let dateCurrent = new Date()
    dateRandom ? dateCurrent.setDate(dateCurrent.getDate() - (Math.floor(Math.random() * (10)))) : dateCurrent.setDate(dateCurrent.getDate());

    let dateDue = new Date(dateCurrent)
    dateDue.setDate(dateDue.getDate() + 30)

    dateCurrent.toLocaleDateString()
    dateDue.toLocaleDateString()

    /** Approvals Data Object */
    let approval = {
      Description: descApproval[Math.floor(Math.random() * (descApproval.length))],
      ID: ID,
      Name: names[Math.floor(Math.random() * (names.length))],
      Number: `CHG${ID}`,
      OpenedAt: dateCurrent,
      State: "Requested",
      Active: true,
      Type: descApproval[Math.floor(Math.random() * (descApproval.length))],
      DueDate: dateDue,
      Approver: "Robert Clayton",
      ApprovalGroup: "Product",
      ApprovalSource: "Source Here",
      IMG: "https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/ticket_resolved.f6b6a522aa2af5d1ec8b70c693bb8760.svg"
    };
    return approval
  })
  context.iterations = iterations
  dataStore.save('incidentsReport', incidentsReport)
  dataStore.save('approvalsReport', approvalsReport)
}

async function createIncident({ dataStore, actionParameters }) {
  let dateNew = new Date()
  dateNew.setDate(dateNew.getDate());
  dateNew.toLocaleDateString()
  const ID = Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
  const Number = `INC${ID}`

  const Name = "John Doe"
  const Asignee = asignee[Math.floor(Math.random() * (asignee.length))]
  const Company = "Citrix"
  const Location = "Prague"
  const State = "Active"
  const IncidentState = "Active"
  const IMG = "https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/ticket_assign.760c8db6db27596531b2337171bed63d.svg"

  let { Urgency, Impact, Description, Contact } = actionParameters
  const OpenedAt = dateNew
  const Severity = Impact
  const Priority = Urgency
  const Active = true
  let PriorityNum = (Priority == "High")
    ? 1
    : (Priority == "Low")
      ? 3
      : 2
  let incident = { Name, ID, Location, Company, Number, Description, Contact, State, IncidentState, OpenedAt, Urgency, Priority, Severity, Impact, Active, IMG, PriorityNum, Asignee }

  dataStore.save('incidentsReport', incident)
}
async function createApproval({ dataStore, actionParameters }) {
  let { Comment, ID, CurrentDate, Active, Name, Number, Description, State, Type, OpenedAt, DueDate, Approver, ApprovalGroup, ApprovalSource } = actionParameters
  OpenedAt.toLocaleDateString()
  DueDate.toLocaleDateString()
  let approvalParams = { ID, Active, Name, Number, Description, State, Type, OpenedAt, DueDate, Approver, ApprovalGroup, ApprovalSource }
  let commantaryParams = { ID, Comment, CurrentDate }
  dataStore.save('approvalsReport', approvalParams)
  dataStore.save('comments', commantaryParams)
}
async function saveIncidentDetails({ dataStore, actionParameters }) {
  let { Description, ID, Name, Location, Company, Contact, Impact, Urgency, Severity, Priority, Number, OpenedAt, State, IncidentState, Active, Comment, CurrentDate, Asignee } = actionParameters
  let IMG = "https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/ticket_assign.760c8db6db27596531b2337171bed63d.svg"
  let PriorityNum = Priority == "High"
    ? 1
    : Priority == "Low"
      ? 3
      : 2
  let incidentParams = { Description, ID, Name, Location, Company, Contact, Impact, Urgency, Severity, Priority, Number, OpenedAt, State, IncidentState, Active, PriorityNum, Asignee }
  let commantaryParams = { ID, Comment, CurrentDate }

  dataStore.save('incidentsReport', incidentParams)
  dataStore.save('commentsIncidents', commantaryParams)
}
async function addCommentIncident({ dataStore, actionParameters }) {
  const ID = Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
  let { Comment, RndID, CurrentDate } = actionParameters
  let commantaryParams = { ID, Comment, CurrentDate, RndID }

  dataStore.save('commentsIncidents', commantaryParams)
}
async function addCommentApproval({ dataStore, actionParameters }) {
  const ID = Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
  let { Comment, RndID, CurrentDate } = actionParameters
  let commantaryParams = { ID, Comment, CurrentDate, RndID }

  dataStore.save('comments', commantaryParams)
}

integration.define({
  synchronizations: [
    {
      name: 'incidentsReport',

      /** Sync implementation with added custom parameter */
      fullSyncFunction: function ({ dataStore, context }) { return getData(dataStore, context, true) },
      incrementalSyncFunction: function ({ dataStore, context }) { return getData(dataStore, context, false) },
    }
  ],
  actions: [
    {
      name: 'addComment',
      parameters: [
        {
          name: 'ID',
          type: 'DOUBLE'
        },
        {
          name: 'Comment',
          type: 'STRING'
        },
        {
          name: 'CurrentDate',
          type: 'DATE'
        },
        {
          name: 'RndID',
          type: 'DOUBLE',

        },
      ],
      function: addCommentApproval
    },
    {
      name: 'addCommentIncident',
      parameters: [
        {
          name: 'ID',
          type: 'DOUBLE'
        },
        {
          name: 'Comment',
          type: 'STRING'
        },
        {
          name: 'CurrentDate',
          type: 'DATE'
        },
        {
          name: 'RndID',
          type: 'DOUBLE',

        },
      ],
      function: addCommentIncident
    },
    {
      name: 'approval',
      parameters: [
        {
          name: 'ID',
          type: 'DOUBLE'
        },
        {
          name: 'Comment',
          type: 'STRING'
        },
        {
          name: 'CurrentDate',
          type: 'DATE'
        },
        {
          name: 'Active',
          type: 'BOOLEAN',
        },
        {
          name: 'Name',
          type: 'STRING',
        },
        {
          name: 'Number',
          type: 'STRING'
        },
        {
          name: 'Description',
          type: 'STRING'
        },
        {
          name: 'State',
          type: 'STRING'
        },
        {
          name: 'Type',
          type: 'STRING'
        },
        {
          name: 'OpenedAt',
          type: 'DATETIME'
        },
        {
          name: 'DueDate',
          type: 'DATE'
        },
        {
          name: 'Approver',
          type: 'STRING'
        },
        {
          name: 'ApprovalGroup',
          type: 'STRING'
        },
        {
          name: 'ApprovalSource',
          type: 'STRING'
        },

      ],
      function: createApproval
    },
    {
      name: 'addIncident',
      parameters: [
        {
          name: 'ID',
          type: 'DOUBLE',

        },
        {
          name: 'Active',
          type: 'BOOLEAN',

        },
        {
          name: 'Asignee',
          type: 'STRING'
        },
        {
          name: 'Name',
          type: 'STRING',

        },
        {
          name: 'Number',
          type: 'STRING',

        },
        {
          name: 'Description',
          type: 'STRING',
          required: true
        },
        {
          name: 'State',
          type: 'STRING',

        },
        {
          name: 'IncidentState',
          type: 'STRING',

        },
        {
          name: 'OpenedAt',
          type: 'DATETIME',
          required: true
        },
        {
          name: 'Impact',
          type: 'STRING',
          required: true
        },
        {
          name: 'Urgency',
          type: 'STRING',
          required: true

        },
        {
          name: 'Severity',
          type: 'STRING',

        },
        {
          name: 'Priority',
          type: 'STRING',

        },
        {
          name: 'Location',
          type: 'STRING',

        },
        {
          name: 'Company',
          type: 'STRING',

        },
        {
          name: 'Contact',
          type: 'STRING',

        },
        {
          name: 'IMG',
          type: 'STRING'
        },
        {
          name: 'PriorityNum',
          type: 'INTEGER'
        },
      ],
      function: createIncident
    },
    {
      name: 'saveIncident',
      parameters: [
        {
          name: 'ID',
          type: 'DOUBLE',

        },
        {
          name: 'Active',
          type: 'BOOLEAN',

        },
        {
          name: 'Asignee',
          type: 'STRING'
        },
        {
          name: 'Name',
          type: 'STRING',

        },
        {
          name: 'Number',
          type: 'STRING',

        },
        {
          name: 'Description',
          type: 'STRING',
        },
        {
          name: 'State',
          type: 'STRING',

        },
        {
          name: 'IncidentState',
          type: 'STRING',

        },
        {
          name: 'OpenedAt',
          type: 'DATETIME',
        },
        {
          name: 'Impact',
          type: 'STRING',
        },
        {
          name: 'Urgency',
          type: 'STRING',

        },
        {
          name: 'Severity',
          type: 'STRING',

        },
        {
          name: 'Priority',
          type: 'STRING',

        },
        {
          name: 'Location',
          type: 'STRING',

        },
        {
          name: 'Company',
          type: 'STRING',

        },
        {
          name: 'Contact',
          type: 'STRING',

        },
        {
          name: 'IMG',
          type: 'STRING'
        },
        {
          name: 'PriorityNum',
          type: 'INTEGER'
        },
      ],
      function: saveIncidentDetails
    }
  ],
  model: {
    relationships: [
      {
        name: 'commentaries',
        primaryTable: 'approvalsReport',
        foreignTable: 'comments',
        columnPairs: [
          {
            primaryKey: 'ID',
            foreignKey: 'RndID'
          }
        ]
      },
      {
        name: 'commentariesIncidents',
        primaryTable: 'incidentsReport',
        foreignTable: 'commentsIncidents',
        columnPairs: [
          {
            primaryKey: 'ID',
            foreignKey: 'RndID'
          }
        ]
      },
    ],
    tables: [
      {
        name: 'incidentsReport',
        columns: [
          {
            name: 'ID',
            type: 'DOUBLE',
            primaryKey: true
          },
          {
            name: 'Active',
            type: 'BOOLEAN',
          },
          {
            name: 'Asignee',
            type: 'STRING'
          },
          {
            name: 'Name',
            type: 'STRING',
          },
          {
            name: 'Number',
            type: 'STRING'
          },
          {
            name: 'Description',
            type: 'STRING'
          },
          {
            name: 'State',
            type: 'STRING'
          },
          {
            name: 'IncidentState',
            type: 'STRING'
          },
          {
            name: 'OpenedAt',
            type: 'DATETIME'
          },
          {
            name: 'Impact',
            type: 'STRING'
          },
          {
            name: 'Urgency',
            type: 'STRING'
          },
          {
            name: 'Severity',
            type: 'STRING'
          },
          {
            name: 'Priority',
            type: 'STRING'
          },
          {
            name: 'Location',
            type: 'STRING'
          },
          {
            name: 'Company',
            type: 'STRING'
          },
          {
            name: 'Contact',
            type: 'STRING'
          },
          {
            name: 'IMG',
            type: 'STRING'
          },
          {
            name: 'PriorityNum',
            type: 'INTEGER'
          },
        ],
      },
      {
        name: 'approvalsReport',
        columns: [
          {
            name: 'ID',
            type: 'DOUBLE',
            primaryKey: true
          },
          {
            name: 'Active',
            type: 'BOOLEAN',
          },
          {
            name: 'Name',
            type: 'STRING',
          },
          {
            name: 'Number',
            type: 'STRING'
          },
          {
            name: 'Description',
            type: 'STRING'
          },
          {
            name: 'State',
            type: 'STRING'
          },
          {
            name: 'Type',
            type: 'STRING'
          },
          {
            name: 'OpenedAt',
            type: 'DATETIME'
          },
          {
            name: 'DueDate',
            type: 'DATETIME'
          },
          {
            name: 'Approver',
            type: 'STRING'
          },
          {
            name: 'ApprovalGroup',
            type: 'STRING'
          },
          {
            name: 'ApprovalSource',
            type: 'STRING'
          },
          {
            name: 'Comment',
            type: 'STRING'
          },
          {
            name: 'IMG',
            type: 'STRING'
          }
        ]
      },
      {
        name: "comments",
        columns: [
          {
            name: 'ID',
            type: 'DOUBLE',
            primaryKey: true
          },
          {
            name: 'RndID',
            type: 'DOUBLE',
          },
          {
            name: 'Comment',
            type: 'STRING'
          },
          {
            name: 'CurrentDate',
            type: 'DATE'
          },
        ]
      },
      {
        name: "commentsIncidents",
        columns: [
          {
            name: 'ID',
            type: 'DOUBLE',
            primaryKey: true
          },
          {
            name: 'RndID',
            type: 'DOUBLE',
          },
          {
            name: 'Comment',
            type: 'STRING'
          },
          {
            name: 'CurrentDate',
            type: 'DATE'
          },
        ]
      }
    ]
  }
})