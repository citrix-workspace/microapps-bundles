const FAVORITE_CHANNEL_ID = 'C019TN87BD0';
let moment = library.load("moment-timezone");

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

async function changeIDbyRealName(dataStore, client, timestamp) {
    let respFavChannels = await client.fetch(`/conversations.history?channel=${FAVORITE_CHANNEL_ID}` )
    let parsedChannelMessages = [];
    let parsedAllFavoriteChannels = [];
    let parsedAllChannels = [];


    if (!respFavChannels.ok) {
        throw new Error(`Could not retrieve favorite channel messages (${respFavChannels.status}: ${respFavChannels.statusText})`);
    }
    let favoriteChannels = await respFavChannels.json()
    let favoriteChannelMessages = favoriteChannels.messages;
    let indexChannels = 0
    let usedChannels = []
    let nextChannel = false

    do {
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

        if (!response.ok) {
            throw new Error(`Could not retrieve favorite channel messages (${response.status}: ${response.statusText})`);
        }

        usedChannels.push(favoriteChannelMessages[indexChannels].text)
        parsedAllFavoriteChannels.push(favoriteChannelMessages[indexChannels])

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

            let userIds = []
            let userNames = []
            let userRegex = /(?:^|\W)<@(\w+)(?!\w)/g;
            let match;
            let replaceResult = [];

            let text = channelMessages[indexMessages].text;

            while (match = userRegex.exec(text)) {
                userIds.push(match[1]);
            }

            channelMessages[indexMessages].text_changed = text

            // If there is an user tagged in the message
            if (userIds.length) {
                for (let j = 0; j < userIds.length; j++) {
                    let userId = userIds[j]
                    let resp = await client.fetch(`/users.info?user=${userId}`)

                    if (!resp.ok) {
                        throw new Error(`Could not retrieve user data (${resp.status}: ${resp.statusText})`);
                    }

                    let userData = await resp.json()
                    if (userData.user === undefined) {
                        indexChannels++
                        break
                    }
                    userNames.push(userData.user.real_name)
                }
                for (let i = 0; i < userNames.length; i++) {
                    if (!replaceResult.length) {
                        replaceResult.push(text.replace('<@' + userIds[i] + '>',userNames[i]))
                    } else {
                        replaceResult.push(replaceResult[replaceResult.length - 1].replace('<@' + userIds[i] + '>',userNames[i]))
                    }
                }
                channelMessages[indexMessages].text_changed = replaceResult[replaceResult.length - 1]
            }

            channelMessages[indexMessages].datetime = new Date(channelMessages[indexMessages].ts * 1000);
            parsedChannelMessages.push(channelMessages[indexMessages])
            indexMessages++;
        } while (channelMessages[indexMessages] !== undefined)

        indexChannels++;
    } while (favoriteChannels[indexChannels] !== undefined)
    const respChannels = await client.fetch('/conversations.list?types=public_channel,private_channel')

    if (!respChannels.ok) {
        throw new Error(`Could not retrieve channels (${respChannels.status}: ${respChannels.statusText})`);
    }

    let allChannelsResponse = await respChannels.json()
    let allChannels = allChannelsResponse.channels
    let indexAllChannels = 0;

    do {
        let channel = allChannels[indexAllChannels]
        let respChannelsMembers = await client.fetch(`/conversations.members?channel=${channel.id}`)

        if (!respChannelsMembers.ok) {
            throw new Error(`Could not retrieve favorite channel messages (${respChannelsMembers.status}: ${respChannelsMembers.statusText})`);
        }

        let allChannelsMember = await respChannelsMembers.json()
        let channelMembers = allChannelsMember.members
        if (!channelMembers.length) {
            indexAllChannels++
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

        indexAllChannels++
    } while (allChannels[indexAllChannels] !== undefined)

    dataStore.save("favorite_channels_members", parsedAllChannels)
    dataStore.save("fav_chan_messages_realname", parsedChannelMessages)
}

async function fullSync({dataStore, client}) {
    const timestamp = moment().subtract(14, 'days').unix();
    return changeIDbyRealName(dataStore, client, timestamp);
}

async function incrementalSync({dataStore, client, latestSynchronizationTime}) {
    const date = new Date(latestSynchronizationTime)
    const timestamp = moment(date).unix()
    return changeIDbyRealName(dataStore, client, timestamp);
}
