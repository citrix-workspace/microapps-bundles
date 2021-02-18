//Loaded moment-timezone library from sdk provided libraries 
const moment = library.load('moment-timezone');

//'user' object used for pagination
let user = {
    next_page_token:"",
    page_size:100
}

//'meeting' object used for pagination
let meeting = {
    next_page_token:"",
    page_size:200
}

//'recording' object used for pagination
let recording = {
    next_page_token:"",
    page_size:50
}

// Defined the array to store the userids, that userid will be used in meetings endpoint to fetch the user specific meetings.
let userids = [];

//Defined meetingarray to store meeting id, while will be used in meeting details api call
let meetingArray = [];

// Defined the Map for storing the meetingid as key and user email as value, which is used in meeting invitations api call 
let meetingsMap = new Map();



// loading the users data
function syncUsers(dataStore,client,context){
    let userContext = [];
    do{
        let request = client.fetchSync(`/users?next_page_token=${user.next_page_token}&page_size=${user.page_size}`);
        // console.log(`users status : ${request.status}`);
        if(!request.ok){
            throw new Error(request.jsonSync());
        }
        let response = request.jsonSync();
        Object.entries(response).forEach(([key,value]) =>{
            if(key === 'next_page_token'){
                user.next_page_token=value // 
            }
            else if(key === 'users'){
                let usersData = value.map(userData =>{
                    userContext.push(userData.id);
                    let userObj = {
                        "userid":userData.id,
                        "first_name":userData.first_name,
                        "last_name":userData.last_name,
                        "email":userData.email,
                        "timezone":userData.timezone,
                        "last_login_time":moment.utc(userData.last_login_time).toDate()
                    }
                    userids.push(userObj); //storing the user data in array to be used in child endpoints
                    return userObj;
                })
                dataStore.save("users",usersData);
            }
        });
    }while(user.next_page_token!="");
    context.user = userContext.toString();
}

