const uuid = library.load("uuid");
const moment = library.load("moment-timezone");

integration.define({
  actions: [
    {
      name: "updateTicket",
      parameters: [
        {
          name: "IssueKey",
          type: "STRING",
          required: true,
        },
        {
          name: "Summary",
          type: "STRING",
        },
        {
          name: "IssueType",
          type: "STRING",
        },
        {
          name: "Priority",
          type: "STRING",
        },
        {
          name: "Description",
          type: "STRING",
        },
        {
          name: "AssigneeId",
          type: "STRING",
        },
        {
          name: "Status",
          type: "STRING",
          required: true,
        },
        {
          name: "ReporterId",
          type: "STRING",
        },
        {
          name: "DateSubmitted",
          type: "DATETIME",
        },
      ],
      function: updateTicket,
    },
    {
      name: "createTicket",
      parameters: [
        {
          name: "Summary",
          type: "STRING",
        },
        {
          name: "IssueType",
          type: "STRING",
        },
        {
          name: "Priority",
          type: "STRING",
        },
        {
          name: "Description",
          type: "STRING",
        },
        {
          name: "AssigneeId",
          type: "STRING",
        },
        {
          name: "Status",
          type: "STRING",
          required: true,
        },
        {
          name: "ReporterId",
          type: "STRING",
        },
        {
          name: "DateSubmitted",
          type: "DATETIME",
        },
      ],
      function: createTicket,
    },
    {
      name: "createComment",
      parameters: [
        {
          name: "Body",
          type: "STRING",
          required: true,
        },
        {
          name: "TicketId",
          type: "STRING",
          required: true,
        },
      ],
      function: createComment,
    },
  ],
  synchronizations: [
    {
      name: "tickets",
      fullSyncFunction: fullSync,
      incrementalSyncFunction: incrementalSync,
    },
  ],
  model: {
    tables: [
      {
        name: "tickets",
        columns: [
          {
            name: "IssueKey",
            type: "STRING",
            length: 16,
            primaryKey: true,
          },
          {
            name: "Summary",
            type: "STRING",
            length: 64,
          },
          {
            name: "IssueType",
            type: "STRING",
            length: 16,
          },
          {
            name: "Priority",
            type: "STRING",
            length: 16,
          },
          {
            name: "Description",
            type: "STRING",
            length: 2048,
          },
          {
            name: "AssigneeId",
            type: "STRING",
            length: 16,
          },
          {
            name: "Status",
            type: "STRING",
            length: 32,
          },
          {
            name: "ReporterId",
            type: "STRING",
            length: 16,
          },
          {
            name: "DateSubmitted",
            type: "DATETIME",
          },
        ],
      },
      {
        name: "comments",
        columns: [
          {
            name: "Id",
            type: "STRING",
            length: 32,
            primaryKey: true,
          },
          {
            name: "AuthorId",
            type: "STRING",
            length: 16,
          },
          {
            name: "Body",
            type: "STRING",
            length: 2048,
          },
          {
            name: "TicketId",
            type: "STRING",
            length: 16,
          },
        ],
      },
      {
        name: "users",
        columns: [
          {
            name: "Id",
            type: "STRING",
            length: 32,
            primaryKey: true,
          },
          {
            name: "FullName",
            type: "STRING",
            length: 64,
          },
        ],
      },
    ],
    relationships: [
      {
        name: "assignee_task",
        primaryTable: "users",
        foreignTable: "tickets",
        columnPairs: [
          {
            primaryKey: "Id",
            foreignKey: "AssigneeId",
          },
        ],
      },
      {
        name: "reporter_task",
        primaryTable: "users",
        foreignTable: "tickets",
        columnPairs: [
          {
            primaryKey: "Id",
            foreignKey: "ReporterId",
          },
        ],
      },
      {
        name: "ticket_comments",
        primaryTable: "tickets",
        foreignTable: "comments",
        columnPairs: [
          {
            primaryKey: "IssueKey",
            foreignKey: "TicketId",
          },
        ],
      },
      {
        name: "users_comments",
        primaryTable: "users",
        foreignTable: "comments",
        columnPairs: [
          {
            primaryKey: "Id",
            foreignKey: "AuthorId",
          },
        ],
      },
    ],
  },
});

const today = moment().toISOString();
const twoDaysAgo = moment()
  .subtract(2, "days")
  .subtract(5, "hours")
  .toISOString();
const fiveDaysAgo = moment()
  .subtract(5, "days")
  .subtract(2, "hours")
  .subtract(26, "minutes")
  .toISOString();

