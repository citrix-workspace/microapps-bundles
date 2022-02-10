const moment = library.load('moment-timezone');
const now = moment.utc().format();
const end = moment.utc().add(1, 'h').format();
const perPage = 100;

async function canvasFullSync({ dataStore, client, latestSynchronizationTime = null, integrationParameters }) {
	const startDate = moment.utc().subtract(30, 'd').format();
	const endDate = moment.utc().add(30, 'd').format();
	const quarter = moment().quarter();
	let courses = [];
	let enrollmentIncrement = 1;
	let newPageExist;

	do {
		newPageExist = false;
		const enrollmentTermResponse = await client.fetch(
			`/api/v1/accounts/${integrationParameters.accountId}/terms?page=${enrollmentIncrement}&per_page=${perPage}`
		);
		if (!enrollmentTermResponse.ok) {
			throw new Error(
				`Enrollment Term sync failed ${enrollmentTermResponse.status}:${enrollmentTermResponse.statusText}.`
			);
		}
		const tempEnrollmentLink = enrollmentTermResponse.headers.map.link.split(',');
		const enrollmentTerm = await enrollmentTermResponse.json();
		const filteredValue = enrollmentTerm.enrollment_terms.filter((value) => {
				return(value.start_at && value.end_at) &&
				moment(value.start_at).isBetween(
					moment().quarter(quarter).startOf('quarter'),
					moment().quarter(quarter).endOf('quarter')
				) ||
				moment(value.end_at).isBetween(
					moment().quarter(quarter).startOf('quarter'),
					moment().quarter(quarter).endOf('quarter')
				)
		});
		for (const enrollmentTermValue of filteredValue) {
			let courseIncrement = 1;
			let nextPageExists;

			do {
				nextPageExists = false;
				const courseResponse = await client.fetch(
					`api/v1/accounts/${integrationParameters.subAccountId}/courses?page=${courseIncrement}&per_page=${perPage}&enrollment_term_id=${enrollmentTermValue.id}`
				);
				courseIncrement++;
				if (!courseResponse.ok) {
					throw new Error(`Courses sync failed ${courseResponse.status}:${courseResponse.statusText}.`);
				}
				const tempCourseLink = courseResponse.headers.map.link.split(',');
				const course = await courseResponse.json();

				for (const courseValue of course) {
					let courseDataDetails = {
						id: courseValue.id,
						course_code: courseValue.course_code,
						name: courseValue.name
					};
					courses.push(courseDataDetails);
					dataStore.save('courses', courseDataDetails);
				}
				tempCourseLink.forEach((element) => {
					const courseLink = element.split('; ')[1];
					if (courseLink === `rel="next"`) {
						courseIncrement = getPageNumber( element,`&page`)
						nextPageExists = true;
					}
				});
			} while (nextPageExists && courseIncrement <= 1000);
		}
		tempEnrollmentLink.forEach((element) => {
			const enrollmentLink = element.split('; ')[1];
			if (enrollmentLink === `rel="next"`) {
				enrollmentIncrement = getPageNumber( element,`?page`)
				newPageExist = true;
			}
		});
	} while (newPageExist && enrollmentIncrement <= 1000);

	if (latestSynchronizationTime) {
		const lastSyncTime = moment(latestSynchronizationTime).utc().format();
		await updateAction(dataStore, client, courses, lastSyncTime, endDate, false);
	} else {
		await Promise.all([
			updateAction(dataStore, client, courses, startDate, endDate, false),
			usersSync(dataStore, client, integrationParameters),
			filesSync(dataStore, client, courses),
			gradesSync(dataStore, client, courses),
			assignmentsSync(dataStore, client, courses),
			tabsSync(dataStore, client, courses)
		]);
	}
}

