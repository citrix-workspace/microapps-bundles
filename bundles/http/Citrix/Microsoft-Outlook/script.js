integration.define({
	synchronizations: [
		{
			name: 'Outlook',
			fullSyncFunction: fullSync
		}
	],
	model: {
		tables: [
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
						name: 'mail',
						type: 'STRING',
						length: 255
					},
					{
						name: 'user_principal_name',
						type: 'STRING',
						length: 255
					},
					{
						name: 'display_name',
						type: 'STRING',
						length: 255
					}
				]
			},
			{
				name: 'calender_view',
				columns: [
					{
						name: 'i_cal_u_id',
						type: 'STRING',
						length: 255,
						primaryKey: true
					},
					{
						name: 'id',
						type: 'STRING',
						length: 255
					},
					{
						name: 'body_content',
						type: 'STRING',
						length: 2000
					},
					{
						name: 'body_preview',
						type: 'STRING',
						length: 2000
					},
					{
						name: 'end_date_time',
						type: 'DATETIME'
					},
					{
						name: 'is_cancelled',
						type: 'BOOLEAN'
					},
					{
						name: 'is_online_meeting',
						type: 'BOOLEAN'
					},
					{
						name: 'location_display_name',
						type: 'STRING',
						length: 255
					},
					{
						name: 'online_meeting_join_url',
						type: 'STRING',
						length: 500
					},
					{
						name: 'online_meeting_provider',
						type: 'STRING',
						length: 255
					},
					{
						name: 'organizer_email_address_a',
						type: 'STRING',
						length: 255
					},
					{
						name: 'organizer_email_address_n',
						type: 'STRING',
						length: 255
					},
					{
						name: 'original_start_time_zone',
						type: 'STRING',
						length: 255
					},
					{
						name: 'series_master_id',
						type: 'STRING',
						length: 255
					},
					{
						name: 'start_date_time',
						type: 'DATETIME'
					},
					{
						name: 'subject',
						type: 'STRING',
						length: 255
					}
				]
			},
			{
				name: 'calender_view_attendees',
				columns: [
					{
						name: 'unique_id',
						type: 'STRING',
						length: 255
					},
					{
						name: 'parent_i_cal_u_id',
						type: 'STRING',
						length: 255,
						primaryKey: true
					},
					{
						name: 'root_i_cal_u_id',
						type: 'STRING',
						length: 255
					},
					{
						name: 'email_address_address',
						type: 'STRING',
						length: 255,
                        primaryKey: true
					},
					{
						name: 'email_address_name',
						type: 'STRING',
						length: 255
					},
					{
						name: 'type',
						type: 'STRING',
						length: 255
					}
				]
			},
			{
				name: 'my_events',
				columns: [
					{
						name: 'i_cal_u_id',
						type: 'STRING',
						length: 255,
						primaryKey: true
					},
					{
						name: 'id',
						type: 'STRING',
						length: 255
					},
					{
						name: 'recurrence_pattern_day_of',
						type: 'INTEGER'
					},
					{
						name: 'recurrence_pattern_type',
						type: 'STRING',
						length: 255
					},
					{
						name: 'recurrence_range_end_date',
						type: 'DATE'
					}
				]
			}
		],
		relationships: [
			{
				name: 'nested_table_1',
				primaryTable: 'calender_view',
				foreignTable: 'calender_view_attendees',
				columnPairs: [
					{
						primaryKey: 'i_cal_u_id',
						foreignKey: 'parent_i_cal_u_id'
					}
				]
			},
			{
				name: 'fk_my_events_id',
				primaryTable: 'calender_view',
				foreignTable: 'my_events',
				columnPairs: [
					{
						primaryKey: 'series_master_id',
						foreignKey: 'id'
					}
				]
			},
			{
				name: 'fk_calender_v_organizer_e',
				primaryTable: 'users',
				foreignTable: 'calender_view',
				columnPairs: [
					{
						primaryKey: 'user_principal_name',
						foreignKey: 'organizer_email_address_a'
					}
				]
			}
		]
	},
	actions: [
		{
			name: "createOutlookOneTimeEventCurrentTimezone",
			parameters: [
				{
					name: "userId",
					type: "STRING"
				},
				{
					name: "content",
					type: "STRING"
				},
				{
					name: "email1",
					type: "STRING"
				},
				{
					name: "email2",
					type: "STRING"
				},
				{
					name: "email3",
					type: "STRING"
				},
				{
					name: "email4",
					type: "STRING"
				},
				{
					name: "email5",
					type: "STRING"
				},
				{
					name: "email6",
					type: "STRING"
				},
				{
					name: "type1",
					type: "STRING"
				},
				{
					name: "type2",
					type: "STRING"
				},
				{
					name: "type3",
					type: "STRING"
				},
				{
					name: "type4",
					type: "STRING"
				},
				{
					name: "type5",
					type: "STRING"
				},
				{
					name: "type6",
					type: "STRING"
				},
				{
					name: "startDateTime",
					type: "STRING"
				},
				{
					name: "endDateTime",
					type: "STRING"
				},
				{
					name: "isOnlineMeeting",
					type: "BOOLEAN"
				},
				{
					name: "location",
					type: "STRING"
				},
				{
					name: "onlineMeetingProvider",
					type: "STRING"
				},
				{
					name: "subject",
					type: "STRING"
				},
			],
			function: createOutlookOneTimeEventCurrentTimezone
		},
		{
			name: "createOutlookOneTimeEventCustomTimezone",
			parameters: [
				{
					name: "isOnlineMeeting",
					type: "BOOLEAN"
				},
				{
					name: "endDate",
					type: "STRING"
				},
				{
					name: "subject",
					type: "STRING"
				},
				{
					name: "timezone",
					type: "STRING"
				},
				{
					name: "onlineMeetingProvider",
					type: "STRING"
				},
				{
					name: "content",
					type: "STRING"
				},
				{
					name: "email3",
					type: "STRING"
				},
				{
					name: "email2",
					type: "STRING"
				},
				{
					name: "email1",
					type: "STRING"
				},
				{
					name: "startTime",
					type: "STRING"
				},
				{
					name: "email6",
					type: "STRING"
				},
				{
					name: "email5",
					type: "STRING"
				},
				{
					name: "email4",
					type: "STRING"
				},
				{
					name: "type5",
					type: "STRING"
				},
				{
					name: "type4",
					type: "STRING"
				},
				{
					name: "type3",
					type: "STRING"
				},
				{
					name: "type2",
					type: "STRING"
				},
				{
					name: "type6",
					type: "STRING"
				},
				{
					name: "type1",
					type: "STRING"
				},
				{
					name: "userId",
					type: "STRING"
				},
				{
					name: "location",
					type: "STRING"
				},
				{
					name: "endTime",
					type: "STRING"
				},
				{
					name: "startDate",
					type: "STRING"
				},
			],
			function: createOutlookOneTimeEventCustomTimezone
		},
		{
			name: "createRecurringEventCurrentTimeZone",
			parameters: [
				{
					name: "isOnlineMeeting",
					type: "BOOLEAN"
				},
				{
					name: "subject",
					type: "STRING"
				},
				{
					name: "onlineMeetingProvider",
					type: "STRING"
				},
				{
					name: "content",
					type: "STRING"
				},
				{
					name: "email6",
					type: "STRING"
				},
				{
					name: "email5",
					type: "STRING"
				},
				{
					name: "email4",
					type: "STRING"
				},
				{
					name: "email3",
					type: "STRING"
				},
				{
					name: "email2",
					type: "STRING"
				},
				{
					name: "email1",
					type: "STRING"
				},
				{
					name: "type1",
					type: "STRING"
				},
				{
					name: "type2",
					type: "STRING"
				},
				{
					name: "type3",
					type: "STRING"
				},
				{
					name: "type4",
					type: "STRING"
				},
				{
					name: "type5",
					type: "STRING"
				},
				{
					name: "type6",
					type: "STRING"
				},
				{
					name: "endDateTime",
					type: "STRING"
				},
				{
					name: "userId",
					type: "STRING"
				},
				{
					name: "startDateTime",
					type: "STRING"
				},
				{
					name: "endDate",
					type: "STRING"
				},
				{
					name: "dayOfMonth",
					type: "STRING"
				},
				{
					name: "days",
					type: "STRING"
				},
				{
					name: "location",
					type: "STRING"
				},
				{
					name: "startDate",
					type: "STRING"
				},
				{
					name: "recurrencetype",
					type: "STRING"
				},
			],
			function: createRecurringEventCurrentTimeZone
		},
		{
			name: "createRecurringEventCustomTimeZone",
			parameters: [
				{
					name: "isOnlineMeeting",
					type: "BOOLEAN"
				},
				{
					name: "endDate",
					type: "STRING"
				},
				{
					name: "subject",
					type: "STRING"
				},
				{
					name: "timezone",
					type: "STRING"
				},
				{
					name: "onlineMeetingProvider",
					type: "STRING"
				},
				{
					name: "content",
					type: "STRING"
				},
				{
					name: "email6",
					type: "STRING"
				},
				{
					name: "email5",
					type: "STRING"
				},
				{
					name: "email4",
					type: "STRING"
				},
				{
					name: "email3",
					type: "STRING"
				},
				{
					name: "email2",
					type: "STRING"
				},
				{
					name: "email1",
					type: "STRING"
				},
				{
					name: "type1",
					type: "STRING"
				},
				{
					name: "type2",
					type: "STRING"
				},
				{
					name: "type3",
					type: "STRING"
				},
				{
					name: "type4",
					type: "STRING"
				},
				{
					name: "type5",
					type: "STRING"
				},
				{
					name: "type6",
					type: "STRING"
				},
				{
					name: "recurEndDate",
					type: "STRING"
				},
				{
					name: "startTime",
					type: "STRING"
				},
				{
					name: "userId",
					type: "STRING"
				},
				{
					name: "dayOfMonth",
					type: "STRING"
				},
				{
					name: "days",
					type: "STRING"
				},
				{
					name: "location",
					type: "STRING"
				},
				{
					name: "endTime",
					type: "STRING"
				},
				{
					name: "startDate",
					type: "STRING"
				},
				{
					name: "recurrencetype",
					type: "STRING"
				},
			],
			function: createRecurringEventCustomTimeZone
		},
		{
			name: "createRecurringOfficeHoursWithCurrentTimezone",
			parameters: [
				{
					name: "isOnlineMeeting",
					type: "BOOLEAN"
				},
				{
					name: "subject",
					type: "STRING"
				},
				{
					name: "endDateTime",
					type: "STRING"
				},
				{
					name: "userId",
					type: "STRING"
				},
				{
					name: "content",
					type: "STRING"
				},
				{
					name: "startDateTime",
					type: "STRING"
				},
				{
					name: "endDate",
					type: "STRING"
				},
				{
					name: "dayOfMonth",
					type: "STRING"
				},
				{
					name: "days",
					type: "STRING"
				},
				{
					name: "startDate",
					type: "STRING"
				},
				{
					name: "recurrencetype",
					type: "STRING"
				},
			],
			function: createRecurringOfficeHoursWithCurrentTimezone
		},
		{
			name: "createRecurringOfficeHourswithCustomTimezone",
			parameters: [
				{
					name: "isOnlineMeeting",
					type: "BOOLEAN",
				},

				{
					name: "subject",
					type: "STRING",
				},

				{
					name: "timezone",
					type: "STRING",
				},
				{
					name: "userId",
					type: "STRING",
				},
				{
					name: "content",
					type: "STRING",
				},

				{
					name: "dayOfMonth",
					type: "STRING",
				},
				{
					name: "days",
					type: "STRING",
				},

				{
					name: "recurrencetype",
					type: "STRING",
				},

				{
					name: "startDate",
					type: "STRING",
				},

				{
					name: "endDate",
					type: "STRING",
				},

				{
					name: "startTime",
					type: "STRING",
				},
				{
					name: "endTime",
					type: "STRING",
				},
				{
					name: "recurEndDate",
					type: "STRING",
				},
			],
			function: createRecurringOfficeHourswithCustomTimezone,
		},
		{
			name: "editOneTimeWithCurrentTimezone",
			parameters: [
				{
					name: "subject",
					type: "STRING",
				},
				{
					name: "content",
					type: "STRING",
				},
				{
					name: "startDateTime",
					type: "STRING",
				},
				{
					name: "timezone",
					type: "STRING",
				},
				{
					name: "endDateTime",
					type: "STRING",
				},

				{
					name: "type1",
					type: "STRING",
				},
				{
					name: "type2",
					type: "STRING",
				},
				{
					name: "type3",
					type: "STRING",
				},
				{
					name: "type4",
					type: "STRING",
				},
				{
					name: "type5",
					type: "STRING",
				},
				{
					name: "type6",
					type: "STRING",
				},
				{
					name: "email1",
					type: "STRING",
				},
				{
					name: "email2",
					type: "STRING",
				},

				{
					name: "email3",
					type: "STRING",
				},
				{
					name: "email4",
					type: "STRING",
				},
				{
					name: "email5",
					type: "STRING",
				},
				{
					name: "email6",
					type: "STRING",
				},

				{
					name: "location",
					type: "STRING",
				},
				{
					name: "isOnlineMeeting",
					type: "BOOLEAN",
				},
				{
					name: "onlineMeetingProvider",
					type: "STRING",
				},

				{
					name: "id",
					type: "STRING",
				},
				{
					name: "userId",
					type: "STRING",
				},
			],
			function: editOneTimeWithCurrentTimezone,
		},

		{
			name: "editOneTimeEventWithCustomTimezone",
			parameters: [
				{
					name: "subject",
					type: "STRING",
				},
				{
					name: "content",
					type: "STRING",
				},
				{
					name: "endDate",
					type: "STRING",
				},
				{
					name: "timezone",
					type: "STRING",
				},
				{
					name: "startDate",
					type: "STRING",
				},

				{
					name: "type1",
					type: "STRING",
				},
				{
					name: "type2",
					type: "STRING",
				},
				{
					name: "type3",
					type: "STRING",
				},
				{
					name: "type4",
					type: "STRING",
				},
				{
					name: "type5",
					type: "STRING",
				},
				{
					name: "type6",
					type: "STRING",
				},
				{
					name: "email1",
					type: "STRING",
				},
				{
					name: "email2",
					type: "STRING",
				},

				{
					name: "email3",
					type: "STRING",
				},
				{
					name: "email4",
					type: "STRING",
				},
				{
					name: "email5",
					type: "STRING",
				},
				{
					name: "email6",
					type: "STRING",
				},

				{
					name: "location",
					type: "STRING",
				},
				{
					name: "isOnlineMeeting",
					type: "BOOLEAN",
				},
				{
					name: "onlineMeetingProvider",
					type: "STRING",
				},
				{
					name: "startTime",
					type: "STRING",
				},
				{
					name: "id",
					type: "STRING",
				},
				{
					name: "userId",
					type: "STRING",
				},
				{
					name: "endTime",
					type: "STRING",
				},
			],
			function: editOneTimeEventWithCustomTimezone,
		},

		{
			name: "EditRecurringEventwithCurrentTimezone",
			parameters: [
				{ name: "isOnlineMeeting", type: "BOOLEAN" },
				{ name: "subject", type: "STRING" },
				{ name: "timezone", type: "STRING" },
				{ name: "onlineMeetingProvider", type: "STRING" },
				{ name: "startDate", type: "STRING" },
				{ name: "startDateTime", type: "STRING" },
				{ name: "content", type: "STRING" },
				{ name: "email1", type: "STRING" },
				{ name: "email2", type: "STRING" },
				{ name: "email3", type: "STRING" },
				{ name: "email4", type: "STRING" },
				{ name: "email5", type: "STRING" },
				{ name: "email6", type: "STRING" },
				{ name: "id", type: "STRING", required: true },
				{ name: "type1", type: "STRING" },
				{ name: "type2", type: "STRING" },
				{ name: "type3", type: "STRING" },
				{ name: "type4", type: "STRING" },
				{ name: "type5", type: "STRING" },
				{ name: "type6", type: "STRING" },
				{ name: "refreshEndTime", type: "STRING" },
				{ name: "endDateTime", type: "STRING" },
				{ name: "userId", type: "STRING", required: true },
				{ name: "endDate", type: "STRING" },
				{ name: "dayOfMonth", type: "STRING" },
				{ name: "days", type: "STRING" },
				{ name: "location", type: "STRING" },
				{ name: "refreshStartTime", type: "STRING" },
				{ name: "recurrenceType", type: "STRING" },
			],
			function: editRecurringEventwithCurrentTimezone
		},

		{
			name: "EditRecurringEventwithCustomTimezone",
			parameters: [
				{ name: "isOnlineMeeting", type: "BOOLEAN" },
				{ name: "subject", type: "STRING" },
				{ name: "timezone", type: "STRING" },
				{ name: "onlineMeetingProvider", type: "STRING" },
				{ name: "startDate", type: "STRING" },
				{ name: "startTime", type: "STRING" },
				{ name: "content", type: "STRING" },
				{ name: "email1", type: "STRING" },
				{ name: "email2", type: "STRING" },
				{ name: "email3", type: "STRING" },
				{ name: "email4", type: "STRING" },
				{ name: "email5", type: "STRING" },
				{ name: "email6", type: "STRING" },
				{ name: "id", type: "STRING", required: true },
				{ name: "type1", type: "STRING" },
				{ name: "type2", type: "STRING" },
				{ name: "type3", type: "STRING" },
				{ name: "type4", type: "STRING" },
				{ name: "type5", type: "STRING" },
				{ name: "type6", type: "STRING" },
				{ name: "refreshEndTime", type: "STRING" },
				{ name: "endTime", type: "STRING" },
				{ name: "userId", type: "STRING", required: true },
				{ name: "endDate", type: "STRING" },
				{ name: "dayOfMonth", type: "STRING" },
				{ name: "days", type: "STRING" },
				{ name: "location", type: "STRING" },
				{ name: "refreshStartTime", type: "STRING" },
				{ name: "recurrenceType", type: "STRING" },
				{ name: "reccurEndDate", type: "STRING" }
			],
			function: editRecurringEventwithCustomTimezone
		},

		{
			name: "EditRecurringOfficeHoursWithCurrentTimezone",
			parameters: [
				{ name: "isOnlineMeeting", type: "BOOLEAN" },
				{ name: "subject", type: "STRING" },
				{ name: "timezone", type: "STRING" },
				{ name: "startDate", type: "STRING" },
				{ name: "startDateTime", type: "STRING" },
				{ name: "content", type: "STRING" },
				{ name: "id", type: "STRING", required: true },
				{ name: "refreshEndTime", type: "STRING" },
				{ name: "endDateTime", type: "STRING" },
				{ name: "userId", type: "STRING", required: true },
				{ name: "endDate", type: "STRING" },
				{ name: "dayOfMonth", type: "STRING" },
				{ name: "days", type: "STRING" },
				{ name: "refreshStartTime", type: "STRING" },
				{ name: "recurrenceType", type: "STRING" },
			],
			function: editRecurringOfficeHoursWithCurrentTimezone
		},

		{
			name: "EditRecurringOfficeHoursWithCustomTimezone",
			parameters: [
				{ name: "isOnlineMeeting", type: "BOOLEAN" },
				{ name: "subject", type: "STRING" },
				{ name: "timezone", type: "STRING" },
				{ name: "startDate", type: "STRING" },
				{ name: "startTime", type: "STRING" },
				{ name: "content", type: "STRING" },
				{ name: "id", type: "STRING", required: true },
				{ name: "refreshEndTime", type: "STRING" },
				{ name: "endTime", type: "STRING" },
				{ name: "userId", type: "STRING", required: true },
				{ name: "endDate", type: "STRING" },
				{ name: "dayOfMonth", type: "STRING" },
				{ name: "days", type: "STRING" },
				{ name: "refreshStartTime", type: "STRING" },
				{ name: "recurrenceType", type: "STRING" },
				{ name: "reccurEndDate", type: "STRING" }
			],
			function: editRecurringOfficeHoursWithCustomTimezone
		},

		{
			name: "refresh",
			parameters: [
				{ name: "endDateTime", type: "STRING" },
				{ name: "startDateTime", type: "STRING" },
				{ name: "id", type: "STRING", required: true }
			],
			function: refresh
		}

	]
});


