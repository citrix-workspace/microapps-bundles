let parser = library.load("xml2js")
let jp = library.load("jsonpath-plus")
const moment_lib = library.load("moment-timezone")

async function logIn(client, userName, password) {
    let session = [];
    const response = await client.fetch('/wfc/XmlService', {
        method: "POST",
        headers: {
            "Content-Type": "application/xml",
            "Accept": "application/xml"
        },
        body: `<KRONOS_WFC VERSION="1.0"><REQUEST OBJECT="SYSTEM" ACTION="LOGON" USERNAME="${userName}" PASSWORD="${password}"/></KRONOS_WFC>`
    });

    const cookies = await response.headers.get('set-cookie');
    const data = await response.text();
    parser.parseString(data, (err , result)=>{
        if(err != null){
            throw new Error(JSON.stringify(err))
        }
        else if(result.Kronos_WFC.Response[0].$.Status == 'Failure'){
            throw new Error(result.Kronos_WFC.Response[0].$.Message)
        }

        session = cookies.split(',').filter(value =>{
            return value.indexOf('JSESSIONID') === 0
        })
    })
    return session[0];
}

async function syncPeople(dataStore, client, session, integrationParameters) {
    const month = moment_lib().format('M')
    const start = moment_lib().month(month-1).startOf('month').format(integrationParameters.dateFormat)
    const end = moment_lib().month(month).endOf('month').format(integrationParameters.dateFormat)
    let people;
    const response = await client.fetch('/wfc/XmlService', {
        method: "POST",
        headers: {
            "Content-Type": "application/xml",
            Cookie: session
        },
        body: `<?xml version="1.0"?>
        <KRONOS_WFC VERSION="1.0"><Request Action = "RunQuery">
        <HyperfindQuery HyperfindQueryName = "All Home"  QueryDateSpan = "${start} - ${end}" VisibilityCode= "Public"  QueryPersonOrEmployee="Person" />
        </Request>
        </KRONOS_WFC>`
    });
    const data = await response.text();
    parser.parseString(data, (err, result)=>{
        if(err != null){
            throw new Error(err);
        }
        else if(result.Kronos_WFC.Response[0].$.Status == 'Failure'){
            throw new Error(result.Kronos_WFC.Response[0].$.Message)
        }

        let HyperfindResult = result.Kronos_WFC.Response[0].HyperFindResult;
        people = HyperfindResult.map(result => {
            return{
                "fullName": result.$.FullName,
                "personNumber": result.$.PersonNumber,    
            }            
        })
    })
    dataStore.save('people',people)
    return people;
}

async function syncPeopleDetials(dataStore, client, session, people) {
    let dataArray = [];
    let personDetails = new Map();
    for (pno of people) {
        const response = await client.fetch('/wfc/XmlService', {
            method: "POST",
            headers: {
                "Content-Type": "application/xml",
                Cookie: session
            },
            body: `<?xml version="1.0" ?>
            <Kronos_WFC version="1.0">
            <Request Action = "Load">
                <PersonInformation>
                    <Identity>
                        <PersonIdentity personNumber="${pno.personNumber}"></PersonIdentity>
                    </Identity>
                </PersonInformation>
            </Request>    
            </Kronos_WFC>`
        })

        const data = await response.text();
        parser.parseString(data, (err, result) => {
            if(err != null) {
                throw new Error(err);
            }
            else if(result.Kronos_WFC.Response[0].$.Status == 'Failure'){
                throw new Error(result.Kronos_WFC.Response[0])
            }
            let personData = result.Kronos_WFC.Response[0].PersonInformation[0];

            personDetails.set(personData.PersonData[0].Person?personData.PersonData[0].Person[0].$.PersonNumber:null,personData)
        });
    }

    personDetails.forEach(data => {
        let supervisorPersonNumber = data.SupervisorData ? data.SupervisorData[0].Supervisor[0].$.PersonNumber : null;
        let supervisorEmail = '';
        if(supervisorPersonNumber != null)
        {
            let dt = personDetails.get(supervisorPersonNumber)
            supervisorEmail = dt != undefined ? dt.EMailAddresses ? dt.EMailAddresses[0].EMailAddress[0].$.Address : '' : null
        }
        dataStore.save("personalDetails", {
            "fullName": data.PersonData[0].Person?data.PersonData[0].Person[0].$.FullName:null,
            "firstName": data.PersonData[0].Person?data.PersonData[0].Person[0].$.FirstName:null,
            "lastName": data.PersonData[0].Person?data.PersonData[0].Person[0].$.LastName:null,
            "email": data.EMailAddresses ? data.EMailAddresses[0].EMailAddress[0].$.Address : '',
            "personNumber": data.PersonData[0].Person?data.PersonData[0].Person[0].$.PersonNumber:null,
            "supervisorName": data.SupervisorData ? data.SupervisorData[0].Supervisor[0].$.FullName : null,
            "supervisorPersonNumber": supervisorPersonNumber,
            "supervisorEmail": supervisorEmail
        });
    })
    
}

async function syncAccrualBalance(dataStore, client, session, people,integrationParameters) {
    const date = moment_lib().format(integrationParameters.dateFormat);
    for (pno of people) {
        const response = await client.fetch('/wfc/XmlService', {
            method: "POST",
            headers: {
                "Content-Type": "application/xml",
                Cookie: session
            },
            body: `<?xml version='1.0' encoding='UTF-8' ?>
            <Kronos_WFC version="1.0">
                <Request Action="Load">
                    <AccrualData>
                        <BalanceDate>${date}</BalanceDate>
                        <Employee>
                            <PersonIdentity personNumber="${pno.personNumber}"/>
                        </Employee>
                    </AccrualData>
                </Request>
            </Kronos_WFC>`
        })

        const data = await response.text();
        let accrualData = []
        parser.parseString(data, (err, result) => {
            if (err != null) {
                throw new Error(err);
            }
            else if(result.Kronos_WFC.Response[0].$.Status == 'Failure'){
                throw new Error(JSON.stringify(result.Kronos_WFC.Response))
            }
            let path = result.Kronos_WFC.Response[0].AccrualData[0].AccrualBalances[0].AccrualBalanceSummary != undefined ? result.Kronos_WFC.Response[0].AccrualData[0].AccrualBalances[0].AccrualBalanceSummary : [];
            accrualData = path.map(value => {
                return {
                    "accrualCodeId": value.$.AccrualCodeId,
                    "accrualCodeName": value.$.AccrualCodeName,
                    "accrualType": value.$.AccrualType,
                    "encumberedBalanceInTime": Number(value.$.EncumberedBalanceInTime),
                    "hoursPerDay": value.$.HoursPerDay,
                    "projectedVestedBalanceInTime": value.$.ProjectedVestedBalanceInTime,
                    "projectedDate": moment_lib(value.$.ProjectedDate,`${integrationParameters.dateFormat}`).toDate(),
                    "projectedGrantAmountInTime": value.$.ProjectedGrantAmountInTime,
                    "projectedTakingAmountInTime": value.$.ProjectedTakingAmountInTime,
                    "vestedBalanceInTime": value.$.VestedBalanceInTime,
                    "personalNumber": pno.personNumber
                }
            });
        })
        dataStore.save("accrualBalances", accrualData);
    }
}

