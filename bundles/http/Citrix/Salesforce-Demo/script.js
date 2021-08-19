const moment = library.load("moment-timezone");
const uuid = library.load("uuid");

integration.define({
  actions: [
    {
      name: "updateTicket",
      parameters: [
        {
          name: "Id",
          type: "STRING",
          required: true,
        },
        {
          name: "Subject",
          type: "STRING",
        },
        {
          name: "AccountId",
          type: "STRING",
        },
        {
          name: "SubmittedOn",
          type: "DATE",
        },
        {
          name: "DueDate",
          type: "DATETIME",
        },
        {
          name: "Priority",
          type: "STRING",
        },
        {
          name: "Status",
          type: "STRING",
          required: true,
        },
        {
          name: "Description",
          type: "STRING",
        },
      ],
      function: updateTicket,
    },
    {
      name: "createTask",
      parameters: [
        {
          name: "Subject",
          type: "STRING",
          required: true,
        },
        {
          name: "AccountId",
          type: "STRING",
          required: true,
        },
        {
          name: "SubmittedOn",
          type: "DATE",
        },
        {
          name: "DueDate",
          type: "DATETIME",
          required: true,
        },
        {
          name: "Status",
          type: "STRING",
          required: true,
        },
        {
          name: "Priority",
          type: "STRING",
        },
        {
          name: "Description",
          type: "STRING",
        },
      ],
      function: createTask,
    },
    {
      name: "createOpportunity",
      parameters: [
        {
          name: "Name",
          type: "STRING",
          required: true,
        },
        {
          name: "OwnerName",
          type: "STRING",
        },
        {
          name: "DateSubmitted",
          type: "DATE",
        },
        {
          name: "DueDate",
          type: "DATE",
        },
        {
          name: "Description",
          type: "STRING",
        },
        {
          name: "AccountId",
          type: "STRING",
        },
        {
          name: "Amount",
          type: "DOUBLE",
        },
        {
          name: "Type",
          type: "STRING",
        },
        {
          name: "Stage",
          type: "STRING",
        },
        {
          name: "Probability",
          type: "INTEGER",
        },
      ],
      function: createOpportunity,
    },
  ],
  synchronizations: [
    {
      name: "accounts",
      fullSyncFunction: syncAccounts,
      incrementalSyncFunction: incrementSyncOpportunity,
    },
  ],
  model: {
    tables: [
      {
        name: "opportunities",
        columns: [
          {
            name: "Id",
            type: "STRING",
            length: 64,
            primaryKey: true,
          },
          {
            name: "Name",
            type: "STRING",
            length: 64,
          },
          {
            name: "OwnerName",
            type: "STRING",
            length: 64,
          },
          {
            name: "Amount",
            type: "DOUBLE",
          },
          {
            name: "CurrencyCode",
            type: "STRING",
            length: 3,
          },
          {
            name: "Stage",
            type: "STRING",
            length: 32,
          },
          {
            name: "Type",
            type: "STRING",
            length: 32,
          },
          {
            name: "DateSubmitted",
            type: "DATE",
          },
          {
            name: "DueDate",
            type: "DATE",
          },
          {
            name: "Probability",
            type: "INTEGER",
          },
          {
            name: "Description",
            type: "STRING",
            length: 1024,
          },
          {
            name: "AccountId",
            type: "STRING",
            length: 64,
          },
        ],
      },
      {
        name: "tasks",
        columns: [
          {
            name: "Id",
            type: "STRING",
            length: 64,
            primaryKey: true,
          },
          {
            name: "Subject",
            type: "STRING",
            length: 255,
          },
          {
            name: "AccountId",
            type: "STRING",
            length: 64,
          },
          {
            name: "SubmittedOn",
            type: "DATE",
          },
          {
            name: "DueDate",
            type: "DATETIME",
          },
          {
            name: "Status",
            type: "STRING",
            length: 64,
          },
          {
            name: "Priority",
            type: "STRING",
            length: 32,
          },
          {
            name: "Description",
            type: "STRING",
            length: 512,
          },
        ],
      },
      {
        name: "priorities",
        columns: [
          {
            name: "Name",
            type: "STRING",
            length: 16,
            primaryKey: true,
          },
          {
            name: "Url",
            type: "STRING",
            length: 512,
          },
        ],
      },
      {
        name: "accounts",
        columns: [
          {
            name: "Id",
            type: "STRING",
            length: 64,
            primaryKey: true,
          },
          {
            name: "Name",
            type: "STRING",
            length: 64,
          },
          {
            name: "Industry",
            type: "STRING",
            length: 64,
          },
          {
            name: "Phone",
            type: "STRING",
            length: 32,
          },
          {
            name: "Address",
            type: "STRING",
            length: 255,
          },
          {
            name: "Description",
            type: "STRING",
            length: 512,
          },
          {
            name: "Email",
            type: "STRING",
            length: 64,
          },
        ],
      },
    ],
    relationships: [
      {
        name: "account_tasks",
        primaryTable: "accounts",
        foreignTable: "tasks",
        columnPairs: [
          {
            primaryKey: "Id",
            foreignKey: "AccountId",
          },
        ],
      },
      {
        name: "account_opportunities",
        primaryTable: "accounts",
        foreignTable: "opportunities",
        columnPairs: [
          {
            primaryKey: "Id",
            foreignKey: "AccountId",
          },
        ],
      },
      {
        name: "priority_tasks",
        primaryTable: "priorities",
        foreignTable: "tasks",
        columnPairs: [
          {
            primaryKey: "Name",
            foreignKey: "Priority",
          },
        ],
      },
    ],
  },
});

