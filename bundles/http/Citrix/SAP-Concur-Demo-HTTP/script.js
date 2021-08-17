const moment = library.load('moment-timezone')
const _ = library.load('lodash');

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
                  name: 'ReportId',
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
            foreignKey: 'ReportId'
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

const today = moment().toDate()
const twoDaysAgo = moment().subtract(2, 'days').toDate()
const fiveDaysAgo = moment().subtract(5, 'days').toDate()

let reports = [
    {
        Id: '12372847', 
        Type: 'Austin Trip', 
        OwnerName: 'Sarah Silva', 
        OwnerMail: 'sarah.silva@acme.com',
        DateSubmitted: today, 
        TotalAmount: 0, 
        CurrencyCode: 'USD', 
        Status: 'Submitted & Pending Approval'
        },
        {
        Id: '12372882', 
        Type: 'Office Supplies', 
        OwnerName: 'Stella Milne', 
        OwnerMail: 'stella.milne@acme.com',
        DateSubmitted: twoDaysAgo, 
        TotalAmount: 0, 
        CurrencyCode: 'USD', 
        Status: 'Submitted & Pending Approval'
        },

        {
        Id: '12372917', 
        Type: 'August Prospective Clients Dinners', 
        OwnerName: 'Billy Taylor', 
        OwnerMail: 'billy.taylor@acme.com',
        DateSubmitted: twoDaysAgo, 
        TotalAmount: 0, 
        CurrencyCode: 'USD', 
        Status: 'Submitted & Pending Approval'
        },
        {
        Id: '12372937', 
        Type: 'Product Launch Event', 
        OwnerName: 'Marijan Humerca', 
        OwnerMail: 'marijan.humerca@acme.com',
        DateSubmitted: fiveDaysAgo, 
        TotalAmount: 0, 
        CurrencyCode: 'USD', 
        Status: 'Submitted & Pending Approval'
        },
        {
        Id: '12381532', 
        Type: 'LA Trip', 
        OwnerName: 'Billy Taylor', 
        OwnerMail: 'billy.taylor@acme.com',
        DateSubmitted: fiveDaysAgo, 
        TotalAmount: 0, 
        CurrencyCode: 'USD', 
        Status: 'Submitted & Pending Approval'
        },
        {
        Id: '12381535', 
        Type: 'France Trip', 
        OwnerName: 'Billy Taylor', 
        OwnerMail: 'billy.taylor@acme.com',
        DateSubmitted: fiveDaysAgo, 
        TotalAmount: 0, 
        CurrencyCode: 'USD', 
        Status: 'Submitted & Pending Approval'
        }
]



  const expenses = [
    {
        Id: '19710704432971777', 
        Vendor: 'Lyft', 
        SpendingCategory: 'Ground Transportation',
        TransactionDate: today, 
        CashAdvanceApplied: true, 
        Amount: 20.2500, 
        CurrencyCode: 'USD', 
        ReportId: '12372847'
        },
        {
        Id: '19710704432971778', 
        Vendor: 'Sheraton Hotels And Resorts', 
        SpendingCategory: 'Lodging',
        TransactionDate: today, 
        CashAdvanceApplied: false, 
        Amount: 100.0000, 
        CurrencyCode: 'USD', 
        ReportId: '12372847'
        },
        {
        Id: '19710704432971779', 
        Vendor: 'Southwest Airlines', 
        SpendingCategory: 'Airline Fee',
        TransactionDate: today, 
        CashAdvanceApplied: false, 
        Amount: 500.0000, 
        CurrencyCode: 'USD', 
        ReportId: '12372847'
        },
        {
        Id: '19710704432971780', 
        Vendor: 'Dunkin\' Donuts', 
        SpendingCategory: 'Meal',
        TransactionDate: today, 
        CashAdvanceApplied: true, 
        Amount: 10.6000, 
        CurrencyCode: 'USD', 
        ReportId: '12372847'
        },
        {
        Id: '19710704432971781', 
        Vendor: 'Chipotle Mexican Grill', 
        SpendingCategory: 'Meal',
        TransactionDate: today, 
        CashAdvanceApplied: true, 
        Amount: 30.0000, 
        CurrencyCode: 'USD', 
        ReportId: '12372847'
        },
        {
        Id: '19710704432971782', 
        Vendor: 'Royal', 
        SpendingCategory: 'Entertainment',
        TransactionDate: today, 
        CashAdvanceApplied: true, 
        Amount: 120.5000, 
        CurrencyCode: 'USD', 
        ReportId: '12372847'
        },
        {
        Id: '19710704432971783', 
        Vendor: 'Zinc', 
        SpendingCategory: 'Meal',
        TransactionDate: twoDaysAgo, 
        CashAdvanceApplied: false, 
        Amount: 60.0000, 
        CurrencyCode: 'USD', 
        ReportId: '12372917'
        },
        {
        Id: '19710704432971784', 
        Vendor: 'Bellevue', 
        SpendingCategory: 'Meal',
        TransactionDate: twoDaysAgo, 
        CashAdvanceApplied: true, 
        Amount: 75.0000, 
        CurrencyCode: 'USD', 
        ReportId: '12372917'
        },
        {
        Id: '19710704432971785', 
        Vendor: 'Engawa', 
        SpendingCategory: 'Meal',
        TransactionDate: twoDaysAgo, 
        CashAdvanceApplied: false, 
        Amount: 100.0000, 
        CurrencyCode: 'USD', 
        ReportId: '12372917'
        },
        {
        Id: '19710704432971786', 
        Vendor: 'Uber', 
        SpendingCategory: 'Ground Transportation',
        TransactionDate: twoDaysAgo, 
        CashAdvanceApplied: false, 
        Amount: 15.5000, 
        CurrencyCode: 'USD', 
        ReportId: '12372917'
        },
        {
        Id: '19710704432971787', 
        Vendor: 'Lyft', 
        SpendingCategory: 'Ground Transportation',
        TransactionDate: twoDaysAgo, 
        CashAdvanceApplied: true, 
        Amount: 60.7500, 
        CurrencyCode: 'USD', 
        ReportId: '12372917'
        },
        {
        Id: '19710704432971792', 
        Vendor: 'Nova PR', 
        SpendingCategory: 'Advertising/Marketing',
        TransactionDate: fiveDaysAgo, 
        CashAdvanceApplied: true, 
        Amount: 1000.0000, 
        CurrencyCode: 'USD', 
        ReportId: '12372937'
        },
        {
        Id: '19710704432971793', 
        Vendor: 'Food Catering', 
        SpendingCategory: 'Meal',
        TransactionDate: fiveDaysAgo, 
        CashAdvanceApplied: false, 
        Amount: 200.0000, 
        CurrencyCode: 'USD', 
        ReportId: '12372937'
        },
        {
        Id: '19710704432971794', 
        Vendor: 'Node 42', 
        SpendingCategory: 'Entertainment',
        TransactionDate: fiveDaysAgo, 
        CashAdvanceApplied: true, 
        Amount: 90.0000, 
        CurrencyCode: 'USD', 
        ReportId: '12372937'
        },
        {
        Id: '19710704432971795', 
        Vendor: 'Impact Hub', 
        SpendingCategory: 'Other',
        TransactionDate: fiveDaysAgo, 
        CashAdvanceApplied: false, 
        Amount: 100.0000, 
        CurrencyCode: 'USD', 
        ReportId: '12372937'
        },
        {
        Id: '19710704432971796', 
        Vendor: 'Fireworks', 
        SpendingCategory: 'Entertainment',
        TransactionDate: fiveDaysAgo, 
        CashAdvanceApplied: true, 
        Amount: 40.8000, 
        CurrencyCode: 'USD', 
        ReportId: '12372937'
        },
        {
        Id: '19710704432971813', 
        Vendor: 'Uber', 
        SpendingCategory: 'Ground Transportation',
        TransactionDate: fiveDaysAgo, 
        CashAdvanceApplied: true, 
        Amount: 30.8900, 
        CurrencyCode: 'USD', 
        ReportId: '12381532'
        },
        {
        Id: '19710704432971814', 
        Vendor: 'United Airlines', 
        SpendingCategory: 'Airline Fee',
        TransactionDate: fiveDaysAgo, 
        CashAdvanceApplied: true, 
        Amount: 150.0000, 
        CurrencyCode: 'USD', 
        ReportId: '12381532'
        },
        {
        Id: '19710704432971815', 
        Vendor: 'Starwood Hotels', 
        SpendingCategory: 'Lodging',
        TransactionDate: fiveDaysAgo, 
        CashAdvanceApplied: false, 
        Amount: 200.0000, 
        CurrencyCode: 'USD', 
        ReportId: '12381532'
        },
        {
        Id: '19710704432971790', 
        Vendor: 'Microsoft', 
        SpendingCategory: 'Office Software',
        TransactionDate: twoDaysAgo, 
        CashAdvanceApplied: false, 
        Amount: 700.0000, 
        CurrencyCode: 'USD', 
        ReportId: '12372882'
        },
        {
        Id: '19710704432971810', 
        Vendor: 'Office Depot', 
        SpendingCategory: 'Office Supplies',
        TransactionDate: twoDaysAgo, 
        CashAdvanceApplied: true, 
        Amount: 100.0000, 
        CurrencyCode: 'USD', 
        ReportId: '12372882'
        },
        {
        Id: '19710704432971788', 
        Vendor: 'Staples', 
        SpendingCategory: 'Office Supplies',
        TransactionDate: twoDaysAgo, 
        CashAdvanceApplied: false, 
        Amount: 200.0000, 
        CurrencyCode: 'USD', 
        ReportId: '12372882'
        },
        {
        Id: '19710704432971791', 
        Vendor: 'ESET', 
        SpendingCategory: 'Office Software',
        TransactionDate: twoDaysAgo, 
        CashAdvanceApplied: false, 
        Amount: 600.0000, 
        CurrencyCode: 'USD', 
        ReportId: '12372882'
        },
        {
        Id: '19710704732971819', 
        Vendor: 'Starwood Hotels', 
        SpendingCategory: 'Lodging',
        TransactionDate: fiveDaysAgo, 
        CashAdvanceApplied: false, 
        Amount: 200.0000, 
        CurrencyCode: 'USD', 
        ReportId: '12381535'
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

  let saveReports = calculateReportsWithTotals(expenses, reports)

  dataStore.save('reports', saveReports)
  dataStore.save('expenses', expenses)
  dataStore.save('categories', categories)
  console.log("Synchronization complete")
}

function deepClone(list) {
  return JSON.parse(JSON.stringify(list[generateRandomNumValue(0, list.length)]))
}

function generateRandomNumValue(floor, ceiling) {
  return Math.floor(Math.random()* (ceiling - floor)) + floor
}

function calculateReportsWithTotals(expenses, reports) {
  let amounts = expenses.reduce((acc, {ReportId, Amount}) => {    
    acc[ReportId] = (acc[ReportId] || 0) + Amount
    return acc
    }, {} )
	//is used exclusively for incremental sync, since we're passing a single object here--so map() won't work
  if (Object.keys(amounts).length===1) {
    reports.TotalAmount = amounts[reports.Id]
    return
  }
  return reports.map(report => ({...report, TotalAmount: amounts[report.Id]}))
}

async function incrementalSynch({dataStore, client}) {
  console.log("Running incremental synchronization...")
  //pulling a random report from the report list
  let report = deepClone(reports)
  //We need to get the string value of report id, transfer it to int, add the randomly generated value and make it a string again
  const reportId = (parseInt(report.Id) + generateRandomNumValue(reports.length, 1000)).toString()
  report.Id = reportId
  report.DateSubmitted = today

  //randomly generating a number of expenses for a report
  let numOfExpenses = generateRandomNumValue(1, 6)
  //expenses will be saved into the array 
  const newExpenses = _.range(0, numOfExpenses).map(i => {
      const expense = deepClone(expenses)
      expense.ReportId = report.Id
      expense.TransactionDate = report.DateSubmitted
      expense.Id = expense.Id.slice(0,12) + (generateRandomNumValue(1, 99999)).toString()
      expense.TransactionDate = report.DateSubmitted
      return expense
  })
  calculateReportsWithTotals(newExpenses, report)
  dataStore.save('reports', report)
  dataStore.save('expenses', newExpenses)
  console.log("Incremental synchronization completed...")
}

async function updateReport({ dataStore, client, actionParameters, integrationParameters }) {
  console.log(`Updating report with id ${actionParameters.Id}...`)
  
  const {Id, Type, OwnerName, OwnerMail, DateSubmitted, TotalAmount, CurrencyCode, Status} = actionParameters
  const report = {Id, Type, OwnerName, OwnerMail, DateSubmitted, TotalAmount, CurrencyCode, Status}

  dataStore.save('reports', report)
  console.log(`Report with id ${actionParameters.Id} updated`)
}