async function createCourseAnnouncement({ dataStore, client, actionParameters, serviceClient }) {
	const response = await client.fetch(`/api/v1/courses/${actionParameters.courseId}/discussion_topics`, {
		method: 'POST',
		body: JSON.stringify({
			title: actionParameters.title,
			message: actionParameters.message,
			is_announcement: true,
			delayed_post_at: actionParameters.delayed_post_at,
			published: true,
			lock_at: actionParameters.lock_at
		})
	});

	if (!response.ok) {
		throw new Error(`Create Course Announcement Service Action Failed (${response.status}: ${response.statusText})`);
	}
	return updateAction(dataStore, serviceClient, [ actionParameters.courseId ], now, end, true);
}

async function acceptInvitation({ dataStore, client, actionParameters, serviceClient }) {
	const response = await client.fetch(
		`/api/v1/courses/${actionParameters.courseId}/enrollments/${actionParameters.enrollmentId}/accept`,
		{
			method: 'POST'
		}
	);
	if (!response.ok) {
		throw new Error(`Accept Invitation Service Action Failed: (${response.status}: ${response.statusText})`);
	}
	return updateAction(dataStore, serviceClient, [ actionParameters.courseId ], now, end, true);
}

async function rejectInvitation({ dataStore, client, actionParameters }) {
	const response = await client.fetch(
		`/api/v1/courses/${actionParameters.courseId}/enrollments/${actionParameters.enrollmentId}/reject`,
		{
			method: 'POST'
		}
	);
	if (!response.ok) {
		throw new Error(`Reject Invitation Service Action Failed: (${response.status}: ${response.statusText})`);
	}
	dataStore.deleteById('enrollments', actionParameters.enrollmentId);
}

async function createInvitation({ dataStore, client, actionParameters, serviceClient }) {
	const response = await client.fetch(
		`/api/v1/courses/${actionParameters.courseId}/enrollments?enrollment[type]=StudentEnrollment&enrollment[user_id]=${actionParameters.userId}`,
		{
			method: 'POST'
		}
	);
	if (!response.ok) {
		throw new Error(`Create Invitation Service Action Failed: (${response.status}: ${response.statusText})`);
	}
	return updateAction(dataStore, serviceClient, [ actionParameters.courseId ], now, end, true);
}

async function updateAction(dataStore, serviceClient, courses, StartDate, endDate, isUpdateAfterAction) {
	for (const course of courses) {
		let announcementIncrement = 1;
		let announcementPageExists;
		do {
			announcementPageExists = false;
			const announcementResponse = await serviceClient.fetch(
				`api/v1/announcements?context_codes[]=course_${course?.id ?? course}&start_date=${StartDate}&end_date=${endDate}&page=${announcementIncrement}&per_page=${perPage}`
				);
			if (!announcementResponse.ok) {
				throw new Error(
					`Announcement sync failed ${announcementResponse.status}:${announcementResponse.statusText}.`
				);
			}
			const tempAnnouncementLink = announcementResponse.headers.map.link.split(',');
			const announcement = await announcementResponse.json();
			let enrollmentIncrement = 1;
			let enrollmentPageExists;
			do {
				enrollmentPageExists = false;
				const enrollmentResponse = await serviceClient.fetch(
					`/api/v1/courses/${course?.id ?? course}/enrollments?page=${enrollmentIncrement}&per_page=${perPage}`
					);

				if (!enrollmentResponse.ok) {
					throw new Error(
						`Enrollments sync failed ${enrollmentResponse.status}:${enrollmentResponse.statusText}.`
					);
				}
				const tempEnrollmentLink = enrollmentResponse.headers.map.link.split(',');
				const enrollment = await enrollmentResponse.json();
				for (const enrollmentValue of enrollment) {
					const enrollmentBody = {
						id: enrollmentValue.id,
						course_id: enrollmentValue.course_id,
						role: enrollmentValue.role,
						user_login_id: enrollmentValue.user.login_id,
						enrollment_state: enrollmentValue.enrollment_state,
						user_id: enrollmentValue.user.id.toString(),
						user_name: enrollmentValue.user.name
					};
					dataStore.save('enrollments', enrollmentBody);
				}

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
							url: announcementValue.url
						};
						dataStore.save('announcements', announcementBody);
					}
				}
				tempEnrollmentLink.forEach((element) => {
					const enrollmentLink = element.split('; ')[1];

					if (enrollmentLink === `rel="next"`) {
						enrollmentIncrement = getPageNumber( element,`?page`)
						enrollmentPageExists = true;
					}
				});
			} while (enrollmentPageExists && !isUpdateAfterAction && enrollmentIncrement <= 1000);

			tempAnnouncementLink.forEach((element) => {
				const announcementLink = element.split('; ')[1];
				if (announcementLink === `rel="next"`) {
					announcementIncrement = getPageNumber( element,`&page`)
					announcementPageExists = true;
				}
			});
		} while (announcementPageExists && !isUpdateAfterAction && announcementIncrement <= 1000);
	}
}

