//Loaded moment-timezone library from sdk provided libraries 
const moment = library.load('moment-timezone');
const uuid = library.load('uuid');

// loading the users data(Done)
async function syncUsers(dataStore, client, context) {
    const page_size = 100
    let next_page_token = ""
    let userids = [];
    do {
        const response = await client.fetch(`/users?next_page_token=${next_page_token}&page_size=${page_size}`);
        let json = await response.json();
        if (!response.ok) {
            throw new Error(json);
        }
        next_page_token = json.next_page_token ?? "";
        const data = json.users
        let usersData = data.map(userData => {
            userids.push({userid:userData.id});
            let userObj = {
                "userid": userData.id,
                "first_name": userData.first_name,
                "last_name": userData.last_name,
                "email": userData.email,
                "timezone": userData.timezone,
                "last_login_time": new Date(userData.last_login_time)
            }
            return userObj;
        })
        dataStore.save("users", usersData);
    } while (next_page_token != "");
    context.user = userids;
    return userids;
}

//loading the meetings data (Upcoming Meetings)(Done)
async function syncMeetings(dataStore, client, users) {
    let i = 0;
    let next_page_token="";
    const page_size=200;
    let meetingids = new Set();
    do {
        const response = await client.fetch(`users/${users[i].userid}/meetings?type=upcoming&next_page_token=${next_page_token}&page_size=${page_size}`);
        const json = await response.json();
        if (!(response.ok)) {
            throw new Error(json);
        }
        next_page_token = json.next_page_token ?? "";
        const data = json.meetings;
        let meetingdata = data.map(meeting => {
            if(!meetingids.has(meeting.id)){
                meetingids.add(meeting.id)
            }
            return {
                "uuid": meeting.uuid,
                "id": meeting.id,
                "host_id": meeting.host_id,
                "topic": meeting.topic,
                "type": meeting.type,
                "start_time": new Date(meeting.start_time),
                "duration": meeting.duration,
                "timezone": meeting.timezone,
                "created_at": new Date(meeting.created_at),
                "join_url": meeting.join_url,
            }
        });
        dataStore.save('meetings', meetingdata);
        if (next_page_token == "") {
            i++;
        }
    } while (i < users.length);
    return meetingids;
}
//Loading the meetings details from zoom SOR to cache db(Done)
async function syncMeetingsDetails(dataStore, client,meetingids) {
    let dialIncounter = 0;
    let dialInNumberscounter = 0;
    let meetingsMap = new Map();
    for (const meetingid of meetingids) {
        const response = await client.fetch(`meetings/${meetingid}`)
        const meeting = await response.json();
        if (!(response.ok)) {
            throw new Error(json);
        }
        
        //Setting the meetingsmap with meetingid as key and email as value to be used in Meeting Invitations API call
        meetingsMap.set(meeting.id, { email: meeting.host_email })

        let meetingDetails = {
            "created_at": moment.utc(meeting.created_at).toDate(),
            "duration": meeting.duration,
            "host_id": meeting.host_id,
            "host_email": meeting.host_email,
            "id": meeting.id,
            "join_url": meeting.join_url,
            "password": meeting.password,
            "recurrence_end_times": meeting.recurrence!= undefined ?meeting.recurrence.end_times:null,
            "recurrence_repeat_interva": meeting.recurrence!= undefined ?meeting.recurrence.repeat_interval:null,
            "recurrence_type": meeting.recurrence!= undefined ?meeting.recurrence.type:null,
            "recurrence_weekly_days": meeting.recurrence!= undefined ?meeting.recurrence.weekly_days :null,
            "recurrence_monthly_day": meeting.recurrence!= undefined ?meeting.recurrence.monthly_day :null,
            "settings_alternative_host": meeting.settings.alternative_hosts,
            "start_time": meeting.start_time != undefined ? new Date(meeting.start_time):null,
            "start_url": meeting.start_url,
            "timezone": meeting.timezone,
            "topic": meeting.topic,
            "type": meeting.type,
            "recurrence_weekly_days": null,
            "recurrence_monthly_day": null,
            "visibility": true
        }

        //storing dial-in countries of onetime meeting 
        let dialIn = meeting.settings.global_dial_in_countries.map(country => {
            return {
                "value": country,
                "unique_id": uuid.v4(),
                "parent_id": meeting.id,
                "root_id": meeting.id
            }
        })

        // storing numbers of dial_in countries 
        let dialInNumbers = meeting.settings.global_dial_in_numbers.map(number => {

            return {
                "country": number.country,
                "number": number.number,
                "country_name": number.country_name,
                "type": number.type,
                "unique_id": uuid.v4(),
                "parent_id": meeting.id,
                "root_id": meeting.id
            }
        })
        //if meeting is a onetime(2) meeting
        if (meeting.type == 2) {
            dataStore.save('meeting_details_one_time', meetingDetails)
            dataStore.save('meeting_details_one_t_1', dialIn);
            dataStore.save('meeting_details_one_t_2', dialInNumbers);
        }
        //if meeting type is recurring(8)
        else if (meeting.type == 8) { 
            let occurrenceData = meeting.occurrences.map(occurrence => {
                return {
                    "duration": occurrence.duration,
                    "occurrence_id": Number(occurrence.occurrence_id),
                    "meetingId": meeting.id,
                    "start_time": new Date(occurrence.start_time),
                    "parent_id": meeting.id,
                    "visibility": true
                }
            })
            //Storing the data to the cache DB            
            dataStore.save('meeting_details_recurring', meetingDetails);
            dataStore.save('meeting_details_recur_1', occurrenceData);
            dataStore.save('meeting_details_recur_2', dialIn);
            dataStore.save('meeting_details_recur_3', dialInNumbers);
        }
        else{
            console.log(`Found a different meeting other than onetime and reucrring meeting id: ${json.id} type: ${json.type}`);
        }
    }
    return meetingsMap;
}