const moment = library.load('moment-timezone');
const uuid = library.load('uuid');
const pageSize = 100;
async function fullSync({ client, dataStore }) {
	const userIds = [];
	let URL = `/v1.0/users?$top=${pageSize}`;
	let nextPage = '';
	do {
		const userRequest = await client.fetch(URL);
		if (!userRequest.ok) {
			throw new Error(`Users sync failed ${userRequest.status}:${userRequest.statusText}.`);
		}
		const userResponse = await userRequest.json();
		for (const value of userResponse.value) {
			userIds.push(value.id);
			dataStore.save('users', {
				id: value?.id ?? null,
				mail: value?.mail ?? null,
				user_principal_name: value?.userPrincipalName ?? null,
				display_name: value?.displayName ?? null
			});
		}
		nextPage = userResponse['@odata.nextLink'] ?? null;
		if (nextPage != null) URL = `/v1.0/users?${nextPage.split(`?`)[1]}`;
	} while (nextPage);
	const startDate = moment.utc().subtract(1, 'd').format();
	await Promise.all([
		calendarView(client, dataStore, userIds, startDate),
		myEvents(client, dataStore, userIds)
	])
}

async function calendarView(client, dataStore, userId, startdate) {
	const endDate = moment.utc().add(30, 'd').format();
	for (const id of userId) {
		const calendarViewRequest = await client.fetch(
			`/v1.0/users/${id}/calendarView?startdatetime=${startdate}&enddatetime=${endDate}&$top=${pageSize}`
		);
		if (!calendarViewRequest.ok && calendarViewRequest.status != 404) {
			throw new Error(`Calendar sync failed ${calendarViewRequest.status}:${calendarViewRequest.statusText}.`);
		}
		const calendarViewResponse = await calendarViewRequest.json();
		if (calendarViewRequest.ok) {
			for (const calendarValue of calendarViewResponse.value) {
				dataStore.save('calender_view', {
					body_content: calendarValue?.body?.content ?? null,
					body_preview: calendarValue?.bodyPreview ?? null,
					end_date_time: moment.utc(calendarValue?.end?.dateTime ?? null).format(),
					i_cal_u_id: calendarValue?.iCalUId ?? null,
					id: calendarValue?.id ?? null,
					is_cancelled: calendarValue?.isCancelled ?? null,
					is_online_meeting: calendarValue?.isOnlineMeeting ?? null,
					location_display_name: calendarValue?.location?.displayName ?? null,
					online_meeting_join_url: calendarValue.onlineMeeting?.joinUrl ?? null,
					online_meeting_provider: calendarValue?.onlineMeetingProvider ?? null,
					organizer_email_address_a: calendarValue?.organizer?.emailAddress?.address ?? null,
					organizer_email_address_n: calendarValue?.organizer?.emailAddress?.name ?? null,
					original_start_time_zone: calendarValue?.originalStartTimeZone ?? null,
					series_master_id: calendarValue?.seriesMasterId ?? null,
					start_date_time: moment.utc(calendarValue?.start?.dateTime ?? null).format(),
					subject: calendarValue?.subject ?? null
				});
				for (const attendees of calendarValue.attendees) {
					dataStore.save('calender_view_attendees', {
						unique_id: uuid.v4(),
						parent_i_cal_u_id: calendarValue?.iCalUId ?? null,
						root_i_cal_u_id: calendarValue?.iCalUId ?? null,
						email_address_address: attendees?.emailAddress?.address ?? null,
						email_address_name: attendees?.emailAddress?.name ?? null,
						type: attendees?.type ?? null
					});
				}
			}
		}
	}
}

