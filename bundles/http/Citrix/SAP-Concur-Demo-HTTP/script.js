var date = new Date()
var date2 = new Date()
date2.setDate(date2.getDate()-2)
var date3 = new Date()
date3.setDate(date3.getDate()-5)

const reports = [
    {
        Id: '12372847', 
        Type: 'Austin Trip', 
        OwnerName: 'Sarah Silva', 
        OwnerMail: 'sarah.silva@acme.com',
        DateSubmitted: date.toLocaleDateString(), 
        TotalAmount: 781.3500, 
        CurrencyCode: 'USD', 
        Status: 'Submitted & Pending Approval'
        },
        {
        Id: '12372882', 
        Type: 'Office Supplies', 
        OwnerName: 'Stella Milne', 
        OwnerMail: 'stella.milne@acme.com',
        DateSubmitted: date2.toLocaleDateString(), 
        TotalAmount: 2300.0000, 
        CurrencyCode: 'USD', 
        Status: 'Submitted & Pending Approval'
        },

        {
        Id: '12372917', 
        Type: 'August Prospective Clients Dinners', 
        OwnerName: 'Billy Taylor', 
        OwnerMail: 'billy.taylor@acme.com',
        DateSubmitted: date2.toLocaleDateString(), 
        TotalAmount: 311.2500, 
        CurrencyCode: 'USD', 
        Status: 'Submitted & Pending Approval'
        },
        {
        Id: '12372937', 
        Type: 'Product Launch Event', 
        OwnerName: 'Marijan Humerca', 
        OwnerMail: 'marijan.humerca@acme.com',
        DateSubmitted: date3.toLocaleDateString(), 
        TotalAmount: 1430.8000, 
        CurrencyCode: 'USD', 
        Status: 'Submitted & Pending Approval'
        },
        {
        Id: '12381532', 
        Type: 'LA Trip', 
        OwnerName: 'Billy Taylor', 
        OwnerMail: 'billy.taylor@acme.com',
        DateSubmitted: date3.toLocaleDateString(), 
        TotalAmount: 380.8900, 
        CurrencyCode: 'USD', 
        Status: 'Submitted & Pending Approval'
        },
        {
        Id: '12381535', 
        Type: 'France Trip', 
        OwnerName: 'Billy Taylor', 
        OwnerMail: 'billy.taylor@acme.com',
        DateSubmitted: date3.toLocaleDateString(), 
        TotalAmount: 465.5000, 
        CurrencyCode: 'USD', 
        Status: 'Submitted & Pending Approval'
        }
]



  const expenses = [
    {
        Id: '19710704432971777', 
        Vendor: 'Lyft', 
        SpendingCategory: 'Ground Transportation',
        TransactionDate: date.toLocaleDateString(), 
        CashAdvanceApplied: true, 
        Amount: 20.2500, 
        CurrencyCode: 'USD', 
        ReportName: '12372847'
        },
        {
        Id: '19710704432971778', 
        Vendor: 'Sheraton Hotels And Resorts', 
        SpendingCategory: 'Lodging',
        TransactionDate: date.toLocaleDateString(), 
        CashAdvanceApplied: false, 
        Amount: 100.0000, 
        CurrencyCode: 'USD', 
        ReportName: '12372847'
        },
        {
        Id: '19710704432971779', 
        Vendor: 'Southwest Airlines', 
        SpendingCategory: 'Airline Fee',
        TransactionDate: date.toLocaleDateString(), 
        CashAdvanceApplied: false, 
        Amount: 500.0000, 
        CurrencyCode: 'USD', 
        ReportName: '12372847'
        },
        {
        Id: '19710704432971780', 
        Vendor: 'Dunkin\' Donuts', 
        SpendingCategory: 'Meal',
        TransactionDate: date.toLocaleDateString(), 
        CashAdvanceApplied: true, 
        Amount: 10.6000, 
        CurrencyCode: 'USD', 
        ReportName: '12372847'
        },
        {
        Id: '19710704432971781', 
        Vendor: 'Chipotle Mexican Grill', 
        SpendingCategory: 'Meal',
        TransactionDate: date.toLocaleDateString(), 
        CashAdvanceApplied: true, 
        Amount: 30.0000, 
        CurrencyCode: 'USD', 
        ReportName: '12372847'
        },
        {
        Id: '19710704432971782', 
        Vendor: 'Royal', 
        SpendingCategory: 'Entertainment',
        TransactionDate: date.toLocaleDateString(), 
        CashAdvanceApplied: true, 
        Amount: 120.5000, 
        CurrencyCode: 'USD', 
        ReportName: '12372847'
        },
        {
        Id: '19710704432971783', 
        Vendor: 'Zinc', 
        SpendingCategory: 'Meal',
        TransactionDate: date2.toLocaleDateString(), 
        CashAdvanceApplied: false, 
        Amount: 60.0000, 
        CurrencyCode: 'USD', 
        ReportName: '12372917'
        },
        {
        Id: '19710704432971784', 
        Vendor: 'Bellevue', 
        SpendingCategory: 'Meal',
        TransactionDate: date2.toLocaleDateString(), 
        CashAdvanceApplied: true, 
        Amount: 75.0000, 
        CurrencyCode: 'USD', 
        ReportName: '12372917'
        },
        {
        Id: '19710704432971785', 
        Vendor: 'Engawa', 
        SpendingCategory: 'Meal',
        TransactionDate: date2.toLocaleDateString(), 
        CashAdvanceApplied: false, 
        Amount: 100.0000, 
        CurrencyCode: 'USD', 
        ReportName: '12372917'
        },
        {
        Id: '19710704432971786', 
        Vendor: 'Uber', 
        SpendingCategory: 'Ground Transportation',
        TransactionDate: date2.toLocaleDateString(), 
        CashAdvanceApplied: false, 
        Amount: 15.5000, 
        CurrencyCode: 'USD', 
        ReportName: '12372917'
        },
        {
        Id: '19710704432971787', 
        Vendor: 'Lyft', 
        SpendingCategory: 'Ground Transportation',
        TransactionDate: date2.toLocaleDateString(), 
        CashAdvanceApplied: true, 
        Amount: 60.7500, 
        CurrencyCode: 'USD', 
        ReportName: '12372917'
        },
        {
        Id: '19710704432971792', 
        Vendor: 'Nova PR', 
        SpendingCategory: 'Advertising/Marketing',
        TransactionDate: date3.toLocaleDateString(), 
        CashAdvanceApplied: true, 
        Amount: 1000.0000, 
        CurrencyCode: 'USD', 
        ReportName: '12372937'
        },
        {
        Id: '19710704432971793', 
        Vendor: 'Food Catering', 
        SpendingCategory: 'Meal',
        TransactionDate: date3.toLocaleDateString(), 
        CashAdvanceApplied: false, 
        Amount: 200.0000, 
        CurrencyCode: 'USD', 
        ReportName: '12372937'
        },
        {
        Id: '19710704432971794', 
        Vendor: 'Node 42', 
        SpendingCategory: 'Entertainment',
        TransactionDate: date3.toLocaleDateString(), 
        CashAdvanceApplied: true, 
        Amount: 90.0000, 
        CurrencyCode: 'USD', 
        ReportName: '12372937'
        },
        {
        Id: '19710704432971795', 
        Vendor: 'Impact Hub', 
        SpendingCategory: 'Other',
        TransactionDate: date3.toLocaleDateString(), 
        CashAdvanceApplied: false, 
        Amount: 100.0000, 
        CurrencyCode: 'USD', 
        ReportName: '12372937'
        },
        {
        Id: '19710704432971796', 
        Vendor: 'Fireworks', 
        SpendingCategory: 'Entertainment',
        TransactionDate: date3.toLocaleDateString(), 
        CashAdvanceApplied: true, 
        Amount: 40.8000, 
        CurrencyCode: 'USD', 
        ReportName: '12372937'
        },
        {
        Id: '19710704432971813', 
        Vendor: 'Uber', 
        SpendingCategory: 'Ground Transportation',
        TransactionDate: date3.toLocaleDateString(), 
        CashAdvanceApplied: true, 
        Amount: 30.8900, 
        CurrencyCode: 'USD', 
        ReportName: '12381532'
        },
        {
        Id: '19710704432971814', 
        Vendor: 'United Airlines', 
        SpendingCategory: 'Airline Fee',
        TransactionDate: date3.toLocaleDateString(), 
        CashAdvanceApplied: true, 
        Amount: 150.0000, 
        CurrencyCode: 'USD', 
        ReportName: '12381532'
        },
        {
        Id: '19710704432971815', 
        Vendor: 'Starwood Hotels', 
        SpendingCategory: 'Lodging',
        TransactionDate: date3.toLocaleDateString(), 
        CashAdvanceApplied: false, 
        Amount: 200.0000, 
        CurrencyCode: 'USD', 
        ReportName: '12381532'
        },
        {
        Id: '19710704432971790', 
        Vendor: 'Microsoft', 
        SpendingCategory: 'Office Software',
        TransactionDate: date2.toLocaleDateString(), 
        CashAdvanceApplied: false, 
        Amount: 700.0000, 
        CurrencyCode: 'USD', 
        ReportName: '12372882'
        },
        {
        Id: '19710704432971810', 
        Vendor: 'Office Depot', 
        SpendingCategory: 'Office Supplies',
        TransactionDate: date2.toLocaleDateString(), 
        CashAdvanceApplied: true, 
        Amount: 100.0000, 
        CurrencyCode: 'USD', 
        ReportName: '12372882'
        },
        {
        Id: '19710704432971788', 
        Vendor: 'Staples', 
        SpendingCategory: 'Office Supplies',
        TransactionDate: date2.toLocaleDateString(), 
        CashAdvanceApplied: false, 
        Amount: 200.0000, 
        CurrencyCode: 'USD', 
        ReportName: '12372882'
        },
        {
        Id: '19710704432971791', 
        Vendor: 'ESET', 
        SpendingCategory: 'Office Software',
        TransactionDate: date2.toLocaleDateString(), 
        CashAdvanceApplied: false, 
        Amount: 600.0000, 
        CurrencyCode: 'USD', 
        ReportName: '12372882'
        },
        {
        Id: '19710704732971819', 
        Vendor: 'Starwood Hotels', 
        SpendingCategory: 'Lodging',
        TransactionDate: date3.toLocaleDateString(), 
        CashAdvanceApplied: false, 
        Amount: 200.0000, 
        CurrencyCode: 'USD', 
        ReportName: '12381535'
        }
  ]

