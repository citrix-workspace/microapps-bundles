const moment = library.load("moment-timezone");

const startDate = moment.utc().subtract(30, "d").format();
const endDate = moment.utc().add(30, "d").format();

//Dataloading Endpoints
async function canvasFullSync({
  dataStore,
  client,
  latestSynchronizationTime,
}) {
  const accountResponse = await client.fetch("api/v1/accounts?per_page=100");
  if (accountResponse.ok) {
    const account = await accountResponse.json();
    for (const accountValue of account) {
      let i = 1;
      let nextPageExists;

      do {
        nextPageExists = false;
        const courseResponse = await client.fetch(
          `api/v1/accounts/${accountValue.id}/courses?page=${i}&per_page=100`
        );
        i++;
        const tempCourseLink = courseResponse.headers.map.link.split(",");
        if (!courseResponse.ok) {
          throw new Error(
            `Courses sync failed ${courseResponse.status}:${courseResponse.statusText}.`
          );
        }
        const course = await courseResponse.json();

        for (const courseValue of course) {
          if (latestSynchronizationTime) {
            const lastSyncTime = moment(latestSynchronizationTime)
              .utc()
              .format();
            await updateAction(dataStore, client, courseValue.id, lastSyncTime);
          } else {
            await updateAction(dataStore, client, courseValue.id, startDate);
          }
        }
        tempCourseLink.forEach((element) => {
          const courseLink = element.split("; ")[1];
          if (courseLink === `rel="next"`) {
            nextPageExists = true;
          }
        });
      } while (nextPageExists);
    }
  } else {
    throw new Error(
      `Accounts sync failed ${accountResponse.status}:${accountResponse.statusText}.`
    );
  }
}

//SA-Create Course Announcement
async function createCourseAnnouncement({
  dataStore,
  client,
  actionParameters,
  serviceClient,
}) {
  const response = await client.fetch(
    `/api/v1/courses/${actionParameters.courseId}/discussion_topics`,
    {
      method: "POST",
      body: JSON.stringify({
        title: actionParameters.title,
        message: actionParameters.message,
        is_announcement: true,
        delayed_post_at: actionParameters.delayed_post_at,
        published: true,
        lock_at: actionParameters.lock_at,
      }),
    }
  );

  if (response.ok) {
    return updateAction(
      dataStore,
      serviceClient,
      actionParameters.courseId,
      startDate
    );
  } else {
    throw new Error(
      `Could not do course registration (${response.status}: ${response.statusText})`
    );
  }
}

//SA-Accept Invitation
async function acceptInvitation({
  dataStore,
  client,
  actionParameters,
  serviceClient,
}) {
  const response = await client.fetch(
    `/api/v1/courses/${actionParameters.courseId}/enrollments/${actionParameters.enrollmentId}/accept`,
    {
      method: "POST",
    }
  );
  if (response.ok) {
    return updateAction(
      dataStore,
      serviceClient,
      actionParameters.courseId,
      startDate
    );
  } else {
    throw new Error(
      `Could not accept invitation: (${response.status}: ${response.statusText})`
    );
  }
}

//SA-Course Registration
async function courseRegistration({
  dataStore,
  client,
  actionParameters,
  serviceClient,
}) {
  const response = await client.fetch(
    `/api/v1/courses/${actionParameters.courseId}/enrollments?enrollment[type]=StudentEnrollment&enrollment[user_id]=${actionParameters.userId}`,
    {
      method: "POST",
    }
  );
  if (response.ok) {
    return updateAction(
      dataStore,
      serviceClient,
      actionParameters.courseId,
      startDate
    );
  } else {
    throw new Error(
      `Could not accept invitation: (${response.status}: ${response.statusText})`
    );
  }
}