async function myEvents(client, dataStore, userId) {
	for (const id of userId) {
		const myEventRequest = await client.fetch(`/v1.0/users/${id}/calendar/events?$top=${pageSize}`);
		if (!myEventRequest.ok && myEventRequest.status != 404) {
			throw new Error(`Events sync failed ${myEventRequest.status}:${myEventRequest.statusText}`);
		}
		const myEventResponse = await myEventRequest.json();
		if (myEventRequest.ok) {
			for (const myEventsValue of myEventResponse.value) {
				dataStore.save('my_events', {
					i_cal_u_id: myEventsValue?.iCalUId ?? null,
					id: myEventsValue?.id ?? null,
					recurrence_pattern_day_of: myEventsValue?.recurrence?.pattern?.dayOfMonth ?? null,
					recurrence_pattern_type: myEventsValue?.recurrence?.pattern?.type ?? null,
					recurrence_range_end_date: myEventsValue?.recurrence?.range?.endDate ?? null
				});
			}
		}
	}
}

async function createOutlookOneTimeEventCurrentTimezone({
	dataStore,
	client,
	actionParameters
}) {
	const startDate = moment.utc().subtract(1, "m").format();
	const responseOfcreateOutlookOneTimeEventCurrentTimezone = await client.fetch(
		`v1.0/me/events`,
		{
			method: "POST",
			body: JSON.stringify({
				subject: actionParameters.subject,
				body: {
					contentType: "HTML",
					content: actionParameters.content
				},
				start: {
					dateTime: actionParameters.startDateTime,
					timeZone: ""
				},
				end: {
					dateTime: actionParameters.endDateTime,
					timeZone: ""
				},
				location: {
					displayName: actionParameters.location
				},
				attendees: [
					{
						emailAddress: {
							address: actionParameters.email1
						},
						type: actionParameters.type1
					},
					{
						emailAddress: {
							address: actionParameters.email2
						},
						type: actionParameters.type2
					},
					{
						emailAddress: {
							address: actionParameters.email3
						},
						type: actionParameters.type3
					},
					{
						emailAddress: {
							address: actionParameters.email4
						},
						type: actionParameters.type4
					},
					{
						emailAddress: {
							address: actionParameters.email5
						},
						type: actionParameters.type5
					},
					{
						emailAddress: {
							address: actionParameters.email6
						},
						type: actionParameters.type6
					}
				],
				allowNewTimeProposals: true,
				isOnlineMeeting: actionParameters.isOnlineMeeting,
				onlineMeetingProvider: actionParameters.onlineMeetingProvider
			})
		}
	);
	if (!responseOfcreateOutlookOneTimeEventCurrentTimezone.ok) {
		throw new Error(
			`Create Outlook onetime event with current timezone service action failed ${responseOfcreateOutlookOneTimeEventCurrentTimezone.status}:${responseOfcreateOutlookOneTimeEventCurrentTimezone.statusText}`
		);
	}
	const userId = [actionParameters.userId];
	await Promise.all([
		calendarView(client, dataStore, userId, startDate),
		myEvents(client, dataStore, userId)
	]);
}