const categories = [
  {
    Type: 'Ground Transportation',
    ImageURL: 'https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/meeting.a44eb1e81b027ba58ea71078394ca1a0.svg'
  },
  {
    Type: 'Lodging',
    ImageURL: 'https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/account.7e6a4a82a354a98226bc0c0b4ec9039b.svg'
  },
  {
    Type: 'Airline Fee',
    ImageURL: 'https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/itinerary.82ae0728d114f607d5b618e3b4eba614.svg'
  },
  {
    Type: 'Meal',
    ImageURL: 'https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/change_request.b0ee4a80fb3ec8b889c043706b26bb1d.svg'
  },
  {
    Type: 'Entertainment',
    ImageURL: 'https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/default-broken.b3426980ecaefcfc0778d475c1fe4dd6.svg'
  },
  {
    Type: 'Other',
    ImageURL: 'https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/feedback.c533ed2d280d39d9288b2fd741a18651.svg'
  },
  {
    Type: 'Office Supplies',
    ImageURL: 'https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/case.2bb73f1b3eff52a8134fd591447bdaa1.svg'
  },
  {
    Type: 'Advertising/Marketing',
    ImageURL: 'https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/lead.e61e72321674c9469b115c0552c5dc65.svg'
  },
  {
    Type: 'Office Software',
    ImageURL: 'https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/report_update.2d453d1646665c2ede6de83f848a6566.svg'
  }
]