async function syncRequestTimeOff(dataStore, client, session, people,integrationParameters) {
    const month = moment_lib().format('M')
    const start = moment_lib().month(month-1).startOf('month').format(integrationParameters.dateFormat)
    const end = moment_lib().month(month).endOf('month').format(integrationParameters.dateFormat)
    for (pno of people) {
        const response = await client.fetch('/wfc/XmlService', {
            method: "POST",
            headers: {
                "Content-Type": "application/xml",
                Cookie: session
            },
            body: `<?xml version="1.0"?>
            <Kronos_WFC version="1.0">
                <REQUEST ACTION="RetrieveRequests">
                    <EmployeeRequestMgmt>
                        <QueryDateSpan>${start} - ${end}</QueryDateSpan>
                        <Employee>
                            <PersonIdentity personNumber="${pno.personNumber}"/>
                        </Employee>
                    </EmployeeRequestMgmt>
                </REQUEST>
            </Kronos_WFC>`
        })

        const data = await response.text();
        let reqTimeOffData = []
        parser.parseString(data, (err, result) => {
            if (err != null) {
                throw new Error(err);
            }
            let path = result.Kronos_WFC.Response[0].EmployeeRequestMgmt[0].RequestItems[0].EmployeeGlobalTimeOffRequestItem !== undefined ? result.Kronos_WFC.Response[0].EmployeeRequestMgmt[0].RequestItems[0].EmployeeGlobalTimeOffRequestItem : [];
            reqTimeOffData = path.map(value =>{
                let com = value.Comments != undefined ? value.Comments[0].Comment[0]:[]
                return {
                    "id":value.$.Id,
                    "statusName":value.$.StatusName,
                    "requestFor":value.$.RequestFor,
                    "startDate":value.TimeOffPeriods != undefined ? moment_lib(value.TimeOffPeriods[0].TimeOffPeriod[0].$.StartDate,`${integrationParameters.dateFormat}`).format('yyyy-MM-DD') : '',
                    "length":value.TimeOffPeriods != undefined ? Number(value.TimeOffPeriods[0].TimeOffPeriod[0].$.Length) : '',
                    "startTime":value.TimeOffPeriods != undefined ? value.TimeOffPeriods[0].TimeOffPeriod[0].$.StartTime : '',
                    "duration":value.TimeOffPeriods != undefined ? value.TimeOffPeriods[0].TimeOffPeriod[0].$.Duration : '',
                    "endDate":value.TimeOffPeriods != undefined ? moment_lib(value.TimeOffPeriods[0].TimeOffPeriod[0].$.EndDate,`${integrationParameters.dateFormat}`).format('yyyy-MM-DD') : '',
                    "personNumber":pno.personNumber,
                    "payCodeName":value.TimeOffPeriods != undefined ? value.TimeOffPeriods[0].TimeOffPeriod[0].$.PayCodeName : '',
                    "CommentText":com.$ !=undefined ?com.$.CommentText:null,
                    "CommentDataSourceClientName":com.$ !=undefined ?com.Notes[0].Note[0].DataSource[0].DataSource[0].$.ClientName:null,
                    "CommentDataSourceFunctionalAreaCode":com.$ !=undefined ?Number(com.Notes[0].Note[0].DataSource[0].DataSource[0].$.FunctionalAreaCode):null,
                    "CommentDataSourceFunctionalAreaName":com.$ !=undefined ?com.Notes[0].Note[0].DataSource[0].DataSource[0].$.FunctionalAreaName:null,
                    "CommentDataSourceServerName":com.$ !=undefined ?com.Notes[0].Note[0].DataSource[0].DataSource[0].$.ServerName:null,
                    "CommentDataSourceUserName":com.$ !=undefined ?com.Notes[0].Note[0].DataSource[0].DataSource[0].$.UserName:null,
                    "CommentNotesText":com.$ !=undefined ?com.Notes[0].Note[0].$.Text:null,
                    "CommentNotesTimestamp":com.$ !=undefined ?com.Notes[0].Note[0].$.Timestamp:null,
                    "CreationDateTime":moment_lib(value.$.CreationDateTime, `${integrationParameters.dateFormat} hh:mm A`).toDate(),
                }    
            })
        })
        dataStore.save("timeOff", reqTimeOffData);
    }
}

async function syncRecordTimestamp(dataStore, client, session, people,integrationParameters) {
    const start = moment_lib().subtract(1,'d').format(integrationParameters.dateFormat)
    const end = moment_lib().format(integrationParameters.dateFormat)
    for (pno of people) {
        let unique_key = 0;
        const response = await client.fetch('/wfc/XmlService', {
            method: "POST",
            headers: {
                "Content-Type": "application/xml",
                Cookie: session
            },
            body: `<?xml version="1.0"?>
            <Kronos_WFC version="1.0">
                <REQUEST ACTION="Load">
                    <Timesheet>
                        <Period>
                            <TimeFramePeriod PeriodDateSpan = "${start} - ${end}" />
                        </Period>
                        <Employee>
                            <PersonIdentity personNumber="${pno.personNumber}"/>
                        </Employee>
                    </Timesheet>
                </REQUEST>
            </Kronos_WFC>`
        })
        const data = await response.text();
        let timestampData = []
        parser.parseString(data, (err, result) => {
            if (err != null) {
                throw new Error(err);
            }
            else if(result.Kronos_WFC.Response[0].$.Status == 'Failure'){
                throw new Error(JSON.stringify(result.Kronos_WFC.Response))
            }
            let path = result.Kronos_WFC.Response[0].Timesheet[0].TotaledSpans[0].TotaledSpan != undefined ? result.Kronos_WFC.Response[0].Timesheet[0].TotaledSpans[0].TotaledSpan: [];
            if(path.length > 0){
                timestampData = path.map(value =>{
                    return {
                        "date": value.$.Date ? moment_lib(value.$.Date,`${integrationParameters.dateFormat}`).format('yyyy-MM-DD') : null,
                        "employee_person_identity_person_number": pno.personNumber,
                        "in_punch_punch_date": value.InPunch[0].Punch[0].$ != undefined && value.InPunch[0].Punch[0].$.Date != undefined ? moment_lib(value.InPunch[0].Punch[0].$.Date,`${integrationParameters.dateFormat}`).format('yyyy-MM-DD') : null,
                        "in_punch_punch_entered_on_date": value.InPunch[0].Punch[0].$ != undefined && value.InPunch[0].Punch[0].$.EnteredOnDate != undefined ? moment_lib(value.InPunch[0].Punch[0].$.EnteredOnDate,`${integrationParameters.dateFormat}`).format('yyyy-MM-DD') : null,
                        "in_punch_punch_entered_on_time": value.InPunch[0].Punch[0].$ != undefined && value.InPunch[0].Punch[0].$.EnteredOnTime != undefined ? value.InPunch[0].Punch[0].$.EnteredOnTime : null,
                        "in_punch_punch_entered_kronos_time_zone": value.InPunch[0].Punch[0].$ != undefined ? value.InPunch[0].Punch[0].$.KronosTimeZone : null,
                        "in_punch_punch_time": value.InPunch[0].Punch[0].$ != undefined ? value.InPunch[0].Punch[0].$.Time : null,
                        "out_punch_punch_date": value.OutPunch[0].Punch[0].$ != undefined && value.OutPunch[0].Punch[0].$.Date != undefined ? moment_lib(value.OutPunch[0].Punch[0].$.Date,`${integrationParameters.dateFormat}`).format('yyyy-MM-DD') : null,
                        "out_punch_punch_entered_on_date": value.OutPunch[0].Punch[0].$ != undefined && value.OutPunch[0].Punch[0].$.EnteredOnDate != undefined ? moment_lib(value.OutPunch[0].Punch[0].$.EnteredOnDate,`${integrationParameters.dateFormat}`).format('yyyy-MM-DD') : null,
                        "out_punch_punch_entered_on_time": value.OutPunch[0].Punch[0].$ != undefined && value.OutPunch[0].Punch[0].$.EnteredOnTime ? value.OutPunch[0].Punch[0].$.EnteredOnTime : null,
                        "out_punch_punch_entered_kronos_time_zone": value.OutPunch[0].Punch[0].$ != undefined ? value.OutPunch[0].Punch[0].$.KronosTimeZone : null,
                        "out_punch_punch_time": value.OutPunch[0].Punch[0].$ != undefined ? value.OutPunch[0].Punch[0].$.Time : null,
                        "labor_account_id": value.$.LaborAccountId != undefined ? Number(value.$.LaborAccountId) : null,
                        "labor_account_name": value.$.LaborAccountName != undefined ? value.$.LaborAccountName : null,
                        "org_job_id": value.$.OrgJobId != undefined ? Number(value.$.OrgJobId) : null,
                        "org_job_name": value.$.OrgJobName != undefined ? value.$.OrgJobName : null,
                        "unique_key":(++unique_key).toString()
                    }
                })
            }
        })
        dataStore.save("record_time_stamp", timestampData);
    }
}

