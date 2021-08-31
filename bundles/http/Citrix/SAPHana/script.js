const controllingArea = "A000";

const defaultGetOptions = {
    method: 'GET',
    headers: {
        'content-type': 'applicaton/json',
        'x-csrf-token': 'fetch',
    }
}

const moment = library.load("moment-timezone");

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
                    type: 'STRING'
                },
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
    const respGET = await client.fetch('API_MANAGE_WORKFORCE_TIMESHEET/TimeSheetEntryCollection?$top=1', defaultGetOptions)

    if (!respGET.ok) {
        throw new Error(`Could not Retrieve a time entry ## Response [getToken] -> ${JSON.stringify(respGET.headers)}`);
    }

    return respGET

}

async function getPostHeader(client) {
    const tokenResponse = await getToken(client);
    const token = tokenResponse.headers.get("x-csrf-token")

    const cookies = tokenResponse.headers.get("set-cookie").split(",")
    const cookie = cookies[0].substring(0, cookies[0].indexOf(";")) + ";" +
        cookies[1].substring(0, cookies[1].indexOf(";"));

    return {
        'X-CSRF-Token': token,
        'cookie': cookie
    }

}

async function createTimeEntryApiRequest(client, receiverCostCenter, purchaseOrderItem, timeSheetTaskType,
                                         timeSheetTaskLevel, timeSheetTaskComponent,
                                         timeSheetNote, recordedHours, hoursUnitOfMeasure, personWorkAgreementExternalID,
                                         companyCode, personWorkAgreement, date, timeSheetStatus, timeSheetOperation, timeEntryId, startedAt, endAt) {

    const headerPost = await getPostHeader(client)

    const body = {
        TimeSheetDataFields: {
            ControllingArea: controllingArea,
            ReceiverCostCenter: receiverCostCenter,
            PurchaseOrderItem: purchaseOrderItem,
            TimeSheetTaskType: timeSheetTaskType,
            TimeSheetTaskLevel: timeSheetTaskLevel,
            TimeSheetTaskComponent: timeSheetTaskComponent,
            TimeSheetNote: timeSheetNote,
            RecordedHours: recordedHours,
            RecordedQuantity: recordedHours,
            HoursUnitOfMeasure: hoursUnitOfMeasure,
            TimeSheetOvertimeCategory: ""
        },
        PersonWorkAgreementExternalID: personWorkAgreementExternalID,
        CompanyCode: companyCode,
        PersonWorkAgreement: personWorkAgreement,
        TimeSheetDate: `/Date(${date})/`,
        TimeSheetStatus: timeSheetStatus,
        TimeSheetOperation: timeSheetOperation
    }

    if (timeEntryId) {
        let startedAtMoment = moment(startedAt)
        let minutesDiff = endAt.diff(startedAtMoment, 'minutes');
        let total = minutesDiff / 60

        body.TimeSheetRecord = timeEntryId
        body.TimeSheetDataFields.RecordedHours = total.toString()
        body.TimeSheetDataFields.RecordedQuantity = total.toString()

    }

    const respPOST = await client.fetch('API_MANAGE_WORKFORCE_TIMESHEET/TimeSheetEntryCollection', {
        headers: headerPost,
        method: 'POST',
        body: JSON.stringify(body)
    });

    if (!respPOST.ok) {
        throw new Error(`[respPOST] ## Error Response -> (${JSON.stringify(respPOST)})`);
    }

    return respPOST.json()
}

async function getCreatedTimeEntryApiRequest(client, personWorkAgreementExternalId, companyCode, timeSheetRecord) {

    const timeEntryUrl = `API_MANAGE_WORKFORCE_TIMESHEET/TimeSheetEntryCollection(PersonWorkAgreementExternalID='${personWorkAgreementExternalId}',CompanyCode='${companyCode}',TimeSheetRecord='${timeSheetRecord}')`

    const getCreatedTimeEntry = await client.fetch(timeEntryUrl, defaultGetOptions);

    if (!getCreatedTimeEntry.ok) {
        throw new Error(`Could not retrieve data from time entry (${getCreatedTimeEntry.status}: ${getCreatedTimeEntry.statusText})`);
    }

    const timeEntry = await getCreatedTimeEntry.json()

    return timeEntry.d
}

