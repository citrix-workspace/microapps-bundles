const controllingArea = "A000";
Headers = library.load("fetch-api").Headers
const defaultGetOptions = {
    method: 'GET',
    headers: {
        'content-type': 'applicaton/json',
        'x-csrf-token': 'fetch',
    }
}
const  moment = library.load("moment-timezone");

integration.define({
    "synchronizations": [
        {
            "name": "getTimeEntries",
            "fullSyncFunction": fullSync,
            "incrementalSyncFunction": incrementalSync
        }
    ],
    "model": {
        "tables": [
            {
                "name": "TimeEntries",
                "columns": [
                    {
                        "name": "id",
                        "type": "INTEGER",
                        "primaryKey": true
                    },
                    {
                        "name": "ts_id",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_date",
                        "type": "DATETIME"
                    },
                    {
                        "name": "company_code",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "person_work_agreement",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_activity_type",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "person_work_agreement_external_id",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_billing_control_category",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_controlling_area",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_hours_unit_of_measure",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_internal_order",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_purchase_order",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_purchase_order_item",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_receiver_cost_center",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "user_email",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_recorded_hours",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_recorded_quantity",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_rejection_reason",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_sender_cost_center",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_ts_overtime_category",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_ts_task_component",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_ts_task_level",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_ts_task_type",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_ts_wrk_loc_code",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_wbs_element",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_work_item",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_ts_note",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_operation",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_predecessor_record",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_status",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "start_at",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "end_at",
                        "type": "STRING",
                        "length": 100
                    },
                ]
            },
            {
                "name": "TimeEntriesClock",
                "columns": [
                    {
                        "name": "id",
                        "type": "INTEGER",
                        "primaryKey": true
                    },
                    {
                        "name": "ts_id",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_date",
                        "type": "DATETIME"
                    },
                    {
                        "name": "company_code",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "person_work_agreement",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_activity_type",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "person_work_agreement_external_id",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_billing_control_category",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_controlling_area",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_hours_unit_of_measure",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_internal_order",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_purchase_order",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_purchase_order_item",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_receiver_cost_center",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "user_email",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_recorded_hours",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_recorded_quantity",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_rejection_reason",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_sender_cost_center",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_ts_overtime_category",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_ts_task_component",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_ts_task_level",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_ts_task_type",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_ts_wrk_loc_code",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_wbs_element",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_work_item",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_df_ts_note",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_operation",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_predecessor_record",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "ts_status",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "start_at",
                        "type": "STRING",
                        "length": 100
                    },
                    {
                        "name": "end_at",
                        "type": "STRING",
                        "length": 100
                    },
                ]
            },
        ]
    },
    "actions": [
        {
            name: 'clockManager',
            parameters: [
                {
                    name: 'TimeEntryId',
                    type: 'STRING'
                },
                {
                    name: 'PurchaseOrderItem',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'TimeSheetTaskType',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'TimeSheetTaskLevel',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'TimeSheetTaskComponent',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'TimeSheetNote',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'RecordedHours',
                    type: 'STRING'},
                {
                    name: 'RecordedQuantity',
                    type: 'STRING'
                },
                {
                    name: 'HoursUnitOfMeasure',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'TimeSheetOvertimeCategory',
                    type: 'STRING'
                },
                {
                    name: 'TimeSheetStatus',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'TimeSheetOperation',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'UserEmail',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'StartedAt',
                    type: 'STRING'
                },
                {
                    name: 'Id',
                    type: 'INTEGER'
                },
            ],
            "function": clockManager
        },
        {
            name: 'createTimeEntry',
            parameters: [
                {
                    name: 'PurchaseOrderItem',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'TimeSheetTaskType',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'TimeSheetTaskLevel',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'TimeSheetTaskComponent',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'TimeSheetNote',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'RecordedHours',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'RecordedQuantity',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'HoursUnitOfMeasure',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'TimeSheetOvertimeCategory',
                    type: 'STRING'
                },
                {
                    name: 'TimeSheetStatus',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'TimeSheetOperation',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'UserEmail',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'Date',
                    type: 'DATETIME',
                    required: true
                },
            ],
            "function": createTimeEntry
        },
        {
            name: 'removeClockEntry',
            parameters: [
                {
                    name: 'PersonWorkAgreement',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'TimeSheetOperation',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'TimeSheetRecordId',
                    type: 'STRING'
                },
                {
                    name: 'Id',
                    type: 'INTEGER'
                },
            ],
            "function": removeClockEntry
        },
    ]
})