async function syncworkTime(dataStore, client, session, people,integrationParameters){
    const month = moment_lib().format('M')
    const start = moment_lib().month(month-1).startOf('month').format(integrationParameters.dateFormat)
    const end = moment_lib().month(month).endOf('month').format(integrationParameters.dateFormat)
    for (pno of people) {
        const response = await client.fetch('/wfc/XmlService', {
            method: "POST",
            headers: {
                "Content-Type": "application/xml",
                Cookie: session
            },
            body: `<?xml version="1.0" ?>
            <Kronos_WFC version="1.0">
                <Request Action="RetrieveRequests">
                    <EmployeeRequestMgmt QueryDateSpan = "${start} - ${end}" RequestFor="Work Time">
                        <Employee>
                            <PersonIdentity personNumber="${pno.personNumber}"/>
                        </Employee>
                    </EmployeeRequestMgmt>
                </Request>
            </Kronos_WFC>`
        })

        const data = await response.text();
        let syncWorktimeData=[]
         parser.parseString(data, (err, result) => {
            if (err != null) {
                throw new Error(err);
            }

            let path = result.Kronos_WFC.Response[0].EmployeeRequestMgmt[0].RequestItems[0].EmployeeWorkTimeRequestItem ? result.Kronos_WFC.Response[0].EmployeeRequestMgmt[0].RequestItems[0].EmployeeWorkTimeRequestItem : [];
            syncWorktimeData = path.map(value =>{
                let com = []
                if(value.$.StatusName == "SUBMITTED"){
                    com = value.Comments!=undefined?value.Comments[0].Comment[0]:[]
                }
                else if(value.$.StatusName == "APPROVED" || value.$.StatusName == "REFUSED"){
                    com = value.Comments!=undefined?value.Comments[0].Comment[value.Comments[0].Comment.length - 1]:[]
                }
                return {
                    "endDate": moment_lib(value.$.EndDate,`${integrationParameters.dateFormat}`).format('yyyy-MM-DD'),
                    "endTime":value.$.EndTime,
                    "startDate":moment_lib(value.$.StartDate,`${integrationParameters.dateFormat}`).format('yyyy-MM-DD'),
                    "startTime":value.$.StartTime,
                    "personNumber":pno.personNumber,
                    "StatusName":value.$.StatusName,
                    "Length":value.$.Length,
                    "requestId":value.$.Id,
                    "CommentText":com.$ !=undefined ?com.$.CommentText:null,
                    "CommentDataSourceClientName":com.$ !=undefined ?com.Notes[0].Note[0].DataSource[0].DataSource[0].$.ClientName:null,
                    "CommentDataSourceFunctionalAreaCode":com.$ !=undefined ?Number(com.Notes[0].Note[0].DataSource[0].DataSource[0].$.FunctionalAreaCode):null,
                    "CommentDataSourceFunctionalAreaName":com.$ !=undefined ?com.Notes[0].Note[0].DataSource[0].DataSource[0].$.FunctionalAreaName:null,
                    "CommentDataSourceServerName":com.$ !=undefined ?com.Notes[0].Note[0].DataSource[0].DataSource[0].$.ServerName:null,
                    "CommentDataSourceUserName":com.$ !=undefined ?com.Notes[0].Note[0].DataSource[0].DataSource[0].$.UserName:null,
                    "CommentNotesText":com.$ !=undefined ?com.Notes[0].Note[0].$.Text:null,
                    "CommentNotesTimestamp":com.$ !=undefined ?com.Notes[0].Note[0].$.Timestamp:null,
                    "CreationDateTime":moment_lib(value.$.CreationDateTime, `${integrationParameters.dateFormat} hh:mm A`).toDate(),
                }
            })
        })
        dataStore.save('work_time',syncWorktimeData)
    }
}

async function incsyncRequestTimeOff(dataStore, client, session, people,latestSynchronizationTime,integrationParameters) {
    let timeOffDataArray = [];
    const month = moment_lib().format('M')
    const start = moment_lib().month(month-1).startOf('month').format(integrationParameters.dateFormat)
    const end = moment_lib().month(month).endOf('month').format(integrationParameters.dateFormat)
    for (pno of people) {
        const response = await client.fetch('/wfc/XmlService', {
            method: "POST",
            headers: {
                "Content-Type": "application/xml",
                Cookie: session
            },
            body: `<?xml version="1.0"?>
            <Kronos_WFC version="1.0">
                <REQUEST ACTION="RetrieveRequests">
                    <EmployeeRequestMgmt>
                        <QueryDateSpan>${start} - ${end}</QueryDateSpan>
                        <Employee>
                            <PersonIdentity personNumber="${pno.personNumber}"/>
                        </Employee>
                    </EmployeeRequestMgmt>
                </REQUEST>
            </Kronos_WFC>`
        })
        timeOffDataArray = []
        const data = await response.text();
        parser.parseString(data, (err, result) => {
            if (err != null) {
                throw new Error(err);
            }
            
            let path = result.Kronos_WFC.Response[0].EmployeeRequestMgmt[0].RequestItems[0].EmployeeGlobalTimeOffRequestItem ? result.Kronos_WFC.Response[0].EmployeeRequestMgmt[0].RequestItems[0].EmployeeGlobalTimeOffRequestItem : [];
            timeOffDataArray = path.filter(value =>{
                return moment_lib(new Date(value.$.CreationDateTime)).isAfter(moment_lib(latestSynchronizationTime))
            }).map(value =>{
                let com = value.Comments != undefined ? value.Comments[0].Comment[0]:[]
                return {
                    "id":value.$.Id,
                    "statusName":value.$.StatusName,
                    "requestFor":value.$.RequestFor,
                    "startDate":value.TimeOffPeriods != undefined ? moment_lib(value.TimeOffPeriods[0].TimeOffPeriod[0].$.StartDate,`${integrationParameters.dateFormat}`).format('yyyy-MM-DD') : '',
                    "length":value.TimeOffPeriods != undefined ? Number(value.TimeOffPeriods[0].TimeOffPeriod[0].$.Length) : '',
                    "startTime":value.TimeOffPeriods != undefined ? value.TimeOffPeriods[0].TimeOffPeriod[0].$.StartTime : '',
                    "duration":value.TimeOffPeriods != undefined ? value.TimeOffPeriods[0].TimeOffPeriod[0].$.Duration : '',
                    "endDate":value.TimeOffPeriods != undefined ? moment_lib(value.TimeOffPeriods[0].TimeOffPeriod[0].$.EndDate,`${integrationParameters.dateFormat}`).format('yyyy-MM-DD') : '',
                    "personNumber":pno.personNumber,
                    "payCodeName":value.TimeOffPeriods != undefined ? value.TimeOffPeriods[0].TimeOffPeriod[0].$.PayCodeName : '',
                    "CommentText":com.$ !=undefined ?com.$.CommentText:null,
                    "CommentDataSourceClientName":com.$ !=undefined ?com.Notes[0].Note[0].DataSource[0].DataSource[0].$.ClientName:null,
                    "CommentDataSourceFunctionalAreaCode":com.$ !=undefined ?Number(com.Notes[0].Note[0].DataSource[0].DataSource[0].$.FunctionalAreaCode):null,
                    "CommentDataSourceFunctionalAreaName":com.$ !=undefined ?com.Notes[0].Note[0].DataSource[0].DataSource[0].$.FunctionalAreaName:null,
                    "CommentDataSourceServerName":com.$ !=undefined ?com.Notes[0].Note[0].DataSource[0].DataSource[0].$.ServerName:null,
                    "CommentDataSourceUserName":com.$ !=undefined ?com.Notes[0].Note[0].DataSource[0].DataSource[0].$.UserName:null,
                    "CommentNotesText":com.$ !=undefined ?com.Notes[0].Note[0].$.Text:null,
                    "CommentNotesTimestamp":com.$ !=undefined ?com.Notes[0].Note[0].$.Timestamp:null,
                    "CreationDateTime":moment_lib(value.$.CreationDateTime, `${integrationParameters.dateFormat} hh:mm A`).toDate(),
                }
            })
        })
        dataStore.save("timeOff", timeOffDataArray);
    }
}


