/** Init used libraries */
const _ = library.load('lodash')
const moment = library.load('moment-timezone')
/** Names and descriptions can be changed here*/
const names = ["Aline Gomes", "Billy Taylor", "Danielle Ledford", "Diana Sarkozy", "Erberto Tirado"]
const descriptions = ["Lyft","Uber","Dinner","Hotel","Flight Tickets","Rental"]
/**
 * Function, that generates data for the table, using random values, both for incremental and full sync
 * fullSyncIterations - number of data, generated with full sync
 * incSyncIterations - number of data, generated with incremental sync
 * min, max - minimum and maximum amounts for expenses reports
 * */
async function getExpenses (dataStore,context,fullSync) {
  const fullSyncIterations = 16
  const incSyncIterations = 3
  const min = 100
  const max = 2000
/**Regulation of behavior of loop, depending on sync type*/
  const {iterations, dateRandom, key} = fullSync
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
  console.log(context.iterations)
  console.log(iterations)

const expenseReport = _.range(context.iterations, iterations).map(ID => {
  /**Init date instance and check, if we need to randomize dates*/
  let date
  if (dateRandom) {
    date = moment().subtract(Math.random() * 10, 'days').toISOString()
  }
  else {
    date = moment().toISOString()
  }

  /** Data object used as an expense report */
  const amount =  Math.floor(Math.random() * (max - min + 1)) + min
  const reimbursementAmount = Math.floor(Math.random() * (amount - min + 1)) + min
  const advanceAmount = amount - reimbursementAmount
  const expense = {
    Amount: amount,
    ReimbursementAmount: reimbursementAmount,
    AdvanceAmount: advanceAmount,
    ID: ID,
    Currency: 'USD',
    Name: names[Math.floor(Math.random() * (names.length))],
    Description: descriptions[Math.floor(Math.random() * (descriptions.length))],
    ReportID: `EXP-${ID}`,
    Date: date,
    Status: "In Progress",
    IMG: "https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/report_approve.6897d341db0d63786415dca6b68694ad.svg"
  };
  context.iterations = iterations

  return expense
})
  dataStore.save('expenseReport', expenseReport) 
}
async function updateStatus({ dataStore, client, actionParameters, integrationParameters }) {
  let {Name, ID, Currency, Amount, ReportID, Description, ReimbursementAmount, AdvanceAmount, Status, Date} = actionParameters
  const IMG = "https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/report_approve.6897d341db0d63786415dca6b68694ad.svg"
  let expenses = {Name, ID, Currency, Amount, ReportID, Description, ReimbursementAmount, AdvanceAmount, Status, Date, IMG}

  dataStore.save('expenseReport', expenses)
  
}

integration.define({
  synchronizations: [
    {
      name: 'expenseReport',
      //Sync implementation with added custom parameter
      fullSyncFunction: function({dataStore, context}) { return getExpenses(dataStore, context, true) },
      incrementalSyncFunction: function({dataStore, context}) { return getExpenses(dataStore, context, false) },
    }
  ],
  actions: [
    {
      name: 'approveExpense',
      parameters: [
        {
          name: 'ID',
          type: 'DOUBLE',
          required: true
        },
        {
          name: 'Currency',
          type: 'STRING',
          required: true
        },
        {
          name: 'Date',
          type: 'DATETIME',
          required: true
        },
        {
          name: 'Name',
          type: 'STRING',
          required: true
        },
        {
          name: 'Amount',
          type: 'DOUBLE',
          required: true
        },
        {
          name: 'Status',
          type: 'STRING',
          required: true
        },
        {
          name: 'ReportID',
          type: 'STRING',
          required: true
        },
        {
          name: 'Description',
          type: 'STRING',
          required: true
        },
        {
          name: 'ReimbursementAmount',
          type: 'DOUBLE',
          required: true
        },
        {
          name: 'AdvanceAmount',
          type: 'DOUBLE',
          required: true
        },
        {
          name: 'IMG',
          type: 'STRING',
        },
      ],
      function: updateStatus
    }
  ],
  model: {
    tables: [
      {
        name: 'expenseReport',
        columns: [
          {
            name: 'ID',
            type: 'DOUBLE',
            primaryKey: true
          },
          {
            name: 'Name',
            type: 'STRING',
          },
          {
            name: 'Amount',
            type: 'DOUBLE'
          },
          {
          name: 'Currency',
          type: 'STRING',
        },
          {
            name: 'ReportID',
            type: 'STRING'
          },
          {
            name: 'Description',
            type: 'STRING'
          },
          {
            name: 'ReimbursementAmount',
            type: 'DOUBLE'
          },
          {
            name: 'AdvanceAmount',
            type: 'DOUBLE'
          },
          {
            name: 'Status',
            type: 'STRING'
          },
          {
            name: 'Date',
            type: 'DATETIME'
          },
          {
            name: 'IMG',
            type: 'STRING'
          },
        ]
      }
    ]
  }
})