// Loading the Meeting's Invitation
async function syncMeetingInvitations(dataStore, client,meetingdetail) {
    //traversing through the meetingMap to get meeting id as key and email as value
    for (const [meetingId, user] of meetingdetail.entries()) {
        const response = await client.fetch(`meetings/${meetingId}/invitation`);
        const meeting = await response.json();
        if (!(response.ok)) {
            throw new Error(json);
        }
        dataStore.save("meeting_invitations", {
            "id": meetingId,
            "invitation": meeting.invitation,
            "users_email": user.email
        })
    }
}

async function syncRecordings(dataStore, client,userids) {
    let i = 0;
    //defining the 7 days window to fetch the recordings data for an user
    const to = moment().utc().format();
    const from = moment().subtract(7, 'days').utc().format();
    let next_page_token = "";
    const page_size = 100;

    do {
        const response = await client.fetch(`users/${userids[i].userid}/recordings?from=${from}&to=${to}&next_page_token=${next_page_token}&page_size=${page_size}`);
        const json = await response.json();
        if (!response.ok) {
            throw new Error(json);
        }
        next_page_token = json.next_page_token ?? "";
        const data = json.meetings;
        let recordDatacounter = 0;
        let recordingData = data.map(meeting => {
            let recordData = meeting.recording_files.map(rec => {
                return {
                    "download_url": rec.download_url,
                    "id": rec.id,
                    "meeting_id": rec.meeting_id,
                    "play_url": rec.play_url,
                    "recording_end": moment(rec.recording_end).isValid() ? new Date(rec.recording_end): null,
                    "recording_start": moment(rec.recording_start).isValid() ? new Date(rec.recording_start) : null,
                    "recording_type": rec.recording_type,
                    "parent_id": meeting.id,
                    "parent_uuid": meeting.uuid,
                    "parent_start_time": new Date(meeting.start_time),
                    "root_id": meeting.id,
                    "root_uuid": meeting.uuid,
                    "root_start_time": new Date(meeting.start_time),
                    "unique_id": uuid.v4()
                }
            })
            dataStore.save("meeting_recordings_record", recordData);
            return {
                "uuid": meeting.uuid,
                "host_id": meeting.host_id,
                "id": meeting.id,
                "share_url": meeting.share_url,
                "start_time": new Date(meeting.start_time),
                "topic": meeting.topic,
                "total_size": meeting.total_size
            }
        });
        dataStore.save('meeting_recordings', recordingData);
        if (next_page_token == "") {
            i++;
        }
    } while (i < userids.length);
}
async function zoomFullSync({ dataStore, client, context }){
    //Loading Users Data using /users endpoint
    console.log(`users sync started`);
    let users = await syncUsers(dataStore, client, context);
    console.log("users sync completed");

    //Loading the user's upcoming meetings
    console.log(`upcoming meetings sync started`);
    let meetings = await syncMeetings(dataStore,client,users);
    console.log(`upcoming meetings sync completed`);
    
    //Loading Meeting Details
    console.log(`meetings details sync started`);
    let meetingdetail = await syncMeetingsDetails(dataStore,client,meetings);
    console.log(`meetings details sync completed`);
     
    //Loading meeting Invitations
    console.log(`meetings invitation sync started`);
    await syncMeetingInvitations(dataStore,client,meetingdetail);
    console.log(`meetings invitation sync completed`);
    
     //Loading Recording Details
    console.log(`meetings recording sync started`);
    await syncRecordings(dataStore,client,users);
    console.log(`meetings recording sync completed`); 
}

