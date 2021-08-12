/*
Name: ServiceNow Demo integration, using generated dummy data
Created by: Andrey Kornilov
Date: 1.8.2021
*/

const _ = library.load('lodash')
const names = ["Mark Knopfler", "Ritchie Blackmore", "Eddie Van Halen", "Adrian Smith", "Billy Duffy"]
const descriptions = ["OS failure", "Laptop replacement", "Local installation assistance", "Network storage unavailable", "HDD issues", "Credentials error"]
const states = ["Active", "New", "Awaiting User Info", "Closed", "Awaiting Evidence", "Resolved", "Closed"]
const location = ["Prague", "London", "Berlin", "Paris", "San Francisco", "Moscow", "Malaga"]
const company = ["Citrix", "Wrike", "Sapho", "Microsoft", "Apple", "Google", "Oracle"]
const contact = ["Email", "Phone", "Post", "Fax", "Pager", "Slack", "Teams"]
const priority = ["4-Low", "3-Moderate", "2-High", "1-Critical"]

const descApproval = ["SSD Replacement", "New Laptop Request", "New Monitor Request", "Docking Station Request", "IntelliJ Idea License Request"]


//Function, that generates data for the table, using random values, both for incremental and full sync
async function getData(dataStore, context, fullSync) {
  let iterations;
  let dateRandom;

  //Switch statement, that regulates behavior of loop, depending on sync type
  switch (fullSync) {
    case true:
      context.key1 = 1;
      iterations = context.key1 + 15
      dateRandom = true
      break;

    default:
      iterations = context.key1 + 3
      dateRandom = false
      break;
  }
  console.log(context.key1)
  console.log(iterations)
  const incidentsReport = _.range(context.key1, iterations).map(ID => {
    //Init date instance and check, if we need to randomize dates
    let date = new Date()
    dateRandom ? date.setDate(date.getDate() - (Math.floor(Math.random() * (10)))) : date.setDate(date.getDate());
    date.toLocaleDateString()
    //Init blank object for expense and set min and max expense values
    let incident = {};

    incident['Description'] = descriptions[Math.floor(Math.random() * (descriptions.length))]
    incident['ID'] = ID
    incident['Name'] = names[Math.floor(Math.random() * (names.length))]
    incident['Location'] = location[Math.floor(Math.random() * (location.length))]
    incident['Company'] = company[Math.floor(Math.random() * (company.length))]
    incident['Contact'] = contact[Math.floor(Math.random() * (contact.length))]
    incident['Impact'] = priority[Math.floor(Math.random() * (priority.length))]
    incident['Urgency'] = priority[Math.floor(Math.random() * (priority.length))]
    incident['Severity'] = priority[Math.floor(Math.random() * (priority.length))]
    incident['Priority'] = priority[Math.floor(Math.random() * (priority.length))]
    incident['Number'] = `INC${ID}`
    incident['OpenedAt'] = date.toLocaleDateString()
    incident['State'] = states[Math.floor(Math.random() * (states.length))]
    incident['IncidentState'] = states[Math.floor(Math.random() * (states.length))]
    incident['Active'] = true

    return incident

  })
  const approvalsReport = _.range(context.key1, iterations).map(ID => {
    //Init date instance and check, if we need to randomize dates
    let dateCurrent = new Date()
    dateRandom ? dateCurrent.setDate(dateCurrent.getDate() - (Math.floor(Math.random() * (10)))) : dateCurrent.setDate(dateCurrent.getDate());

    let dateDue = new Date(dateCurrent)
    dateDue.setDate(dateDue.getDate() + 30)

    dateCurrent.toLocaleDateString()
    dateDue.toLocaleDateString()

    //Init blank object for expense and set min and max expense values
    let approval = {};

    approval['Description'] = descApproval[Math.floor(Math.random() * (descApproval.length))]
    approval['ID'] = ID
    approval['Name'] = names[Math.floor(Math.random() * (names.length))]
    approval['Number'] = `CHG${ID}`
    approval['OpenedAt'] = dateCurrent
    approval['State'] = states[Math.floor(Math.random() * (states.length))]
    approval['Active'] = true
    approval['Type'] = descApproval[Math.floor(Math.random() * (descApproval.length))]
    approval['DueDate'] = dateDue
    approval['Approver'] = "Marilyn Monroe"
    approval['ApprovalGroup'] = "Product"
    approval['ApprovalSource'] = "Source Here"
    approval['Active'] = true

    return approval

  })
  context.key1 = iterations
  dataStore.save('incidentsReport', incidentsReport)
  dataStore.save('approvalsReport', approvalsReport)
}
async function updateStatus({ dataStore, actionParameters }) {

  let { Name, ID, Currency, Amount, ReportID, Description, ReimbursementAmount, AdvanceAmount, Status, Date } = actionParameters
  let expenses = { Name, ID, Currency, Amount, ReportID, Description, ReimbursementAmount, AdvanceAmount, Status, Date }

  dataStore.save('expenseReport', expenses)

}
async function createIncident({ dataStore, actionParameters }) {
  let dateNew = new Date()
  dateNew.setDate(dateNew.getDate());
  dateNew.toLocaleDateString()
  const ID = Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
  const Number = `INC${ID}`

  const Name = "John Doe"
  const Company = "Citrix"
  const Location = "Prague"
  const Contact = "Pigeon Post"
  const State = "Active"
  const IncidentState = "Active"

  let { Urgency, Impact, Description } = actionParameters
  const OpenedAt = dateNew
  const Severity = Impact
  const Priority = Urgency
  const Active = true

  let incident = { Name, ID, Location, Company, Number, Description, Contact, State, IncidentState, OpenedAt, Urgency, Priority, Severity, Impact, Active }

  dataStore.save('incidentsReport', incident)

}
async function createComment({ dataStore, actionParameters }) {
  let { Comment, ID, CurrentDate, Active, Name, Number, Description, State, Type, OpenedAt, DueDate, Approver, ApprovalGroup, ApprovalSource } = actionParameters
  OpenedAt.toLocaleDateString()
  DueDate.toLocaleDateString()
  let approvalParams = { ID, Active, Name, Number, Description, State, Type, OpenedAt, DueDate, Approver, ApprovalGroup, ApprovalSource }
  let commantaryParams = { ID, Comment, CurrentDate }
  dataStore.save('approvalsReport', approvalParams)
  dataStore.save('comments', commantaryParams)
}
async function addComment({ dataStore, actionParameters }) {
  const ID = Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
  let { Comment, RndID, CurrentDate } = actionParameters
  console.log(RndID)
  let commantaryParams = { ID, Comment, CurrentDate, RndID }
  dataStore.save('comments', commantaryParams)
}

integration.define({
  synchronizations: [
    {
      name: 'incidentsReport',

      //Sync implementation with added custom parameter
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
      function: addComment
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
          type: 'DATE'
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
      function: createComment
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
          type: 'DATE',
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
      ],
      function: createIncident
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
            type: 'DATE'
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
            type: 'DATE'
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
          {
            name: 'Comment',
            type: 'STRING'
          },
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
      }
    ]
  }
})