//loading the meetings data (Upcoming Meetings)
function syncMeetings(dataStore,client,userId=[]){
    let i = 0;
    let array = [];
    //definig login to distinguish between fullsync and data update after action, as userId array is passed while performing data update after action
    if(userId.length>0){
       array = userId;
    }
    else{
        array = userids;
    }
    do{
        let response = client.fetchSync(`users/${array[i].userid}/meetings?type=upcoming&next_page_token=${meeting.next_page_token}&page_size=${meeting.page_size}`);
        // console.log(`${userids[i]} status : ${response.status}`);
        if(!response.ok){
            throw new Error(response.jsonSync());
        }
        let responseData = response.jsonSync();
        meeting.next_page_token = responseData['next_page_token'];
        let meetings = responseData.meetings;
        let data = meetings.map(meeting =>{
            if(userId.length == 0){
                meetingArray.push(meeting.id);
            }
            else{
                meetingArray.push(array[i].meetingid)
            }
            return {
                "uuid":meeting.uuid,
                "id":Number(meeting.id),
                "host_id":meeting.host_id,
                "topic":meeting.topic,
                "type":parseInt(meeting.type),
                "start_time":moment.utc(meeting.start_time).toDate(),
                "duration":parseInt(meeting.duration),
                "timezone":meeting.timezone,
                "created_at":moment.utc(meeting.created_at).toDate(),
                "join_url":meeting.join_url,
            }
        });
        dataStore.save('meetings',data);
        if(meeting.next_page_token == ""){
            i++;
        }
    }while(i<array.length);

    //Removing the duplicate meetingids from the array
    let meetingSet = new Set(meetingArray);
    meetingArray = [...meetingSet];
}
//Loading the meetings details from zoom SOR to cache db
function syncMeetingsDetails(dataStore,client){
    let dialInNumbersRecurringcounter = 0;
    let dialIncounter = 0;
    let dialInNumberscounter= 0;
    let occurrenceDatacounter = 0;
    let dialInRecurringcounter = 0;
    for (const meetingid of meetingArray) {
        let response = client.fetchSync(`meetings/${meetingid}`)
        // console.log(`${meetingid} status : ${response.status}`);
        if(!response.ok){
            throw new Error(response.jsonSync());
        }
        let meeting = response.jsonSync();
        //Setting the meetingsmap with meetingid as key and email as value to be used in Meeting Invitations API call
        meetingsMap.set(meeting.id,{email:meeting.host_email})
        //if meeting is a onetime(2) meeting
        if(meeting.type == 2){
            let onetime = {
                "created_at":moment.utc(meeting.created_at).toDate(),
                "duration":Number(meeting.duration),
                "host_id":meeting.host_id,
                "host_email":meeting.host_email,
                "id":Number(meeting.id),
                "join_url":meeting.join_url,
                "password":meeting.password,
                "settings_alternative_host":meeting.settings.alternative_hosts,
                "start_time":moment.utc(meeting.start_time).toDate(),
                "start_url":meeting.start_url,
                "timezone":meeting.timezone,
                "topic":meeting.topic,
                "type":Number(meeting.type),
                "recurrence_weekly_days":null,
                "recurrence_monthly_day":null,
                "visibility":Boolean(true)
            }

            //storing occurrences of recurring meeting 
            let dialIn = meeting.settings.global_dial_in_countries.map(country => {
                return {
                    "value":country,
                    "unique_id":(++dialIncounter).toString(),
                    "parent_id":meeting.id,
                    "root_id":meeting.id
                }
            })
            
            // storing numbers of dial_in countries 
            let dialInNumbers = meeting.settings.global_dial_in_numbers.map(number =>{
                
                return {
                    "country":number.country,
                    "number":number.number,
                    "country_name":number.country_name,
                    "type":number.type,
                    "unique_id":(++dialInNumberscounter).toString(),
                    "parent_id":meeting.id,
                    "root_id":meeting.id
                }
            })
            dataStore.save('meeting_details_one_time',onetime)
            dataStore.save('meeting_details_one_t_1',dialIn);
            dataStore.save('meeting_details_one_t_2',dialInNumbers);
        }
        //if meeting type is recurring(8)
        else if(meeting.type == 8){
            let recurring = "";

            //if recurrence type is daily(1)
            if(meeting.recurrence.type == 1){
                recurring = {
                    "created_at":moment.utc(meeting.created_at).toDate(),
                    "duration":Number(meeting.duration),
                    "host_id":meeting.host_id,
                    "host_email":meeting.host_email,
                    "id":Number(meeting.id),
                    "join_url":meeting.join_url,
                    "password":meeting.password,
                    "recurrence_end_times":meeting.recurrence.end_times,
                    "recurrence_repeat_interva":meeting.recurrence.repeat_interval,
                    "recurrence_type":meeting.recurrence.type,
                    "settings_alternative_host":meeting.settings.alternative_hosts,
                    "start_url":meeting.start_url,
                    "timezone":meeting.timezone,
                    "topic":meeting.topic,
                    "type":Number(meeting.type),
                    "visibility":Boolean(true)
                }
            }

            //if recurrence type is weekly(2)
            else if(meeting.recurrence.type == 2){
                recurring = {
                    "created_at":moment.utc(meeting.created_at).toDate(),
                    "duration":Number(meeting.duration),
                    "host_id":meeting.host_id,
                    "host_email":meeting.host_email,
                    "id":Number(meeting.id),
                    "join_url":meeting.join_url,
                    "password":meeting.password,
                    "recurrence_end_times":meeting.recurrence.end_times,
                    "recurrence_repeat_interva":meeting.recurrence.repeat_interval,
                    "recurrence_type":meeting.recurrence.type,
                    "recurrence_weekly_days":meeting.recurrence.weekly_days,
                    "settings_alternative_host":meeting.settings.alternative_hosts,
                    "start_url":meeting.start_url,
                    "timezone":meeting.timezone,
                    "topic":meeting.topic,
                    "type":Number(meeting.type),
                    "visibility":Boolean(true)
                }
            }

            //if recurrence type is monthly(3)
            else if(meeting.recurrence.type == 3){
                recurring = {
                    "created_at":moment.utc(meeting.created_at).toDate(),
                    "duration":Number(meeting.duration),
                    "host_id":meeting.host_id,
                    "host_email":meeting.host_email,
                    "id":Number(meeting.id),
                    "join_url":meeting.join_url,
                    "password":meeting.password,
                    "recurrence_end_times":meeting.recurrence.end_times,
                    "recurrence_repeat_interva":meeting.recurrence.repeat_interval,
                    "recurrence_type":meeting.recurrence.type,
                    "recurrence_monthly_day":meeting.recurrence.monthly_day,
                    "settings_alternative_host":meeting.settings.alternative_hosts,
                    "start_url":meeting.start_url,
                    "timezone":meeting.timezone,
                    "topic":meeting.topic,
                    "type":Number(meeting.type),
                    "visibility":Boolean(true)  
                }
            }
            
            //storing occurrences of recurring meeting 
            let occurrenceData = meeting.occurrences.map(occurrence=>{
                return{
                    "duration":occurrence.duration,
                    "occurrence_id":Number(occurrence.occurrence_id),
                    "meetingId":Number(meeting.id),
                    "start_time":moment.utc(occurrence.start_time).toDate(),
                    "parent_id":Number(meeting.id),
                    "visibility":Boolean(true)
                }
            })
            
            //storing Dial-in Countries of a meeting
            let dialInRecurring = meeting.settings.global_dial_in_countries.map(country => {
                return {
                    "value":country,
                    "unique_id":(++dialInRecurringcounter).toString(),
                    "parent_id":meeting.id,
                    "root_id":meeting.id
                }
            })
            
            // storing numbers of dial_in countries 
            let dialInNumbersRecurring = meeting.settings.global_dial_in_numbers.map(number =>{
                return {
                    "country":number.country,
                    "number":number.number,
                    "country_name":number.country_name,
                    "type":number.type,
                    "unique_id":(++dialInNumbersRecurringcounter).toString(),
                    "parent_id":meeting.id,
                    "root_id":meeting.id
                }
            })

            //Storing the data to the cache DB            
            dataStore.save('meeting_details_recurring',recurring);
            dataStore.save('meeting_details_recur_1',occurrenceData);
            dataStore.save('meeting_details_recur_2',dialInRecurring);
            dataStore.save('meeting_details_recur_3',dialInNumbersRecurring);
        }
    }
}