async function incsyncworkTime(dataStore, client, session, people,latestSynchronizationTime,integrationParameters){
    let syncWorktimeData = [];
    const month = moment_lib().format('M')
    const start = moment_lib().month(month-1).startOf('month').format(integrationParameters.dateFormat)
    const end = moment_lib().month(month).endOf('month').format(integrationParameters.dateFormat)
    for (pno of people) {
        const response = await client.fetch('/wfc/XmlService', {
            method: "POST",
            headers: {
                "Content-Type": "application/xml",
                Cookie: session
            },
            body: `<?xml version="1.0" ?>
            <Kronos_WFC version="1.0">
                <Request Action="RetrieveRequests">
                    <EmployeeRequestMgmt QueryDateSpan = "${start} - ${end}" RequestFor="Work Time">
                        <Employee>
                            <PersonIdentity personNumber="${pno.personNumber}"/>
                        </Employee>
                    </EmployeeRequestMgmt>
                </Request>
            </Kronos_WFC>`
        })
        syncWorktimeData = [];
        const data = await response.text();
        parser.parseString(data, (err, result) => {
            if (err != null) {
                throw new Error(err);
            }

            let path = result.Kronos_WFC.Response[0].EmployeeRequestMgmt[0].RequestItems[0].EmployeeWorkTimeRequestItem ? result.Kronos_WFC.Response[0].EmployeeRequestMgmt[0].RequestItems[0].EmployeeWorkTimeRequestItem : [];
            syncWorktimeData = path.filter(value =>{
                return moment_lib(new Date(value.$.CreationDateTime)).isAfter(moment_lib(latestSynchronizationTime))
            }).map(value =>{
                let com = []
                if(value.$.StatusName == "SUBMITTED"){
                    com = value.Comments!=undefined?value.Comments[0].Comment[0]:[]
                }
                else if(value.$.StatusName == "APPROVED" || value.$.StatusName == "REFUSED"){
                    com = value.Comments!=undefined?value.Comments[0].Comment[value.Comments[0].Comment.length - 1]:[]    
                }
                return {
                    "endDate":moment_lib(value.$.EndDate,`${integrationParameters.dateFormat}`).format('yyyy-MM-DD'),
                    "endTime":value.$.EndTime,
                    "startDate":moment_lib(value.$.StartDate,`${integrationParameters.dateFormat}`).format('yyyy-MM-DD'),
                    "startTime":value.$.StartTime,
                    "personNumber":pno.personNumber,
                    "StatusName":value.$.StatusName,
                    "Length":value.$.Length,
                    "requestId":value.$.Id,
                    "CommentText":com.$ !=undefined ?com.$.CommentText:null,
                    "CommentDataSourceClientName":com.$ !=undefined ?com.Notes[0].Note[0].DataSource[0].DataSource[0].$.ClientName:null,
                    "CommentDataSourceFunctionalAreaCode":com.$ !=undefined ?Number(com.Notes[0].Note[0].DataSource[0].DataSource[0].$.FunctionalAreaCode):null,
                    "CommentDataSourceFunctionalAreaName":com.$ !=undefined ?com.Notes[0].Note[0].DataSource[0].DataSource[0].$.FunctionalAreaName:null,
                    "CommentDataSourceServerName":com.$ !=undefined ?com.Notes[0].Note[0].DataSource[0].DataSource[0].$.ServerName:null,
                    "CommentDataSourceUserName":com.$ !=undefined ?com.Notes[0].Note[0].DataSource[0].DataSource[0].$.UserName:null,
                    "CommentNotesText":com.$ !=undefined ?com.Notes[0].Note[0].$.Text:null,
                    "CommentNotesTimestamp":com.$ !=undefined ?com.Notes[0].Note[0].$.Timestamp:null,
                    "CreationDateTime":moment_lib(value.$.CreationDateTime, `${integrationParameters.dateFormat} hh:mm A`).toDate(),
                }
            })
        })
        dataStore.save('work_time',syncWorktimeData)
    }
}

function isDateFormatValid(dateFormat){
    let validFormats = new Set(['YYYY/MM/DD', 'MM/DD/YYYY', 'YYYY-MM-DD', 'MM-DD-YYYY', 'M/DD/YYYY', 'DD-MM-YYYY'])
    if(!validFormats.has(dateFormat.toUpperCase())){
        throw new Error(`Date Format [${dateFormat}] is not supported , choose any of the supported formats [${[...validFormats].toString()}] `)
    }
    return dateFormat.toUpperCase()
}

async function incrementalSync({ dataStore, client,latestSynchronizationTime, integrationParameters}){
    integrationParameters.dateFormat = isDateFormatValid(integrationParameters.dateFormat)
    const session = await logIn(client, integrationParameters.username , integrationParameters.password);
    const people = await syncPeople(dataStore, client, session,integrationParameters);
    await incsyncRequestTimeOff(dataStore, client, session, people,latestSynchronizationTime,integrationParameters);
    await incsyncworkTime(dataStore, client, session, people,latestSynchronizationTime,integrationParameters);
}
async function fullSync({ dataStore, client, integrationParameters}) {
    integrationParameters.dateFormat = isDateFormatValid(integrationParameters.dateFormat)
    const session = await logIn(client, integrationParameters.username , integrationParameters.password);
    const people = await syncPeople(dataStore, client, session,integrationParameters);
    await syncPeopleDetials(dataStore, client, session, people);
    await syncAccrualBalance(dataStore, client, session, people,integrationParameters);
    await syncRecordTimestamp(dataStore, client, session, people,integrationParameters);    
    await syncRequestTimeOff(dataStore, client, session, people,integrationParameters);
    await syncworkTime(dataStore, client, session, people,integrationParameters);
}

