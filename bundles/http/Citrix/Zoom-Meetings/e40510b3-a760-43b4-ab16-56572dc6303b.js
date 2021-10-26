//Loaded moment-timezone library from sdk provided libraries 
const moment = library.load('moment-timezone');
const uuid = library.load('uuid');

const ONETIMEMEETING = 2, RECURRINGMEETING = 8

async function validateResponse(response) {
    const body = await response.text()
    if (response.headers.map['content-type'].toLowerCase().includes("application/json")) {
        const jsonBody = JSON.parse(body)
        if (!response.ok) {
            return { responseBody: jsonBody, errorMessage: jsonBody.message, errorStatus: true }
        } else {
            return { responseBody: jsonBody, errorStatus: false }
        }
    } else {
        return { responseBody: body, errorMessage: 'Unable to process the request', errorStatus: true }
    }
}

async function syncUsers(dataStore, client) {
    const page_size = 100
    let next_page_token = ""
    let userDetails = [];
    do {
        const userResponse = await client.fetch(`users?next_page_token=${next_page_token}&page_size=${page_size}`);
        const { responseBody, errorMessage, errorStatus } = await validateResponse(userResponse)
        if (errorStatus) {
            if (responseBody.code == 4700) {
                console.log('Scope not found : user:read:admin')
                return userDetails
            } else {
                console.log(JSON.stringify(responseBody), errorMessage)
                throw new Error(errorMessage)
            }
        }
        next_page_token = responseBody.next_page_token ?? "";
        const users = responseBody?.users.map(({ id: userid, first_name, last_name, email, timezone, last_login_time }) => ({
            userid ,
            first_name,
            last_name,
            email,
            timezone,
            last_login_time: last_login_time !== undefined ? new Date(last_login_time) : null
        }))
        userDetails = userDetails.concat(users)
        dataStore.save("users", users ?? []);
    } while (next_page_token != "");
    return userDetails;
}