async function createOutlookOneTimeEventCustomTimezone({
	dataStore,
	client,
	actionParameters
}) {
	const startDate = moment.utc().subtract(1, "m").format();
	const responseOfcreateOutlookOneTimeEventCustomTimezone = await client.fetch(
		`/v1.0/me/events`,
		{
			method: "POST",
			body: JSON.stringify({
				subject: actionParameters.subject,
				body: {
					contentType: "HTML",
					content: actionParameters.content
				},
				start: {
					dateTime: `${actionParameters.startDate}T${actionParameters.startTime}`,
					timeZone: actionParameters.timezone
				},
				end: {
					dateTime: `${actionParameters.endDate}T${actionParameters.endTime}`,
					timeZone: actionParameters.timezone
				},
				location: {
					displayName: actionParameters.location
				},
				attendees: [
					{
						emailAddress: {
							address: actionParameters.email1
						},
						type: actionParameters.type1
					},
					{
						emailAddress: {
							address: actionParameters.email2
						},
						type: actionParameters.type2
					},
					{
						emailAddress: {
							address: actionParameters.email3
						},
						type: actionParameters.type3
					},
					{
						emailAddress: {
							address: actionParameters.email4
						},
						type: actionParameters.type4
					},
					{
						emailAddress: {
							address: actionParameters.email5
						},
						type: actionParameters.type5
					},
					{
						emailAddress: {
							address: actionParameters.email6
						},
						type: actionParameters.type6
					}
				],
				allowNewTimeProposals: true,
				isOnlineMeeting: actionParameters.isOnlineMeeting,
				onlineMeetingProvider: actionParameters.onlineMeetingProvider
			})
		}
	);
	if (!responseOfcreateOutlookOneTimeEventCustomTimezone.ok) {
		throw new Error(
			`Create Outlook onetime with event custom timezone service action failed (${responseOfcreateOutlookOneTimeEventCustomTimezone.status}: ${responseOfcreateOutlookOneTimeEventCustomTimezone.statusText})`
		);
	}
	const userId = [actionParameters.userId];
	await Promise.all([
		calendarView(client, dataStore, userId, startDate),
		myEvents(client, dataStore, userId)
	]);
}