const tickets = [
  {
    IssueKey: "ISS1",
    IssueType: "Bug",
    Summary: "Data Solutions freezes when multiple charts are on a canvas",
    Status: "In QA",
    Priority: "High",
    AssigneeId: "6",
    ReporterId: "4",
    Description:
      "Definitely a problem on our side. The logs are available at www.example.com",
    DateSubmitted: today,
  },
  {
    IssueKey: "ISS2",
    IssueType: "Bug",
    Summary: "Proxy settings don't work",
    Status: "In Progress",
    Priority: "Medium",
    AssigneeId: "3",
    ReporterId: "11",
    Description:
      "I am sitting in a corporate network. We have a typical proxy configuration script that we need to use for Internet Explorer or Chrome so we can connect to internet. For CPG Module proxy settings, there is no option to select a configuration script, so I opened the script and using the proxy host/port specified in that file. But CPG Module still can't connect to internet. This is supposed to be simple.. really..   CPG Module version 1.8.0_25",
    DateSubmitted: today,
  },
  {
    IssueKey: "ISS3",
    IssueType: "Task",
    Summary: "Code formatting",
    Status: "To Do",
    Priority: "Low",
    AssigneeId: "5",
    ReporterId: "11",
    Description:
      "As reported by Erberto, we should improve our code formatting to be more consistent.      What tool/plugin could we use to check this?",
    DateSubmitted: twoDaysAgo,
  },
  {
    IssueKey: "ISS4",
    IssueType: "Task",
    Summary: "Support providing endpoint from a container JAR",
    Status: "Done",
    Priority: "High",
    AssigneeId: "12",
    ReporterId: "1",
    Description:
      "For JSF 2.3 / Mojarra I'm currently in progress of adding a standard f:websocket tag. As Mojarra is to be designed as a container-provided JAR (not an user-provided JAR), the endpoint needs to be programmatically added in a ServletContextListener, but at that point, servletContext.getAttribute(ServerContainer.class.getName()) returns null when Tyrus is used (Payara/GlassFish). Upon inspection it turns out that the TyrusServletContainerInitializer#onStartup() immediately returns when there are no user-provided endpoints and doesn't register the ServerContainer anymore, causing it to not be placed in ServletContext anymore.  I'm therefore making the following proposals to ensure that the websocket container can forcibly be initialized from the container on regardless of the user-provided endpoints.    1. Proposal #1: require eager initialization.  - Always initialize container regardless of the onStartup(classes).    2. Proposal #2: check a context param.  - Check if a context param something like 'javax.websocket.ALWAYS_ENABLED' is set.  - If so, initialize container regardless of the onStartup(classes).    3. Proposal #3: check a context attribute.  - Check if servletContext.getAttribute(ServerContainer.class.getName()) returns null.  - If so, check if ServerContainer.class.getName() is present in servletContext.getAttributeNames().  - If so, initialize container regardless of the onStartup(classes).",
    DateSubmitted: twoDaysAgo,
  },
  {
    IssueKey: "ISS5",
    IssueType: "Bug",
    Summary: "Fix the installation wizard",
    Status: "In Review",
    Priority: "High",
    AssigneeId: "13",
    ReporterId: "2",
    Description:
      "Clicking Done on the installation wizard shows a broken HTML page instead of the Home page",
    DateSubmitted: twoDaysAgo,
  },
  {
    IssueKey: "ISS6",
    IssueType: "Bug",
    Summary: "Admins are not able to add new users to their Acme instance",
    Status: "In Review",
    Priority: "Medium",
    AssigneeId: "7",
    ReporterId: "9",
    Description:
      "Could be an issue with a new update. Investigate and rollback if needed",
    DateSubmitted: twoDaysAgo,
  },
  {
    IssueKey: "ISS7",
    IssueType: "Bug",
    Summary: "Fix the broken Comment button in Feed",
    Status: "To Do",
    Priority: "High",
    AssigneeId: "10",
    ReporterId: "5",
    Description: "None",
    DateSubmitted: twoDaysAgo,
  },
  {
    IssueKey: "ISS8",
    IssueType: "Task",
    Summary: "Support integration with Slack",
    Status: "In Progress",
    Priority: "Medium",
    AssigneeId: "8",
    ReporterId: "2",
    Description:
      "Collect necessary info and add integration with Slack to the service.",
    DateSubmitted: fiveDaysAgo,
  },
  {
    IssueKey: "ISS9",
    IssueType: "Story",
    Summary: "Add Comparable to AbstractUnit",
    Status: "In QA",
    Priority: "Low",
    AssigneeId: "3",
    ReporterId: "7",
    Description:
      "Unlike the SE port, {{AbstractUnit}} in the RI does not implement {{Comparable}}. As it is available in CLDC8, it should be added there, too.",
    DateSubmitted: fiveDaysAgo,
  },
  {
    IssueKey: "ISS10",
    IssueType: "Epic",
    Summary: "Serializable support",
    Status: "Done",
    Priority: "Medium",
    AssigneeId: "1",
    ReporterId: "10",
    Description:
      "While trying out the measurements API we noticed that most of the interfaces/classes don't seem to support serialization.    Would it possible to add this support where needed/possible?    This would help a lot in cases where an object that (for example) includes a quantity that needs to be either transmited (rmi, ...) or stored (caches, ...).",
    DateSubmitted: fiveDaysAgo,
  },
];