//loading the meetings data (Upcoming Meetings)(Done)
async function syncMeetings(dataStore, client, users) {
    let i = 0;
    let next_page_token = "";
    const page_size = 200;
    const meetingData = new Map();

    if (users.length === 0) {
        console.log('No user found')
        return meetingData
    }

    do {
        const meetingResponse = await client.fetch(`users/${users[i].userid}/meetings?type=upcoming&next_page_token=${next_page_token}&page_size=${page_size}`);
        const { responseBody, errorMessage, errorStatus } = await validateResponse(meetingResponse)
        if (errorStatus) {
            if (responseBody.code == 4700) {
                console.log('Scope not found : meeting:read:admin, meeting:read')
                return meetingData
            } else {
                console.log(JSON.stringify(responseBody), errorMessage)
                throw new Error(errorMessage)
            }
        }
        next_page_token = responseBody.next_page_token ?? "";
        let meetings = responseBody.meetings?.filter(meeting => {
            return meeting.type == ONETIMEMEETING || meeting.type == RECURRINGMEETING
        })?.map(meeting => {
            meetingData.set(meeting.id, users[i].email)
            return {
                "uuid": meeting?.uuid ?? null,
                "id": meeting?.id ?? null,
                "host_id": meeting?.host_id ?? null,
                "topic": meeting?.topic ?? null,
                "type": meeting?.type ?? null,
                "start_time": meeting.start_time !== undefined ? new Date(meeting.start_time) : null, 
                "duration": meeting?.duration ?? null,
                "timezone": meeting?.timezone ?? null,
                "created_at": meeting.created_at !== undefined ? new Date(meeting.created_at) : null, 
                "join_url": meeting?.join_url ?? null,
            }
        });
        dataStore.save('meetings', meetings ?? []);
        if (next_page_token == "") {
            i++;
        }
    } while (i < users.length);
    return meetingData;
}
//Loading the meetings details from zoom SOR to cache db(Done)
async function syncMeetingsDetails(dataStore, client, meetings) {
    for (const [id] of meetings) {
        const meetingDetailsResponse = await client.fetch(`meetings/${id}`)
        const { responseBody, errorMessage, errorStatus } = await validateResponse(meetingDetailsResponse)
        if (errorStatus) {
            if (meetingDetailsResponse.status == 404) {
                console.log('Meeting not found : ' + id)
            } else {
                console.log(JSON.stringify(responseBody), errorMessage)
                throw new Error(errorMessage)
            }
        }

        let meetingDetails = {
            "created_at": responseBody.created_at !== undefined ? new Date(responseBody.created_at) : null, 
            "duration": responseBody?.duration ?? null,
            "host_id": responseBody?.host_id ?? null,
            "host_email": responseBody?.host_email ?? null,
            "id": responseBody?.id ?? null,
            "join_url": responseBody?.join_url ?? null,
            "password": responseBody?.password ?? null,
            "recurrence_end_times": responseBody?.recurrence?.end_times ?? null,
            "recurrence_repeat_interva": responseBody?.recurrence?.repeat_interval ?? null,
            "recurrence_type": responseBody?.recurrence?.type ?? null,
            "recurrence_weekly_days": responseBody?.recurrence?.weekly_days ?? null,
            "recurrence_monthly_day": responseBody?.recurrence?.monthly_day ?? null,
            "settings_alternative_host": responseBody.settings?.alternative_hosts ?? null,
            "start_time": responseBody.start_time != undefined ? new Date(responseBody.start_time) : null,
            "start_url": responseBody?.start_url ?? null,
            "timezone": responseBody?.timezone ?? null,
            "topic": responseBody?.topic ?? null,
            "type": responseBody?.type ?? null,
            "visibility": true
        }

        //storing dial-in countries of onetime meeting 
        const dialIn = responseBody.settings?.global_dial_in_countries?.map(country => {
            return {
                "value": country,
                "unique_id": uuid.v4(),
                "parent_id": responseBody.id,
                "root_id": responseBody.id
            }
        })

        // storing numbers of dial_in countries 
        const dialInNumbers = responseBody.settings?.global_dial_in_numbers?.map(number => {
            return {
                "country": number?.country ?? null,
                "number": number?.number ?? null,
                "country_name": number?.country_name ?? null,
                "type": number?.type ?? null,
                "unique_id": uuid.v4(),
                "parent_id": responseBody.id,
                "root_id": responseBody.id
            }
        })
        //if meeting is a onetime(2) meeting
        if (responseBody.type == ONETIMEMEETING) {
            dataStore.save('meeting_details_one_time', meetingDetails ?? [])
            dataStore.save('meeting_details_one_t_1', dialIn ?? []);
            dataStore.save('meeting_details_one_t_2', dialInNumbers ?? []);
        }
        //if meeting type is recurring(8)
        else if (responseBody.type == RECURRINGMEETING) {
            const occurrenceData = responseBody.occurrences?.map(occurrence => {
                return {
                    "duration": occurrence?.duration ?? null,
                    "occurrence_id": Number(occurrence.occurrence_id),
                    "meetingId": responseBody?.id ?? null,
                    "start_time": occurrence.start_time !== undefined ? new Date(occurrence.start_time) : null, 
                    "parent_id": responseBody?.id ?? null,
                    "visibility": true
                }
            })
            //Storing the data to the cache DB            
            dataStore.save('meeting_details_recurring', meetingDetails ?? []);
            dataStore.save('meeting_details_recur_1', occurrenceData ?? []);
            dataStore.save('meeting_details_recur_2', dialIn ?? []);
            dataStore.save('meeting_details_recur_3', dialInNumbers ?? []);
        }
    }
    return meetings;
}

// Loading the Meeting's Invitation
async function syncMeetingInvitations(dataStore, client, meetings) {
    //traversing through the meetingMap to get meeting id as key and email as value
    for (const [id, email] of meetings) {
        const meeitngInvitationResponse = await client.fetch(`meetings/${id}/invitation`);
        const { responseBody, errorMessage, errorStatus } = await validateResponse(meeitngInvitationResponse)
        if (errorStatus) {
            if (meeitngInvitationResponse.status == 404) {
                console.log('Meeting not found ' + id)
            } else {
                console.log(JSON.stringify(responseBody), errorMessage)
                throw new Error(errorMessage)
            }
        }
        dataStore.save("meeting_invitations", {
            "id": Number(id),
            "invitation": responseBody?.invitation ?? null,
            "users_email": email
        })
    }
}