async function getToken(client) {
    const respGET = await client.fetch('API_MANAGE_WORKFORCE_TIMESHEET/TimeSheetEntryCollection?$top=1', defaultGetOptions);

    if (!respGET.ok) {
        throw new Error(`Could not Retrieve a time entry ## Status -> ${respGET.status} / Response [getToken] -> ${JSON.stringify(respGET.headers)}`);
    }

    return respGET

}

function timeToDecimal(timeStr) {
    const [hours, minutes] = timeStr.split(':')
    return parseInt(hours, 10) + parseInt(minutes, 10)/60;
}


async function fullSync({dataStore, client}) {
    return getTimeEntries(dataStore, client);
}

async function getEmployeeBusinessPartner(client, user_email) {
    const employeeDataUrl = `YY1_EMPLOYEEDATA_CDS/YY1_EmployeeData?$filter=DefaultEmailAddress eq '${user_email}'`

    const employeeDataGET = await client.fetch(employeeDataUrl, defaultGetOptions);

    if (!employeeDataGET.ok) {
        throw new Error(`Could not Retrieve Employee Data(${employeeDataGET.status}: ${employeeDataGET.statusText})`);
    }

    const employeeDataResponse = await employeeDataGET.json()

    const employee = employeeDataResponse.d.results[0]

    return employee.BusinessPartner
}

async function getWorkAgreement(client, employeeBusinessPartner) {
    let workAgreementUrl = `YY1_WORKAGREEMENTDETAILS_CDS/YY1_WorkAgreementDetails?$filter=Person eq '${employeeBusinessPartner}'`

    let workAgreementGET = await client.fetch(workAgreementUrl, defaultGetOptions);

    if (!workAgreementGET.ok) {
        throw new Error(`Could not Retrieve Employee Data(${workAgreementGET.status}: ${workAgreementGET.statusText})`);
    }

    let workAgreementResponse = await workAgreementGET.json()

    return workAgreementResponse.d.results[0]
}

async function incrementalSync({dataStore, client, latestSynchronizationTime}) {
    return getTimeEntries(dataStore, client, latestSynchronizationTime);
}