async function zoomIncSync({ client, dataStore, latestSynchronizationTime, context }) {
    let meetingids = await incSyncMeetings(dataStore,client,context,latestSynchronizationTime)
    let meetingdetail = await syncMeetingsDetails(dataStore, client,meetingids);
    await syncMeetingInvitations(dataStore, client, meetingdetail);
}

async function incSyncMeetings(dataStore,client,context,latestSynchronizationTime){
    let i = 0;
    let meetingids = new Set();
    let next_page_token = "";
    let page_size=200;
    do {
        const response = await client.fetch(`users/${context.user[i].userid}/meetings?type=upcoming&next_page_token=${next_page_token}&page_size=${page_size}`);
        let json = await response.json();
        if (!response.ok) {
            throw new Error(json);
        }
        next_page_token = json.next_page_token ?? "";
        const data = json.meetings;
        let meetingsData = data.filter(meeting => {
            if (moment(meeting.created_at).isAfter(latestSynchronizationTime)) {
                meetingids.add(meeting.id);
                return true;
            }
        }).map(meeting => {
            if(!meetingids.has(meeting.id)){
                meetingids.add(meeting.id)
            }
            return {
                "uuid": meeting.uuid,
                "id": meeting.id,
                "host_id": meeting.host_id,
                "topic": meeting.topic,
                "type": meeting.type,
                "start_time": new Date(meeting.start_time),
                "duration": meeting.duration,
                "timezone": meeting.timezone,
                "created_at": new Date(meeting.created_at),
                "join_url": meeting.join_url,
            }
        });
        dataStore.save('meetings', meetingsData);
        if (next_page_token == "") {
            i++;
        }
    } while (i < context.user.length)
    return meetingids
}



//Defining Actions Methods
async function createMeeting({ dataStore, client, actionParameters }) {
    let meetingset, meetingMap;
    let alternative_hosts = actionParameters.alternative_hosts1;
    if(actionParameters.alternative_hosts2 != null){
        alternative_hosts+=','+actionParameters.alternative_hosts2;
    } 
    const response = await client.fetch(`users/${actionParameters.Userid}/meetings`, {
        method: "POST",
        body: JSON.stringify({
            topic: actionParameters.topic,
            type: actionParameters.type,
            start_time: actionParameters.start_time,
            duration: actionParameters.duration,
            password: actionParameters.password,
            recurrence: {
                type: actionParameters.r_type,
                repeat_interval: actionParameters.repeat_interval,
                weekly_days: actionParameters.weekly_days,
                monthly_day: actionParameters.monthly_day,
                end_times: actionParameters.end_times,
            },
            settings: {
                alternative_hosts: alternative_hosts,
                global_dial_in_countries: [actionParameters.us, actionParameters.mx, actionParameters.ar, actionParameters.au, actionParameters.ca]
            }
        })
    })
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json)
    }
    meetingset = new Set([Number(json.id)]);
    meetingMap = new Map([[json.id, { email: json.host_email }]])

    await syncMeetings(dataStore, client, [{userid: actionParameters.Userid}]);
    await syncMeetingsDetails(dataStore, client,meetingset);
    await syncMeetingInvitations(dataStore, client, meetingMap);
}