// Loading the Meeting's Invitation
function syncMeetingInvitations(dataStore,client){
    //traversing through the meetingMap to get meeting id as key and email as value
    for(const [meeting,user] of meetingsMap.entries()){
        let invitationreq = client.fetchSync(`meetings/${meeting}/invitation`);
        if(!invitationreq.ok){
            throw new Error(invitationreq.jsonSync());
        }
        let invitationres = invitationreq.jsonSync();
        dataStore.save("meeting_invitations",{
            "id":meeting,
            "invitation":invitationres.invitation,
            "users_email":user.email
        })
    }
}

function syncRecordings(dataStore,client){
    let i = 0;
    //defining the 7 days window to fetch the recordings data for an user
    let to = moment().utc().format();
    let from = moment().subtract(7, 'days').utc().format();

    do{
        let response = client.fetchSync(`users/${userids[i].userid}/recordings?from=${from}&to=${to}&next_page_token=${recording.next_page_token}&page_size=${recording.page_size}`);
        // console.log(`${userids[i].id} status : ${response.status}`);
        if(!response.ok){
            throw new Error(response.jsonSync());
        }
        let responseData = response.jsonSync();
        recording.next_page_token = responseData['next_page_token'];
        let recordings = responseData.meetings;
        let recordDatacounter = 0;
        let data = recordings.map(meeting =>{
            let recordData = meeting.recording_files.map(rec =>{
                return {
                    "download_url":rec.download_url,
                    "id":rec.id,
                    "meeting_id":rec.meeting_id,
                    "play_url":rec.play_url,
                    "recording_end":moment(rec.recording_end).isValid()?moment.utc(rec.recording_end).toDate():null,
                    "recording_start":moment(rec.recording_start).isValid()?moment.utc(rec.recording_start).toDate():null,
                    "recording_type":rec.recording_type,
                    "parent_id":meeting.id,
                    "parent_uuid":meeting.uuid,
                    "parent_start_time":moment.utc(meeting.start_time).toDate(),
                    "root_id":meeting.id,
                    "root_uuid":meeting.uuid,
                    "root_start_time":moment.utc(meeting.start_time).toDate(),
                    "unique_id":(++recordDatacounter).toString()                    
                }
            })
            dataStore.save("meeting_recordings_record",recordData);
            return {
                "uuid":meeting.uuid,
                "host_id":meeting.host_id,
                "id":Number(meeting.id),
                "share_url":meeting.share_url,
                "start_time":moment.utc(meeting.start_time).toDate(),
                "topic":meeting.topic,
                "total_size":Number(meeting.total_size),
                "users_email":userids[i].email,
                "users_first_name":userids[i].first_name,
                "users_last_name":userids[i].last_name,
            }
        });
        dataStore.save('meeting_recordings',data);
        if(recording.next_page_token == ""){
            i++;
        }
    }while(i<userids.length);
}
const zoomFullSync = name =>({dataStore,client,context})=>{
    //Loading Users Data using /users endpoint
    console.log(`${name} sync started`); 
    syncUsers(dataStore,client,context);
    console.log("users sync completed");
    
    //Loading the user's upcoming meetings
    console.log(`${name} upcoming meetings sync started`);
    syncMeetings(dataStore,client);
    console.log(`${name} upcoming meetings sync completed`);
    
     //Loading Meeting Details
    console.log(`${name} meetings details sync started`);
    syncMeetingsDetails(dataStore,client);
    console.log(`${name} meetings details sync completed`);

    //Loading meeting Invitations
    console.log(`${name} meetings invitation sync started`);
    syncMeetingInvitations(dataStore,client);
    console.log(`${name} meetings invitation sync completed`);

     //Loading Recording Details
    console.log(`${name} meetings recording sync started`);
    syncRecordings(dataStore,client);
    console.log(`${name} meetings recording sync completed`);
}