async function syncReports ({ dataStore, integrationParameters }) {
  console.log('Synching data...')

  countTotalAmount()

  dataStore.save('reports', reports)
  dataStore.save('expenses', expenses)
  dataStore.save('categories', categories)
  console.log("Synchronization complete")
}

function countTotalAmount() {
  let amounts = new Map()
  expenses.forEach(e => {
    amounts.set(e.ReportName, (amounts.has(e.ReportName)? amounts.get(e.ReportName) : 0) + e.Amount)
  })
  reports.forEach(r => r.TotalAmount = amounts.get(r.Id))
}

async function incrementalSynch({dataStore, client}) {
  console.log("Running incremental synchronization...")
  //pulling a random report from the report list
  let report = JSON.parse(JSON.stringify(reports[Math.floor(Math.random() * (reports.length))]))
  //this looks really scary, but we need to get the string value of report id, transfer it to int, add the randomly generated value...
  const reportId = parseInt(report.Id) + Math.floor(Math.random() * (1000 - reports.length)) + reports.length
  //and then return it back to being a string
  let rid = reportId.toString()
  report.Id = rid
  report.DateSubmitted=date.toLocaleDateString()

  //randomly generating a number of expenses for a report
  let numOfExpenses = Math.floor(Math.random() * (7 - 1)) + 1
  //expenses will be saved into the array 
  let iExpenses = []
  let totalamount = 0
  //pulling the last id of an expense so we can adequately increment the ids
  //we have to slice the value since the ids are far outside of integer range 
  let eLastId = parseInt(expenses[expenses.length-1].Id.slice(12,17))
  for (let i=0; i< numOfExpenses; i++) {
    //this monstrosity is required if we want to make a deep copy of an object
    //otherwise we get a shallow copy and any change to the object also changes the expense in the global variable
    //which leads to SQL conflicts further down the line
    let expense = JSON.parse(JSON.stringify(expenses[Math.floor(Math.random() * (expenses.length))]))
    expense.ReportName = rid
    expense.TransactionDate=report.DateSubmitted
    let eId = eLastId + (i + 1)
    expense.Id = expense.Id.slice(0,12) + eId.toString()
    totalamount += expense.Amount
    if (i==numOfExpenses-1) expenses.push(expense)
    iExpenses.push(expense)
  }
  report.TotalAmount=totalamount
  dataStore.save('reports', report)
  dataStore.save('expenses', iExpenses)
  console.log("Incremental synchronization completed...")
}