//   Edit One Time Meeting One Co-organizer
async function editOnetimeMeeting({ dataStore, client, actionParameters }) {
    let meetingset;
    let occurrences = [];
    let alternative_hosts = actionParameters.alternative_hosts1;
    if(actionParameters.alternative_hosts2 != null){
        alternative_hosts+=','+actionParameters.alternative_hosts2;
    }
    if(actionParameters.previous_type == 8){
        const response = await client.fetch(`meetings/${actionParameters.meetingid}`);
        let json = await response.json(); 
        if (!response.ok) {
            throw new Error(json)
        }
        occurrences = json.occurrences;
    }
    const response = await client.fetch(`meetings/${actionParameters.meetingid}`, {
        method: "PATCH",
        body: JSON.stringify({
            topic: actionParameters.topic,
            type: actionParameters.type,
            start_time: actionParameters.start_time,
            duration: actionParameters.duration,
            password: actionParameters.password,
            recurrence: {
                type: actionParameters.r_type,
                repeat_interval: actionParameters.repeat_interval,
                weekly_days: actionParameters.weekly_days,
                monthly_day: actionParameters.monthly_day,
                end_times: actionParameters.end_times,
            },
            settings: {
                alternative_hosts: alternative_hosts,
                global_dial_in_countries: [actionParameters.us, actionParameters.mx, actionParameters.ar, actionParameters.au, actionParameters.ca]
            }
        })
    })
    
    //here response code is 204, so normally there will be no response.
    if (!response.ok) {
        throw new Error(await response.json())
    }

    if (actionParameters.previous_type == 8 && actionParameters.type == 8 && actionParameters.r_type == actionParameters.pre_rtype && !(moment(actionParameters.start_time).isSame(actionParameters.prev_start_time))) {
        updateMeetingOccurrences(actionParameters, occurrences, dataStore);
    }
    // meetingset = new Set([meeting.id]);
    detectTypeChange(actionParameters,occurrences, dataStore);
    await syncMeetings(dataStore, client, [{userid: actionParameters.Userid }]);
    meetingset = new Set([actionParameters.meetingid]);
    let meetingDetails = await syncMeetingsDetails(dataStore, client, meetingset);
    await syncMeetingInvitations(dataStore, client,meetingDetails);
}


async function editRecurringMeeting({ dataStore, client, actionParameters }) {
    let meetingset;
    const response =await client.fetch(`meetings/${actionParameters.meetingid}?occurrence_id=${actionParameters.occurrence_id}`, {
        method: "PATCH",
        body: JSON.stringify({
            start_time: actionParameters.start_time,
            duration: actionParameters.duration
        })
    })
    //here response code is 204, so normally there will be no response.
    if (!response.ok) {
        throw new Error(await response.json())
    }
    syncMeetings(dataStore, client, [{userid: actionParameters.userid }]);
    meetingset = new Set([actionParameters.meetingid]);
    let meetingDetails = await syncMeetingsDetails(dataStore, client, meetingset);
    await syncMeetingInvitations(dataStore, client,meetingDetails);

}