function zoomIncSync({client,dataStore,latestSynchronizationTime,context}){
    let userids = context.user.split(',')
    console.log('inside sync');
    let i = 0;
    do{
        let response = client.fetchSync(`users/${userids[i]}/meetings?type=upcoming&next_page_token=${meeting.next_page_token}&page_size=${meeting.page_size}`);
        // console.log(`${userids[i]} status : ${response.status}`);
        if(!response.ok){
            throw new Error(response.jsonSync());
        }
        let responseData = response.jsonSync();
        meeting.next_page_token = responseData['next_page_token'];
        let meetings = responseData.meetings.filter(meeting => {
            if(moment(meeting.created_at).isAfter(String(latestSynchronizationTime))){
                meetingArray.push(meeting.id);
                return true;
            }
        });
        let data = meetings.map(meeting =>{
            return {
                "uuid":meeting.uuid,
                "id":Number(meeting.id),
                "host_id":meeting.host_id,
                "topic":meeting.topic,
                "type":parseInt(meeting.type),
                "start_time":moment.utc(meeting.start_time).toDate(),
                "duration":parseInt(meeting.duration),
                "timezone":meeting.timezone,
                "created_at":moment.utc(meeting.created_at).toDate(),
                "join_url":meeting.join_url
            }
        });
        dataStore.save('meetings',data);
        if(meeting.next_page_token == ""){
            i++;
        }
    }while(i<userids.length)
    let meetingSet = new Set(meetingArray);
    meetingArray = [...meetingSet];

    syncMeetingsDetails(dataStore,client);
    syncMeetingInvitations(dataStore,client);
}



//Defining Actions Methods
function createMeeting({dataStore, client, actionParameters}){
    const request = client.fetchSync(`users/${actionParameters.Userid}/meetings`, {
        method : "POST",
        body : JSON.stringify({
            topic:actionParameters.topic,
            type : actionParameters.type,
            start_time: actionParameters.start_time,
            duration :actionParameters.duration,
            password : actionParameters.password,
            recurrence : {
                type : actionParameters.r_type,
                repeat_interval:actionParameters.repeat_interval,
                weekly_days : actionParameters.weekly_days,
                monthly_day : actionParameters.monthly_day,
                end_times : actionParameters.end_times,
            },
            settings : {
                alternative_hosts : actionParameters.alternative_hosts,
                global_dial_in_countries : [actionParameters.us,actionParameters.mx,actionParameters.ar,actionParameters.au,actionParameters.ca]
            }
        })
    })
    if(request.ok){
        let meeting = request.jsonSync();
        // console.log(JSON.stringify(meeting.host_email));
        syncMeetings(dataStore,client,[{meetingid:meeting.id,userid:actionParameters.Userid,email:meeting.host_email}]);
        syncMeetingsDetails(dataStore,client);
        syncMeetingInvitations(dataStore,client); 
    }
}

//   Create Meeting Fucntion with two co-organizers

function createMeetingtwoorganizers({dataStore, client, actionParameters}){
    const request = client.fetchSync(`users/${actionParameters.Userid}/meetings`, {
        method : "POST",
        body : JSON.stringify({
            topic:actionParameters.topic,
            type : actionParameters.type,
            start_time: actionParameters.start_time,
            duration :actionParameters.duration,
            password : actionParameters.password,
            recurrence : {
                type : actionParameters.r_type,
                repeat_interval:actionParameters.repeat_interval,
                weekly_days : actionParameters.weekly_days,
                monthly_day : actionParameters.monthly_day,
                end_times : actionParameters.end_times,
            },
            settings : {
                alternative_hosts : `${actionParameters.alternative_hosts1},${actionParameters.alternative_hosts2}`,
                global_dial_in_countries : [actionParameters.us,actionParameters.mx,actionParameters.ar, actionParameters.au,actionParameters.ca]
            }
        })
    })
    if(request.ok){
        let meeting = request.jsonSync();
        // console.log(JSON.stringify(meeting.host_email));
        syncMeetings(dataStore,client,[{meetingid:meeting.id,userid:actionParameters.Userid,email:meeting.host_email}]);
        syncMeetingsDetails(dataStore,client);
        syncMeetingInvitations(dataStore,client);
    }
}

//   Edit One Time Meeting One Co-organizer
function editmeetingonecoorganizer({dataStore, client, actionParameters}){
    let meetingDetail = client.fetchSync(`meetings/${actionParameters.meetingid}`).jsonSync().occurrences;
    const request = client.fetchSync(`meetings/${actionParameters.meetingid}`, {
        method : "PATCH",
        body : JSON.stringify({
            topic:actionParameters.topic,
            type : actionParameters.type,
            start_time: actionParameters.start_time,
            duration :actionParameters.duration,
            password : actionParameters.password,
            recurrence : {
                type : actionParameters.r_type,
                repeat_interval:actionParameters.repeat_interval,
                weekly_days : actionParameters.weekly_days,
                monthly_day : actionParameters.monthly_day,
                end_times : actionParameters.end_times,
            },
            settings : {
                alternative_hosts : actionParameters.alternative_hosts,
                global_dial_in_countries : [actionParameters.us,actionParameters.mx,actionParameters.ar, actionParameters.au,actionParameters.ca]
            }
        })
    })
    if(request.ok){
        if(actionParameters.previous_type == 8 && actionParameters.type == 8 && actionParameters.r_type == actionParameters.pre_rtype && !(moment(actionParameters.start_time).isSame(actionParameters.prev_start_time))){
            updateMeetingOccurrences(actionParameters,meetingDetail,dataStore);
        }
        detectTypeChange(actionParameters,meetingDetail,dataStore);
        syncMeetings(dataStore,client,[{meetingid:actionParameters.meetingid,userid:actionParameters.Userid}]);
        syncMeetingsDetails(dataStore,client);
        syncMeetingInvitations(dataStore,client);
    }
}