async function storeEntryInDatabase(dataStore, timeEntryId, timeSheetRecord, timeSheetDateTimeStamp, companyCode, personWorkAgreement,
                                    personWorkAgreementExternalID, controllingArea, hoursUnitOfMeasure, purchaseOrderItem,
                                    receiverCostCenter, recordedHours, recordedQuantity, timeSheetOvertimeCategory,
                                    timeSheetTaskComponent, timeSheetTaskLevel, timeSheetTaskType, timeSheetNote, timeSheetOperation,
                                    timeSheetStatus, user_email, startedAt, timeClockManagement, endAt) {
    const timeEntries = {
        id: timeEntryId ? parseInt(timeEntryId) : parseInt(timeSheetRecord),
        ts_id: timeSheetRecord,
        ts_date: new Date(parseInt(timeSheetDateTimeStamp)),
        company_code: companyCode,
        person_work_agreement: personWorkAgreement,
        person_work_agreement_external_id: personWorkAgreementExternalID,
        ts_df_controlling_area: controllingArea,
        ts_df_hours_unit_of_measure: hoursUnitOfMeasure,
        ts_df_purchase_order_item: purchaseOrderItem,
        ts_df_receiver_cost_center: receiverCostCenter,
        ts_df_recorded_hours: recordedHours,
        ts_df_recorded_quantity: recordedQuantity,
        ts_df_ts_overtime_category: timeSheetOvertimeCategory,
        ts_df_ts_task_component: timeSheetTaskComponent,
        ts_df_ts_task_level: timeSheetTaskLevel,
        ts_df_ts_task_type: timeSheetTaskType,
        ts_df_ts_note: timeSheetNote,
        ts_operation: timeSheetOperation,
        ts_status: timeSheetStatus,
        user_email: user_email
    }

    console.log("timeEntries#1: " + JSON.stringify(timeEntries))

    if (timeClockManagement && startedAt !== "undefined") {
        timeEntries.start_at = startedAt ? startedAt : moment().format()
        timeEntries.end_at = timeEntryId ? endAt.format() : ''
    }

    console.log("timeEntries#2: " + JSON.stringify(timeEntries))

    dataStore.save("TimeEntries", timeEntries);
    dataStore.save("TimeEntriesClock", timeEntries);
}

