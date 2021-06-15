const moment = library.load('moment-timezone');

var today = moment.utc();
var StartDate = today.subtract(30, 'd');
StartDate = StartDate.format();
var EndDate = today.add(60, 'd');
EndDate = EndDate.format();

//DataLoading Endpoints
async function canvasSync({ dataStore, client, serviceClient}) {
    let accountResponse = await client.fetch('api/v1/accounts');    //Account API call
    if (accountResponse.ok) {
        let account = await accountResponse.json();
        const promises = account.map(async accountValue => {
            let accountId = JSON.stringify(accountValue.id);
            let courseLink, condition, i = 1;
            // courses pagination
            do {
                condition = "";
                let courseResponse = await client.fetch(`api/v1/accounts/${accountId}/courses?page=${i}&per_page=100`);  //Courses API call
                i++;
                let tempCourseLink = courseResponse.headers.map.link;
                tempCourseLink = tempCourseLink.split(',');
                if (courseResponse.ok) {
                    let course = await courseResponse.json();

                    const promise = course.map(async courseValue => {
                        let courseId = JSON.stringify(courseValue.id)

                        await updateAction(dataStore, serviceClient, courseId);   // function call
                    })
                    await Promise.all(promise)
                    tempCourseLink.forEach(element => {
                        courseLink = element.split("; ");
                        courseLink = courseLink[1];
                        if (courseLink == `rel="next"`) {
                            condition = courseLink;
                        }
                    });
                } else {
                    throw new Error(`Courses sync failed ${courseResponse.status}:${courseResponse.statusText}.`)
                }
            } while (condition == `rel="next"`);

        })
        await Promise.all(promises)
    } else {
        throw new Error(`Accounts sync failed ${accountResponse.status}:${accountResponse.statusText}.`)
    }
}

//SA-Create Course Announcement
async function createCourseAnnouncement({dataStore, client, actionParameters, serviceClient}) {
    let url = `/api/v1/courses/${actionParameters.courseId}/discussion_topics?title=${actionParameters.title}&message=${actionParameters.message}&is_announcement=true&published=true&lock_at=${actionParameters.lock_at}&delayed_post_at =${actionParameters.delayed_post_at}`
    let response = await client.fetch(url,{
    method: "POST"
    })

    if (response.ok) {
        //Data Update After action
        await updateAction(dataStore, serviceClient, actionParameters.courseId);   // function call
    } else {
        throw new Error(`Could not do course registration (${response.status}: ${response.statusText})`);
    }
}

//SA-Accept Invitation
async function acceptInvitation({dataStore, client, actionParameters, serviceClient}) {
    let response = await client.fetch(`/api/v1/courses/${actionParameters.courseId}/enrollments/${actionParameters.enrollmentId}/accept`,{
        method: "POST"
    });
    if (response.ok) {
        //Data Update After action
        await updateAction(dataStore, serviceClient, actionParameters.courseId);   // function call        
    } else {
        throw new Error(`Could not accept invitation: (${response.status}: ${response.statusText})`);
    }
}

//SA-Course Registration
async function courseRegistration({dataStore, client, actionParameters, serviceClient}) {
    let response = await client.fetch(`/api/v1/courses/${actionParameters.courseId}/enrollments?enrollment[type]=StudentEnrollment&enrollment[user_id]=${actionParameters.userId}`,{
        method: "POST"
    });
    if (response.ok) {
        //Data Update After Action
        await updateAction(dataStore, serviceClient, actionParameters.courseId);  // function call
    } else {
        throw new Error(`Could not accept invitation: (${response.status}: ${response.statusText})`);
    }
}

