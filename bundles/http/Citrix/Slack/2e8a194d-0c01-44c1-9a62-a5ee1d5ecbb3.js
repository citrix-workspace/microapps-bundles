const FAVORITE_CHANNEL_ID = 'C019TN87BD0';

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
                        "type": "DATETIME"
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

async function changeIDbyRealName(dataStore, client, isIncremental, latestSynchronizationTime = null) {
    let respFavChannels = await client.fetch(`/conversations.history?channel=${FAVORITE_CHANNEL_ID}` )
    let parsedChannelMessages = [];
    let parsedAllFavoriteChannels = [];
    let parsedAllChannels = [];

    if (respFavChannels.ok) {

        let favoriteChannels = await respFavChannels.json()
        let favoriteChannelMessages = favoriteChannels.messages;
        let indexChannels = 0
        let usedChannels = []
        let nextChannel = false

        do {
            let sevenDaysBeforeSync = new Date();
            sevenDaysBeforeSync.setDate(sevenDaysBeforeSync.getDate() - 7);
            let timestamp = `${sevenDaysBeforeSync.getTime() / 1000}`.slice(0, 10);

            if (isIncremental) {
                if (latestSynchronizationTime) {
                    const lastSyncDateTime = new Date(latestSynchronizationTime)
                    timestamp = `${lastSyncDateTime.getTime() / 1000}`.slice(0, 10);
                }
            }

            nextChannel = usedChannels.includes(favoriteChannelMessages[indexChannels].text)

            if (nextChannel) {
                nextChannel = false
                indexChannels++
                continue
            }

            const channel = favoriteChannelMessages[indexChannels].text

            const response = await client.fetch(
                `/conversations.history?channel=${channel}&oldest=${timestamp}&limit=200`
            )

            usedChannels.push(favoriteChannelMessages[indexChannels].text)
            parsedAllFavoriteChannels.push(favoriteChannelMessages[indexChannels])

            if (response.ok) {

                let channelMessagesResponse = await response.json()
                let channelMessages = channelMessagesResponse.messages

                if (channelMessages === undefined) {
                    indexChannels++
                    continue
                }

                let indexMessages = 0

                if (channelMessages[indexMessages] === undefined) {
                    indexChannels++
                    continue
                }

                do {

                    let user_ids = []
                    let indexUser = 0;
                    let text = channelMessages[indexMessages].text;
                    let searchText = text;

                    do {

                        const user_id = searchText.substring(searchText.indexOf('<@') + 2, searchText.indexOf('>'));

                        if (user_id) {
                            user_ids.push(user_id)
                        } else {
                            channelMessages[indexMessages].text_changed = text
                        }

                        searchText = searchText.substring(searchText.indexOf('>') + 1)

                        let resp = await client.fetch(`/users.info?user=${user_ids[indexUser]}`)

                        if (resp.ok) {
                            let userData = await resp.json()
                            if (userData.user === undefined) {
                                indexChannels++
                                continue
                            }

                            channelMessages[indexMessages].text_changed = text.replace('<@' + user_ids[indexUser] + '>', userData.user.real_name)

                        } else {
                            throw new Error(`Could not retrieve user data (${resp.status}: ${resp.statusText})`);
                        }

                        indexUser++
                    } while (searchText.indexOf('>') >= 0)
                    channelMessages[indexMessages].datetime = new Date(channelMessages[indexMessages].ts * 1000);
                    parsedChannelMessages.push(channelMessages[indexMessages])

                    indexMessages++;
                } while (channelMessages[indexMessages] !== undefined)

            } else {
                throw new Error(`Could not retrieve favorite channel messages (${response.status}: ${response.statusText})`);
            }

            indexChannels++;
        } while (favoriteChannels[indexChannels] !== undefined)

        const respChannels = await client.fetch('/conversations.list?types=public_channel,private_channel')

        if (respChannels.ok) {
            let allChannelsResponse = await respChannels.json()
            let allChannels = allChannelsResponse.channels
            let indexChannels = 0;

            do {
                let channel = allChannels[indexChannels]
                let respChannelsMembers = await client.fetch(`/conversations.members?channel=${channel.id}`)

                if (respChannelsMembers.ok) {
                    let allChannelsMember = await respChannelsMembers.json()
                    let channelMembers = allChannelsMember.members
                    if (channelMembers === undefined) {
                        indexChannels++
                        continue
                    }
                    let indexChannelsMembers = 0;

                    do {

                        const channelMember = channelMembers[indexChannelsMembers]

                        channel.is_favorite = false
                        channel.user = channelMember
                        channel.ts = null
                        parsedAllFavoriteChannels.forEach((favoriteChannel) => {
                            if (channel.id === favoriteChannel.text && channelMember === favoriteChannel.user) {
                                channel.is_favorite = true
                                channel.ts = favoriteChannel.ts
                            }
                        });

                        parsedAllChannels.push({
                            id: channel.id,
                            user: channel.user,
                            name: channel.name,
                            ts: channel.ts,
                            is_favorite: channel.is_favorite
                        })

                        indexChannelsMembers++
                    } while (channelMembers[indexChannelsMembers] !== undefined)

                }
                indexChannels++
            } while (allChannels[indexChannels] !== undefined)

            if (parsedAllChannels) {
                dataStore.save("favorite_channels_members", parsedAllChannels)
            }

        } else {
            throw new Error(`Could not retrieve channels (${respChannels.status}: ${respChannels.statusText})`);
        }

    } else {
        throw new Error(`Could not retrieve favorite channels (${respFavChannels.status}: ${respFavChannels.statusText})`);
    }

    if (parsedChannelMessages) {
        dataStore.save("fav_chan_messages_realname", parsedChannelMessages)
    }
}

async function fullSync({dataStore, client}) {
    return changeIDbyRealName(dataStore, client, false);
}

async function incrementalSync({dataStore, client, latestSynchronizationTime}) {
    return changeIDbyRealName(dataStore, client, true, latestSynchronizationTime);
}