async function createRecurringEventCurrentTimeZone({
	dataStore,
	client,
	actionParameters
}) {
	const startDate = moment.utc().subtract(1, "m").format();
	const responseOfcreateRecurringEventCurrentTimeZone = await client.fetch(
		`/v1.0/me/events`,
		{
			method: "POST",
			body: JSON.stringify({
				subject: actionParameters.subject,
				body: {
					contentType: "HTML",
					content: actionParameters.content
				},
				start: {
					dateTime: actionParameters.startDateTime,
					timeZone: "UTC"
				},
				end: {
					dateTime: actionParameters.endDateTime,
					timeZone: "UTC"
				},
				location: {
					displayName: actionParameters.location
				},
				attendees: [
					{
						emailAddress: {
							address: actionParameters.email1
						},
						type: actionParameters.type1
					},
					{
						emailAddress: {
							address: actionParameters.email2
						},
						type: actionParameters.type2
					},
					{
						emailAddress: {
							address: actionParameters.email3
						},
						type: actionParameters.type3
					},
					{
						emailAddress: {
							address: actionParameters.email4
						},
						type: actionParameters.type4
					},
					{
						emailAddress: {
							address: actionParameters.email5
						},
						type: actionParameters.type5
					},
					{
						emailAddress: {
							address: actionParameters.email6
						},
						type: actionParameters.type6
					},
				],
				allowNewTimeProposals: true,
				isOnlineMeeting: actionParameters.isOnlineMeeting,
				onlineMeetingProvider: actionParameters.onlineMeetingProvider,
				recurrence: {
					pattern: {
						type: actionParameters.recurrencetype,
						interval: 1,
						daysOfWeek: [actionParameters.days],
						dayOfMonth: actionParameters.dayOfMonth
					},
					range: {
						type: "endDate",
						startDate: moment(actionParameters.startDate).format("YYYY-MM-DD"),
						endDate: actionParameters.endDate
					}
				}
			})
		}
	);
	if (!responseOfcreateRecurringEventCurrentTimeZone.ok) {
		throw new Error(
			`Create Outlook recurring event with current timezone service action failed (${responseOfcreateRecurringEventCurrentTimeZone.status}: ${responseOfcreateRecurringEventCurrentTimeZone.statusText})`
		);
	}
	const userId = [actionParameters.userId];
	await Promise.all([
		calendarView(client, dataStore, userId, startDate),
		myEvents(client, dataStore, userId)
	]);
}