const comments = [
  {
    Id: "1",
    TicketId: "ISS5",
    Body: "Cannot reproduce. QA please add more detailed steps.",
    AuthorId: "13",
  },
  {
    Id: "2",
    TicketId: "ISS8",
    Body: "Needs FE support",
    AuthorId: "10",
  },
  {
    Id: "3",
    TicketId: "ISS9",
    Body: "If {{Quantity}} was to extend {{Comparable}} then {{Unit}} should probably do the same on an API level, otherwise both abstract base classes should implement it.",
    AuthorId: "5",
  },
  {
    Id: "4",
    TicketId: "ISS10",
    Body: "For the SE port, see ISS9",
    AuthorId: "10",
  },
  {
    Id: "5",
    TicketId: "ISS3",
    Body: "The exact requirement/acceptance criteria may be a bit specific for a user story, but it seems like a good idea also using those. A few JSRs (mainly 375) did that already in a very early stage. This could be refined and moved to a task under a more general story, but you'll find such tasks here.",
    AuthorId: "2",
  },
  {
    Id: "6",
    TicketId: "ISS4",
    Body: "Thanks for your suggestions. However, {{convert(BigDecimal)}} is not acceptable in the API of JSR 363 which aims at the greatest possible number of platforms including and especially Java ME 8 Embedded. {{BigDecimal}} or {{BigInteger}} do not exist on Java ME, so both API and RI (which runs on both Java ME 8 Embedded and Java SE 7 or higher) obey to those platform constraints.    Like JSR 107 RI is not a fully fledged implementation of the JCache API like e.g. EZCache, Hazelcast XYZ or other (commercial) implementations are, or Glassfish does not provide all aspects of scalability, failover or production guarantees you'll find in WebLogic, WebSphere, JBoss EAP or other commercial Java EE servers, the RI does not intend to be the only implementation for JSR 363. In fact, we created a full implementation for Java SE 8: https://github.com/unitsofmeasurement/uom-se please check out your examples there and file issues under https://github.com/unitsofmeasurement/uom-se/issues. Or submit those Pull-requests there. Unlike Unit-RI which is only for EG members, we can merge appropriate changes there more easily from non EG or JCP members.    We'll keep the story open as we probably add something to the RI user guide regarding precision and why we left {{BigDecimal}} out, but for the RI there is no immediate action item. I hope you understand the rationale and have no problem using Java SE 8 or above? As soon as Eclipse IP helps us to get JSR 363 into its Orbit repository, we can also work on Eclipse UOMo again which is currently Java SE 6 backward compatible and uses {{BigDecimal}} in the same ways mentioned. UOMo '.next' should at least work under Java SE 7 like most Eclipse projects, too",
    AuthorId: "6",
  },
  {
    Id: "7",
    TicketId: "ISS4",
    Body: "Thanks for your quick answer. I completely understand your remarks and I agree on moving to the Java SE 8 implementation.   Now, as in the past months, the only limitation we had is to switch to Java 8.     We probabaly have to do it at some point so maybe this is a good opportunity.     Regards",
    AuthorId: "13",
  },
  {
    Id: "8",
    TicketId: "ISS4",
    Body: "That would be good. If you run into serious problems and need Java 7, UOMo shall be updated very soon (I may not have to wait for Eclipse IP confirmation at least in the incubator, later it should all be in Orbit of course) However, what's in uom - se aims at 'future JDKs' from Java 8 on, and Oracle has already declared Java 7 as 'End of Life' for most cases, so it's probably good to migrate if you can.    I consider what's raised here a viable chapter for the RI User Guide: https://www.gitbook.com/book/unitsofmeasurement/unit-ri-userguide/details    It is also in GitHub, and while adding a new page or chapter in the first place should be done by owners and editors of the GitBook, everybody is free to raise PRs for those files, too. So you could participate in these chapters if you like. Unlike the Spec or actual RI, this is also a 'collaborative' part of the project open to non JCP or EG members alike.",
    AuthorId: "6",
  },
  {
    Id: "9",
    TicketId: "ISS5",
    Body: "Product team, please check the mockups.",
    AuthorId: "4",
  },
  {
    Id: "10",
    TicketId: "ISS5",
    Body: "Totally agree with this.",
    AuthorId: "8",
  },
  {
    Id: "11",
    TicketId: "ISS1",
    Body: "Cannot reproduce. QA please add more detailed steps.",
    AuthorId: "8",
  },
  {
    Id: "12",
    TicketId: "ISS2",
    Body: "It might be caused by a problem in the underlying NetBeans Platform (https://netbeans.org/bugzilla/show_bug.cgi?id=245490). I suggest to install the ProxySelector V2 plugin (download the 8.0 version from http://plugins.netbeans.org/plugin/55258/proxyselector-v2 and use Tools | Plugins | Downloaded to install it), it should fix the problem.    In case installing the plugin doesn't help, please attach the VisualVM logfile again - the ProxySelector plugin logs used proxy settings which will help us with further debugging.",
    AuthorId: "10",
  },
  {
    Id: "13",
    TicketId: "ISS3",
    Body: "This looks like a plausible solution:  - https://github.com/revelc/formatter-maven-plugin",
    AuthorId: "13",
  },
  {
    Id: "14",
    TicketId: "ISS4",
    Body: "Extension on proposal #2: Apart from a predefined context param, also check a predefined JNDI entry on same name. This enables the opportunity to set it programmatically.",
    AuthorId: "13",
  },
  {
    Id: "15",
    TicketId: "ISS4",
    Body: "ServletContext param can be set programatically, that's how current 'dynamic deploy' feature works: https://github.com/tyrus-project/tyrus/blob/master/containers/servlet/src/main/java/org/glassfish/tyrus/servlet/TyrusServletContainerInitializer.java#L138    I don't see a reason for involving JNDI..",
    AuthorId: "13",
  },
  {
    Id: "16",
    TicketId: "ISS6",
    Body: "Ok that explains it. I reproduced the original bug and verified the fix on a device API level 22. Now I have tried it on API level 21 and I can confirm that it does not work.   The problem is that we are experiencing yet another Android SSLEngine bug. The problem is with SSLEngineResult returned from the SSLEngine#unwrap operation during the handshake. Its method SSLEngineResult#bytesConsumed returns 0 even though it consumed 4K of data from the input buffer. Grizzly has this logic for feeding the input data into the SSL engine:   input.position(position + sslEngineResult.bytesConsumed());    This means that since the position is not moved, the same 4K is fed to the SSLEngine again in the next iteration. SSLEngine of course sees those data as unexpected garbage which results in 'routines: SSL3_GET_MESSAGE: unexpected message'    There is nothing we can do about this in Tyrus.  I will ask our colleague maintaing Grizzly if he is willing to put another Android workaround in it. The workaround could calculate the consumed bytes instead of relying on SSLEngineResult#bytesConsumed . Something like:    final ByteBuffer inputByteBuffer = input.toByteBuffer();  int initPosition = inputByteBuffer.position();  ... do the unwrap and other stuff  input.position(inPos + inputByteBuffer.position() - initPosition);    I have built my own version of Grizzly with such a patch and it works.    If you want file a bug on Android.        ",
    AuthorId: "2",
  },
  {
    Id: "17",
    TicketId: "ISS6",
    Body: "Needs breakdown of tasks",
    AuthorId: "2",
  },
  {
    Id: "18",
    TicketId: "ISS6",
    Body: "Done",
    AuthorId: "8",
  },
  {
    Id: "19",
    TicketId: "ISS7",
    Body: "I'm hitting this exact same error.I do have a long classpath too, which adds to the evidence that it's somehow related to that.  ",
    AuthorId: "10",
  },
  {
    Id: "20",
    TicketId: "ISS5",
    Body: "I was able to reproduce this on the staging environment.",
    AuthorId: "2",
  },
  {
    Id: "21",
    TicketId: "ISS5",
    Body: "Fixed. QA deploy and test this on the staging environment",
    AuthorId: "13",
  },
  {
    Id: "22",
    TicketId: "ISS5",
    Body: "Verified by QA.",
    AuthorId: "5",
  },
  {
    Id: "23",
    TicketId: "ISS4",
    Body: "Thanks. It's scheduled for 2.3",
    AuthorId: "6",
  },
  {
    Id: "24",
    TicketId: "ISS1",
    Body: "This needs to be fixed ASAP and included in tomorrow's patch release.",
    AuthorId: "6",
  },
  {
    Id: "25",
    TicketId: "ISS1",
    Body: "Verified by QA.",
    AuthorId: "7",
  },
  {
    Id: "26",
    TicketId: "ISS2",
    Body: "This needs to be fixed ASAP and included in tomorrow's patch release.",
    AuthorId: "4",
  },
  {
    Id: "27",
    TicketId: "ISS7",
    Body: "Needs to be ready for 2.4 release.",
    AuthorId: "6",
  },
];