//   Edit One-time meeting Fucntion with two co-organizers
function editonetimemeetingtwocoorg({dataStore, client, actionParameters}){
    let meetingDetail;
    if(actionParameters.type == 8){
        meetingDetail = client.fetchSync(`meetings/${actionParameters.meetingid}`).jsonSync().occurrences;
    }
    const request = client.fetchSync(`meetings/${actionParameters.meetingid}`, {
        method : "PATCH",
        body : JSON.stringify({
            topic:actionParameters.topic,
            type : actionParameters.type,
            start_time: actionParameters.start_time,
            duration :actionParameters.duration,
            password : actionParameters.password,
            recurrence : {
                type : actionParameters.r_type,
                repeat_interval:actionParameters.repeat_interval,
                weekly_days : actionParameters.weekly_days,
                monthly_day : actionParameters.monthly_day,
                end_times : actionParameters.end_times,
            },
            settings : {
                alternative_hosts : `${actionParameters.alternative_hosts1},${actionParameters.alternative_hosts2}`,
                global_dial_in_countries : [actionParameters.us,actionParameters.mx,actionParameters.ar, actionParameters.au,actionParameters.ca]
            }
        })
    })
    if(request.ok){
        if(actionParameters.previous_type == 8 && actionParameters.type == 8 && actionParameters.r_type == actionParameters.pre_rtype && actionParameters.start_time != actionParameters.prev_start_time){
            updateMeetingOccurrences(actionParameters,meetingDetail,dataStore);
        }
        detectTypeChange(actionParameters,meetingDetail,dataStore);
        syncMeetings(dataStore,client,[{meetingid:actionParameters.meetingid,userid:actionParameters.Userid}]);
        syncMeetingsDetails(dataStore,client);
        syncMeetingInvitations(dataStore,client);
    }
}

function EditRecurringWithTwoCoOrganizers({dataStore, client, actionParameters}){
    const request = client.fetchSync(`meetings/${actionParameters.meetingid}?occurrence_id=${actionParameters.occurrence_id}/`, {
        method : "PATCH",
        body : JSON.stringify({
            topic:actionParameters.topic,
            type : actionParameters.type,
            start_time: actionParameters.start_time,
            duration :actionParameters.duration,
            password : actionParameters.password,
            settings : {
                alternative_hosts : [`${actionParameters.alternative_hosts1},${actionParameters.alternative_hosts2}`],
                global_dial_in_countries : [actionParameters.US,actionParameters.CA,actionParameters.mx,actionParameters.au,actionParameters.ar]
            }
        })
    })
    if(request.ok){
        syncMeetings(dataStore,client,[{meetingid:actionParameters.meetingid,userid:actionParameters.userid}]);
        syncMeetingsDetails(dataStore,client);
        syncMeetingInvitations(dataStore,client);
    }
 }

 function EditRecurringOneCoOrganizer({dataStore, client, actionParameters}){
    const request = client.fetchSync(`meetings/${actionParameters.meetingid}?occurrence_id=${actionParameters.occurrence_id}`, {
        method : "PATCH",
        body : JSON.stringify({
            start_time: actionParameters.start_time,
            duration :actionParameters.duration
        })
    })
    if(request.ok){
        syncMeetings(dataStore,client,[{meetingid:actionParameters.meetingid,userid:actionParameters.userid}]);
        syncMeetingsDetails(dataStore,client);
        syncMeetingInvitations(dataStore,client);
    }
 }

 function detectTypeChange(actionParameters,meetingDetail,dataStore){
    if(actionParameters.previous_type != actionParameters.type){
        if(actionParameters.type == 2){                
            let occurrenceData = meetingDetail.map(occurrence=>{
                return{
                    "duration":occurrence.duration,
                    "occurrence_id":Number(occurrence.occurrence_id),
                    "meetingId":Number(actionParameters.meetingid),
                    "start_time":moment.utc(occurrence.start_time).toDate(),
                    "parent_id":Number(actionParameters.meetingid),
                    "visibility":Boolean(false),
                }
            })
            dataStore.save('meeting_details_recur_1',occurrenceData);
            let recurring = {
                "host_id":actionParameters.Userid,
                "id":Number(actionParameters.meetingid),
                "topic":actionParameters.topic,
                "type":Number(actionParameters.type),
                "visibility":Boolean(false),
            }
            dataStore.save('meeting_details_recurring',recurring);
        }
        else if(actionParameters.type == 8){
            let onetime = {
                "host_id":actionParameters.Userid,
                "id":Number(actionParameters.meetingid),
                "topic":actionParameters.topic,
                "type":Number(actionParameters.type),
                "visibility":Boolean(false),
            }
            dataStore.save('meeting_details_one_time',onetime);
        }
    }
    else{
        if(actionParameters.pre_rtype != actionParameters.r_type){
            let occurrenceData = meetingDetail.map(occurrence=>{
                return{
                    "duration":occurrence.duration,
                    "occurrence_id":Number(occurrence.occurrence_id),
                    "meetingId":Number(actionParameters.meetingid),
                    "start_time":moment.utc(occurrence.start_time).toDate(),
                    "parent_id":Number(actionParameters.meetingid),
                    "visibility":Boolean(false),
                }
            })
            dataStore.save('meeting_details_recur_1',occurrenceData);
            let recurring = {
                "host_id":actionParameters.Userid,
                "id":Number(actionParameters.meetingid),
                "topic":actionParameters.topic,
                "type":Number(actionParameters.type),
                "visibility":Boolean(false),
            }
            dataStore.save('meeting_details_recurring',recurring);
        }
    }
 }