async function createRecurringEventCustomTimeZone({
	dataStore,
	client,
	actionParameters,
}) {
	const startDate = moment.utc().subtract(1, "m").format();
	const responseOfcreateRecurringEventCustomTimeZone = await client.fetch(
		`/v1.0/me/events`,
		{
			method: "POST",
			body: JSON.stringify({
				subject: actionParameters.subject,
				body: {
					contentType: "HTML",
					content: actionParameters.content
				},
				start: {
					dateTime: `${actionParameters.startDate}T${actionParameters.startTime}`,
					timeZone: actionParameters.timezone
				},
				end: {
					dateTime: `${actionParameters.endDate}T${actionParameters.endTime}`,
					timeZone: actionParameters.timezone
				},
				location: {
					displayName: actionParameters.location
				},
				attendees: [
					{
						emailAddress: {
							address: actionParameters.email1
						},
						type: actionParameters.type1
					},
					{
						emailAddress: {
							address: actionParameters.email2
						},
						type: actionParameters.type2
					},
					{
						emailAddress: {
							address: actionParameters.email3
						},
						type: actionParameters.type3
					},
					{
						emailAddress: {
							address: actionParameters.email4
						},
						type: actionParameters.type4
					},
					{
						emailAddress: {
							address: actionParameters.email5
						},
						type: actionParameters.type5
					},
					{
						emailAddress: {
							address: actionParameters.email6
						},
						type: actionParameters.type6
					}
				],
				allowNewTimeProposals: true,
				isOnlineMeeting: actionParameters.isOnlineMeeting,
				onlineMeetingProvider: actionParameters.onlineMeetingProvider,
				recurrence: {
					pattern: {
						type: actionParameters.recurrencetype,
						interval: 1,
						daysOfWeek: [actionParameters.days],
						dayOfMonth: actionParameters.dayOfMonth
					},
					range: {
						type: "endDate",
						startDate: actionParameters.startDate,
						endDate: actionParameters.recurEndDate
					}
				}
			})
		}
	);
	if (!responseOfcreateRecurringEventCustomTimeZone.ok) {
		throw new Error(
			`Create Outlook recurring event with custom timezone service action failed  (${responseOfcreateRecurringEventCustomTimeZone.status}: ${responseOfcreateRecurringEventCustomTimeZone.statusText})`
		);
	}
	const userId = [actionParameters.userId];
	await Promise.all([
		calendarView(client, dataStore, userId, startDate),
		myEvents(client, dataStore, userId)
	]);
}

async function createRecurringOfficeHoursWithCurrentTimezone({
	dataStore,
	client,
	actionParameters
}) {
	const startDate = moment.utc().subtract(1, "m").format();
	const responseOfcreateRecurringOfficeHoursWithCurrentTimezone = await client.fetch(
		`/v1.0/me/events`, {
		method: "POST",
		body: JSON.stringify({
			subject: actionParameters.subject,
			body: {
				contentType: "HTML",
				content: actionParameters.content
			},
			start: {
				dateTime: actionParameters.startDateTime,
				timeZone: "UTC"
			},
			end: {
				dateTime: actionParameters.endDateTime,
				timeZone: "UTC"
			},
			allowNewTimeProposals: true,
			isOnlineMeeting: actionParameters.isOnlineMeeting,
			onlineMeetingProvider: "teamsForBusiness",
			recurrence: {
				pattern: {
					type: actionParameters.recurrencetype,
					interval: 1,
					daysOfWeek: [actionParameters.days],
					dayOfMonth: actionParameters.dayOfMonth
				},
				range: {
					type: "endDate",
					startDate: moment(actionParameters.startDate).format("YYYY-MM-DD"),
					endDate: actionParameters.endDate
				}
			}
		})
	});
	if (!responseOfcreateRecurringOfficeHoursWithCurrentTimezone.ok) {
		throw new Error(
			`Create Outlook Office Hours event with current timezone service action failed  (${responseOfcreateRecurringOfficeHoursWithCurrentTimezone.status}: ${responseOfcreateRecurringOfficeHoursWithCurrentTimezone.statusText})`
		);
	}
	const userId = [actionParameters.userId];
	await Promise.all([
		calendarView(client, dataStore, userId, startDate),
		myEvents(client, dataStore, userId)
	]);
}


async function createRecurringOfficeHourswithCustomTimezone({
	dataStore,
	client,
	actionParameters,
}) {
	const startDate = moment.utc().subtract(1, "m").format();

	const responseOfSwitchCustomTimeZone = await client.fetch(`v1.0/me/events`, {
		method: "POST",
		body: JSON.stringify({
			subject: actionParameters.subject,
			body: {
				contentType: "HTML",
				content: actionParameters.content,
			},
			start: {
				dateTime: `${actionParameters.startDate}T${actionParameters.startTime}`,
				timeZone: actionParameters.timezone,
			},
			end: {
				dateTime: `${actionParameters.endDate}T${actionParameters.endTime}`,
				timeZone: actionParameters.timezone,
			},
			allowNewTimeProposals: true,
			isOnlineMeeting: actionParameters.isOnlineMeeting,
			onlineMeetingProvider: "teamsForBusiness",
			recurrence: {
				pattern: {
					type: actionParameters.recurrencetype,
					interval: 1,
					daysOfWeek: [actionParameters.days],
					dayOfMonth: actionParameters.dayOfMonth,
				},
				range: {
					type: "endDate",
					startDate: moment(actionParameters.startDate).format("YYYY-MM-DD"),
					endDate: actionParameters.recurEndDate,
				},
			},
		}),
	});
	if (!responseOfSwitchCustomTimeZone.ok) {
		throw new Error(
			` Could not create Recurring OfficeHours with Custom timezone(${responseOfSwitchCustomTimeZone.status}: ${responseOfSwitchCustomTimeZone.statusText})`
		);
	}
	const userId = [actionParameters.userId];
	await Promise.all([
		calendarView(client, dataStore, userId, startDate),
		myEvents(client, dataStore, userId),
	]);
}

async function editOneTimeWithCurrentTimezone({
	dataStore,
	client,
	actionParameters,
}) {
	const startDate = moment.utc().subtract(1, "m").format();
	const responseOfCurrentTimeZone = await client.fetch(
		`v1.0/me/events/${actionParameters.id}`,
		{
			method: "PATCH",
			body: JSON.stringify({
				subject: actionParameters.subject,
				body: {
					contentType: "HTML",
					content: actionParameters.content,
				},
				start: {
					dateTime: actionParameters.startDateTime,
					timeZone: actionParameters.timezone,
				},

				end: {
					dateTime: actionParameters.endDateTime,
					timeZone: actionParameters.timezone,
				},
				location: {
					displayName: actionParameters.location,
				},
				attendees: [
					{
						emailAddress: {
							address: actionParameters.email1,
						},
						type: actionParameters.type1,
					},
					{
						emailAddress: {
							address: actionParameters.email2,
						},
						type: actionParameters.type2,
					},
					{
						emailAddress: {
							address: actionParameters.email3,
						},
						type: actionParameters.type3,
					},
					{
						emailAddress: {
							address: actionParameters.email4,
						},
						type: actionParameters.type4,
					},
					{
						emailAddress: {
							address: actionParameters.email5,
						},
						type: actionParameters.type5,
					},
					{
						emailAddress: {
							address: actionParameters.email6,
						},
						type: actionParameters.type6,
					},
				],
				allowNewTimeProposals: true,
				isOnlineMeeting: actionParameters.isOnlineMeeting,
				onlineMeetingProvider: actionParameters.onlineMeetingProvider

			}),
		}
	);
	if (!responseOfCurrentTimeZone.ok) {
		throw new Error(
			`Could not Edit OneTime with CurrentTimezone (${responseOfCurrentTimeZone.status}: ${responseOfCurrentTimeZone.statusText})`
		);
	}
	const userId = [actionParameters.userId];
	await Promise.all([
		calendarView(client, dataStore, userId, startDate),
		myEvents(client, dataStore, userId),
	]);
}

