const FAVORITE_CHANNEL = 'C019TN87BD0';
const OLDEST_TIMESTAMP = '1602316800';
const ENDPOINT_FAVORITES_CHANNELS = "/conversations.history?channel=" + FAVORITE_CHANNEL
const ENDPOINT_FAVORITE_CHANNEL_MESSAGES = "/conversations.history?channel=" + FAVORITE_CHANNEL + "&oldest=" + OLDEST_TIMESTAMP + "&limit=200"
const ENDPOINT_USER_INFO = "/users.info?user="
const ENDPOINT_CHANNEL = '/conversations.list?types=public_channel,private_channel'
const ENDPOINT_CHANNEL_MEMBERS = '/conversations.members?channel='


integration.define({
    "synchronizations": [
        {
            "name": "ChangeIDbyRealName",
            "fullSyncFunction": fullSync,
            "incrementalSyncFunction": incrementalSync
        }
    ],
    "model": {
        "tables": [
            {
                "name": "fav_chan_messages_realname",
                "columns": [
                    {
                        "name": "ts",
                        "type": "STRING",
                        "length": 255,
                        "primaryKey": true
                    },
                    {
                        "name": "datetime",
                        "type": "DATETIME",
                    },
                    {
                        "name": "text",
                        "type": "STRING",
                        "length": 255
                    },
                    {
                        "name": "text_changed",
                        "type": "STRING",
                        "length": 255
                    }
                ]
            },
            {
                "name": "favorite_channels_members",
                "columns": [
                    {
                        "name": "id",
                        "type": "STRING",
                        "length": 255,
                        "primaryKey": true
                    },
                    {
                        "name": "user",
                        "type": "STRING",
                        "length": 255,
                        "primaryKey": true
                    },
                    {
                        "name": "name",
                        "type": "STRING",
                        "length": 255,

                    },
                    {
                        "name": "ts",
                        "type": "STRING",
                        "length": 255,

                    },
                    {
                        "name": "is_favorite",
                        "type": "BOOLEAN"
                    }
                ]
            }
        ]
    }
});