const users = [
  {
    Id: "1",
    FullName: "Aline Gomes",
  },
  {
    Id: "2",
    FullName: "Billy Taylor",
  },
  {
    Id: "3",
    FullName: "Danielle Ledford",
  },
  {
    Id: "4",
    FullName: "Diana Sarkozy",
  },
  {
    Id: "5",
    FullName: "Erberto Tirado",
  },
  {
    Id: "6",
    FullName: "Frederique Varieur",
  },
  {
    Id: "7",
    FullName: "Henrik Abrahamsson",
  },
  {
    Id: "8",
    FullName: "Hjalte Frederiksen",
  },
  {
    Id: "9",
    FullName: "Johanna Ackermann",
  },
  {
    Id: "10",
    FullName: "Josef  Antos",
  },
  {
    Id: "11",
    FullName: "Lok Chung",
  },
  {
    Id: "12",
    FullName: "Louie Delarosa",
  },
  {
    Id: "13",
    FullName: "Stella Milne",
  },
];

function generateRandomNumber(floor, ceiling) {
  return Math.floor(Math.random() * (ceiling - floor)) + floor;
}

async function fullSync({ dataStore }) {
  console.log("Running the synchronization...");

  dataStore.save("tickets", tickets);
  dataStore.save("comments", comments);
  dataStore.save("users", users);
  console.log("Synchronization finished...");
}