//Here are have to explicitly convert the Data Type to Number as we are getting the meetnigid as a String from microapp page.
function detectTypeChange(actionParameters, meetingDetail, dataStore) {
    if (actionParameters.previous_type != actionParameters.type) {
        if (actionParameters.type == 2) {
            changeData(dataStore,meetingDetail,actionParameters)
        }
        else if (actionParameters.type == 8) {
            let onetime = {
                "host_id": actionParameters.Userid,
                "id": Number(actionParameters.meetingid),
                "topic": actionParameters.topic,
                "type": Number(actionParameters.type),
                "visibility": false,
            }
            dataStore.save('meeting_details_one_time', onetime);
        }
    }
    else {
        if (actionParameters.pre_rtype != actionParameters.r_type) {
            changeData(dataStore,meetingDetail,actionParameters)
        }
    }
}
//Here are have to explicitly convert the Data Type to Number as we are getting the meetnigid as a String from microapp page.
function updateMeetingOccurrences(actionParameters, meetingDetail, dataStore) {
    let occurrenceData = meetingDetail.map(occurrence => {
        return {
            "duration": occurrence.duration,
            "occurrence_id": Number(occurrence.occurrence_id),
            "meetingId": Number(actionParameters.meetingid),
            "start_time": new Date(occurrence.start_time),
            "parent_id": Number(actionParameters.meetingid),
            "visibility": false,
        }
    })
    dataStore.save('meeting_details_recur_1', occurrenceData);
}

//Here are have to explicitly convert the Data Type to Number as we are getting the meetnigid as a String from microapp page.
function changeData(dataStore,meetingDetail,actionParameters){
    let occurrenceData = meetingDetail.map(occurrence => {
        return {
            "duration": occurrence.duration,
            "occurrence_id": Number(occurrence.occurrence_id),
            "meetingId": Number(actionParameters.meetingid),
            "start_time": new Date(occurrence.start_time),
            "parent_id": Number(actionParameters.meetingid),
            "visibility": false,
        }
    })
    dataStore.save('meeting_details_recur_1', occurrenceData);
    let recurring = {
        "host_id": actionParameters.Userid,
        "id": Number(actionParameters.meetingid),
        "topic": actionParameters.topic,
        "type": Number(actionParameters.type),
        "visibility": false,
    }
    dataStore.save('meeting_details_recurring', recurring);
}

