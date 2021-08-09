/*
Name: Workday Demo HTTP integration, using generated dummy data
Created by: Andrey Kornilov
Date: 18.7.2021
*/

let expenseReport;
const names = ["Mark Knopfler","Ritchie Blackmore","Eddie Van Halen","Adrian Smith","Billy Duffy"]
const descriptions = ["Lyft","Uber","Dinner","Hotel","Flight Tickets","Rental"]

//Function, that generates data for the table, using random values, both for incremental and full sync

async function getExpenses (dataStore,context,fullSync) {
  let expenseReport = [];
  let iterations;
  let dateRandom;

//Switch statement, that regulates behavior of loop, depending on sync type
  switch (fullSync) {
    case true:
      context.key1 = 0;
      iterations = context.key1 + 15
      dateRandom = true
      break;

    default:
      iterations = context.key1 + 3
      dateRandom = false
      break;
  }

  for(let i = context.key1; i < iterations; i++) {

      //Context passes same value as ID
      context.key1 += 1

      //Init date instance and check, if we need to randomize dates
      let date = new Date()
      dateRandom ? date.setDate(date.getDate()-(Math.floor(Math.random() * (10)))) : date.setDate(date.getDate());

      //Init blank object for expense and set min and max expense values
      const min = 100
      const max = 20000
      
      let expense = {};
      expense['Description'] = descriptions[Math.floor(Math.random() * (descriptions.length))]
      expense['ID'] = i
      expense['Currency'] = 'USD'
      expense['Name'] = names[Math.floor(Math.random() * (names.length))]
      expense['Amount'] = Math.floor(Math.random() * (max - min + 1)) + min;
      expense['ReportID'] = `EXP-${i}`
      expense['Date'] = date.toLocaleDateString()
      expense['ReimbursementAmount'] = Math.floor(Math.random() * (expense['Amount'] - min + 1)) + min
      expense['AdvanceAmount'] = expense['Amount'] - expense['ReimbursementAmount']
      expense['Status'] = "In Progress";
      
      //Pushes new object to the object array, and saves to dataStore
      expenseReport.push(expense);
  }
  dataStore.save('expenseReport', expenseReport)  
}

async function updateStatus({ dataStore, client, actionParameters, integrationParameters }) {
  
  let {Name, ID, Currency, Amount, ReportID, Description, ReimbursementAmount, AdvanceAmount, Status, Date} = actionParameters
  let expenses = {Name, ID, Currency, Amount, ReportID, Description, ReimbursementAmount, AdvanceAmount, Status, Date}

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
          type: 'DATE',
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
        }
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
            type: 'DATE'
          },
        ]
      }
    ]
  }
})