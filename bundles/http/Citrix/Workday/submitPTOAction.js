const parser = library.load("xml2js")
const jp = library.load("jsonpath-plus")
const moment = library.load("moment-timezone");

function authenticationHeaders(params) {
    console.log(`Authenticating with ${JSON.stringify(params)}`);

    return '<wsse:Security soapenv:mustUnderstand="1" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">\n' +
        `         <wsse:UsernameToken wsu:Id="bogus">\n` +
        `            <wsse:Username>${params.username}@${params.tenant}</wsse:Username>\n` +
        `            <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">${params.password}</wsse:Password>\n` +
        `            <wsse:Nonce EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary">bogus</wsse:Nonce>\n` +
        `         </wsse:UsernameToken>\n` +
        `      </wsse:Security>`;
}

async function parseAndCheckResponse(response, operationName) {
    const responseBody = await response.text();
    const responseXml = await parser.parseStringPromise(responseBody);
    console.log(JSON.stringify(await responseXml, null, 2));
    const fail = jp.JSONPath('SOAP-ENV:Envelope.SOAP-ENV:Body[0].SOAP-ENV:Fault[0].faultstring[0]', responseXml)
    if (fail && fail.length !== 0) {
        console.log(operationName + ' failed with response: ' + responseBody)
        throw new Error(fail);
    }
    return responseXml;
}

async function submitPto({serviceClient, actionParameters, integrationParameters}) {
    const authHeader = authenticationHeaders(integrationParameters);

    const request = requestBody(authHeader, actionParameters);
    console.log("Submitting 'Time Off Request'")

    let response = await serviceClient.fetch(`/ccx/service/${integrationParameters.tenant}/Absence_Management/v32.2`, {
        method: "POST",
        headers: {
            "Content-Type": "application/xml"
        },
        body: request
    });

//    console.log(`Request: ${request}`)
    return parseAndCheckResponse(response, "Enter_Time_Off_Request");
}

function requestBody(authHeader, actionParameters) {
    let timeOffDataEntries = getTimeOffDataEntries(actionParameters)

    return `<soapenv:Envelope xmlns:bsvc="urn:com.workday/bsvc" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
       <soapenv:Header>
         ${authHeader}
       </soapenv:Header>
       <soapenv:Body>
          <bsvc:Enter_Time_Off_Request bsvc:version="v32.2">
             <bsvc:Business_Process_Parameters>
                <bsvc:Auto_Complete>false</bsvc:Auto_Complete>
                <bsvc:Run_Now>true</bsvc:Run_Now>
                <bsvc:Comment_Data>
                   <bsvc:Comment>Time off request submitted by Workday MicroApp from Workspace</bsvc:Comment>
                </bsvc:Comment_Data>
             </bsvc:Business_Process_Parameters>
             <bsvc:Enter_Time_Off_Data>
                <bsvc:Run_Time_Off_Validations>true</bsvc:Run_Time_Off_Validations>
                <bsvc:Worker_Reference>
                   <bsvc:ID bsvc:type="WID">${actionParameters.workerWid}</bsvc:ID>
                </bsvc:Worker_Reference>
                ${timeOffDataEntries}
             </bsvc:Enter_Time_Off_Data>
          </bsvc:Enter_Time_Off_Request>
       </soapenv:Body>
    </soapenv:Envelope>`
}

function getTimeOffDataEntries(actionParameters) {
    return getDatesInInterval(actionParameters.fromDate, actionParameters.toDate).map(date => {
        console.log(`Creating entry for date ${date}`)

        return `<bsvc:Enter_Time_Off_Entry_Data>
                   <bsvc:Date>${date}</bsvc:Date>
                   <bsvc:Requested>${actionParameters.quantity}</bsvc:Requested>
                   <bsvc:Time_Off_Type_Reference>
                      <bsvc:ID bsvc:type="WID">${actionParameters.timeOffTypeWid}</bsvc:ID>
                   </bsvc:Time_Off_Type_Reference>
                   <bsvc:Comment>${actionParameters.comment}</bsvc:Comment>
                </bsvc:Enter_Time_Off_Entry_Data>`
    }).join('\n');
}

function getDatesInInterval(fromDate, toDate) {
    const fromMoment = moment(fromDate);
    const toMoment = moment(toDate)
    if (fromMoment.isAfter(toMoment)) {
        throw new Error(`Invalid date range ${fromDate} - ${toDate}"`)
    }

    let interval = toMoment.diff(fromMoment, 'days') + 1;

    console.log(`Calculating dates in interval ${interval}`)

    return [...Array(interval).keys()].map(i => moment(fromMoment.add(i, 'days'))).map(moment => moment.toISOString());
}

function doNothing({client}) {

}

integration.define({
    "actions": [
        {
            "name": "Submit a time off request",
            "function": submitPto,
            "parameters": [
                {
                    name: 'workerWid',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'timeOffTypeWid',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'quantity',
                    type: 'INTEGER',
                    required: true
                },
                {
                    name: 'fromDate',
                    type: 'DATE',
                    required: true
                },
                {
                    name: 'toDate',
                    type: 'DATE',
                    required: true
                },
                {
                    name: 'comment',
                    type: 'STRING',
                }
            ]
        }
    ],
    "integrationParameters": [
        {
            name: 'username',
            type: 'STRING',
            label: 'Workday username',
            required: true
        },
        {
            name: 'password',
            type: 'STRING',
            label: 'Workday password',
            required: true,
            secret: true
        },
        {
            name: 'tenant',
            type: 'STRING',
            label: 'Workday tenant',
            required: true
        }
    ],
    "model": {
        "tables": [
            {
                "name": "tickets",
                "columns": [
                    {"name": "id", "type": "INTEGER", "primaryKey": true},
                ]
            }
        ]
    },
    "synchronizations": [
        {
            "name": "placeholder", // Logical name
            "fullSyncFunction": doNothing,
        },
    ]
});