const tomorrow = moment().add(1, "days").toISOString();
const today = moment().toDate();
const tomorrowDate = moment().add(1, "days").toDate();
const todayPlusOneHour = moment()
  .add(1, "hours")
  .add(1, "minutes")
  .toISOString();
const twoDaysAgo = moment().subtract(2, "days").toDate();
const fiveDaysAgo = moment().subtract(5, "days").toDate();

const accounts = [
  {
    Id: "1",
    Address: "Grand Rapids, 3223 Twin Oaks Drive, 49503, USA",
    Industry: "Advertising",
    Name: "Symbio Communications",
    Phone: "231-424-7837",
    Description: "The best advertising your money can buy!",
    Email: "contact@symbio.com",
  },
  {
    Id: "2",
    Address: "Elk Lake, 82 Orphan Road, 54739, USA",
    Industry: "Apparel",
    Name: "Abbot Textiles",
    Phone: "618-624-2383",
    Description: "Comfiest textiles in all the US!",
    Email: "contact@abbottextiles.com",
  },
  {
    Id: "3",
    Address: "Oakland, 1084 Blackwell Street, 38060, USA",
    Industry: "Consulting",
    Name: "ZenePoint",
    Phone: "907-345-7323",
    Description: "We'll consult ANYTHING with you",
    Email: "zene@google.co.uk",
  },
  {
    Id: "4",
    Address: "Edwards, 3753 Williams Avenue, 93523, USA",
    Industry: "Clothing Retail",
    Name: "Atlantic Retail Group",
    Phone: "661-275-4752",
    Description:
      "Going to a business meeting and need a business suit? We've got you covered",
    Email: "contact@ARGroup.com",
  },
  {
    Id: "5",
    Address: "Baltimore, 4827 Martha Ellen Drive, 21229, USA",
    Industry: "Book Publishing",
    Name: "Shaw Inc.",
    Phone: "775-599-9262",
    Description:
      "All the new bestsellers available at our place 2 hours before the global release!",
    Email: "contact@shaw.com",
  },
  {
    Id: "6",
    Address: "Superstition, 2790 East Avenue, 85207, USA",
    Industry: "Hospitality",
    Name: "Y Hotels & Resorts Ltd",
    Phone: "480-380-3572",
    Description:
      "Our hotels are so good they'd have to add 6 star ratings to the existing system",
    Email: "contact@YHRltd.com",
  },
];