async function usersSync(dataStore, client, integrationParameters) {
	let userIncrement = 1;
	let newPageExist;

	do {
		newPageExist = false;
		const usersRequest = await client.fetch(
			`/api/v1/accounts/${integrationParameters.subAccountId}/users?page=${userIncrement}&per_page=${perPage}`
		);
		if (!usersRequest.ok) {
			throw new Error(`Users sync Failed ${usersRequest.status} : ${usersRequest.statusText} `);
		}
		const tempUserLink = usersRequest.headers.map.link.split(',');
		const users = await usersRequest.json();
		for (const usersValue of users) {
			const userDetails = {
				id: usersValue.id.toString(),
				name: usersValue.name,
				login_id: usersValue.login_id
			};
			dataStore.save('users', userDetails);
		}
		tempUserLink.forEach((element) => {
			const userLink = element.split('; ')[1];
			if (userLink === `rel="next"`) {
				userIncrement = getPageNumber( element,`?page`)
				newPageExist = true;
			}
		});
	} while (newPageExist && userIncrement <= 1000);
}

async function filesSync(dataStore, client, courses) {
	for (const course of courses) {
		let fileIncrement = 1;
		let fileNextPageExist;
		do {
			fileNextPageExist = false;
			const fileResponseData = await client.fetch(
				`api/v1/courses/${course.id}/files?page=${fileIncrement}&per_page=${perPage}`
			);
			if (!fileResponseData.ok) {
				throw new Error(`Files sync failed ${fileResponseData.status} : ${fileResponseData.statusText} `);
			}
			const tempFileLink = fileResponseData.headers.map.link.split(',');
			const files = await fileResponseData.json();
			for (const filesValue of files) {
				const filesDetails = {
					courses_name: course.name,
					courses_id: course.id,
					display_name: filesValue.display_name,
					id: filesValue.id,
					mime_class: filesValue.mime_class,
					url: filesValue.url,
					content_type: filesValue.content_type,
					size: parseInt(filesValue.size),
					created_at: filesValue.created_at
				};
				dataStore.save('files', filesDetails);
			}
			tempFileLink.forEach((element) => {
				const fileLink = element.split('; ')[1];
				if (fileLink === `rel="next"`) {
					fileIncrement = getPageNumber( element,`?page`)
					fileNextPageExist = true;
				}
			});
		} while (fileNextPageExist && fileIncrement <= 1000);
	}
}

async function gradesSync(dataStore, client, courses) {
	for (const course of courses) {
		let gradeIncrement = 1;
		let gradePageExist;
		do {
			gradePageExist = false;
			const gradeResponseData = await client.fetch(
				`/api/v1/courses/${course.id}/gradebook_history/feed?page=${gradeIncrement}&per_page=${perPage}`
			);
			if (!gradeResponseData.ok) {
				throw new Error(
					` Grades sync Failed ${gradeResponseData.status} : ${gradeResponseData.statusText} `
				);
			}
			const tempGradeLink = gradeResponseData.headers.map.link.split(',');
			const grades = await gradeResponseData.json();
			for (const gradeValue of grades) {
				const gradesData = {
					courses_id: course.id,
					courses_name: course.name,
					assignment_name: gradeValue.assignment_name,
					current_grade: gradeValue.current_grade,
					id: gradeValue.id,
					url: gradeValue.url,
					user_id: gradeValue.user_id.toString(),
					user_name: gradeValue.user_name,
					assignment_id: gradeValue.assignment_id
				};
				dataStore.save('grades', gradesData);
			}
			tempGradeLink.forEach((element) => {
				const gradesLink = element.split('; ')[1];
				if (gradesLink === `rel="next"`) {
					gradeIncrement = getPageNumber( element,`&page`)
					gradePageExist = true;
				}
			});
		} while (gradePageExist && gradeIncrement <= 1000);
	}
}