async function getTimeEntries(dataStore, client, latestSynchronizationTime) {
    let timeEntries = [];
    let today = moment().format('YYYY-MM-DDT00:00:00')
    let sevenDaysBefore = moment().subtract(7,'d').format('YYYY-MM-DDT00:00:00')
    let thirtyDaysBefore = moment().subtract(30,'d').format('YYYY-MM-DDT00:00:00')

    let dateFilter = `TimeSheetDate ge datetime'${thirtyDaysBefore}' and TimeSheetDate le datetime'${today}'`

    if (latestSynchronizationTime) {
        dateFilter = `TimeSheetDate ge datetime'${sevenDaysBefore}'`
    }

    let statusFilter = "(TimeSheetStatus eq '10' or " +
        "TimeSheetStatus eq '20' or " +
        "TimeSheetStatus eq '30' or " +
        "TimeSheetStatus eq '40' or " +
        "TimeSheetStatus eq '50')"

    let filter = `${dateFilter} and ${statusFilter}`

    let url = `API_MANAGE_WORKFORCE_TIMESHEET/TimeSheetEntryCollection?$filter=${filter}`

    console.log('## URL -> ' + url)

    let respGET = await client.fetch(url, defaultGetOptions);

    if (!respGET.ok) {
        throw new Error(`Could not Retrieve Time Entries (${respGET.status}: ${respGET.statusText})`);
    }


    let timeEntryResponse = await respGET.json()

    for (let i = 0; i < timeEntryResponse.d.results.length; i++) {

        let timeEntry = timeEntryResponse.d.results[i]

        let TimeSheetDateTimeStamp =
            timeEntry.TimeSheetDate.replace(/[^.\d]/g, '');

        timeEntries.push({
            id: parseInt(timeEntry.TimeSheetRecord),
            ts_id: timeEntry.TimeSheetRecord,
            company_code: timeEntry.CompanyCode,
            ts_date: new Date(parseInt(TimeSheetDateTimeStamp)),
            person_work_agreement: timeEntry.PersonWorkAgreement,
            person_work_agreement_external_id: timeEntry.PersonWorkAgreementExternalID,
            ts_df_controlling_area: timeEntry.TimeSheetDataFields.ControllingArea,
            ts_df_hours_unit_of_measure: timeEntry.TimeSheetDataFields.HoursUnitOfMeasure,
            ts_df_purchase_order_item: timeEntry.TimeSheetDataFields.PurchaseOrderItem,
            ts_df_receiver_cost_center: timeEntry.TimeSheetDataFields.ReceiverCostCenter,
            ts_df_recorded_hours: timeEntry.TimeSheetDataFields.RecordedHours,
            ts_df_recorded_quantity: timeEntry.TimeSheetDataFields.RecordedQuantity,
            ts_df_ts_overtime_category: timeEntry.TimeSheetDataFields.TimeSheetOvertimeCategory,
            ts_df_ts_task_component: timeEntry.TimeSheetDataFields.TimeSheetTaskComponent,
            ts_df_ts_task_level: timeEntry.TimeSheetDataFields.TimeSheetTaskLevel,
            ts_df_ts_task_type: timeEntry.TimeSheetDataFields.TimeSheetTaskType,
            ts_df_ts_note: timeEntry.TimeSheetDataFields.TimeSheetNote,
            ts_operation: timeEntry.TimeSheetOperation,
            ts_status: timeEntry.TimeSheetStatus,
        })
    }

    dataStore.save("TimeEntries", timeEntries);
    dataStore.save("TimeEntriesClock", timeEntries);
}