// Announcement & Enrollment API call
async function updateAction(dataStore, serviceClient, courseId, StartDate) {
  let announcementIncrement = 1;
  let announcementPageExists;

  do {
    announcementPageExists = false;
    const announcementResponse = await serviceClient.fetch(
      `api/v1/announcements?context_codes[]=course_${courseId}&start_date=${StartDate}&end_date=${endDate}&page=${announcementIncrement}&per_page=100`
    );
    announcementIncrement++;
    const tempAnnouncementLink =
      announcementResponse.headers.map.link.split(",");

    let enrollmentIncrement = 1;
    let enrollmentPageExists;
    do {
      enrollmentPageExists = false;
      const enrollmentResponse = await serviceClient.fetch(
        `/api/v1/courses/${courseId}/enrollments?page=${enrollmentIncrement}&per_page=100`
      );
      enrollmentIncrement++;
      const tempEnrollmentLink = enrollmentResponse.headers.map.link.split(",");
      let enrollment;
      if (enrollmentResponse.ok) {
          
        enrollment = await enrollmentResponse.json();
        for (const enrollmentValue of enrollment) {
          const enrollmentBody = {
            id: enrollmentValue.id,
            course_id: enrollmentValue.course_id,
            role: enrollmentValue.role,
            user_login_id: enrollmentValue.user.login_id,
            enrollment_state: enrollmentValue.enrollment_state,
            user_id: enrollmentValue.user.id,
            user_name: enrollmentValue.user.name,
          };
          dataStore.save("enrollments", enrollmentBody);
        }
      } else {
        throw new Error(
          `Enrollments sync failed ${enrollmentResponse.status}:${enrollmentResponse.statusText}.`
        );
      }

      if (announcementResponse.ok) {
        let announcement = await announcementResponse.json();
        for (const announcementValue of announcement) {
          for (const enrollmentValue of enrollment) {
            const announcementBody = {
              id: announcementValue.id,
              enrollme_id: enrollmentValue.id,
              enrollme_course_id: enrollmentValue.course_id,
              title: announcementValue.title,
              message: announcementValue.message,
              enrollme_user_login_id: enrollmentValue.user.login_id,
              enrollme_role: enrollmentValue.role,
              posted_at: announcementValue.posted_at,
              delayed_post_at: announcementValue.delayed_post_at,
              author_display_name: announcementValue.author.display_name,
              url: announcementValue.url,
            };
            dataStore.save("announcements", announcementBody);
          }
        }
      } else {
        throw new Error(
          `Announcement sync failed ${announcementResponse.status}:${announcementResponse.statusText}.`
        );
      }
      tempEnrollmentLink.forEach((element) => {
        const enrollmentLink = element.split("; ")[1];
        if (enrollmentLink == 'rel="next"') {
          enrollmentPageExists = true;
        }
      });
    } while (enrollmentPageExists);

    tempAnnouncementLink.forEach((element) => {
      const announcementLink = element.split("; ")[1];
      if (announcementLink == 'rel="next"') {
        announcementPageExists = true;
      }
    });
  } while (announcementPageExists);
}

integration.define({
  synchronizations: [
    {
      name: "canvas",
      fullSyncFunction: canvasFullSync,
      incrementalSyncFunction: canvasFullSync,
    },
  ],
  actions: [
    {
      name: "Create Course Announcement",
      parameters: [
        {
          name: "title",
          type: "STRING",
          required: true,
        },
        {
          name: "message",
          type: "STRING",
          required: true,
        },
        {
          name: "courseId",
          type: "INTEGER",
          required: true,
        },
        {
          name: "delayed_post_at",
          type: "DATETIME",
        },
        {
          name: "lock_at",
          type: "DATETIME",
        },
      ],
      function: createCourseAnnouncement,
    },
    {
      name: "Accept Invitation",
      parameters: [
        {
          name: "courseId",
          type: "INTEGER",
          required: true,
        },
        {
          name: "enrollmentId",
          type: "INTEGER",
          required: true,
        },
        {
          name: "email",
          type: "STRING",
          required: true,
        },
      ],
      function: acceptInvitation,
    },
    {
      name: "Course Registration",
      parameters: [
        {
          name: "courseId",
          type: "INTEGER",
          required: true,
        },
        {
          name: "userId",
          type: "INTEGER",
          required: true,
        },
      ],
      function: courseRegistration,
    },
  ],
  model: {
    tables: [
      {
        name: "announcements",
        columns: [
          {
            name: "id",
            type: "INTEGER",
            primaryKey: true,
          },
          {
            name: "enrollme_id",
            type: "INTEGER",
            primaryKey: true,
          },
          {
            name: "enrollme_course_id",
            type: "INTEGER",
          },
          {
            name: "title",
            type: "STRING",
            length: 255,
          },
          {
            name: "message",
            type: "STRING",
            length: 10000,
          },
          {
            name: "enrollme_user_login_id",
            type: "STRING",
            length: 255,
          },
          {
            name: "enrollme_role",
            type: "STRING",
            length: 255,
          },
          {
            name: "posted_at",
            type: "DATETIME",
          },
          {
            name: "delayed_post_at",
            type: "DATETIME",
          },
          {
            name: "author_display_name",
            type: "STRING",
            length: 255,
          },
          {
            name: "url",
            type: "STRING",
            length: 255,
          },
        ],
      },
      {
        name: "enrollments",
        columns: [
          {
            name: "id",
            type: "INTEGER",
            primaryKey: true,
          },
          {
            name: "course_id",
            type: "INTEGER",
          },
          {
            name: "role",
            type: "STRING",
            length: 255,
          },
          {
            name: "user_login_id",
            type: "STRING",
            length: 255,
          },
          {
            name: "user_name",
            type: "STRING",
            length: 255,
          },
          {
            name: "enrollment_state",
            type: "STRING",
            length: 255,
          },
          {
            name: "user_id",
            type: "INTEGER",
          },
        ],
      },
    ],
  },
});