async function assignmentsSync(dataStore, client, courses) {
	for (const course of courses) {
		let aasignmentsIncrement = 1;
		let newPageExist;
		do {
			newPageExist = false;
			const responseData = await client.fetch(
				`/api/v1/courses/${course.id}/assignments?page=${aasignmentsIncrement}&per_page=${perPage}`
			);
			if (!responseData.ok) {
				throw new Error(`Assignment sync Failed ${responseData.status} : ${responseData.statusText} `);
			}
			const tempAssignmentLink = responseData.headers.map.link.split(',');
			const assignments = await responseData.json();
			for (const assignmentValue of assignments) {
				const assignmentDetails = {
					id: assignmentValue.id,
					course_id: assignmentValue.course_id,
					description: assignmentValue.description,
					html_url: assignmentValue.html_url,
					name: assignmentValue.name,
					points_possible: assignmentValue.points_possible,
					published: assignmentValue.published,
					is_quiz_assignment: assignmentValue.is_quiz_assignment,
					created_at: assignmentValue.created_at
				};
				dataStore.save('assignments', assignmentDetails);
			}
			tempAssignmentLink.forEach((element) => {
				const assignmentLink = element.split('; ')[1];
				if (assignmentLink === `rel="next"`) {
					aasignmentsIncrement = getPageNumber( element,`?page`)
					newPageExist = true;
				}
			});
		} while (newPageExist && aasignmentsIncrement <= 1000);
	}
}

async function tabsSync(dataStore, client, courses) {
	for (const course of courses) {
		const responseData = await client.fetch(`/api/v1/courses/${course.id}/tabs?per_page=${perPage}`);
		if (!responseData.ok) {
			throw new Error(`Tabs sync Failed ${responseData.status} : ${responseData.statusText} `);
		}
		const tabs = await responseData.json();
		for (const tabsValue of tabs) {
			const tabsDetails = {
				id: tabsValue.id,
				courses_id: course.id,
				courses_name: course.name,
				label: tabsValue.label,
				visibility: tabsValue.visibility
			};
			dataStore.save('tabs', tabsDetails);
		}
	}
}
function getPageNumber(element, character){
 return element
    .split('; ')[0]
	.replace(/^<+|>+$/g, '')
	.split(`${character}=`)[1]
	.split('&per_page')[0];
}