integration.define({
    synchronizations: [
        {
            name: "zoomFullSync",
            fullSyncFunction: zoomFullSync,
            incrementalSyncFunction: zoomIncSync,
        }
    ],
    model: {
        tables: [
            {
                "name": "meetings",
                columns: [
                    { name: "uuid", type: "STRING", length: 255 },
                    { name: "id", type: "LONG", primaryKey: true },
                    { name: "host_id", type: "STRING", length: 255 },
                    { name: "topic", type: "STRING", length: 255 },
                    { name: "type", type: "INTEGER" },
                    { name: "start_time", type: "DATETIME", primaryKey: true },
                    { name: "duration", type: "INTEGER" },
                    { name: "timezone", type: "STRING", length: 255 },
                    { name: "created_at", type: "DATETIME" },
                    { name: "join_url", type: "STRING", length: 255 },
                ],
            },
            {
                "name": "users",
                columns: [
                    { name: "userid", type: "STRING", primaryKey: true, length: 255 },
                    { name: "first_name", type: "STRING", length: 255 },
                    { name: "last_name", type: "STRING", length: 255 },
                    { name: "email", type: "STRING", length: 255 },
                    { name: "timezone", type: "STRING", length: 255 },
                    { name: "last_login_time", type: "DATETIME" }
                ],
            },
            {
                name: "meeting_details_one_time",
                columns: [
                    { name: "created_at", type: "DATETIME" },
                    { name: "duration", type: "INTEGER" },
                    { name: "host_id", type: "STRING", length: 255 },
                    { name: "host_email", type: "STRING", length: 255 },
                    { name: "id", type: "LONG", primaryKey: true },
                    { name: "join_url", type: "STRING", length: 255 },
                    { name: "password", type: "STRING", length: 255 },
                    { name: "settings_alternative_host", type: "STRING", length: 255 },
                    { name: "start_time", type: "DATETIME" },
                    { name: "start_url", type: "STRING", length: 1000 },
                    { name: "timezone", type: "STRING", length: 255 },
                    { name: "topic", type: "STRING", length: 255 },
                    { name: "type", type: "INTEGER" },
                    { name: "recurrence_monthly_day", type: "INTEGER" },
                    { name: "recurrence_weekly_days", type: "STRING", length: 255 },
                    { name: "visibility", type: "BOOLEAN" },
                ],
            },
            {
                name: "meeting_details_one_t_1",
                columns: [
                    { name: "value", type: "STRING", length: 255 },
                    { name: "unique_id", type: "STRING", length: 255, primaryKey: true },
                    { name: "parent_id", type: "LONG" },
                    { name: "root_id", type: "LONG" },
                ],
            },
            {
                name: "meeting_details_one_t_2",
                columns: [
                    { name: "country", type: "STRING", length: 255 },
                    { name: "number", type: "STRING", length: 255 },
                    { name: "country_name", type: "STRING", length: 255 },
                    { name: "type", type: "STRING", length: 255 },
                    { name: "unique_id", type: "STRING", length: 255, primaryKey: true },
                    { name: "parent_id", type: "LONG" },
                    { name: "root_id", type: "LONG" },
                ]
            },
            {
                name: "meeting_details_recurring",
                columns: [
                    { name: "created_at", type: "DATETIME" },
                    { name: "host_id", type: "STRING", length: 255 },
                    { name: "host_email", type: "STRING", length: 255 },
                    { name: "id", type: "LONG", primaryKey: true },
                    { name: "join_url", type: "STRING", length: 255 },
                    { name: "password", type: "STRING", length: 255 },
                    { name: "recurrence_end_times", type: "INTEGER" },
                    { name: "recurrence_monthly_day", type: "INTEGER" },
                    { name: "recurrence_repeat_interva", type: "INTEGER" },
                    { name: "recurrence_type", type: "INTEGER" },
                    { name: "recurrence_weekly_days", type: "STRING", length: 255 },
                    { name: "settings_alternative_host", type: "STRING", length: 255 },
                    { name: "start_url", type: "STRING", length: 1000 },
                    { name: "timezone", type: "STRING", length: 255 },
                    { name: "topic", type: "STRING", length: 255 },
                    { name: "type", type: "INTEGER" },
                    { name: "visibility", type: "BOOLEAN" },
                ],
            },
            {
                name: "meeting_details_recur_1",
                columns: [
                    { name: "duration", type: "INTEGER" },
                    { name: "meetingId", type: "LONG", primaryKey: true },
                    { name: "occurrence_id", type: "LONG", primaryKey: true },
                    { name: "start_time", type: "DATETIME" },
                    { name: "parent_id", type: "LONG" },
                    { name: "visibility", type: "BOOLEAN" },
                ],
            },
            {
                name: "meeting_details_recur_2",
                columns: [
                    { name: "value", type: "STRING", length: 255 },
                    { name: "unique_id", type: "STRING", length: 255, primaryKey: true },
                    { name: "parent_id", type: "LONG" },
                    { name: "root_id", type: "LONG" },
                ],
            },
            {
                name: "meeting_details_recur_3",
                columns: [
                    { name: "country", type: "STRING", length: 255 },
                    { name: "number", type: "STRING", length: 255 },
                    { name: "country_name", type: "STRING", length: 255 },
                    { name: "type", type: "STRING", length: 255 },
                    { name: "unique_id", type: "STRING", length: 255, primaryKey: true },
                    { name: "parent_id", type: "LONG" },
                    { name: "root_id", type: "LONG" },
                ]
            },
            {
                name: "meeting_invitations",
                columns: [
                    { name: "id", type: "LONG", primaryKey: true },
                    { name: "invitation", type: "STRING", length: 3000 },
                    { name: "users_email", type: "STRING", length: 255 }
                ]
            },
            {
                name: "meeting_recordings",
                columns: [
                    { name: "host_id", type: "STRING", length: 255 },
                    { name: "id", type: "LONG", primaryKey: true },
                    { name: "share_url", type: "STRING", length: 255 },
                    { name: "start_time", type: "DATETIME", primaryKey: true },
                    { name: "topic", type: "STRING", length: 255 },
                    { name: "total_size", type: "INTEGER" },
                    { name: "uuid", type: "STRING", length: 255, primaryKey: true }
                ]
            },
            {
                name: "meeting_recordings_record",
                columns: [
                    { name: "download_url", type: "STRING", length: 255 },
                    { name: "id", type: "STRING", length: 255, primaryKey: true },
                    { name: "meeting_id", type: "STRING", length: 255, primaryKey: true },
                    { name: "play_url", type: "STRING", length: 255 },
                    { name: "recording_end", type: "DATETIME" },
                    { name: "recording_start", type: "DATETIME" },
                    { name: "recording_type", type: "STRING", length: 255 },
                    { name: "parent_id", type: "LONG" },
                    { name: "parent_uuid", type: "STRING", length: 255 },
                    { name: "parent_start_time", type: "DATETIME" },
                    { name: "root_id", type: "LONG" },
                    { name: "root_uuid", type: "STRING", length: 255 },
                    { name: "root_start_time", type: "DATETIME" },
                    { name: "unique_id", type: "STRING", length: 255, primaryKey: true },
                ]
            },
        ],
        relationships: [
            {
                "name": "nested_table_2",
                "primaryTable": "meeting_details_one_time",
                "foreignTable": "meeting_details_one_t_1",
                "columnPairs": [
                    {
                        "primaryKey": "id",
                        "foreignKey": "parent_id"
                    }
                ]
            },
            {
                "name": "nested_table_1",
                "primaryTable": "meeting_details_one_time",
                "foreignTable": "meeting_details_one_t_2",
                "columnPairs": [
                    {
                        "primaryKey": "id",
                        "foreignKey": "parent_id"
                    }
                ]
            },
            {
                "name": "get_onetime_details",
                "primaryTable": "meeting_details_one_time",
                "foreignTable": "meeting_details_recurring",
                "columnPairs": [
                    {
                        "primaryKey": "host_id",
                        "foreignKey": "host_id"
                    }
                ]
            },
            {
                "name": "Get_Updated_Invitations",
                "primaryTable": "meeting_details_one_time",
                "foreignTable": "meeting_invitations",
                "columnPairs": [
                    {
                        "primaryKey": "id",
                        "foreignKey": "id"
                    }
                ]
            },
            {
                "name": "get_user_details",
                "primaryTable": "meeting_details_one_time",
                "foreignTable": "users",
                "columnPairs": [
                    {
                        "primaryKey": "host_id",
                        "foreignKey": "userid"
                    }
                ]
            },
            {
                "name": "Get_Recc_Invitation",
                "primaryTable": "meeting_details_recur_1",
                "foreignTable": "meeting_invitations",
                "columnPairs": [
                    {
                        "primaryKey": "parent_id",
                        "foreignKey": "id"
                    }
                ]
            },
            {
                "name": "nested_table_5",
                "primaryTable": "meeting_details_recurring",
                "foreignTable": "meeting_details_recur_1",
                "columnPairs": [
                    {
                        "primaryKey": "id",
                        "foreignKey": "parent_id"
                    }
                ]
            },
            {
                "name": "nested_table_3",
                "primaryTable": "meeting_details_recurring",
                "foreignTable": "meeting_details_recur_2",
                "columnPairs": [
                    {
                        "primaryKey": "id",
                        "foreignKey": "parent_id"
                    }
                ]
            },
            {
                "name": "nested_table_4",
                "primaryTable": "meeting_details_recurring",
                "foreignTable": "meeting_details_recur_3",
                "columnPairs": [
                    {
                        "primaryKey": "id",
                        "foreignKey": "parent_id"
                    }
                ]
            },
            {
                "name": "Get_Invitaions",
                "primaryTable": "meeting_details_recurring",
                "foreignTable": "meeting_invitations",
                "columnPairs": [
                    {
                        "primaryKey": "id",
                        "foreignKey": "id"
                    }
                ]
            },
            {
                "name": "gs_useremail",
                "primaryTable": "meeting_details_recurring",
                "foreignTable": "users",
                "columnPairs": [
                    {
                        "primaryKey": "host_id",
                        "foreignKey": "userid"
                    }
                ]
            },
            {
                "name": "nested_table_6",
                "primaryTable": "meeting_recordings",
                "foreignTable": "meeting_recordings_record",
                "columnPairs": [
                    {
                        "primaryKey": "id",
                        "foreignKey": "parent_id"
                    },
                    {
                        "primaryKey": "start_time",
                        "foreignKey": "parent_start_time"
                    },
                    {
                        "primaryKey": "uuid",
                        "foreignKey": "parent_uuid"
                    },
                ]
            },
            {
                "name": "Recording_users",
                "primaryTable": "meeting_recordings",
                "foreignTable": "users",
                "columnPairs": [
                    {
                        "primaryKey": "host_id",
                        "foreignKey": "userid"
                    }
                ]
            },
        ],
    },
    actions: [
        {
            name: "createMeeting",
            parameters: [
                { name: "end_times", type: "STRING", length: 255 },
                { name: "mx", type: "STRING", length: 255 },
                { name: "type", type: "STRING", length: 255 },
                { name: "duration", type: "STRING", length: 255 },
                { name: "start_time", type: "STRING", length: 255 },
                { name: "ar", type: "STRING", length: 255 },
                { name: "password", type: "STRING", length: 255 },
                { name: "au", type: "STRING", length: 255 },
                { name: "alternative_hosts1", type: "STRING", length: 255 },
                { name: "alternative_hosts2", type: "STRING", length: 255 },
                { name: "Userid", type: "STRING", required: true, length: 255 },
                { name: "topic", type: "STRING", length: 255 },
                { name: "repeat_interval", type: "STRING", length: 255 },
                { name: "monthly_day", type: "STRING", length: 255 },
                { name: "r_type", type: "STRING", length: 255 },
                { name: "weekly_days", type: "STRING", length: 255 },
                { name: "us", type: "STRING", length: 255 },
                { name: "ca", type: "STRING", length: 255 },
            ],
            function: createMeeting,
        },
        {
            name: "editOnetimeMeeting",
            parameters: [
                { name: "end_times", type: "STRING", length: 255 },
                { name: "meetingid", type: "STRING", required: true, length: 255 },
                { name: "mx", type: "STRING", length: 255 },
                { name: "type", type: "STRING", length: 255 },
                { name: "previous_type", type: "STRING", length: 255 },
                { name: "duration", type: "STRING", length: 255 },
                { name: "prev_start_time", type: "STRING", length: 255 },
                { name: "start_time", type: "STRING", length: 255 },
                { name: "ar", type: "STRING", length: 255 },
                { name: "password", type: "STRING", length: 255 },
                { name: "au", type: "STRING", length: 255 },
                { name: "alternative_hosts1", type: "STRING", length: 255 },
                { name: "alternative_hosts2", type: "STRING", length: 255 },
                { name: "Userid", type: "STRING", required: true, length: 255 },
                { name: "topic", type: "STRING", length: 255 },
                { name: "occurrence_id", type: "STRING", length: 255 },
                { name: "repeat_interval", type: "STRING", length: 255 },
                { name: "monthly_day", type: "STRING", length: 255 },
                { name: "r_type", type: "STRING", length: 255 },
                { name: "pre_rtype", type: "STRING", length: 255 },
                { name: "weekly_days", type: "STRING", length: 255 },
                { name: "us", type: "STRING", length: 255 },
                { name: "ca", type: "STRING", length: 255 },
            ],
            function: editOnetimeMeeting,
        },
        {
            name: "EditRecurringMeeting",
            parameters: [
                { name: "meetingid", type: "STRING", required: true, length: 255 },
                { name: "mx", type: "STRING", length: 255 },
                { name: "type", type: "STRING", length: 255 },
                { name: "userid", type: "STRING", required: true, length: 255 },
                { name: "duration", type: "STRING", length: 255 },
                { name: "start_time", type: "STRING", length: 255 },
                { name: "ar", type: "STRING", length: 255 },
                { name: "password", type: "STRING", length: 255 },
                { name: "au", type: "STRING", length: 255 },
                { name: "topic", type: "STRING", length: 255 },
                { name: "occurrence_id", type: "STRING", required: true, length: 255 },
                { name: "US", type: "STRING", length: 255 },
                { name: "CA", type: "STRING", length: 255 },
            ],
            function: editRecurringMeeting,
        }
    ]
});