async function editOneTimeEventWithCustomTimezone({
	dataStore,
	client,
	actionParameters,
}) {
	const startDate = moment.utc().subtract(1, "m").format();

	const responseOfCustomTimeZone = await client.fetch(
		`v1.0/me/events/${actionParameters.id}`,
		{
			method: "PATCH",
			body: JSON.stringify({
				subject: actionParameters.subject,
				body: {
					contentType: "HTML",
					content: actionParameters.content,
				},
				start: {
					dateTime: `${actionParameters.startDate}T${actionParameters.startTime}`,
					timeZone: actionParameters.timezone,
				},

				end: {
					dateTime: `${actionParameters.endDate}T${actionParameters.endTime}`,
					timeZone: actionParameters.timezone,
				},
				location: {
					displayName: actionParameters.location,
				},
				attendees: [
					{
						emailAddress: {
							address: actionParameters.email1,
						},
						type: actionParameters.type1,
					},
					{
						emailAddress: {
							address: actionParameters.email2,
						},
						type: actionParameters.type2,
					},
					{
						emailAddress: {
							address: actionParameters.email3,
						},
						type: actionParameters.type3,
					},
					{
						emailAddress: {
							address: actionParameters.email4,
						},
						type: actionParameters.type4,
					},
					{
						emailAddress: {
							address: actionParameters.email5,
						},
						type: actionParameters.type5,
					},
					{
						emailAddress: {
							address: actionParameters.email6,
						},
						type: actionParameters.type6,
					},
				],
				allowNewTimeProposals: true,
				isOnlineMeeting: actionParameters.isOnlineMeeting,
				onlineMeetingProvider: actionParameters.onlineMeetingProvider,
				id: actionParameters.id
			})
		}
	);
	if (!responseOfCustomTimeZone.ok) {
		throw new Error(
			`Could not Edit OneTimeEvent with CustomTimezone (${responseOfCustomTimeZone.status}: ${responseOfCustomTimeZone.statusText})`
		);
	}
	const userId = [actionParameters.userId];
	await Promise.all([
		calendarView(client, dataStore, userId, startDate),
		myEvents(client, dataStore, userId),
	]);
}


async function editRecurringEventwithCurrentTimezone(param) {
	const { client, dataStore, actionParameters } = param
	const start = moment.utc().subtract(1, "m").format()
	const end = moment().utc().add(30, 'd').format()
	const attendees = [
		{
			"emailAddress": {
				"address": `${actionParameters?.email1}`
			},
			"type": `${actionParameters.type1}`
		}
	]
	if (actionParameters?.email2 && actionParameters?.type2) {
		attendees.push(
			{
				"emailAddress": {
					"address": `${actionParameters.email2}`
				},
				"type": `${actionParameters.type2}`
			}
		)
	}
	if (actionParameters?.email3 && actionParameters?.type3) {
		attendees.push({
			"emailAddress": {
				"address": `${actionParameters.email3}`
			},
			"type": `${actionParameters.type3}`
		})
	}
	if (actionParameters?.email4 && actionParameters?.type4) {
		attendees.push({
			"emailAddress": {
				"address": `${actionParameters.email4}`
			},
			"type": `${actionParameters.type4}`
		})
	}
	if (actionParameters?.email5 && actionParameters?.type5) {
		attendees.push({
			"emailAddress": {
				"address": `${actionParameters.email5}`
			},
			"type": `${actionParameters.type5}`
		})
	}
	if (actionParameters?.email6 && actionParameters?.type6) {
		attendees.push({
			"emailAddress": {
				"address": `${actionParameters.email6}`
			},
			"type": `${actionParameters.type6}`
		})
	}
	const editRecurringEventRequest = await client.fetch(`v1.0/me/events/${actionParameters.id}`, {
		method: "PATCH",
		body: JSON.stringify({
			"subject": `${actionParameters.subject}`,
			"body": {
				"contentType": "HTML",
				"content": `${actionParameters.content}`
			},
			"start": {
				"dateTime": `${actionParameters.startDateTime}`,
				"timeZone": `${actionParameters.timezone}`
			},
			"end": {
				"dateTime": `${actionParameters.endDateTime}`,
				"timeZone": `${actionParameters.timezone}`
			},
			"location": {
				"displayName": `${actionParameters.location}`
			},
			"attendees": [{
				"emailAddress": {
					"address": `${actionParameters.email1}`
				},
				"type": `${actionParameters.type1}`
			},
			{
				"emailAddress": {
					"address": `${actionParameters.email2}`
				},
				"type": `${actionParameters.type2}`
			},
			{
				"emailAddress": {
					"address": `${actionParameters.email3}`
				},
				"type": `${actionParameters.type3}`
			},
			{
				"emailAddress": {
					"address": `${actionParameters.email4}`
				},
				"type": `${actionParameters.type4}`
			},
			{
				"emailAddress": {
					"address": `${actionParameters.email5}`
				},
				"type": `${actionParameters.type5}`
			},
			{
				"emailAddress": {
					"address": `${actionParameters.email6}`
				},
				"type": `${actionParameters.type6}`
			}
			],
			"allowNewTimeProposals": true,
			"isOnlineMeeting": actionParameters.isOnlineMeeting,
			"onlineMeetingProvider": `${actionParameters.onlineMeetingProvider}`,
			"recurrence": {
				"pattern": {
					"type": `${actionParameters.recurrenceType}`,
					"interval": 1,
					"daysOfWeek": [actionParameters.days],
					"dayOfMonth": actionParameters.dayOfMonth
				},
				"range": {
					"type": "endDate",
					"startDate": `${moment(actionParameters.startDate).format('YYYY-MM-DD')}`,
					"endDate": `${actionParameters.endDate}`
				}
			}
		})
	})
	if (!editRecurringEventRequest.ok) {
		throw new Error(`Edit Recurring Event with current timezone service action is failed ${editRecurringEventRequest.status}:${editRecurringEventRequest.statusText}`)
	}
	const userId = [actionParameters.userId];
	await Promise.all([
		calendarView(client, dataStore, userId, start),
		myEvents(client, dataStore, userId),
	]);
}
async function editRecurringEventwithCustomTimezone(param) {
	const { client, dataStore, actionParameters } = param
	const start = moment.utc().subtract(1, "m").format()
	const end = moment().utc().add(30, 'd').format()
	const editRecurringEventRequest = await client.fetch(`v1.0/me/events/${actionParameters.id}`, {
		method: "PATCH",
		body: JSON.stringify({
			"subject": `${actionParameters.subject}`,
			"body": {
				"contentType": "HTML",
				"content": `${actionParameters.content}`
			},
			"start": {
				"dateTime": `${actionParameters.startDate}T${actionParameters.startTime}`,
				"timeZone": `${actionParameters.timezone}`
			},

			"end": {
				"dateTime": `${actionParameters.endDate}T${actionParameters.endTime}`,
				"timeZone": `${actionParameters.timezone}`
			},
			"location": {
				"displayName": `${actionParameters.location}`
			},
			"attendees": [{
				"emailAddress": {
					"address": `${actionParameters?.email1 ?? ""}`
				},
				"type": `${actionParameters.type1}`
			},
			{
				"emailAddress": {
					"address": `${actionParameters?.email2 ?? ""}`
				},
				"type": `${actionParameters.type2}`
			},
			{
				"emailAddress": {
					"address": `${actionParameters?.email3 ?? ""}`
				},
				"type": `${actionParameters.type3}`
			},
			{
				"emailAddress": {
					"address": `${actionParameters?.email4 ?? ""}`
				},
				"type": `${actionParameters.type4}`
			},
			{
				"emailAddress": {
					"address": `${actionParameters?.email5 ?? ""}`
				},
				"type": `${actionParameters.type5}`
			},
			{
				"emailAddress": {
					"address": `${actionParameters?.email6 ?? ""}`
				},
				"type": `${actionParameters.type6}`
			}
			],
			"allowNewTimeProposals": true,
			"isOnlineMeeting": actionParameters.isOnlineMeeting,
			"onlineMeetingProvider": `${actionParameters.onlineMeetingProvider}`,
			"recurrence": {
				"pattern": {
					"type": `${actionParameters.recurrenceType}`,
					"interval": 1,
					"daysOfWeek": [actionParameters.days],
					"dayOfMonth": actionParameters.dayOfMonth
				},
				"range": {
					"type": "endDate",
					"startDate": moment(actionParameters.startDate).format('YYYY-MM-DD'),
					"endDate": `${actionParameters.reccurEndDate}`
				}
			}
		})
	})
	if (!editRecurringEventRequest.ok) {
		throw new Error(`Edit Recurring Event with custom timezone service action is failed ${editRecurringEventRequest.status}:${editRecurringEventRequest.statusText}`)
	}
	const userId = [actionParameters.userId];
	await Promise.all([
		calendarView(client, dataStore, userId, start),
		myEvents(client, dataStore, userId),
	]);
}