async function incrementalSync({ dataStore }) {
  console.log("Running incremental synchronization...");

  const ticket = {
    ...JSON.parse(
      JSON.stringify(tickets[generateRandomNumber(0, tickets.length)])
    ),
    IssueKey: "ISS" + generateRandomNumber(0, 1000).toString(),
    AssigneeId: generateRandomNumber(1, 13).toString(),
    ReporterId: generateRandomNumber(1, 13).toString(),
  };
  ticket.Summary = `Another ${ticket.Summary}`;

  dataStore.save("tickets", ticket);
  console.log("Incremental synchronization finished...");
}

function updateTicket({ dataStore, actionParameters }) {
  console.log(`Updating a ticket with an id ${actionParameters.IssueKey}`);

  const {
    IssueKey,
    Summary,
    IssueType,
    Description,
    Priority,
    Status,
    AssigneeId,
    ReporterId,
    DateSubmitted,
  } = actionParameters;
  const ticket = {
    IssueKey,
    Summary,
    IssueType,
    Description,
    Priority,
    Status,
    AssigneeId,
    ReporterId,
    DateSubmitted,
  };

  dataStore.save("tickets", ticket);
  console.log(`Ticket with an id ${actionParameters.IssueKey} updated`);
}

function createTicket({ dataStore, actionParameters }) {
  console.log(`Creating a new ticket...`);

  const {
    Summary,
    IssueType,
    Description,
    Priority,
    Status,
    AssigneeId,
    ReporterId,
    DateSubmitted,
  } = actionParameters;
  const ticket = {
    IssueKey: "ISS" + generateRandomNumber(0, 1000).toString(),
    Summary,
    IssueType,
    Description,
    Priority,
    Status,
    AssigneeId,
    ReporterId,
    DateSubmitted,
  };

  dataStore.save("tickets", ticket);
  console.log(`New ticket with an id ${ticket.IssueKey} created`);
}

function createComment({ dataStore, actionParameters }) {
  console.log(`Adding a new comment...`);

  const { Body, TicketId } = actionParameters;
  const comment = {
    Id: uuid.v4(),
    AuthorId: generateRandomNumber(1, 13).toString(),
    Body,
    TicketId,
  };

  dataStore.save("comments", comment);
  console.log(`New comment with an id ${comment.Id} has been created`);
}