async function createTimeEntry({dataStore, client, actionParameters, serviceClient}) {

    const user_email = actionParameters.UserEmail

    const date = moment(actionParameters.Date).valueOf()

    let timeEntries = [];

    let tokenResponse = await getToken(client);
    let token = tokenResponse.headers.get("x-csrf-token")

    let cookies = tokenResponse.headers.get("set-cookie").split(",")
    let cookie = cookies[0].substring(0, cookies[0].indexOf(";")) + ";" +
        cookies[1].substring(0, cookies[1].indexOf(";"));

    const headersPOST = {
        'X-CSRF-Token': token,
        'cookie': cookie
    }

    const recordedTime = await timeToDecimal(actionParameters.RecordedQuantity)
    const employeeBusinessPartner =await getEmployeeBusinessPartner(client, user_email)
    const workAgreement = await getWorkAgreement(client, employeeBusinessPartner)

    const body = {
        TimeSheetDataFields: {
            ControllingArea: controllingArea,
            ReceiverCostCenter: workAgreement.CostCenter,
            PurchaseOrderItem: actionParameters.PurchaseOrderItem,
            TimeSheetTaskType: actionParameters.TimeSheetTaskType,
            TimeSheetTaskLevel: actionParameters.TimeSheetTaskLevel,
            TimeSheetTaskComponent: actionParameters.TimeSheetTaskComponent,
            TimeSheetNote: actionParameters.TimeSheetNote,
            RecordedHours: recordedTime.toString(),
            RecordedQuantity: recordedTime.toString(),
            HoursUnitOfMeasure: actionParameters.HoursUnitOfMeasure,
            TimeSheetOvertimeCategory: ""
        },
        PersonWorkAgreementExternalID: workAgreement.PersonWorkAgreementExternalID,
        CompanyCode: workAgreement.CompanyCode,
        PersonWorkAgreement: workAgreement.PersonWorkAgreement,
        TimeSheetDate: `/Date(${date})/`,
        TimeSheetStatus: actionParameters.TimeSheetStatus,
        TimeSheetOperation: actionParameters.TimeSheetOperation
    }

    const respPOST = await client.fetch('API_MANAGE_WORKFORCE_TIMESHEET/TimeSheetEntryCollection', {
        headers: headersPOST,
        method: 'POST',
        body: JSON.stringify(body)
    });

    console.log('## [respPOST] -> ' + JSON.stringify(body))

    // AFTER POST
    if (!respPOST.ok) {
        throw new Error(`Could not create time entry -> Status: ${respPOST.status} / Response: ${JSON.stringify(respPOST)})`);
    }

    let postJson = await respPOST.json()

    const requestPersonWorkAgreementExternalId = postJson.d.PersonWorkAgreementExternalID
    const requestCompanyCode = postJson.d.CompanyCode
    const requestTimeSheetRecord = postJson.d.TimeSheetRecord

    const timeEntryUrl = `API_MANAGE_WORKFORCE_TIMESHEET/TimeSheetEntryCollection(PersonWorkAgreementExternalID='${requestPersonWorkAgreementExternalId}',CompanyCode='${requestCompanyCode}',TimeSheetRecord='${requestTimeSheetRecord}')`

    const getCreatedTimeEntry = await client.fetch(timeEntryUrl, defaultGetOptions);

    if (!getCreatedTimeEntry.ok) {
        throw new Error(`Could not retrieve data from time entry (${getCreatedTimeEntry.status}: ${getCreatedTimeEntry.statusText})`);
    }

    const timeEntryResponse = await getCreatedTimeEntry.json()

    const TimeSheetDateTimeStamp =  timeEntryResponse.d.TimeSheetDate.replace(/[^.\d]/g, '');

    timeEntries.push({
        id: parseInt(timeEntryResponse.d.TimeSheetRecord),
        ts_id: timeEntryResponse.d.TimeSheetRecord,
        ts_date: new Date(parseInt(TimeSheetDateTimeStamp)),
        company_code: timeEntryResponse.d.CompanyCode,
        person_work_agreement: timeEntryResponse.d.PersonWorkAgreement,
        person_work_agreement_external_id: timeEntryResponse.d.PersonWorkAgreementExternalID,
        ts_df_controlling_area: timeEntryResponse.d.TimeSheetDataFields.ControllingArea,
        ts_df_hours_unit_of_measure: timeEntryResponse.d.TimeSheetDataFields.HoursUnitOfMeasure,
        ts_df_purchase_order_item: timeEntryResponse.d.TimeSheetDataFields.PurchaseOrderItem,
        ts_df_receiver_cost_center: timeEntryResponse.d.TimeSheetDataFields.ReceiverCostCenter,
        ts_df_recorded_hours: timeEntryResponse.d.TimeSheetDataFields.RecordedHours,
        ts_df_recorded_quantity: timeEntryResponse.d.TimeSheetDataFields.RecordedQuantity,
        ts_df_ts_overtime_category: timeEntryResponse.d.TimeSheetDataFields.TimeSheetOvertimeCategory,
        ts_df_ts_task_component: timeEntryResponse.d.TimeSheetDataFields.TimeSheetTaskComponent,
        ts_df_ts_task_level: timeEntryResponse.d.TimeSheetDataFields.TimeSheetTaskLevel,
        ts_df_ts_task_type: timeEntryResponse.d.TimeSheetDataFields.TimeSheetTaskType,
        ts_df_ts_note: timeEntryResponse.d.TimeSheetDataFields.TimeSheetNote,
        ts_operation: timeEntryResponse.d.TimeSheetOperation,
        ts_status: timeEntryResponse.d.TimeSheetStatus,
        user_email: user_email
    })

    dataStore.save("TimeEntries", timeEntries);
    dataStore.save("TimeEntriesClock", timeEntries);
}

