var date = new Date()

const reports = [
  {
      Id: '12372844', 
      Type: 'Appliances', 
      OwnerName: 'Aline Gomes', 
      OwnerMail: 'aline.gomes@acme.com',
      DateSubmitted: date.toLocaleDateString(), 
      TotalAmount: 0, 
      CurrencyCode: 'USD',
      Comment: '', 
      Status: 'Submitted'
      },
      {
      Id: '12372845', 
      Type: 'Appliances', 
      OwnerName: 'Billy Taylor', 
      OwnerMail: 'billy.taylor@acme.com',
      DateSubmitted: date.toLocaleDateString(), 
      TotalAmount: 0, 
      CurrencyCode: 'USD',
      Comment: '', 
      Status: 'Submitted'
      },
      {
      Id: '12372846', 
      Type: 'Training', 
      OwnerName: 'Marijan Humerca', 
      OwnerMail: 'marijan.humerca@acme.com',
      DateSubmitted: date.toLocaleDateString(), 
      TotalAmount: 0, 
      CurrencyCode: 'USD', 
      Comment: '', 
      Status: 'Submitted'
      },
      {
      Id: '12372847', 
      Type: 'Office Supplies', 
      OwnerName: 'Mark Smith', 
      OwnerMail: 'mark.smith@acme.com',
      DateSubmitted: date.toLocaleDateString(), 
      TotalAmount: 0, 
      CurrencyCode: 'USD',
      Comment: '',  
      Status: 'Submitted'
      },
      {
      Id: '12372848', 
      Type: 'Office Software', 
      OwnerName: 'Robert Clayton', 
      OwnerMail: 'robert.clayton@acme.com',
      DateSubmitted: date.toLocaleDateString(), 
      TotalAmount: 0, 
      CurrencyCode: 'USD', 
      Comment: '', 
      Status: 'Submitted'
      },
      {
      Id: '12372849', 
      Type: 'Maintenance', 
      OwnerName: 'Sarah Silva', 
      OwnerMail: 'sarah.silva@acme.com',
      DateSubmitted: date.toLocaleDateString(), 
      TotalAmount: 0, 
      CurrencyCode: 'USD', 
      Comment: '', 
      Status: 'Submitted'
      }  
]

const expenses = [
  {
      Id: '19710704432971771', 
      Supplier: 'JB Hifi', 
      Category: 'Appliances',
      Description: 'Printer',
      TransactionDate: date.toLocaleDateString(), 
      Price: 500, 
      CurrencyCode: 'USD', 
      Quantity: 1,
      ReportName: '12372844',
      Total: 500
      },
      {
      Id: '19710704432971772', 
      Supplier: 'JB Hifi', 
      Category: 'Appliances',
      Description: 'Scanner',
      TransactionDate: date.toLocaleDateString(), 
      Price: 400, 
      CurrencyCode: 'USD', 
      Quantity: 1,
      ReportName: '12372845',
      Total: 400
      },
      {
      Id: '19710704432971773', 
      Supplier: 'Linkedin Learning', 
      Category: 'Training',
      Description: 'JavaScript Course',
      TransactionDate: date.toLocaleDateString(), 
      Price: 100, 
      CurrencyCode: 'USD', 
      Quantity: 1,
      ReportName: '12372846',
      Total: 100
      },
      {
      Id: '19710704432971774', 
      Supplier: 'Linkedin Learning', 
      Category: 'Training',
      Description: 'Cloud Concepts Course',
      TransactionDate: date.toLocaleDateString(), 
      Price: 120, 
      CurrencyCode: 'USD', 
      Quantity: 1,
      ReportName: '12372846',
      Total: 120
      },
      {
      Id: '19710704432971775', 
      Supplier: 'Staples', 
      Category: 'Office Supplies',
      Description: 'Printer Paper',
      TransactionDate: date.toLocaleDateString(),  
      Price: 50.25, 
      CurrencyCode: 'USD', 
      Quantity: 10,
      ReportName: '12372847',
      Total: 502.50
      },
      {
      Id: '19710704432971776', 
      Supplier: 'Staples', 
      Category: 'Office Supplies',
      Description: 'Ink Cartridges',
      TransactionDate: date.toLocaleDateString(), 
      Price: 120.50, 
      CurrencyCode: 'USD', 
      Quantity: 12,
      ReportName: '12372847',
      Total: 1446
      },
      {
      Id: '19710704432971777', 
      Supplier: 'Office Depot', 
      Category: 'Office Supplies',
      Description: 'General Stationary',
      TransactionDate: date.toLocaleDateString(), 
      Price: 30, 
      CurrencyCode: 'USD', 
      Quantity: 5,
      ReportName: '12372847',
      Total: 150
      },
      {
      Id: '19710704432971778', 
      Supplier: 'Microsoft', 
      Category: 'Office Software',
      Description: 'Microsoft 365 Subscription',
      TransactionDate: date.toLocaleDateString(), 
      Price: 30, 
      CurrencyCode: 'USD', 
      Quantity: 5,
      ReportName: '12372848',
      Total: 150
      },
      {
      Id: '19710704432971779', 
      Supplier: 'Electrician', 
      Category: 'Maintenance',
      Description: 'Fix lights',
      TransactionDate: date.toLocaleDateString(), 
      Price: 75.60, 
      CurrencyCode: 'USD', 
      Quantity: 1,
      ReportName: '12372849',
      Total: 75.60
      }
]