async function syncRecordings(dataStore, client, userids) {
    let i = 0;
    //defining the 7 days window to fetch the recordings data for an user
    const to = moment().utc().format();
    const from = moment().subtract(7, 'days').utc().format();
    let next_page_token = "";
    const page_size = 100;
    if (userids.length === 0) {
        return false
    }
    do {
        const meetingRecordingResponse = await client.fetch(`users/${userids[i].userid}/recordings?from=${from}&to=${to}&next_page_token=${next_page_token}&page_size=${page_size}`);
        const { responseBody, errorMessage, errorStatus } = await validateResponse(meetingRecordingResponse)
        if (errorStatus) {
            if (responseBody.code == 4700) {
                console.log('Meeting Recording Scope : recording:read:admin, recording:read not found')
            } else {
                console.log(JSON.stringify(responseBody), errorMessage)
                throw new Error(errorMessage)
            }

        }
        next_page_token = responseBody.next_page_token ?? "";
        let recordDatacounter = 0;
        let recordingData = (responseBody?.meetings ?? []).map(meeting => {
            let recordData = (meeting?.recording_files ?? []).map(rec => {
                return {
                    "download_url": rec?.download_url ?? null,
                    "id": rec?.id ?? null,
                    "meeting_id": rec?.meeting_id ?? null,
                    "play_url": rec?.play_url ?? null,
                    "recording_end": moment(rec.recording_end).isValid() ? new Date(rec.recording_end) : null,
                    "recording_start": moment(rec.recording_start).isValid() ? new Date(rec.recording_start) : null,
                    "recording_type": rec?.recording_type ?? null,
                    "parent_id": meeting?.id ?? null,
                    "parent_uuid": meeting?.uuid ?? null,
                    "parent_start_time": meeting.start_time !== undefined ? new Date(meeting.start_time) : null, 
                    "root_id": meeting?.id ?? null,
                    "root_uuid": meeting?.uuid ?? null,
                    "root_start_time": meeting.start_time !== undefined ? new Date(meeting.start_time) : null, 
                    "unique_id": uuid.v4()
                }
            })
            dataStore.save("meeting_recordings_record", recordData);
            return {
                "uuid": meeting?.uuid ?? null,
                "host_id": meeting?.host_id ?? null,
                "id": meeting?.id ?? null,
                "share_url": meeting?.share_url ?? null,
                "start_time": meeting.start_time !== undefined ? new Date(meeting.start_time) : null, 
                "topic": meeting?.topic ?? null,
                "total_size": meeting?.total_size ?? null
            }
        });
        dataStore.save('meeting_recordings', recordingData);
        if (next_page_token == "") {
            i++;
        }
    } while (i < userids.length);
}
async function zoomFullSync({ dataStore, client }) {
    let users = await syncUsers(dataStore, client);
    let meetings = await syncMeetings(dataStore, client, users);

    await Promise.all([
        syncMeetingsDetails(dataStore, client, meetings),
        syncMeetingInvitations(dataStore, client, meetings),
        syncRecordings(dataStore, client, users)
    ])
}

async function zoomIncSync({ client, dataStore, latestSynchronizationTime }) {
    const users = await syncUsers(dataStore, client)
    let meetingdetails = await incSyncMeetings(dataStore, client, users, latestSynchronizationTime)
    await Promise.all([
        syncMeetingsDetails(dataStore, client, meetingdetails),
        syncMeetingInvitations(dataStore, client, meetingdetails)
    ])
}