async function editRecurringOfficeHoursWithCurrentTimezone(param) {
	const { client, dataStore, actionParameters } = param
	const start = moment.utc().subtract(1, "m").format()
	const end = moment().utc().add(30, 'd').format()
	const editRecurringEventRequest = await client.fetch(`v1.0/me/events/${actionParameters.id}`, {
		method: "PATCH",
		body: JSON.stringify({
			"subject": `${actionParameters.subject}`,
			"body": {
				"contentType": "HTML",
				"content": `${actionParameters.content}`
			},
			"start": {
				"dateTime": `${actionParameters.startDateTime}`,
				"timeZone": `${actionParameters.timezone}`
			},

			"end": {
				"dateTime": `${actionParameters.endDateTime}`,
				"timeZone": `${actionParameters.timezone}`
			},

			"allowNewTimeProposals": true,
			"isOnlineMeeting": actionParameters.isOnlineMeeting,
			"onlineMeetingProvider": "teamsForBusiness",
			"recurrence": {
				"pattern": {
					"type": `${actionParameters.recurrenceType}`,
					"interval": 1,
					"daysOfWeek": [actionParameters.days],
					"dayOfMonth": actionParameters.dayOfMonth
				},
				"range": {
					"type": "endDate",
					"startDate": `${moment(actionParameters.startDate).format('YYYY-MM-DD')}`,
					"endDate": `${actionParameters.endDate}`
				}
			}
		})
	})
	if (!editRecurringEventRequest.ok) {
		throw new Error(`Edit Recurring Office Hours with current timezone service action is failed ${editRecurringEventRequest.status}:${editRecurringEventRequest.statusText}`)
	}
	const userId = [actionParameters.userId];
	await Promise.all([
		calendarView(client, dataStore, userId, start),
		myEvents(client, dataStore, userId),
	]);
}

async function editRecurringOfficeHoursWithCustomTimezone(param) {
	const { client, dataStore, actionParameters } = param
	const start = moment.utc().subtract(1, "m").format()
	const end = moment().utc().add(30, 'd').format()
	const editRecurringEventRequest = await client.fetch(`v1.0/me/events/${actionParameters.id}`, {
		method: "PATCH",
		body: JSON.stringify({
			"subject": `${actionParameters.subject}`,
			"body": {
				"contentType": "HTML",
				"content": `${actionParameters.content}`
			},
			"start": {
				"dateTime": `${actionParameters.startDate}T${actionParameters.startTime}`,
				"timeZone": `${actionParameters.timezone}`
			},

			"end": {
				"dateTime": `${actionParameters.endDate}T${actionParameters.endTime}`,
				"timeZone": `${actionParameters.timezone}`
			},

			"allowNewTimeProposals": true,
			"isOnlineMeeting": actionParameters.isOnlineMeeting,
			"onlineMeetingProvider": "teamsForBusiness",
			"recurrence": {
				"pattern": {
					"type": `${actionParameters.recurrenceType}`,
					"interval": 1,
					"daysOfWeek": [actionParameters.days],
					"dayOfMonth": actionParameters.dayOfMonth
				},
				"range": {
					"type": "endDate",
					"startDate": `${moment(actionParameters.startDate).format('YYYY-MM-DD')}`,
					"endDate": `${actionParameters.reccurEndDate}`
				}
			}
		})
	})
	if (!editRecurringEventRequest.ok) {
		throw new Error(`Edit Recurring Office Hours with custom timezone service action is failed ${editRecurringEventRequest.status}:${editRecurringEventRequest.statusText}`)
	}
	const userId = [actionParameters.userId];
	await Promise.all([
		calendarView(client, dataStore, userId, start),
		myEvents(client, dataStore, userId),
	]);
}


async function refresh(param) {
	const { client, dataStore, actionParameters } = param
	const start = moment.utc().subtract(1, "m").format()
	await Promise.all([
		calendarView(client, dataStore, [actionParameters.id], start),
		myEvents(client, dataStore, [actionParameters.id])
	])
}