async function changeIDbyRealName(dataStore, client, isIncremental, latestSynchronizationTime=null) {
    let respFavChannels = await client.fetch(ENDPOINT_FAVORITES_CHANNELS)
    let parsedChannelMessages = [];
    let parsedAllFavoriteChannels = [];
    let parsedAllChannels = [];
    let urlEndpoint = "";

    if (respFavChannels.ok) {

        let favoriteChannels = await respFavChannels.json()
        let prettyFavoriteChannels = JSON.stringify(favoriteChannels.messages, null, '\t')
        let parsedFavoriteChannels = JSON.parse(prettyFavoriteChannels)
        let indexChannels = 0
        let usedChannels = []
        let nextChannel = false
        let strLastSyncDateTime = ""

        do {
            urlEndpoint = ENDPOINT_FAVORITE_CHANNEL_MESSAGES

            if (isIncremental) {
                if (latestSynchronizationTime) {
                    strLastSyncDateTime = latestSynchronizationTime
                    let lastSyncDateTime = new Date(strLastSyncDateTime)
                    urlEndpoint = urlEndpoint.replace(OLDEST_TIMESTAMP, `${lastSyncDateTime.getTime() / 1000}`.slice(0, 10))
                } else {
                    let sevenDaysBeforeSync = new Date();
                    sevenDaysBeforeSync.setDate(sevenDaysBeforeSync.getDate() - 7);
                    urlEndpoint = urlEndpoint.replace(OLDEST_TIMESTAMP, `${sevenDaysBeforeSync.getTime() / 1000}`.slice(0, 10))
                }
            }

            usedChannels.forEach(channel => {
                if (channel === parsedFavoriteChannels[indexChannels].text)
                    nextChannel = true
            });

            if (nextChannel) {
                nextChannel = false
                indexChannels++
                continue
            }

            urlEndpoint = urlEndpoint.replace(FAVORITE_CHANNEL, parsedFavoriteChannels[indexChannels].text)
            let response = await client.fetch(urlEndpoint)

            usedChannels.push(parsedFavoriteChannels[indexChannels].text)
            parsedAllFavoriteChannels.push(parsedFavoriteChannels[indexChannels])

            if (response.ok) {
                let channelMessages = await response.json()
                if (channelMessages.messages === undefined) {
                    indexChannels++
                    continue
                }
                let prettyMessages = JSON.stringify(channelMessages.messages, null, '\t')
                let parsedMessages = JSON.parse(prettyMessages)
                let indexMessages = 0

                if (parsedMessages[indexMessages] === undefined || parsedMessages === undefined) {
                    indexChannels++
                    continue
                }

                do {

                    let user_id = ""
                    let user_ids = []
                    let indexUser = 0;
                    let text = parsedMessages[indexMessages].text;
                    let searchText = text;

                    do {

                        user_id = searchText.substring(searchText.indexOf('<@') + 2, searchText.indexOf('>'));

                        if (searchText.indexOf('<@') >= 0) {
                            user_ids.push(user_id)
                        } else {
                            parsedMessages[indexMessages].text_changed = text
                        }

                        searchText = searchText.substring(searchText.indexOf('>') + 1)

                        let resp = await client.fetch(ENDPOINT_USER_INFO + user_ids[indexUser])

                        if (resp.ok) {
                            let userData = await resp.json()
                            if (userData.user === undefined) {
                                indexChannels++
                                continue
                            }

                            parsedMessages[indexMessages].text_changed = text.replace('<@' + user_ids[indexUser] + '>', userData.user.real_name)

                        } else {
                            throw new Error(`Could not retrieve user data (${response.status}: ${response.statusText})`);
                        }

                        indexUser++
                    } while (searchText.indexOf('>') >= 0)

                    parsedMessages[indexMessages].datetime = new Date(parsedMessages[indexMessages].ts * 1000);
                    parsedChannelMessages.push(parsedMessages[indexMessages])

                    indexMessages++;
                } while (parsedMessages[indexMessages] !== undefined)


            } else {
                throw new Error(`Could not retrieve favorite channel messages (${response.status}: ${response.statusText})`);
            }

            indexChannels++;
        } while (parsedFavoriteChannels[indexChannels] !== undefined)

        urlEndpoint = ENDPOINT_CHANNEL;

        let respChannels = await client.fetch(urlEndpoint)

        if (respChannels.ok) {
            let allChannels = await respChannels.json()
            let prettyChannels = JSON.stringify(allChannels.channels, null, '\t')
            let parsedChannels = JSON.parse(prettyChannels)
            let indexChannels = 0;

            do {
                let channel = parsedChannels[indexChannels]
                urlEndpoint = ENDPOINT_CHANNEL_MEMBERS + channel.id
                let respChannelsMembers = await client.fetch(urlEndpoint)

                if (respChannelsMembers.ok) {
                    let allChannelsMember = await respChannelsMembers.json()
                    if (allChannelsMember.members === undefined) {
                        indexChannels++
                        continue
                    }
                    let prettyChannelsMembers = JSON.stringify(allChannelsMember.members, null, '\t')
                    let parsedChannelsMembers = JSON.parse(prettyChannelsMembers)
                    let insert = true;
                    let indexChannelsMembers = 0;
                    let channelMember = "";

                    do {

                        channelMember = parsedChannelsMembers[indexChannelsMembers]
                        insert = true;
                        channel.is_favorite = false
                        channel.user = channelMember
                        channel.ts = null
                        parsedAllFavoriteChannels.forEach(async (favoriteChannel) => {
                            if (channel.id === favoriteChannel.text && channelMember === favoriteChannel.user) {
                                channel.is_favorite = true
                                channel.ts = favoriteChannel.ts
                            }
                        });
                        let id = channel.id
                        let user = channel.user
                        let is_favorite = channel.is_favorite
                        let name = channel.name
                        let ts = channel.ts
                        parsedAllChannels.push({id, user, name, ts, is_favorite})

                        indexChannelsMembers++
                    } while (parsedChannelsMembers[indexChannelsMembers] !== undefined)

                }

                indexChannels++
            } while (parsedChannels[indexChannels] !== undefined)

            if (parsedAllChannels) {
                dataStore.save("favorite_channels_members", parsedAllChannels)
            }

        } else {
            throw new Error(`Could not retrieve channels (${response.status}: ${response.statusText})`);
        }

    } else {
        throw new Error(`Could not retrieve favorite channels (${response.status}: ${response.statusText})`);
    }

    if (parsedChannelMessages) {
        dataStore.save("fav_chan_messages_realname", parsedChannelMessages)
    }
}

async function fullSync({dataStore, client}) {
    await changeIDbyRealName(dataStore, client, false);
}

async function incrementalSync({dataStore, client, latestSynchronizationTime}) {
    await changeIDbyRealName(dataStore, client, false, latestSynchronizationTime);
}