async function incSyncMeetings(dataStore, client, users, latestSynchronizationTime) {
    let i = 0;
    let meetingDetails = new Map();
    let next_page_token = "";
    let page_size = 200;
    do {
        const meetingResponse = await client.fetch(`users/${users[i].userid}/meetings?type=upcoming&next_page_token=${next_page_token}&page_size=${page_size}`);
        const { responseBody, errorMessage, errorStatus } = await validateResponse(meetingResponse)
        if (errorStatus) {
            console.log(JSON.stringify(responseBody), errorMessage)
            throw new Error(errorMessage)
        }
        next_page_token = responseBody.next_page_token ?? "";
        let meetingsData = (responseBody?.meetings ?? []).filter(meeting => {
            if ((meeting.type == ONETIMEMEETING || meeting.type == RECURRINGMEETING) && moment(meeting.created_at).isAfter(latestSynchronizationTime)) {
                return true;
            }
        }).map(meeting => {
            meetingDetails.set(meeting.id, users[i].email)
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
    } while (i < users.length)
    return meetingDetails
}



//Defining Actions Methods
async function createMeeting({ dataStore, client, actionParameters }) {
    let meetingDetails;
    let alternative_hosts = actionParameters.alternative_hosts1;
    if (actionParameters.alternative_hosts2 != null) {
        alternative_hosts += ',' + actionParameters.alternative_hosts2;
    }
    const createMeetingResponse = await client.fetch(`users/${actionParameters.userid}/meetings`, {
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
    const { responseBody, errorMessage, errorStatus } = await validateResponse(createMeetingResponse)
    if (errorStatus) {
        console.log(JSON.stringify(responseBody), errorMessage)
        throw new Error(errorMessage)
    }

    meetingDetails = new Map([[responseBody.id, actionParameters.host_email]]);
    await Promise.all([
        syncMeetings(dataStore, client, [{ userid: actionParameters.userid, email: actionParameters.host_email }]),
        syncMeetingsDetails(dataStore, client, meetingDetails),
        syncMeetingInvitations(dataStore, client, meetingDetails)
    ])
}


//   Edit One Time Meeting One Co-organizer
async function editOnetimeMeeting({ dataStore, client, serviceClient, actionParameters }) {
    let meetingDetails;
    let occurrences = [];
    let alternative_hosts = actionParameters.alternative_hosts1;
    if (actionParameters.alternative_hosts2 != null) {
        alternative_hosts += ',' + actionParameters.alternative_hosts2;
    }
    if (actionParameters.previous_type == RECURRINGMEETING) {
        const recurringMeetingOccurrence = await client.fetch(`meetings/${actionParameters.meetingid}`);
        const { responseBody, errorMessage, errorStatus } = await validateResponse(recurringMeetingOccurrence)
        if (errorStatus) {
            console.log(JSON.stringify(responseBody), errorMessage)
            throw new Error(errorMessage)
        }
        occurrences = responseBody.occurrences;
    }
    const editOnetimeMeetingResponse = await client.fetch(`meetings/${actionParameters.meetingid}`, {
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
    if (!editOnetimeMeetingResponse.ok) {
        throw new Error(await editOnetimeMeetingResponse.text())
    }

    if (actionParameters.previous_type == RECURRINGMEETING && actionParameters.type == RECURRINGMEETING && actionParameters.r_type == actionParameters.pre_rtype && !(moment(actionParameters.start_time).isSame(actionParameters.prev_start_time))) {
        updateMeetingOccurrences(actionParameters, occurrences, dataStore);
    }
    // meetingset = new Set([meeting.id]);
    detectTypeChange(actionParameters, occurrences, dataStore);
    meetingDetails = new Map([[actionParameters.meetingid, actionParameters.host_email]]);
    await Promise.all([
        syncMeetings(dataStore, serviceClient, [{ userid: actionParameters.Userid, email: actionParameters.host_email }]),
        syncMeetingsDetails(dataStore, client, meetingDetails),
        syncMeetingInvitations(dataStore, client, meetingDetails)
    ])
}


async function editRecurringMeeting({ dataStore, client, actionParameters }) {
    let meetingDetails;
    const editRecurringMeetingResponse = await client.fetch(`meetings/${actionParameters.meetingid}?occurrence_id=${actionParameters.occurrence_id}`, {
        method: "PATCH",
        body: JSON.stringify({
            start_time: actionParameters.start_time,
            duration: actionParameters.duration
        })
    })
    //here response code is 204, so normally there will be no response.
    if (!editRecurringMeetingResponse.ok) {
        throw new Error(await editRecurringMeetingResponse.text())
    }
    meetingDetails = new Map([[actionParameters.meetingid, actionParameters.host_email]]);

    await Promise.all([
        syncMeetings(dataStore, client, [{ userid: actionParameters.userid, email: actionParameters.host_email }]),
        syncMeetingsDetails(dataStore, client, meetingDetails),
        syncMeetingInvitations(dataStore, client, meetingDetails)
    ])
}


//Here are have to explicitly convert the Data Type to Number as we are getting the meetnigid as a String from microapp page.
function detectTypeChange(actionParameters, meetingDetail, dataStore) {
    if (actionParameters.previous_type != actionParameters.type) {
        if (actionParameters.type == ONETIMEMEETING) {
            changeData(dataStore, meetingDetail, actionParameters)
        }
        else if (actionParameters.type == RECURRINGMEETING) {
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
            changeData(dataStore, meetingDetail, actionParameters)
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
function changeData(dataStore, meetingDetail, actionParameters) {
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
                    { name: "total_size", type: "DOUBLE" },
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
                { name: "end_times", type: "STRING" },
                { name: "mx", type: "STRING" },
                { name: "type", type: "STRING" },
                { name: "duration", type: "STRING" },
                { name: "start_time", type: "STRING" },
                { name: "ar", type: "STRING" },
                { name: "password", type: "STRING" },
                { name: "au", type: "STRING" },
                { name: "alternative_hosts1", type: "STRING" },
                { name: "alternative_hosts2", type: "STRING" },
                { name: "userid", type: "STRING", required: true },
                { name: "topic", type: "STRING" },
                { name: "repeat_interval", type: "STRING" },
                { name: "monthly_day", type: "STRING" },
                { name: "r_type", type: "STRING" },
                { name: "weekly_days", type: "STRING" },
                { name: "us", type: "STRING" },
                { name: "ca", type: "STRING" },
                { name: "host_email", type: "STRING" },
            ],
            function: createMeeting,
        },
        {
            name: "editOnetimeMeeting",
            parameters: [
                { name: "end_times", type: "STRING" },
                { name: "meetingid", type: "STRING", required: true },
                { name: "mx", type: "STRING" },
                { name: "type", type: "STRING" },
                { name: "previous_type", type: "STRING" },
                { name: "duration", type: "STRING" },
                { name: "prev_start_time", type: "STRING" },
                { name: "start_time", type: "STRING" },
                { name: "ar", type: "STRING" },
                { name: "password", type: "STRING" },
                { name: "au", type: "STRING" },
                { name: "alternative_hosts1", type: "STRING" },
                { name: "alternative_hosts2", type: "STRING" },
                { name: "Userid", type: "STRING", required: true },
                { name: "topic", type: "STRING" },
                { name: "occurrence_id", type: "STRING" },
                { name: "repeat_interval", type: "STRING" },
                { name: "monthly_day", type: "STRING" },
                { name: "r_type", type: "STRING" },
                { name: "pre_rtype", type: "STRING" },
                { name: "weekly_days", type: "STRING" },
                { name: "us", type: "STRING" },
                { name: "ca", type: "STRING" },
                { name: "host_email", type: "STRING" },
            ],
            function: editOnetimeMeeting,
        },
        {
            name: "EditRecurringMeeting",
            parameters: [
                { name: "meetingid", type: "STRING", required: true },
                { name: "mx", type: "STRING" },
                { name: "type", type: "STRING" },
                { name: "userid", type: "STRING", required: true },
                { name: "duration", type: "STRING" },
                { name: "start_time", type: "STRING" },
                { name: "ar", type: "STRING" },
                { name: "password", type: "STRING" },
                { name: "au", type: "STRING" },
                { name: "topic", type: "STRING" },
                { name: "occurrence_id", type: "STRING", required: true },
                { name: "US", type: "STRING" },
                { name: "CA", type: "STRING" },
                { name: "host_email", type: "STRING" },
            ],
            function: editRecurringMeeting,
        }
    ]
});