async function clockManager({dataStore, client, actionParameters}) {
    const todayTs = moment().valueOf();
    let endAt = moment();
    console.log("## endAt: " + endAt)

    let tokenResponse = await getToken(client);
    let token = tokenResponse.headers.get("x-csrf-token")

    let cookies = tokenResponse.headers.get("set-cookie").split(",")
    let cookie = cookies[0].substring(0, cookies[0].indexOf(";")) + ";" +
        cookies[1].substring(0, cookies[1].indexOf(";"));

    const headersPOST = {
        'X-CSRF-Token': token,
        'cookie': cookie
    }

    const user_email = actionParameters.UserEmail
    const timeEntryId = actionParameters.TimeEntryId
    const employeeBusinessPartner =await getEmployeeBusinessPartner(client, user_email)
    const workAgreement = await getWorkAgreement(client, employeeBusinessPartner)

    let body = {
        TimeSheetDataFields: {
            ControllingArea: controllingArea,
            ReceiverCostCenter: workAgreement.CostCenter,
            PurchaseOrderItem: actionParameters.PurchaseOrderItem,
            TimeSheetTaskType: actionParameters.TimeSheetTaskType,
            TimeSheetTaskLevel: actionParameters.TimeSheetTaskLevel,
            TimeSheetTaskComponent: actionParameters.TimeSheetTaskComponent,
            TimeSheetNote: actionParameters.TimeSheetNote,
            RecordedHours: actionParameters.RecordedHours,
            RecordedQuantity: actionParameters.RecordedQuantity,
            HoursUnitOfMeasure: actionParameters.HoursUnitOfMeasure,
            TimeSheetOvertimeCategory: ""
        },
        PersonWorkAgreementExternalID: workAgreement.PersonWorkAgreementExternalID,
        CompanyCode: workAgreement.CompanyCode,
        PersonWorkAgreement: workAgreement.PersonWorkAgreement,
        TimeSheetDate: `/Date(${todayTs})/`,
        TimeSheetStatus: actionParameters.TimeSheetStatus,
        TimeSheetOperation: actionParameters.TimeSheetOperation,
    }

    console.log('## BODY : ' + JSON.stringify(body))
    console.log("## ActionParameters: " + JSON.stringify(actionParameters))
    console.log('## TimeEntryId: ' + timeEntryId)


    // Stop Clock funcionality
    if (timeEntryId) {

        let startedAt = moment(actionParameters.StartedAt)
        let minutesDiff = endAt.diff(startedAt, 'minutes');
        let total = minutesDiff/60

        body.TimeSheetRecord = timeEntryId
        body.TimeSheetDataFields.RecordedHours = total.toString()
        body.TimeSheetDataFields.RecordedQuantity = total.toString()

    }

    console.log('## BODY [Stop Clock]: ' + JSON.stringify(body))

    const postOptions = {
        headers: headersPOST,
        method: 'POST',
        body: JSON.stringify(body)
    };

    const respPOST = await client.fetch('API_MANAGE_WORKFORCE_TIMESHEET/TimeSheetEntryCollection', postOptions);

    // AFTER POST
    if (!respPOST.ok) {
        throw new Error(`[respPOST] ## Error Response -> (${JSON.stringify(respPOST)})`);
    }

    const postJson = await respPOST.json()

    const requestPersonWorkAgreementExternalId = postJson.d.PersonWorkAgreementExternalID
    const requestCompanyCode = postJson.d.CompanyCode
    const requestTimeSheetRecord = postJson.d.TimeSheetRecord

    const timeEntryUrl = `API_MANAGE_WORKFORCE_TIMESHEET/TimeSheetEntryCollection(PersonWorkAgreementExternalID='${requestPersonWorkAgreementExternalId}',CompanyCode='${requestCompanyCode}',TimeSheetRecord='${requestTimeSheetRecord}')`

    const getCreatedTimeEntry = await client.fetch(timeEntryUrl, defaultGetOptions);

    if (!getCreatedTimeEntry.ok) {
        throw new Error(`[getCreatedTimeEntry] ## Error Response -> (${JSON.stringify(respPOST)})`);
    }

    const timeEntryResponse = await getCreatedTimeEntry.json()

    const TimeSheetDateTimeStamp =  timeEntryResponse.d.TimeSheetDate.replace(/[^.\d]/g, '');

    console.log("## ts_id: " + timeEntryResponse.d.TimeSheetRecord)
    console.log("## id: " + parseInt(timeEntryResponse.d.TimeSheetRecord))

    const timeEntries = {
        id: timeEntryId ? parseInt(timeEntryId) : parseInt(timeEntryResponse.d.TimeSheetRecord),
        ts_id: timeEntryResponse.d.TimeSheetRecord,
        company_code: timeEntryResponse.d.CompanyCode,
        ts_date: new Date(parseInt(TimeSheetDateTimeStamp)),
        person_work_agreement: timeEntryResponse.d.PersonWorkAgreement,
        person_work_agreement_external_id: timeEntryResponse.d.PersonWorkAgreementExternalID,
        ts_df_controlling_area: timeEntryResponse.d.TimeSheetDataFields.ControllingArea,
        ts_df_hours_unit_of_measure: timeEntryResponse.d.TimeSheetDataFields.HoursUnitOfMeasure,
        ts_df_purchase_order_item: timeEntryResponse.d.TimeSheetDataFields.PurchaseOrderItem,
        ts_df_receiver_cost_center: timeEntryResponse.d.TimeSheetDataFields.ReceiverCostCenter,
        ts_df_recorded_hours: timeEntryResponse.d.TimeSheetDataFields.RecordedHours,
        ts_df_recorded_quantity: timeEntryResponse.d.TimeSheetDataFields.RecordedQuantity,
        ts_df_ts_overtime_category: timeEntryResponse.d.TimeSheetDataFields.TimeSheetOvertimeCategory,
        ts_df_ts_task_component: timeEntryResponse.d.TimeSheetDataFields.TimeSheetTaskComponent,
        ts_df_ts_task_level: timeEntryResponse.d.TimeSheetDataFields.TimeSheetTaskLevel,
        ts_df_ts_task_type: timeEntryResponse.d.TimeSheetDataFields.TimeSheetTaskType,
        ts_df_ts_note: timeEntryResponse.d.TimeSheetDataFields.TimeSheetNote,
        ts_operation: timeEntryResponse.d.TimeSheetOperation,
        ts_status: timeEntryResponse.d.TimeSheetStatus,
        user_email: user_email,
        start_at: actionParameters.StartedAt ? actionParameters.StartedAt : moment().format(),
        end_at: timeEntryId ? endAt.format() : ''
    }

    console.log("#### timeEntries -> " + JSON.stringify(timeEntries))
    dataStore.save("TimeEntries", timeEntries);
    dataStore.save("TimeEntriesClock", timeEntries);
}