integration.define({
    "synchronizations": [
        {
            "name": "timesheets", // Logical name
            "fullSyncFunction": fullSync,
            incrementalSyncFunction:incrementalSync
        }
    ],
    integrationParameters:[
        {name:"username",type:"STRING", label:"Kronos Username",required:true},
        {name:"password",type:"STRING", label:"Kronos Password",secret:true,required:true},
        {name:"dateFormat",type:"STRING", label:"Kronos Date Format", description:`Supported Date Formats :'YYYY/MM/DD', 'MM/DD/YYYY', 'YYYY-MM-DD', 'MM-DD-YYYY', 'M/DD/YYYY', 'DD-MM-YYYY'.
        Make sure the date format you enter in this field is configured in Kronos setup as well.`,required:true}
    ],
    "model": {
        "relationships": [
            {
                "name": 'get_dynamic_tabel',
                "primaryTable": 'accrualBalances',
                "foreignTable": 'accrualbalanceserviceaction',
                "columnPairs": [
                    { "primaryKey": 'personalNumber', "foreignKey": 'personalNumber' }
                ]
            },
            {
                "name": 'AccBalanceToPeople',
                "primaryTable": 'accrualBalances',
                "foreignTable": 'personalDetails',
                "columnPairs": [
                    { "primaryKey": 'personalNumber', "foreignKey": 'personNumber' }
                ]
            },
            {
                "name": 'fk_personalde_personnumbe',
                "primaryTable": 'accrualbalanceserviceaction',
                "foreignTable": 'personalDetails',
                "columnPairs": [
                    { "primaryKey": 'personalNumber', "foreignKey": 'personNumber' }
                ]
            },
            {
                "name": 'PeopletoAccBalance',
                "primaryTable": 'personalDetails',
                "foreignTable": 'accrualBalances',
                "columnPairs": [
                    { "primaryKey": 'personNumber', "foreignKey": 'personalNumber' }
                ]
            },
            {
                "name": 'RecordTimeStampToPerson',
                "primaryTable": 'record_time_stamp',
                "foreignTable": 'personalDetails',
                "columnPairs": [
                    { "primaryKey": 'employee_person_identity_person_number', "foreignKey": 'personNumber' }
                ]
            },
            {
                "name": 'TimeOffToPerson',
                "primaryTable": 'timeOff',
                "foreignTable": 'personalDetails',
                "columnPairs": [
                    { "primaryKey": 'personNumber', "foreignKey": 'personNumber' }
                ]
            },
            {
                "name": 'WorkTimeToPerson',
                "primaryTable": 'work_time',
                "foreignTable": 'personalDetails',
                "columnPairs": [
                    { "primaryKey": 'personNumber', "foreignKey": 'personNumber' }
                ]
            },
        ],
        "tables": [
            {
                "name": "record_time_stamp",
                "columns": [
                    { "name": "date", "type": "DATE", "primaryKey": true },
                    { "name": "employee_person_identity_person_number", "type": "STRING", "length": 255, "primaryKey": true },
                    { "name": "in_punch_punch_date", "type": "DATE" },
                    { "name": "in_punch_punch_entered_on_date", "type": "DATE" },
                    { "name": "in_punch_punch_entered_on_time", "type": "STRING" },
                    { "name": "in_punch_punch_entered_kronos_time_zone", "type": "STRING", length: 255 },
                    { "name": "in_punch_punch_time", "type": "STRING" },
                    { "name": "out_punch_punch_date", "type": "DATE" },
                    { "name": "out_punch_punch_entered_on_date", "type": "DATE" },
                    { "name": "out_punch_punch_entered_on_time", "type": "STRING" },
                    { "name": "out_punch_punch_entered_kronos_time_zone", "type": "STRING", length: 255 },
                    { "name": "out_punch_punch_time", "type": "STRING" },
                    { "name": "labor_account_id", "type": "INTEGER" },
                    { "name": "labor_account_name", "type": "STRING", "length": 255 },
                    { "name": "org_job_id", "type": "INTEGER" },
                    { "name": "org_job_name", "type": "STRING", "length": 255 },
                    { "name": "unique_key", "type": "STRING", "length": 255 ,primaryKey:true},

                ]
            },
            {
                "name": "people",
                "columns": [
                    { "name": "fullName", "type": "STRING", "length": 255 },
                    { "name": "personNumber", "type": "STRING", "length": 255, "primaryKey": true }
                ]
            },
            {
                "name": "personalDetails",
                "columns": [
                    { "name": "personNumber", "type": "STRING", "length": 255, "primaryKey": true },
                    { "name": "firstName", "type": "STRING", "length": 255 },
                    { "name": "lastName", "type": "STRING", "length": 255 },
                    { "name": "fullName", "type": "STRING", "length": 255 },
                    { "name": "email", "type": "STRING", "length": 255 },
                    {name : "supervisorName", type:"STRING", "length": 255},
                    {name : "supervisorPersonNumber", type:"STRING", "length": 255},
                    {name : "supervisorEmail", type:"STRING", "length": 255}
                ]
            },
            {
                "name": "accrualbalanceserviceaction",
                "columns": [
                    { "name": "accrualCodeId", "type": "STRING", "length": 255, "primaryKey": true },
                    { "name": "accrualCodeName", "type": "STRING", "length": 255 },
                    { "name": "accrualType", "type": "STRING", "length": 255 },
                    { "name": "encumberedBalanceInTime", "type": "DOUBLE"},
                    { "name": "hoursPerDay", "type": "STRING", "length": 255 },
                    { "name": "projectedVestedBalanceInTime", "type": "STRING", "length": 255 },
                    { "name": "projectedDate", "type": "DATE"},
                    { "name": "projectedGrantAmountInTime", "type": "STRING", "length": 255 },
                    { "name": "projectedTakingAmountInTime", "type": "STRING", "length": 255 },
                    { "name": "vestedBalanceInTime", "type": "STRING", "length": 255 },
                    { "name": "personalNumber", "type": "STRING", "length": 255, "primaryKey": true }
                ]
            },
            {
                "name": "accrualBalances",
                "columns": [
                    { "name": "accrualCodeId", "type": "STRING", "length": 255, "primaryKey": true },
                    { "name": "accrualCodeName", "type": "STRING", "length": 255 },
                    { "name": "accrualType", "type": "STRING", "length": 255 },
                    { "name": "encumberedBalanceInTime", "type": "DOUBLE"},
                    { "name": "hoursPerDay", "type": "STRING", "length": 255 },
                    { "name": "projectedVestedBalanceInTime", "type": "STRING", "length": 255 },
                    { "name": "projectedDate", "type": "DATE"},
                    { "name": "projectedGrantAmountInTime", "type": "STRING", "length": 255 },
                    { "name": "projectedTakingAmountInTime", "type": "STRING", "length": 255 },
                    { "name": "vestedBalanceInTime", "type": "STRING", "length": 255 },
                    { "name": "personalNumber", "type": "STRING", "length": 255, "primaryKey": true }
                ]
            },
            {
                "name": "timeOff",
                "columns": [
                    {name: "id", type: "STRING", length: 255, primaryKey: true },
                    {name: "statusName", type: "STRING", length: 255 },
                    {name: "requestFor", type: "STRING", length: 255 },
                    {name: "startDate", type: "DATE" },
                    {name: "length", type: "DOUBLE"},
                    {name: "startTime", type: "STRING", length: 255 },
                    {name: "duration", type: "STRING", length: 255 },
                    {name: "endDate", type: "DATE" },
                    {name: "payCodeName", type: "STRING", length: 255 },
                    {name: "personNumber", type: "STRING", length: 255, primaryKey: true },
                    {name:"CommentDataSourceClientName", type:"STRING", length:255},
                    {name:"CommentDataSourceFunctionalAreaCode", type:"INTEGER"},
                    {name:"CommentDataSourceFunctionalAreaName", type:"STRING", length:255},
                    {name:"CommentDataSourceServerName", type:"STRING", length:255},
                    {name:"CommentDataSourceText", type:"STRING", length:255},
                    {name:"CommentDataSourceUserName", type:"STRING", length:255},
                    {name:"CommentNotesText", type:"STRING", length:255},
                    {name:"CommentNotesTimestamp", type:"STRING", length:255},
                    {name:"CreationDateTime", type:"DATETIME"},
                ]
            },
            {
                name:"work_time",
                columns:[
                    {name:"endDate", type:"DATE"},
                    {name:"endTime", type:"STRING", length:255},
                    {name:"startDate", type:"DATE"},
                    {name:"startTime", type:"STRING", length:255},
                    {name:"personNumber", type:"STRING", length:255},
                    {name:"Length", type:"STRING", length:255},
                    {name:"requestId", type:"STRING", length:255,primaryKey:true},
                    {name:"CommentText", type:"STRING", length:255},
                    {name:"CommentDataSourceClientName", type:"STRING", length:255},
                    {name:"CommentDataSourceFunctionalAreaCode", type:"INTEGER"},
                    {name:"CommentDataSourceFunctionalAreaName", type:"STRING", length:255},
                    {name:"CommentDataSourceServerName", type:"STRING", length:255},
                    {name:"CommentDataSourceUserName", type:"STRING", length:255},
                    {name:"CommentNotesText", type:"STRING", length:255},
                    {name:"CommentNotesTimestamp", type:"STRING", length:255},
                    {name:"StatusName", type:"STRING", length:255},
                    {name:"CreationDateTime", type:"DATETIME"},
                ]
            }
        ]
    },
    actions:[
        {
            "name": "accrualBalanceServiceAction",
            "parameters": [
                { "name": "personNumber", "type": "STRING", "required": true },
                { "name": "date", "type": "STRING", "required": true }
            ],
            "function": updateAccrualBalance
        },
        {
            name:"submitTimeOff",
            parameters:[
                {name:"comment", type:"STRING"},
                {name:"personNumber", type:"STRING"},
                {name:"duration", type:"STRING"},
                {name:"endDate", type:"STRING"},
                {name:"startDate", type:"STRING"},
                {name:"PayCodeName", type:"STRING"},
                {name:"startTime", type:"STRING"},
                {name:"length", type:"STRING"},
            ],
            function : requestTimeOff
        },
        {
            name:"approveTimeOff",
            parameters:[
                {name:"comment", type:"STRING"},
                {name:"personNumber", type:"STRING"},
                {name:"userText", type:"STRING"},
                {name:"requestId", type:"STRING"},
            ],
            function : approveTimeOff
        },
        {
            name:"denyTimeOff",
            parameters:[
                {name:"comment", type:"STRING"},
                {name:"personNumber", type:"STRING"},
                {name:"userText", type:"STRING"},
                {name:"requestId", type:"STRING"},
            ],
            function : denyTimeOff
        },
        {
            name:"recordtimestamp",
            parameters:[
                {name:"personNumber", type:"STRING"},
                {name:"time", type:"STRING"},
                {name:"date", type:"STRING"}
            ],
            function : recordTimestamp
        },
        {
            name:"approveTimeLog",
            parameters:[
                {name:"comment", type:"STRING"},
                {name:"personNumber", type:"STRING"},
                {name:"userText", type:"STRING"},
                {name:"requestId", type:"STRING"},
            ],
            function : approveTimelog
        },
        {
            name:"sentBackTimeLog",
            parameters:[
                {name:"comment", type:"STRING"},
                {name:"personNumber", type:"STRING"},
                {name:"userText", type:"STRING"},
                {name:"requestId", type:"STRING"},
            ],
            function : sentBackTimelog
        },
    ]
});