function updateMeetingOccurrences(actionParameters,meetingDetail,dataStore){
    let occurrenceData = meetingDetail.map(occurrence=>{
        return{
            "duration":occurrence.duration,
            "occurrence_id":Number(occurrence.occurrence_id),
            "meetingId":Number(actionParameters.meetingid),
            "start_time":moment.utc(occurrence.start_time).toDate(),
            "parent_id":Number(actionParameters.meetingid),
            "visibility":Boolean(false),
        }
    })
    dataStore.save('meeting_details_recur_1',occurrenceData);
}

integration.define({
    synchronizations:[
        {
            name:"zoomFullSync",
            fullSyncFunction : zoomFullSync('zoom'),
            incrementalSyncFunction: zoomIncSync,
        }
    ],
    model:{
        tables : [
            {
                "name":"meetings",
                columns:[
                    {name:"uuid",type:"STRING",length:255},
                    {name:"id",type:"LONG",primaryKey:true},
                    {name:"host_id",type:"STRING",length:255},
                    {name:"topic",type:"STRING",length:255},
                    {name:"type",type:"INTEGER"},
                    {name:"start_time",type:"DATETIME",primaryKey:true},
                    {name:"duration",type:"INTEGER"},
                    {name:"timezone",type:"STRING",length:255},
                    {name:"created_at",type:"DATETIME"},
                    {name:"join_url",type:"STRING",length:255},
                ],
            },
            {
                "name":"users",
                columns:[
                    {name:"userid",type:"STRING",primaryKey:true,length:255},
                    {name:"first_name",type:"STRING",length:255},
                    {name:"last_name",type:"STRING",length:255},
                    {name:"email",type:"STRING",length:255},
                    {name:"timezone",type:"STRING",length:255},
                    {name:"last_login_time",type:"DATETIME"}
                ],
            },
            {
                name:"meeting_details_one_time",
                columns:[
                    {name:"created_at", type:"DATETIME"},
                    {name:"duration", type:"INTEGER"},
                    {name:"host_id", type:"STRING",length:255},
                    {name:"host_email", type:"STRING",length:255},
                    {name:"id", type:"LONG",primaryKey:true},
                    {name:"join_url", type:"STRING",length:255},
                    {name:"password", type:"STRING",length:255},
                    {name:"settings_alternative_host", type:"STRING",length:255},
                    {name:"start_time", type:"DATETIME"},
                    {name:"start_url", type:"STRING",length:1000},
                    {name:"timezone", type:"STRING",length:255},
                    {name:"topic", type:"STRING",length:255},
                    {name:"type", type:"INTEGER"},
                    {name:"recurrence_monthly_day", type:"INTEGER"},
                    {name:"recurrence_weekly_days", type:"STRING",length:255},
                    {name:"visibility", type:"BOOLEAN"},
                ],
            },
            {
                name:"meeting_details_one_t_1",
                columns:[
                    {name:"value", type:"STRING",length:255},
                    {name:"unique_id", type:"STRING",length:255,primaryKey:true},
                    {name:"parent_id", type:"LONG"},
                    {name:"root_id", type:"LONG"},
                ],
            },
            {
                name:"meeting_details_one_t_2",
                columns:[
                    {name:"country", type:"STRING",length:255},
                    {name:"number", type:"STRING",length:255},
                    {name:"country_name", type:"STRING",length:255},
                    {name:"type", type:"STRING",length:255},
                    {name:"unique_id", type:"STRING",length:255,primaryKey:true},
                    {name:"parent_id", type:"LONG"},
                    {name:"root_id", type:"LONG"},
                ]
            },
            {
                name:"meeting_details_recurring",
                columns:[
                    {name:"created_at", type:"DATETIME"},
                    {name:"host_id", type:"STRING",length:255},
                    {name:"host_email", type:"STRING",length:255},
                    {name:"id", type:"LONG",primaryKey:true},
                    {name:"join_url", type:"STRING",length:255},
                    {name:"password", type:"STRING",length:255},
                    {name:"recurrence_end_times", type:"INTEGER"},
                    {name:"recurrence_monthly_day", type:"INTEGER"},
                    {name:"recurrence_repeat_interva", type:"INTEGER"},
                    {name:"recurrence_type", type:"INTEGER"},
                    {name:"recurrence_weekly_days", type:"STRING",length:255},
                    {name:"settings_alternative_host", type:"STRING",length:255},
                    {name:"start_url", type:"STRING",length:1000},
                    {name:"timezone", type:"STRING",length:255},
                    {name:"topic", type:"STRING",length:255},
                    {name:"type", type:"INTEGER"},
                    {name:"visibility", type:"BOOLEAN"},
                ],
            },
            {
                name:"meeting_details_recur_1",
                columns:[
                    {name:"duration", type:"INTEGER"},
                    {name:"meetingId", type:"LONG", primaryKey:true},
                    {name:"occurrence_id", type:"LONG", primaryKey:true},
                    {name:"start_time", type:"DATETIME"},
                    {name:"parent_id", type:"LONG"},
                    {name:"visibility", type:"BOOLEAN"},
                ],
            },
            {
                name:"meeting_details_recur_2",
                columns:[
                    {name:"value", type:"STRING",length:255},
                    {name:"unique_id", type:"STRING",length:255,primaryKey:true},
                    {name:"parent_id", type:"LONG"},
                    {name:"root_id", type:"LONG"},
                ],
            },
            {
                name:"meeting_details_recur_3",
                columns:[
                    {name:"country", type:"STRING",length:255},
                    {name:"number", type:"STRING",length:255},
                    {name:"country_name", type:"STRING",length:255},
                    {name:"type", type:"STRING",length:255},
                    {name:"unique_id", type:"STRING",length:255,primaryKey:true},
                    {name:"parent_id", type:"LONG"},
                    {name:"root_id", type:"LONG"},
                ]
            },
            {
                name:"meeting_invitations",
                columns:[
                    {name:"id",type:"LONG",primaryKey:true},
                    {name:"invitation",type:"STRING",length:3000},
                    {name:"users_email",type:"STRING",length:255}
                ]
            },
            {
                name:"meeting_recordings",
                columns:[
                    {name:"host_id", type:"STRING",length:255},
                    {name:"id", type:"LONG",primaryKey:true},
                    {name:"share_url", type:"STRING",length:255},
                    {name:"start_time", type:"DATETIME",primaryKey:true},
                    {name:"topic", type:"STRING",length:255},
                    {name:"total_size", type:"INTEGER"},
                    {name:"users_email", type:"STRING",length:255},
                    {name:"users_first_name", type:"STRING",length:255},
                    {name:"users_last_name", type:"STRING",length:255},
                    {name:"uuid", type:"STRING",length:255,primaryKey:true}
                ]
            },
            {
                name:"meeting_recordings_record",
                columns:[
                    {name:"download_url", type:"STRING",length:255},
                    {name:"id", type:"STRING", length:255,primaryKey:true},
                    {name:"meeting_id", type:"STRING", length:255,primaryKey:true},
                    {name:"play_url", type:"STRING",length:255},
                    {name:"recording_end", type:"DATETIME"},
                    {name:"recording_start", type:"DATETIME"},
                    {name:"recording_type", type:"STRING",length:255},
                    {name:"parent_id", type:"LONG"},
                    {name:"parent_uuid", type:"STRING",length:255},
                    {name:"parent_start_time", type:"DATETIME"},
                    {name:"root_id", type:"LONG"},
                    {name:"root_uuid", type:"STRING",length:255},
                    {name:"root_start_time", type:"DATETIME"},
                    {name:"unique_id", type:"STRING",length:255,primaryKey:true},
                ]
            },
        ],
        relationships:[
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
        ],
    },
    actions:[
        {
            name: "createMeeting",
            parameters: [
              { name: "end_times", type: "STRING", length: 255 },
              { name: "mx", type: "STRING", length:255 },
              { name: "type", type: "STRING", length:255 },
              { name: "duration", type: "STRING", length:255 },
              { name: "start_time", type: "STRING", length: 255 },
              { name: "ar", type: "STRING", length:255 },
              { name: "password", type: "STRING", length: 255 },
              { name: "au", type: "STRING", length: 255},
              { name: "alternative_hosts", type: "STRING", length: 255},
              { name: "Userid", type: "STRING", required: true , length: 255},
              { name: "topic", type: "STRING", length: 255},
              { name: "repeat_interval", type: "STRING", length: 255},
              { name: "monthly_day", type: "STRING", length: 255},
              { name: "r_type", type: "STRING", length: 255},
              { name: "weekly_days", type: "STRING", length: 255},
              { name: "us", type: "STRING", length: 255},
              { name: "ca", type: "STRING", length: 255},
            ],
            function: createMeeting,
        },
        {
            name: "createMeetingtwoorganizers",
            parameters: [
              { name: "end_times", type: "STRING", length: 255 },
              { name: "mx", type: "STRING", length:255 },
              { name: "type", type: "STRING",  length:255 },
              { name: "duration", type: "STRING", length:255 },
              { name: "start_time", type: "STRING", length: 255 },
              { name: "ar", type: "STRING", length:255 },
              { name: "password", type: "STRING", length: 255 },
              { name: "au", type: "STRING", length: 255},
              { name: "alternative_hosts1", type: "STRING", length: 255},
              { name: "alternative_hosts2", type: "STRING", length: 255},
              { name: "Userid", type: "STRING", required: true , length: 255},
              { name: "topic", type: "STRING", length: 255},
              { name: "repeat_interval", type: "STRING", length: 255},
              { name: "monthly_day", type: "STRING", length: 255},
              { name: "r_type", type: "STRING",  length: 255},
              { name: "weekly_days", type: "STRING", length: 255},
              { name: "us", type: "STRING", length: 255},
              { name: "ca", type: "STRING", length: 255},
            ],
            function: createMeetingtwoorganizers,
        },
        {
            name: "editoneTimemeetingonecoorg",
            parameters: [
              { name: "end_times", type: "STRING",length: 255 },
              { name: "meetingid", type: "STRING", required: true, length:255},
              { name: "mx", type: "STRING", length:255 },
              { name: "type", type: "STRING",length:255 },
              { name: "previous_type", type: "STRING",length:255 },
              { name: "duration", type: "STRING",length:255 },
              { name: "prev_start_time", type: "STRING",length:255 },
              { name: "start_time", type: "STRING",length:255},
              { name: "ar", type: "STRING",length:255 },
              { name: "password", type: "STRING", length: 255 },
              { name: "au", type: "STRING", length: 255},
              { name: "alternative_hosts", type: "STRING", length: 255},
              { name: "Userid", type: "STRING", required: true , length: 255},
              { name: "topic", type: "STRING", length: 255},
              { name: "occurrence_id", type: "STRING" , length: 255},
              { name: "repeat_interval", type: "STRING", length: 255},
              { name: "monthly_day", type: "STRING" , length: 255},
              { name: "r_type", type: "STRING", length: 255},
              { name: "pre_rtype", type: "STRING", length: 255},
              { name: "weekly_days", type: "STRING", length: 255},
              { name: "us", type: "STRING", length: 255},
              { name: "ca", type: "STRING", length: 255},
            ],
            function: editmeetingonecoorganizer,
        },
        {
            name: "editonetimemeetingtwocoorg",
            parameters: [
              { name: "end_times", type: "STRING", length: 255 },
              { name: "meetingid", type: "STRING", required: true, length:255},
              { name: "mx", type: "STRING", length:255 },
              { name: "type", type: "STRING",length:255 },
              { name: "previous_type", type: "STRING",length:255 },
              { name: "duration", type: "STRING", length:255 },
              { name: "prev_start_time", type: "STRING",length:255 },
              { name: "start_time", type: "STRING",length:255},
              { name: "occurrence_id", type: "STRING",length:255},
              { name: "ar", type: "STRING", length:255 },
              { name: "password", type: "STRING", length: 255 },
              { name: "au", type: "STRING",  length: 255},
              { name: "alternative_hosts1", type: "STRING", length: 255},
              { name: "alternative_hosts2", type: "STRING", length: 255},
              { name: "Userid", type: "STRING", required: true , length: 255},
              { name: "topic", type: "STRING" , length: 255},
              { name: "repeat_interval", type: "STRING", length: 255},
              { name: "monthly_day", type: "STRING",  length: 255},
              { name: "r_type", type: "STRING" , length: 255},
              { name: "pre_rtype", type: "STRING", length: 255},
              { name: "weekly_days", type: "STRING" , length: 255},
              { name: "us", type: "STRING", length: 255},
              { name: "ca", type: "STRING", length: 255},
            ],
            function: editonetimemeetingtwocoorg,
        },
        {
            name: "EditRecurringOneCoOrganizer",
            parameters: [
              { name: "meetingid", type: "STRING", required: true, length:255},
              { name: "mx", type: "STRING", length:255 },
              { name: "type", type: "STRING", length:255 },
              { name: "userid", type: "STRING", required: true, length:255 },
              { name: "duration", type: "STRING",length: 255 },
              { name: "start_time", type: "STRING",length:255},
              { name: "ar", type: "STRING", length: 255},
              { name: "password", type: "STRING", length: 255},
              { name: "au", type: "STRING", length: 255},
              { name: "topic", type: "STRING",length: 255},
              { name: "occurrence_id", type: "STRING",required:true ,length: 255},
              { name: "US", type: "STRING",length: 255},
              { name: "CA", type: "STRING",  length: 255},
            ],
            function: EditRecurringOneCoOrganizer,
        }
    ]
});

//99404594997