async function updateReport({ dataStore, client, actionParameters, integrationParameters }) {
  console.log(`Updating report with id ${actionParameters.Id}...`)
  
  const {Id, Type, OwnerName, OwnerMail, DateSubmitted, TotalAmount, CurrencyCode, Status} = actionParameters
  const report = {Id, Type, OwnerName, OwnerMail, DateSubmitted, TotalAmount, CurrencyCode, Status}

  dataStore.save('reports', report)
  console.log(`Report with id ${actionParameters.Id} updated`)
}

integration.define({
  actions: [
    {
      name: 'updateReport',
      parameters: [
        {
            name: 'Id',
            type: 'STRING',
            required: true
        },
        {
          name: 'Status',
          type: 'STRING',
          required: true
        },
        {
          name: 'Type',
          type: 'STRING'
        },
        {
          name: 'OwnerName',
          type: 'STRING'
        },
        {
          name: 'OwnerMail',
          type: 'STRING'
        },
        {
          name: 'DateSubmitted',
          type: 'DATE'
        },
        {
          name: 'TotalAmount',
          type: 'DOUBLE'
        },
        {
          name: 'CurrencyCode',
          type: 'STRING'
        }
      ],
      function: updateReport
    }
  ],
  synchronizations: [
    {
      name: 'reports',
      fullSyncFunction: syncReports,
      incrementalSyncFunction: incrementalSynch
    }
  ],
  model: {
    tables: [
      {
        name: 'reports',
        columns: [
          {
            name: 'Id',
            type: 'STRING',
            length: 255,
            primaryKey: true
          },
          {
            name: 'Type',
            type: 'STRING',
            length: 255
          },
          {
            name: 'OwnerName',
            type: 'STRING',
            length: 32
          },
          {
              name: 'OwnerMail',
              type: 'STRING',
              length: 32
          },
          {
            name: 'DateSubmitted',
            type: 'DATE'
          },
          {
            name: 'TotalAmount',
            type: 'DOUBLE'
          },
          {
            name: 'CurrencyCode',
            type: 'STRING',
            length: 3
          },
          {
            name: 'Status',
            type: 'STRING',
            length: 32
          }
        ]
      },
      {
          name: 'expenses',
          columns: [
              {
                  name: 'Id',
                  type: 'STRING',
                  length: 255,
                  primaryKey: true
              },
              {
                  name: 'Vendor',
                  type: 'STRING',
                  length: 255
              },
              {
                  name: 'SpendingCategory',
                  type: 'STRING',
                  length: 255
              },
              {
                  name: 'TransactionDate',
                  type: 'DATE'
              },
              {
                  name: 'CashAdvanceApplied',
                  type: 'BOOLEAN'
              },
              {
                  name: 'Amount',
                  type: 'DOUBLE'
              },
              {
                name: 'CurrencyCode',
                type: 'STRING',
                length: 3
              },
              {
                  name: 'ReportName',
                  type: 'STRING',
                  length: 255
              }
          ]
      },
      {
        name: 'categories',
        columns: [
          {
            name: 'Type',
            type: 'STRING',
            length: 255,
            primaryKey: true
          },
          {
            name: 'ImageURL',
            type: 'STRING',
            length: 512
          }
        ]
      }
    ],
    relationships: [
      {
        name: 'expense_report',
        primaryTable: 'reports',
        foreignTable: 'expenses',
        columnPairs: [
          {
            primaryKey: 'Id',
            foreignKey: 'ReportName'
          }
        ]
      },
      {
        name: 'expenses_categories',
        primaryTable: 'categories',
        foreignTable: 'expenses',
        columnPairs: [
          {
            primaryKey: 'Type',
            foreignKey: 'SpendingCategory'
          }
        ]
      }
    ]
  }
})