async function updateAccrualBalance({ actionParameters, client, dataStore,integrationParameters}) {
    integrationParameters.dateFormat = isDateFormatValid(integrationParameters.dateFormat)
    const date = actionParameters.date;
    const number = actionParameters.personNumber;
    let accrualBalance = [];
    const session = await logIn(client, integrationParameters.username , integrationParameters.password);
    let response = await client.fetch('/wfc/XmlService', {
        method: "POST",
        headers: {
            "Content-Type": "application/xml",
            Cookie: session
        },
        body: `<?xml version='1.0' encoding='UTF-8' ?>
        <Kronos_WFC version="1.0">
            <Request Action="Load">
                <AccrualData>
                    <BalanceDate>${moment_lib(date).format(integrationParameters.dateFormat)}</BalanceDate>
                    <Employee>
                        <PersonIdentity personNumber="${number}"/>
                    </Employee>
                </AccrualData>
            </Request>
        </Kronos_WFC>`
    });
    const data = await response.text();
    parser.parseString(data, function (err, result) {
        if(err != null){
            throw new Error(JSON.stringify(err));
        }
        else if(result.Kronos_WFC.Response[0].$.Status == 'Failure'){
            throw new Error(result.Kronos_WFC.Response[0].Error[0].DetailError[0].Error[0].$.Message)
        }
        dt = result.Kronos_WFC.Response[0].AccrualData[0].AccrualBalances[0].AccrualBalanceSummary ? result.Kronos_WFC.Response[0].AccrualData[0].AccrualBalances[0].AccrualBalanceSummary : [];
        dt.forEach(k => {
            accrualBalance.push({
            "accrualCodeId": k.$.AccrualCodeId,
            "accrualCodeName": k.$.AccrualCodeName,
            "accrualType": k.$.AccrualType,
            "encumberedBalanceInTime": Number(k.$.EncumberedBalanceInTime),
            "hoursPerDay": k.$.HoursPerDay,
            "projectedVestedBalanceInTime": k.$.ProjectedVestedBalanceInTime,
            "projectedDate": moment_lib(actionParameters.date).format('yyyy-MM-DD'),
            "projectedGrantAmountInTime": k.$.ProjectedGrantAmountInTime,
            "projectedTakingAmountInTime": k.$.ProjectedTakingAmountInTime,
            "vestedBalanceInTime": k.$.VestedBalanceInTime,
            "personalNumber": number,
            })
        })
    });
    dataStore.save('accrualbalanceserviceaction', JSON.stringify(accrualBalance));
}


async function requestTimeOff({actionParameters,client,dataStore,integrationParameters}){
    integrationParameters.dateFormat = isDateFormatValid(integrationParameters.dateFormat)
    const session = await logIn(client, integrationParameters.username , integrationParameters.password);
   const draftResult = await drafttimeoff(actionParameters,client,session,integrationParameters.dateFormat)
   if(draftResult.status == 200){
    const submittedResult = await submitimeoff(actionParameters,client,session,draftResult.requestId,integrationParameters.dateFormat)
    if(submittedResult.status == 200)
        await syncRequestTimeOff(dataStore,client,session,[{personNumber:actionParameters.personNumber}],integrationParameters)
    else{
        throw new Error(JSON.stringify(submittedResult.error))
    }
   }else{
       throw new Error(draftResult.error);
   }
}