var opportunities = [
  {
    Id: "1",
    Name: "Symbio CPG Module",
    OwnerName: "manager@citrix.com",
    Amount: 7950.0,
    CurrencyCode: "USD",
    Stage: "Prospecting",
    Type: "Existing Customer - Upgrade",
    DateSubmitted: twoDaysAgo,
    DueDate: tomorrowDate,
    Probability: 25,
    Description: "Upgrade the CPG Module",
    AccountId: "1",
  },
  {
    Id: "2",
    Name: "Atlantic Group Mobile Suite",
    OwnerName: "manager@citrix.com",
    Amount: 8950.0,
    CurrencyCode: "USD",
    Stage: "Proposal/Price Quote",
    Type: "New Customer",
    DateSubmitted: twoDaysAgo,
    DueDate: tomorrowDate,
    Probability: 25,
    Description: "Acquire the mobile suite for Atlantic Group",
    AccountId: "4",
  },
  {
    Id: "3",
    Name: "Atlantic Group CRM Cloud",
    OwnerName: "manager@citrix.com",
    Amount: 11950.0,
    CurrencyCode: "USD",
    Stage: "Negotiation/Review",
    Type: "New Customer",
    DateSubmitted: fiveDaysAgo,
    DueDate: tomorrowDate,
    Probability: 25,
    Description: "Requisition the necessary CRM Cloud accounts",
    AccountId: "4",
  },
  {
    Id: "4",
    Name: "Shaw CPG Module",
    OwnerName: "manager@citrix.com",
    Amount: 7950.0,
    CurrencyCode: "USD",
    Stage: "Closed Won",
    Type: "Existing Customer - Upgrade",
    DateSubmitted: fiveDaysAgo,
    DueDate: tomorrowDate,
    Probability: 25,
    Description: "Upgrade the CPG Module for Shaw",
    AccountId: "5",
  },
  {
    Id: "5",
    Name: "Shaw Mobile Suite",
    OwnerName: "manager@citrix.com",
    Amount: 8950.0,
    CurrencyCode: "USD",
    Stage: "Closed Lost",
    Type: "Existing Customer - Replacement",
    DateSubmitted: fiveDaysAgo,
    DueDate: tomorrowDate,
    Probability: 25,
    Description: "Order a new mobile suite in place of the previous one",
    AccountId: "5",
  },
];

var tasks = [
  {
    Id: "1",
    Subject: "Write preliminary contract draft",
    AccountId: "1",
    SubmittedOn: twoDaysAgo,
    DueDate: tomorrow,
    Priority: "High",
    Status: "Not Started",
    Description: "Write preliminary contract draft for later review",
  },
  {
    Id: "2",
    Subject: "Udpdate product presentation for next conference",
    AccountId: "3",
    SubmittedOn: twoDaysAgo,
    DueDate: tomorrow,
    Priority: "High",
    Status: "Not Started",
    Description:
      "Update the presentation, don't forget to address the feedback from the previous one",
  },
  {
    Id: "3",
    Subject: "Follow-up: send updated proposal",
    AccountId: "3",
    SubmittedOn: twoDaysAgo,
    DueDate: tomorrow,
    Priority: "Medium",
    Status: "In Progress",
    Description:
      "Send updated proposal to Joe for review before the team-wide presentation",
  },
  {
    Id: "4",
    Subject: "Close last opportunity",
    AccountId: "3",
    SubmittedOn: twoDaysAgo,
    DueDate: tomorrow,
    Priority: "Low",
    Status: "In Progress",
    Description: "Close last opportunity",
  },
  {
    Id: "5",
    Subject: "Discuss discount with sales manager",
    AccountId: "4",
    SubmittedOn: twoDaysAgo,
    DueDate: tomorrow,
    Priority: "High",
    Status: "Not Started",
    Description: "We want to have at least 5% discount",
  },
  {
    Id: "6",
    Subject: "Write sales proposal",
    AccountId: "1",
    SubmittedOn: twoDaysAgo,
    DueDate: tomorrow,
    Priority: "Medium",
    Status: "In Progress",
    Description: "Draft the proposal and have Mark review it later",
  },
  {
    Id: "7",
    Subject: "Identify decision makers in the company",
    AccountId: "1",
    SubmittedOn: twoDaysAgo,
    DueDate: tomorrow,
    Priority: "Low",
    Status: "Not Started",
    Description: "Use the sources Jane shared with us",
  },
  {
    Id: "8",
    Subject: "Identify the experts in the company",
    AccountId: "5",
    SubmittedOn: twoDaysAgo,
    DueDate: tomorrow,
    Priority: "Low",
    Status: "In Progress",
    Description: "Identify the experts in the company",
  },
  {
    Id: "9",
    Subject: "Prepare presentation for new clients",
    AccountId: "2",
    SubmittedOn: fiveDaysAgo,
    DueDate: tomorrow,
    Priority: "High",
    Status: "Not Started",
    Description: "Prepare presentation for new clients",
  },
  {
    Id: "10",
    Subject: "Send market research to VP",
    AccountId: "2",
    SubmittedOn: fiveDaysAgo,
    DueDate: tomorrow,
    Priority: "Medium",
    Status: "In Progress",
    Description: "Send market research to VP",
  },
  {
    Id: "11",
    Subject: "Call sales manager and discuss our proposal",
    AccountId: "2",
    SubmittedOn: fiveDaysAgo,
    DueDate: tomorrow,
    Priority: "Low",
    Status: "Not Started",
    Description: "Call sales manager and discuss our proposal",
  },
];