async function removeClockEntry({dataStore, client, actionParameters}) {

    let tokenResponse = await getToken(client);
    let token = tokenResponse.headers.get("x-csrf-token")

    let cookies = tokenResponse.headers.get("set-cookie").split(",")
    let cookie = cookies[0].substring(0, cookies[0].indexOf(";")) + ";" +
        cookies[1].substring(0, cookies[1].indexOf(";"));

    const headersPOST = {
        'X-CSRF-Token': token,
        'cookie': cookie
    }

    const body = {
        PersonWorkAgreement: actionParameters.PersonWorkAgreement,
        TimeSheetOperation: actionParameters.TimeSheetOperation,
        TimeSheetRecord: actionParameters.TimeSheetRecordId
    }

    const postOptions = {
        headers: headersPOST,
        method: 'POST',
        body: JSON.stringify(body)
    };

    const respPOST = await client.fetch('API_MANAGE_WORKFORCE_TIMESHEET/TimeSheetEntryCollection', postOptions);

    // AFTER POST
    if (!respPOST.ok) {
        throw new Error(`Could not create time entry -> Status: ${respPOST.status} / Response: ${JSON.stringify(respPOST)})`);
    }

    dataStore.deleteById("TimeEntries", actionParameters.Id)
    dataStore.deleteById("TimeEntriesClock", actionParameters.Id)
}