async function drafttimeoff(actionParameters,client,session,dateFormat){
    const month = moment_lib().format('M')
    const start = moment_lib().month(month-1).startOf('month').format(dateFormat)
    const end = moment_lib().month(month).endOf('month').format(dateFormat)
    let reqBody;
    let requestId;
    let error = null;
    let status = 200;
    let commentBody = actionParameters.comment != undefined ? 
    `<Comments>
    <Comment CommentText="Need Off">
        <Notes>
            <Note Text="${actionParameters.comment}">
            </Note>
        </Notes>
    </Comment>
</Comments>` : '';
    if(actionParameters.duration === "full_day"){
        reqBody = `<?xml version="1.0" ?>
        <Kronos_WFC version="1.0">
            <Request Action="AddRequests">
                <EmployeeRequestMgmt
                    QueryDateSpan = "${start} - ${end}">
                    <Employee>
                        <PersonIdentity PersonNumber="${actionParameters.personNumber}"/>
                    </Employee>
                    <RequestItems>
                        <EmployeeGlobalTimeOffRequestItem RequestFor = "Time Off">
                            <TimeOffPeriods>
                                <TimeOffPeriod Duration = "${actionParameters.duration}"
                             EndDate = "${moment_lib(actionParameters.endDate).format(dateFormat)}"
                             StartDate = "${moment_lib(actionParameters.startDate).format(dateFormat)}"
                             PayCodeName="${actionParameters.PayCodeName}"
                            ></TimeOffPeriod>
                            </TimeOffPeriods>
                            ${commentBody}
                        </EmployeeGlobalTimeOffRequestItem>
                    </RequestItems>
                </EmployeeRequestMgmt>
            </Request>
        </Kronos_WFC>`
    }
    else {
        reqBody = `<?xml version="1.0" ?>
        <Kronos_WFC version="1.0">
            <Request Action="AddRequests">
                <EmployeeRequestMgmt
                    QueryDateSpan = "${start} - ${end}">
                    <Employee>
                        <PersonIdentity PersonNumber="${actionParameters.personNumber}"/>
                    </Employee>
                    <RequestItems>
                        <EmployeeGlobalTimeOffRequestItem RequestFor = "Time Off">
                            <TimeOffPeriods>
                                <TimeOffPeriod Duration = "${actionParameters.duration}"
                             EndDate = "${moment_lib(actionParameters.endDate).format(dateFormat)}"
                             StartDate = "${moment_lib(actionParameters.startDate).format(dateFormat)}"
                             PayCodeName="${actionParameters.PayCodeName}" StartTime="${actionParameters.startTime}" Length="${actionParameters.length}"
                            ></TimeOffPeriod>
                            </TimeOffPeriods>
                            ${commentBody}
                        </EmployeeGlobalTimeOffRequestItem>
                    </RequestItems>
                </EmployeeRequestMgmt>
            </Request>
        </Kronos_WFC>`
    }
    let draftrequest = await client.fetch('/wfc/XmlService', {
        method: "POST",
        headers: {
            "Content-Type": "application/xml",
            Cookie: session
        },
        body: reqBody
    })

    let draftresponse = await draftrequest.text();
    parser.parseString(draftresponse, (err, draftresult) => {
        if (err != null) {
            error = err;
            status = 400
        }
        else if(draftresult.Kronos_WFC.Response[0].$.Status == 'Failure'){
            error = draftresult.Kronos_WFC.Response[0].Error != undefined ? draftresult.Kronos_WFC.Response[0].Error[0].DetailErrors[0].Error[0].$.Message:null
            
            error = error == null ? draftresult.Kronos_WFC.Response[0].$.Message : error
            status = 400
        }else{
            requestId = draftresult.Kronos_WFC.Response[0].EmployeeRequestMgmt[0].RequestItems[0].EmployeeGlobalTimeOffRequestItem[0].$.Id;
        }
    })
    return {status:status,requestId:requestId,error:error};
}

async function submitimeoff(actionParameters,client,session,requestId,dateFormat){
    let status = 200;
    let error = null
    const month = moment_lib().format('M')
    const start = moment_lib().month(month-1).startOf('month').format(dateFormat)
    const end = moment_lib().month(month).endOf('month').format(dateFormat)
    let response = await client.fetch('/wfc/XmlService', {
        method: "POST",
        headers: {
            "Content-Type": "application/xml",
            Cookie: session
        },
        body: `<?xml version="1.0" ?>
        <Kronos_WFC version="1.0">
            <Request Action="SubmitRequests">
                <EmployeeRequestMgmt QueryDateSpan = "${start} - ${end}">
                    <Employee>
                        <PersonIdentity PersonNumber="${actionParameters.personNumber}"/>
                    </Employee>
                    <RequestIds>
                        <RequestId Id = "${requestId}"></RequestId>
                    </RequestIds>
                </EmployeeRequestMgmt>
            </Request>
        </Kronos_WFC>`
    })

    const data = await response.text();
    parser.parseString(data,async (err, result) => {
        if (err != null) {
            status=400
            error = err;
        }
        if(result.Kronos_WFC.Response[0].$.Status == 'Failure'){
            status=400
            error = result.Kronos_WFC.Response[0].Error[0].DetailErrors[0].Error[0].$.Message
        }
    })
    return {status:status,error:error};
}

async function denyTimeOff({actionParameters,client,dataStore,integrationParameters}){
    integrationParameters.dateFormat = isDateFormatValid(integrationParameters.dateFormat)
    const session = await logIn(client, integrationParameters.username , integrationParameters.password);
    const result = await denyTO(actionParameters,client,session,integrationParameters.dateFormat);
    if(result.status == 200){
        await syncRequestTimeOff(dataStore,client,session,[{personNumber:actionParameters.personNumber}],integrationParameters)
    }else{
        throw new Error(result.error)
    }
}

async function denyTO(actionParameters,client,session,dateFormat){
    const month = moment_lib().format('M')
    const start = moment_lib().month(month-1).startOf('month').format(dateFormat)
    const end = moment_lib().month(month).endOf('month').format(dateFormat)
    let status = 200
    let error = null
    const response = await client.fetch('/wfc/XmlService', {
        method: "POST",
        headers: {
            "Content-Type": "application/xml",
            Cookie: session
        },
        body: `<?xml version="1.0" ?>
        <Kronos_WFC version="1.0">
            <Request Action="UpdateStatus">
                <RequestMgmt QueryDateSpan = "${start} - ${end}">
                    <Employees>
                        <PersonIdentity PersonNumber="${actionParameters.personNumber}"/>
                    </Employees>
                    <RequestIds>
                        <RequestId Id= "${actionParameters.requestId}"></RequestId>
                    </RequestIds>
                    <RequestStatusChanges>
                        <RequestStatusChange RequestId = "${actionParameters.requestId}" ToStatusName="REFUSED">
                            <comments>
                                <comment CommentText = "Need Off">
                                    <Notes>
                                        <Note Text = "${actionParameters.userText ?? ""} ${actionParameters.comment}"></Note>
                                    </Notes>
                                </comment>
                            </comments>
                        </RequestStatusChange>
                    </RequestStatusChanges>
                </RequestMgmt>
            </Request>
        </Kronos_WFC>`
    })

    const data = await response.text();
    parser.parseString(data, (err, result) => {
        if (err != null) {
            status = 400
            error = err;
        }
        if(result.Kronos_WFC.Response[0].$.Status != 'Success'){
            status = 400
            error = result.Kronos_WFC.Response[0].Error[0].DetailError[0].Error[0].$.Message
        }
    })
    return {status:status,error:error}
}

async function approveTimeOff({actionParameters,client,dataStore,integrationParameters}){
    integrationParameters.dateFormat = isDateFormatValid(integrationParameters.dateFormat)
    const session = await logIn(client, integrationParameters.username , integrationParameters.password);
    const result = await approveTO(actionParameters,client,session,integrationParameters.dateFormat);
    if(result.status == 200){
        await syncRequestTimeOff(dataStore,client,session,[{personNumber:actionParameters.personNumber}],integrationParameters)
    }else{
        throw new Error(result.error)
    }
}