function timeToDecimal(timeStr) {
    const [hours, minutes] = timeStr.split(':')
    return parseInt(hours, 10) + parseInt(minutes, 10) / 60;
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
    const today = moment().format('YYYY-MM-DDT00:00:00')
    const sevenDaysBefore = moment().subtract(7, 'd').format('YYYY-MM-DDT00:00:00')
    const thirtyDaysBefore = moment().subtract(30, 'd').format('YYYY-MM-DDT00:00:00')

    let dateFilter = `TimeSheetDate ge datetime'${thirtyDaysBefore}' and TimeSheetDate le datetime'${today}'`

    if (latestSynchronizationTime) {
        dateFilter = `TimeSheetDate ge datetime'${sevenDaysBefore}'`
    }

    const statusFilter = "(TimeSheetStatus eq '10' or " +
        "TimeSheetStatus eq '20' or " +
        "TimeSheetStatus eq '30' or " +
        "TimeSheetStatus eq '40' or " +
        "TimeSheetStatus eq '50')"

    const filter = `${dateFilter} and ${statusFilter}`

    const url = `API_MANAGE_WORKFORCE_TIMESHEET/TimeSheetEntryCollection?$filter=${filter}`

    const respGET = await client.fetch(url, defaultGetOptions);

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

async function createTimeEntry({dataStore, client, actionParameters}) {

    const timeClockManagement = false
    const date = moment(actionParameters.Date).valueOf()
    const recordedTime = await timeToDecimal(actionParameters.RecordedQuantity)
    const employeeBusinessPartner = await getEmployeeBusinessPartner(client, actionParameters.UserEmail)
    const workAgreement = await getWorkAgreement(client, employeeBusinessPartner)

    const createdEntry = await createTimeEntryApiRequest(client, workAgreement.CostCenter, actionParameters.PurchaseOrderItem,
        actionParameters.TimeSheetTaskType, actionParameters.TimeSheetTaskLevel, actionParameters.TimeSheetTaskComponent,
        actionParameters.TimeSheetNote, recordedTime.toString(), actionParameters.HoursUnitOfMeasure,
        workAgreement.PersonWorkAgreementExternalID, workAgreement.CompanyCode, workAgreement.PersonWorkAgreement,
        date, actionParameters.TimeSheetStatus, actionParameters.TimeSheetOperation, actionParameters.TimeEntryId, null)

    const timeEntry = await getCreatedTimeEntryApiRequest(client, createdEntry.d.PersonWorkAgreementExternalID,
        createdEntry.d.CompanyCode, createdEntry.d.TimeSheetRecord)

    const timeSheetDateTimeStamp = timeEntry.TimeSheetDate.replace(/[^.\d]/g, '');

    await storeEntryInDatabase(dataStore, null, timeEntry.TimeSheetRecord, timeSheetDateTimeStamp,
        timeEntry.CompanyCode, timeEntry.PersonWorkAgreement,
        timeEntry.PersonWorkAgreementExternalID, timeEntry.TimeSheetDataFields.ControllingArea,
        timeEntry.TimeSheetDataFields.HoursUnitOfMeasure, timeEntry.TimeSheetDataFields.PurchaseOrderItem,
        timeEntry.TimeSheetDataFields.ReceiverCostCenter, timeEntry.TimeSheetDataFields.RecordedHours,
        timeEntry.TimeSheetDataFields.RecordedQuantity, timeEntry.TimeSheetDataFields.TimeSheetOvertimeCategory,
        timeEntry.TimeSheetDataFields.TimeSheetTaskComponent, timeEntry.TimeSheetDataFields.TimeSheetTaskLevel,
        timeEntry.TimeSheetDataFields.TimeSheetTaskType, timeEntry.TimeSheetDataFields.TimeSheetNote,
        timeEntry.TimeSheetOperation, timeEntry.TimeSheetStatus,
        actionParameters.UserEmail, actionParameters.StartedAt, timeClockManagement)

}

async function clockManager({dataStore, client, actionParameters}) {

    const todayTs = moment().valueOf();
    const endAt = moment();
    const timeClockManagement = true
    const employeeBusinessPartner = await getEmployeeBusinessPartner(client, actionParameters.UserEmail)
    const workAgreement = await getWorkAgreement(client, employeeBusinessPartner)

    const createdEntry = await createTimeEntryApiRequest(client, workAgreement.CostCenter, actionParameters.PurchaseOrderItem,
        actionParameters.TimeSheetTaskType, actionParameters.TimeSheetTaskLevel, actionParameters.TimeSheetTaskComponent,
        actionParameters.TimeSheetNote, actionParameters.RecordedHours, actionParameters.HoursUnitOfMeasure,
        workAgreement.PersonWorkAgreementExternalID, workAgreement.CompanyCode, workAgreement.PersonWorkAgreement,
        todayTs, actionParameters.TimeSheetStatus, actionParameters.TimeSheetOperation, actionParameters.TimeEntryId, actionParameters.StartedAt, endAt)

    const timeEntry = await getCreatedTimeEntryApiRequest(client, createdEntry.d.PersonWorkAgreementExternalID,
        createdEntry.d.CompanyCode, createdEntry.d.TimeSheetRecord)

    const timeSheetDateTimeStamp = timeEntry.TimeSheetDate.replace(/[^.\d]/g, '');

    await storeEntryInDatabase(dataStore, actionParameters.TimeEntryId, timeEntry.TimeSheetRecord, timeSheetDateTimeStamp,
        timeEntry.CompanyCode, timeEntry.PersonWorkAgreement,
        timeEntry.PersonWorkAgreementExternalID, timeEntry.TimeSheetDataFields.ControllingArea,
        timeEntry.TimeSheetDataFields.HoursUnitOfMeasure, timeEntry.TimeSheetDataFields.PurchaseOrderItem,
        timeEntry.TimeSheetDataFields.ReceiverCostCenter, timeEntry.TimeSheetDataFields.RecordedHours,
        timeEntry.TimeSheetDataFields.RecordedQuantity, timeEntry.TimeSheetDataFields.TimeSheetOvertimeCategory,
        timeEntry.TimeSheetDataFields.TimeSheetTaskComponent, timeEntry.TimeSheetDataFields.TimeSheetTaskLevel,
        timeEntry.TimeSheetDataFields.TimeSheetTaskType, timeEntry.TimeSheetDataFields.TimeSheetNote,
        timeEntry.TimeSheetOperation, timeEntry.TimeSheetStatus,
        actionParameters.UserEmail, actionParameters.StartedAt, timeClockManagement, endAt)
}

async function removeClockEntry({dataStore, client, actionParameters}) {

    const headerPost = await getPostHeader(client)

    const body = {
        PersonWorkAgreement: actionParameters.PersonWorkAgreement,
        TimeSheetOperation: actionParameters.TimeSheetOperation,
        TimeSheetRecord: actionParameters.TimeSheetRecordId
    }

    const postOptions = {
        headers: headerPost,
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