// Announcement & Enrollment API call
async function updateAction(dataStore, serviceClient, courseId) {
    let announcementCondition, announcementLink, announcementIncrement = 1;
    //announcement pagination
    do {
        announcementCondition = "";
        let announcementResponse = await serviceClient.fetch(`api/v1/announcements?context_codes[]=course_${courseId}&start_date=${StartDate}&end_date=${EndDate}&page=${announcementIncrement}&per_page=100`);  //Announcement API call
        announcementIncrement++
        let tempAnnouncementLink = announcementResponse.headers.map.link;
        tempAnnouncementLink = tempAnnouncementLink.split(",");

        let enrollmentCondition, enrollmentLink, enrollmentIncrement = 1;
        //enrollment pagination
        do {
            enrollmentCondition = "";
            let enrollmentResponse = await serviceClient.fetch(`/api/v1/courses/${courseId}/enrollments?page=${enrollmentIncrement}&per_page=100`);  //Enrollments API call
            enrollmentIncrement++
            let tempEnrollmentLink = enrollmentResponse.headers.map.link;
            tempEnrollmentLink = tempEnrollmentLink.split(",");
            var enrollment;
            if (enrollmentResponse.ok) {
                enrollment = await enrollmentResponse.json();
                const promise = await enrollment.map(async enrollmentValue => {                
                    let enrollmentBody = {
                        "id": enrollmentValue.id,
                        "course_id": enrollmentValue.course_id,
                        "role": enrollmentValue.role,
                        "user_login_id": enrollmentValue.user.login_id,
                        "enrollment_state": enrollmentValue.enrollment_state,
                        "user_id": enrollmentValue.user.id,
                        "user_name": enrollmentValue.user.name
                    }
                    await dataStore.save('enrollments', JSON.stringify(enrollmentBody))
                })
                await Promise.all(promise)
            } else {
                throw new Error(`Enrollments sync failed ${enrollmentResponse.status}:${enrollmentResponse.statusText}.`)
            }

            if (announcementResponse.ok) {
                let announcement = await announcementResponse.json();
                const promise = await announcement.map(async announcementValue => {
                    const promise = await enrollment.map(async enrollmentValue => {
                        let announcementBody = {
                            "id": announcementValue.id,
                            "enrollme_id": enrollmentValue.id,
                            "enrollme_course_id": enrollmentValue.course_id,
                            "title": announcementValue.title,
                            "message": announcementValue.message,
                            "enrollme_user_login_id": enrollmentValue.user.login_id,
                            "enrollme_role": enrollmentValue.role,
                            "posted_at": announcementValue.posted_at,
                            "delayed_post_at": announcementValue.delayed_post_at,
                            "author_display_name": announcementValue.author.display_name,
                            "url": announcementValue.url
                        }
                        await dataStore.save('announcements', JSON.stringify(announcementBody))
                    })
                    await Promise.all(promise)

                })
                await Promise.all(promise)

            } else {
                throw new Error(`Announcement sync failed ${announcementResponse.status}:${announcementResponse.statusText}.`)
            }
            tempEnrollmentLink.forEach(element => {
                enrollmentLink = element.split("; ");
                enrollmentLink = enrollmentLink[1];
                if (enrollmentLink == `rel="next"`) {
                    announcementCondition = enrollmentLink;
                }
            });
        } while (enrollmentCondition == `rel="next"`);

        tempAnnouncementLink.forEach(element => {
            announcementLink = element.split("; ");
            announcementLink = announcementLink[1];
            if (announcementLink == `rel="next"`) {
                announcementCondition = announcementLink;
            }
        });
    } while (announcementCondition == `rel="next"`);

}

integration.define({
    "synchronizations": [
        {
            "name": "canvas",
            "fullSyncFunction": canvasSync
        }
    ],
    "actions": [
        {
            "name": "Create Course Announcement",
            "parameters": [
                {
                    "name": "title",
                    "type": "STRING",
                    "required": true
                },
                {
                    "name": "message",
                    "type": "STRING",
                    "required": true
                },
                {
                    "name": "courseId",
                    "type": "INTEGER",
                    "required": true
                },
                {
                    "name": "delayed_post_at",
                    "type": "DATETIME"
                },
                {
                    "name": "lock_at",
                    "type": "DATETIME"
                }
            ],
            'function': createCourseAnnouncement
        },
        {
            "name": "Accept Invitation",
            "parameters": [
                {
                    "name": "courseId",
                    "type": "INTEGER",
                    "required": true
                },
                {
                    "name": "enrollmentId",
                    "type": "INTEGER",
                    "required": true
                },
                {
                    "name": "email",
                    "type": "STRING",
                    "required": true
                }
            ],
            'function': acceptInvitation
        },
        {
            "name": "Course Registration",
            "parameters":[
                {
                    "name": "courseId",
                    "type": "INTEGER",
                    "required": true
                },
                {
                    "name": "userId",
                    "type": "INTEGER",
                    "required": true
                }
            ],
            'function': courseRegistration
        }
    ],
    "model": {
        "tables": [
            {
                "name": "announcements",
                "columns": [
                    {
                        "name": "id",
                        "type": "INTEGER",
                        "primaryKey": true
                    },
                    {
                        "name": "enrollme_id",
                        "type": "INTEGER",
                        "primaryKey": true
                    },
                    {
                        "name": "enrollme_course_id",
                        "type": "INTEGER"
                    },
                    {
                        "name": "title",
                        "type": "STRING",
                        "length": 255
                    },
                    {
                        "name": "message",
                        "type": "STRING",
                        "length": 10000
                    },
                    {
                        "name": "enrollme_user_login_id",
                        "type": "STRING",
                        "length": 255
                    },
                    {
                        "name": "enrollme_role",
                        "type": "STRING",
                        "length": 255
                    },
                    {
                        "name": "posted_at",
                        "type": "DATETIME"
                    },
                    {
                        "name": "delayed_post_at",
                        "type": "DATETIME"
                    },
                    {
                        "name": "author_display_name",
                        "type": "STRING",
                        "length": 255
                    },
                    {
                        "name": "url",
                        "type": "STRING",
                        "length": 255
                    },
                ]
            },
            {
                "name": "enrollments",
                "columns": [
                    {
                        "name": "id",
                        "type": "INTEGER",
                        "primaryKey": true
                    },
                    {
                        "name": "course_id",
                        "type": "INTEGER"
                    },
                    {
                        "name": "role",
                        "type": "STRING",
                        "length": 255
                    },
                    {
                        "name": "user_login_id",
                        "type": "STRING",
                        "length": 255
                    },
                    {
                        "name": "user_name",
                        "type": "STRING",
                        "length": 255
                    },
                    {
                        "name": "enrollment_state",
                        "type": "STRING",
                        "length": 255
                    },
                    {
                        "name": "user_id",
                        "type": "INTEGER"
                    }
                ]
            }
        ]
    }
});