async function approveTO(actionParameters,client,session,dateFormat){
    const month = moment_lib().format('M')
    const start = moment_lib().month(month-1).startOf('month').format(dateFormat)
    const end = moment_lib().month(month).endOf('month').format(dateFormat)
    let status = 200;
    let error = null;
    const response = await client.fetch('/wfc/XmlService', {
        method: "POST",
        headers: {
            "Content-Type": "application/xml",
            Cookie: session
        },
        body: `<?xml version="1.0" ?>
        <Kronos_WFC version="1.0">
            <Request Action="UpdateStatus">
                <RequestMgmt QueryDateSpan = "${start} - ${end}">
                    <Employees>
                        <PersonIdentity PersonNumber="${actionParameters.personNumber}"/>
                    </Employees>
                    <RequestIds>
                        <RequestId Id= "${actionParameters.requestId}"></RequestId>
                    </RequestIds>
                    <RequestStatusChanges >
                        <RequestStatusChange RequestId = "${actionParameters.requestId}" ToStatusName="APPROVED">
                            <comments>
                                <comment CommentText = "Need Off">
                                    <Notes>
                                        <Note Text = "${actionParameters.userText ?? ""} ${actionParameters.comment}"></Note>
                                    </Notes>
                                </comment>
                            </comments>
                        </RequestStatusChange>
                    </RequestStatusChanges>
                </RequestMgmt>
            </Request>
        </Kronos_WFC>`
    })

    const data = await response.text();
    parser.parseString(data, (err, result) => {
        if (err != null) {
            status = 400
            error = err;
        }
        if(result.Kronos_WFC.Response[0].$.Status == 'Failure'){
            status = 400
            error = result.Kronos_WFC.Response[0].Error[0].DetailErrors[0].Error[0].$.Message
        }
    })
    return {status:status,error:error}
}

//Punch-in Punch-out
async function recordTimestamp({actionParameters,client,dataStore,integrationParameters}){
    integrationParameters.dateFormat = isDateFormatValid(integrationParameters.dateFormat)
    const session = await logIn(client, integrationParameters.username , integrationParameters.password);
    const result  = await timestamp(actionParameters,client,session,integrationParameters.dateFormat);
    if(result.status == 200){
        await syncRecordTimestamp(dataStore,client,session,[{personNumber:actionParameters.personNumber}],integrationParameters)
    }else{
        throw new Error(result.error)
    }
}

async function timestamp(actionParameters,client,session,dateFormat){
    let status = 200;
    let error = null ;
    let response = await client.fetch('/wfc/XmlService', {
        method: "POST",
        headers: {
            "Content-Type": "application/xml",
            Cookie: session
        },
        body: `<?xml version="1.0"?>
        <Kronos_WFC version="1.0">
        <Request Action="AddOnly">
            <Punch Date="${moment_lib(actionParameters.date).format(dateFormat)}" Time ="${actionParameters.time}">
            <Employee>
                <PersonIdentity PersonNumber="${actionParameters.personNumber}"/>
            </Employee>
            </Punch>
        </Request>
        </Kronos_WFC>`
    })

    const data = await response.text();
    parser.parseString(data, (err, result) => {
        if (err != null) {
            status=400;
            error =  err;
        }
        if(result.Kronos_WFC.Response[0].$.Status != "Success"){
            status=400;
            error = result.Kronos_WFC.Response[0].Error[0].$.Message
        }
    })
    return {status:status,error:error}
}

async function approveTimelog({actionParameters,client,dataStore,integrationParameters}){
    integrationParameters.dateFormat = isDateFormatValid(integrationParameters.dateFormat)
    const session = await logIn(client, integrationParameters.username , integrationParameters.password);
    let result = await approveTL(actionParameters,client,session,integrationParameters.dateFormat);
    if(result.status = 200){
        await syncworkTime(dataStore,client,session,[{personNumber:actionParameters.personNumber}],integrationParameters)
    }else{
        throw new Error(result.error)
    }
}

async function approveTL(actionParameters,client,session,dateFormat){
    const month = moment_lib().format('M')
    const start = moment_lib().month(month-1).startOf('month').format(dateFormat)
    const end = moment_lib().month(month).endOf('month').format(dateFormat)
    let status = 200
    let error = null
    const response = await client.fetch('/wfc/XmlService', {
        method: "POST",
        headers: {
            "Content-Type": "application/xml",
            Cookie: session
        },
        body: `<?xml version="1.0" ?>
        <Kronos_WFC version="1.0">
            <Request Action="UpdateStatus">
                <RequestMgmt QueryDateSpan = "${start} - ${end}">
                    <Employees>
                        <PersonIdentity PersonNumber="${actionParameters.personNumber}"/>
                    </Employees>
                    <RequestIds>
                        <RequestId Id= "${actionParameters.requestId}"></RequestId>
                    </RequestIds>
                    <RequestStatusChanges>
                        <RequestStatusChange RequestId = "${actionParameters.requestId}" ToStatusName="APPROVED">
                            <comments>
                                <comment CommentText = "Need Off">
                                    <Notes>
                                        <Note Text = "${actionParameters.userText ?? ""} ${actionParameters.comment}"></Note>
                                    </Notes>
                                </comment>
                            </comments>
                        </RequestStatusChange>
                    </RequestStatusChanges>
                </RequestMgmt>
            </Request>
        </Kronos_WFC>`
    })
    const data = await response.text();
    parser.parseString(data, (err,result)=>{
        if(err != null){
            status = 400
            error = err
        }
        if(result.Kronos_WFC.Response[0].$.Status != "Success"){
            status = 400
            error = result.Kronos_WFC.Response[0].Error[0].DetailErrors[0].Error[0].$.Message
        }        
    })
    return {status:status,error:error};
}

async function sentBackTimelog({actionParameters,client,dataStore,integrationParameters}){
    integrationParameters.dateFormat = isDateFormatValid(integrationParameters.dateFormat)
    const session = await logIn(client, integrationParameters.username , integrationParameters.password);
    const result = await sentBackTL(actionParameters,client,session,integrationParameters.dateFormat);
    if(result.status == 200){
        await syncworkTime(dataStore,client,session,[{personNumber:actionParameters.personNumber}],integrationParameters)
    }else{
        throw new Error(result.error)
    }
}

async function sentBackTL(actionParameters,client,session,dateFormat){
    const month = moment_lib().format('M')
    const start = moment_lib().month(month-1).startOf('month').format(dateFormat)
    const end = moment_lib().month(month).endOf('month').format(dateFormat)
    let status = 200
    let error = null
    const response = await client.fetch('/wfc/XmlService', {
        method: "POST",
        headers: {
            "Content-Type": "application/xml",
            Cookie: session
        },
        body: `<?xml version="1.0" ?>
        <Kronos_WFC version="1.0">
            <Request Action="UpdateStatus">
                <RequestMgmt QueryDateSpan = "${start} - ${end}">
                    <Employees>
                        <PersonIdentity PersonNumber="${actionParameters.personNumber}"/>
                    </Employees>
                    <RequestIds>
                        <RequestId Id= "${actionParameters.requestId}"></RequestId>
                    </RequestIds>
                    <RequestStatusChanges>
                        <RequestStatusChange RequestId = "${actionParameters.requestId}" ToStatusName="REFUSED">
                            <comments>
                                <comment CommentText = "Need Off">
                                    <Notes>
                                        <Note Text = "${actionParameters.userText ?? ""} ${actionParameters.comment}"></Note>
                                    </Notes>
                                </comment>
                            </comments>
                        </RequestStatusChange>
                    </RequestStatusChanges>
                </RequestMgmt>
            </Request>
        </Kronos_WFC>`
    })
    const data = await response.text();
    parser.parseString(data, (err,result)=>{
        if(err != null){
            status = 400
            error = err
        }
        if(result.Kronos_WFC.Response[0].$.Status != "Success"){
            error = result.Kronos_WFC.Response[0].Error[0].DetailErrors[0].Error[0].$.Message
        }
    })
    return {status:status,error:error};
}