const priorities = [
  {
    Name: "High",
    Url: "https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/ticket_warning.7b6a0a206200e14e1fbf151efd88ab2f.svg",
  },
  {
    Name: "Medium",
    Url: "https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/ticket_move.fb5362498fae9fabdd971b62f0279a69.svg",
  },
  {
    Name: "Low",
    Url: "https://iws-stage-global-cdn-endpoint.azureedge.net/microapps/assets/exported/ticket_comment.624f1825e3e6aede8d689083147dc5e1.svg",
  },
];

async function syncAccounts({ dataStore }) {
  console.log("Synching accounts");

  dataStore.save("accounts", accounts);
  dataStore.save("opportunities", opportunities);
  dataStore.save("tasks", tasks);
  dataStore.save("priorities", priorities);

  console.log("Synchronization finished...");
}

function generateRandomNumber(floor, ceiling) {
  return Math.floor(Math.random() * (ceiling - floor)) + floor;
}

async function incrementSyncOpportunity({ dataStore }) {
  console.log("Running incremental sync...");

  const task = {
    ...JSON.parse(JSON.stringify(tasks[generateRandomNumber(0, tasks.length)])),
    Id: uuid.v4(),
    AccountId: generateRandomNumber(1, accounts.length).toString(),
    SubmittedOn: today,
    DueDate: todayPlusOneHour,
    Probability: generateRandomNumber(1, 100),
  };
  task.Subject = "Another " + task.Subject;

  dataStore.save("tasks", task);
  console.log("Incremental sync complete");
}

async function updateTicket({ dataStore, actionParameters }) {
  console.log(`Updating task with id ${actionParameters.Id}...`);

  const {
    Id,
    Subject,
    AccountId,
    SubmittedOn,
    DueDate,
    Priority,
    Status,
    Description,
  } = actionParameters;
  const task = {
    Id,
    Subject,
    AccountId,
    SubmittedOn,
    DueDate,
    Priority,
    Status,
    Description,
  };

  dataStore.save("tasks", task);
  console.log(`Report with id ${actionParameters.Id} updated`);
}

async function createTask({ dataStore, actionParameters }) {
  console.log(
    `Creating a task with subject ${actionParameters.Subject} for account with id of ${actionParameters.AccountId}`
  );

  const {
    Subject,
    AccountId,
    SubmittedOn,
    DueDate,
    Priority,
    Status,
    Description,
  } = actionParameters;
  const task = {
    Id: uuid.v4(),
    Subject,
    AccountId,
    SubmittedOn,
    DueDate,
    Priority,
    Status,
    Description,
  };

  dataStore.save("tasks", task);
  console.log(`Task with id ${task.Id} created..`);
}

function createOpportunity({ dataStore, actionParameters }) {
  console.log(
    `Creating an opportunity with a subject ${actionParameters.Subject}`
  );

  const {
    Name,
    Description,
    AccountId,
    DateSubmitted,
    DueDate,
    OwnerName,
    Stage,
    Type,
    Probability,
    Amount,
  } = actionParameters;
  const opportunity = {
    Id: uuid.v4(),
    Name,
    Description,
    AccountId,
    DateSubmitted,
    DueDate,
    OwnerName,
    Stage,
    Type,
    Probability,
    Amount,
    CurrencyCode: "USD",
  };

  dataStore.save("opportunities", opportunity);
  console.log(`Opportunity with id ${opportunity.Id} created...`);
}