integration.define({
	synchronizations: [
		{
			name: 'canvas',
			fullSyncFunction: canvasFullSync,
			incrementalSyncFunction: canvasFullSync
		}
	],
	integrationParameters: [
		{
			name: 'accountId',
			type: 'STRING',
			label: 'Account ID',
			description: 'Account ID',
			required: true
		},
		{
			name: 'subAccountId',
			type: 'STRING',
			label: 'Sub-Account ID',
			description: 'Sub-Account ID',
			required: true
		}
	],
	actions: [
		{
			name: 'Create Course Announcement',
			parameters: [
				{
					name: 'title',
					type: 'STRING',
					required: true
				},
				{
					name: 'message',
					type: 'STRING',
					required: true
				},
				{
					name: 'courseId',
					type: 'INTEGER',
					required: true
				},
				{
					name: 'delayed_post_at',
					type: 'DATETIME'
				},
				{
					name: 'lock_at',
					type: 'DATETIME'
				}
			],
			function: createCourseAnnouncement
		},
		{
			name: 'Accept Invitation',
			parameters: [
				{
					name: 'courseId',
					type: 'INTEGER',
					required: true
				},
				{
					name: 'enrollmentId',
					type: 'INTEGER',
					required: true
				}
			],
			function: acceptInvitation
		},
		{
			name: 'Reject Invitation',
			parameters: [
				{
					name: 'courseId',
					type: 'INTEGER',
					required: true
				},
				{
					name: 'enrollmentId',
					type: 'INTEGER',
					required: true
				}
			],
			function: rejectInvitation
		},
		{
			name: 'Create Invitation',
			parameters: [
				{
					name: 'courseId',
					type: 'INTEGER',
					required: true
				},
				{
					name: 'userId',
					type: 'INTEGER',
					required: true
				}
			],
			function: createInvitation
		}
	],
	model: {
		tables: [
			{
				name: 'announcements',
				columns: [
					{
						name: 'id',
						type: 'INTEGER',
						primaryKey: true
					},
					{
						name: 'enrollme_id',
						type: 'INTEGER',
						primaryKey: true
					},
					{
						name: 'enrollme_course_id',
						type: 'INTEGER'
					},
					{
						name: 'title',
						type: 'STRING',
						length: 255
					},
					{
						name: 'message',
						type: 'STRING',
						length: 10000
					},
					{
						name: 'enrollme_user_login_id',
						type: 'STRING',
						length: 255
					},
					{
						name: 'enrollme_role',
						type: 'STRING',
						length: 255
					},
					{
						name: 'posted_at',
						type: 'DATETIME'
					},
					{
						name: 'delayed_post_at',
						type: 'DATETIME'
					},
					{
						name: 'author_display_name',
						type: 'STRING',
						length: 255
					},
					{
						name: 'url',
						type: 'STRING',
						length: 255
					}
				]
			},
			{
				name: 'enrollments',
				columns: [
					{
						name: 'id',
						type: 'INTEGER',
						primaryKey: true
					},
					{
						name: 'course_id',
						type: 'INTEGER'
					},
					{
						name: 'role',
						type: 'STRING',
						length: 255
					},
					{
						name: 'user_login_id',
						type: 'STRING',
						length: 255
					},
					{
						name: 'user_name',
						type: 'STRING',
						length: 255
					},
					{
						name: 'enrollment_state',
						type: 'STRING',
						length: 255
					},
					{
						name: 'user_id',
						type: 'STRING',
						length: 255
					}
				]
			},
			{
				name: 'users',
				columns: [
					{
						name: 'id',
						type: 'STRING',
						length: 255,
						primaryKey: true
					},
					{
						name: 'login_id',
						type: 'STRING',
						length: 255
					},
					{
						name: 'name',
						type: 'STRING',
						length: 255
					}
				]
			},
			{
				name: 'files',
				columns: [
					{
						name: 'id',
						type: 'INTEGER',
						primaryKey: true
					},
					{
						name: 'url',
						type: 'STRING',
						length: 2048
					},
					{
						name: 'courses_id',
						type: 'INTEGER'
					},
					{
						name: 'content_type',
						type: 'STRING',
						length: 255
					},
					{
						name: 'courses_name',
						type: 'STRING',
						length: 255
					},
					{
						name: 'display_name',
						type: 'STRING',
						length: 255
					},
					{
						name: 'mime_class',
						type: 'STRING',
						length: 255
					},
					{
						name: 'size',
						type: 'LONG'
					},
					{
						name: 'created_at',
						type: 'DATETIME'
					}
				]
			},

			{
				name: 'grades',
				columns: [
					{
						name: 'id',
						type: 'INTEGER',
						primaryKey: true
					},
					{
						name: 'url',
						type: 'STRING',
						length: 2048
					},
					{
						name: 'assignment_id',
						type: 'INTEGER'
					},
					{
						name: 'assignment_name',
						type: 'STRING',
						length: 255
					},
					{
						name: 'courses_id',
						type: 'INTEGER'
					},
					{
						name: 'courses_name',
						type: 'STRING',
						length: 255
					},
					{
						name: 'current_grade',
						type: 'STRING',
						length: 255
					},
					{
						name: 'user_id',
						type: 'STRING',
						length:255
					},
					{
						name: 'user_name',
						type: 'STRING',
						length: 255
					}
				]
			},

			{
				name: 'assignments',
				columns: [
					{
						name: 'id',
						type: 'INTEGER',
						primaryKey: true
					},
					{
						name: 'course_id',
						type: 'INTEGER'
					},
					{
						name: 'created_at',
						type: 'DATETIME'
					},
					{
						name: 'description',
						type: 'STRING',
						length: 4000
					},
					{
						name: 'html_url',
						type: 'STRING',
						length: 255
					},
					{
						name: 'name',
						type: 'STRING',
						length: 255
					},
					{
						name: 'points_possible',
						type: 'DOUBLE'
					},
					{
						name: 'published',
						type: 'BOOLEAN'
					},
					{
						name: 'is_quiz_assignment',
						type: 'BOOLEAN'
					}
				]
			},
			{
				name: 'courses',
				columns: [
					{
						name: 'id',
						type: 'INTEGER',
						primaryKey: true
					},
					{
						name: 'course_code',
						type: 'STRING',
						length: 255
					},
					{
						name: 'name',
						type: 'STRING',
						length: 255
					}
				]
			},
			{
				name: 'tabs',
				columns: [
					{
						name: 'id',
						type: 'STRING',
						length: 255,
						primaryKey: true
					},
					{
						name: 'courses_id',
						type: 'INTEGER',
						primaryKey: true
					},
					{
						name: 'courses_name',
						type: 'STRING',
						length: 255
					},
					{
						name: 'label',
						type: 'STRING',
						length: 255
					},
					{
						name: 'visibility',
						type: 'STRING',
						length: 255
					}
				]
			}
		],
		relationships: [
			{
				name: 'fk_courses_id',
				primaryTable: 'announcements',
				foreignTable: 'Courses',
				columnPairs: [
					{
						primaryKey: 'enrollme_course_id',
						foreignKey: 'id'
					}
				]
			},
			{
				name: 'fk_tabs_announcements_id',
				primaryTable: 'announcements',
				foreignTable: 'tabs',
				columnPairs: [
					{
						primaryKey: 'enrollme_course_id',
						foreignKey: 'courses_id'
					}
				]
			},
			{
				name: 'fk_grades_assignment_id',
				primaryTable: 'assignments',
				foreignTable: 'grades',
				columnPairs: [
					{
						primaryKey: 'id',
						foreignKey: 'assignment_id'
					}
				]
			},
			{
				name: 'fk_tabs_assignments_id',
				primaryTable: 'assignments',
				foreignTable: 'tabs',
				columnPairs: [
					{
						primaryKey: 'course_id',
						foreignKey: 'courses_id'
					}
				]
			},
			{
				name: 'fk_enrollment_course_id',
				primaryTable: 'Courses',
				foreignTable: 'enrollments',
				columnPairs: [
					{
						primaryKey: 'id',
						foreignKey: 'course_id'
					}
				]
			},
			{
				name: 'fk_tabs_courses_id',
				primaryTable: 'files',
				foreignTable: 'tabs',
				columnPairs: [
					{
						primaryKey: 'courses_id',
						foreignKey: 'courses_id'
					}
				]
			},
			{
				name: 'fk_tabs_grades_id',
				primaryTable: 'grades',
				foreignTable: 'tabs',
				columnPairs: [
					{
						primaryKey: 'courses_id',
						foreignKey: 'courses_id'
					}
				]
			},
			{
				name: 'fk_users_id',
				primaryTable: 'grades',
				foreignTable: 'users',
				columnPairs: [
					{
						primaryKey: 'user_id',
						foreignKey: 'id'
					}
				]
			}
		]
	}
});