const categories = [
  {
    Type: 'Appliances',
    ImageURL: 'https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/folder.462b3c7e85bf4fa6e7a50801cd400bd2.svg'
  },
  {
    Type: 'Maintenance',
    ImageURL: 'https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/incident.e71280c2c22b2abd3aba06971728c296.svg'
  },
  {
    Type: 'Training',
    ImageURL: 'https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/course.fa9aabf2ac03cfad305b04ed8db96430.svg'
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
    amounts.set(e.ReportName, (amounts.has(e.ReportName)? amounts.get(e.ReportName) : 0) + (e.Price*e.Quantity))
  })
  reports.forEach(r => r.TotalAmount = amounts.get(r.Id))
}

async function incrementalSynch({dataStore, client}) {
  console.log("Running incremental synchronization...")
  let report = JSON.parse(JSON.stringify(reports[Math.floor(Math.random() * (reports.length))]))
  //but we need to get the string value of report id, transfer it to int, add the randomly generated value...
  const reportId = parseInt(report.Id) + Math.floor(Math.random() * (1000 - reports.length)) + reports.length
  report.Id = reportId.toString()

  //randomly generating a number of expenses for a report
  let numOfExpenses = Math.floor(Math.random() * (expenses.length - 1)) + 1
  //expenses will be saved into the array 
  let iExpenses = []
  let totalamount = 0
  //pulling the last id of an expense so we can adequately increment the ids
  //we have to slice the value since the ids are far outside of integer range 
  let eLastId = parseInt(expenses[expenses.length-1].Id.slice(12,17))
  for (let i=0; i< numOfExpenses; i++) {
    let expense = JSON.parse(JSON.stringify(expenses[Math.floor(Math.random() * (expenses.length))]))
    expense.ReportName = report.Id
    expense.TransactionDate=report.DateSubmitted
    let eId = eLastId + (i + 1)
    expense.Id = expense.Id.slice(0,12) + eId.toString()
    totalamount += (expense.Price * expense.Quantity)
    iExpenses.push(expense)
  }
  report.TotalAmount = totalamount
  dataStore.save('reports', report)
  dataStore.save('expenses', iExpenses)
  console.log("Incremental synchronization completed...")
}

async function updateReport({ dataStore, client, actionParameters, integrationParameters }) {
  console.log(`Updating report with id ${actionParameters.Id}...`)
  
  const {Id, Type, OwnerName, OwnerMail, DateSubmitted, TotalAmount, CurrencyCode, Comment, Status} = actionParameters
  const report = {Id, Type, OwnerName, OwnerMail, DateSubmitted, TotalAmount, CurrencyCode, Comment, Status}

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
        },
        {
          name: 'Comment',
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
          },
          {
            name: 'Comment',
            type: 'STRING'
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
            name: 'Supplier',
            type: 'STRING',
            length: 255
          },
          {
            name: 'Category',
            type: 'STRING',
            length: 255
          },
          {
            name: 'Description',
            type: 'STRING'
          },
          {
            name: 'Price',
            type: 'DOUBLE'
          },
          {
            name: 'CurrencyCode',
            type: 'STRING',
            length: 3
          },
          {
            name: 'Quantity',
            type: 'DOUBLE'
          },
          {
            name: 'TransactionDate',
            type: 'DATE',
          },
          {
            name: 'ReportName',
            type: 'STRING',
          },
          {
            name: 'Total',
            type: 'DOUBLE',
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
        primaryTable: 'reports',
        foreignTable: 'categories',
        columnPairs: [
          {
            primaryKey: 'Type',
            foreignKey: 'Type'
          }
        ]
      }
    ]
  }
})