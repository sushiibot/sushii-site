const commands = {
  User: [
    {
      name: 'profile',
      desc: 'Shows your profile.',
      aliases: ['rank', 'rakn', 'rnak'],
      usage: '(@mention or ID)',
    },
    {
      name: 'rep',
      desc: 'Rep a user.',
      usage: '(@mention or ID)',
      example: {
        command: {
          content: '-rep @Joshy',
        },
        response: {
          content: 'I gave Joshy#0001 a rep.',
        }
      }
    },
    {
      name: 'fishy',
      desc: 'Go fishing.  You can get a random amount of fishies betwen 5-20 \
      if fishing for yourself, or 15-30 if fishing for someone else.',
      usage: '(@mention or ID)',
      aliases: ['foshy', 'fwishy'],
      example: {
        command: {
          content: '-fishy @Joshy',
        },
        response: {
          content: 'You caught 22 fishies for Joshy#0001! :fishy:',
        }
      }
    },
    {
      name: 'topfishies',
      desc: 'Shows top 10 users with most fishies.',
      usage: '(global)',
    },
    {
      name: 'toplevels',
      desc: 'Shows top 10 users with highest levels.',
      usage: '(global)',
    },
    {
      name: 'topreps',
      desc: 'Shows top 10 users with most rep.',
      usage: '(global)',
    },
    {
      name: 'leaderboard',
      desc: 'Get the URL for the guild leaderboard.',
    },
  ],
  Notifications: [
    {
      name: 'notification add',
      desc: 'Adds a keyword notification.  \
      Sushii will DM you when this keyword is mentioned in chat. \
      This only includes messages from servers you share with sushii \
      and channels you can view.',
      usage: '(global) [keyword]',
    },
    {
      name: 'notification list',
      desc: 'Lists your set notifications.',
      aliases: ['notifications'],
    },
    {
      name: 'notification delete',
      desc: 'Deletes a keyword',
      usage: '[keyword]',
    },
  ],
  Reminders: [
    {
      name: 'remind me',
      desc: 'Reminds you to do something after some time.',
      usage: '(in) (# days) (# hours) (# minutes) (# seconds) (to) [description]',
      example: {
        command: {
          content: '-remind me in 3 hours 2 minutes to go fishing',
        },
        response: {
          content: 'I\'ll remind you in 3 hours and 2 minutes (`2018-03-03 21:52:43 UTC`) to `go fishing`',
        }
      }
    },
    {
      name: 'reminders',
      desc: 'Shows your pending reminders.',
      aliases: ['reminder list'],
      example: {
        command: {
          content: '-reminders',
        },
        response: {
          content: 'You have 1 reminders:\
            \n      ```2018-03-03 21:52:43 UTC (in 3 hours, 1 minute and 3 seconds)\
            \n    go fishing\
            \n\nCurrent time: 2018-03-03 18:51:39 UTC```',
        }
      }
    },
  ],
  Search: [
    {
      name: 'weather',
      desc: 'Gets the weather of a location',
      usage: '(save) (location)',
    },
    {
      name: 'fm',
      desc: 'Gets the last played track on Last.fm',
      usage: '(set) (username)',
      example: {
        command: {
          content: '-fm',
          avatar: '/static/carlos.png',
          username: 'carlos',
        },
        response: {
          embed: {
            author: {
              name: 'carlos - Now Playing',
              icon_url: '/static/lfm.jpg',
            },
            color: 0xb90000,
            thumbnail: {
              url: '/static/rv.png',
            },
            fields: [
              {
                name: 'Artist - Song',
                value: 'Red Velvet - [Bad Boy](https://www.last.fm/music/Red+Velvet/_/Bad+Boy)',
              },
              {
                name: 'Album',
                value: 'The Perfect Red Velvet - The 2nd Album Repackage'
              }
            ],
            footer: {
              text: 'Total Tracks: 63287',
            },
            timestamp: '2018-03-03T05:06:33.246Z',
          }
        }
      }
    },
    {
      name: 'fm toptracks',
      desc: 'Shows your top played tracks.  You can optionally provide a time period: overall, 7day, 1month, 3month, 6month, or 12month. \
      By default, overall is used.',
      aliases: ['fm topsongs'],
      usage: '(period)',
    },
    {
      name: 'fm topartists',
      desc: 'Shows your top played artists.  You can optionally provide a time period: overall, 7day, 1month, 3month, 6month, or 12month. \
      By default, overall is used.',
      usage: '(period)',
    },
    {
      name: 'fm topalbums',
      desc: 'Shows your top played albums.  You can optionally provide a time period: overall, 7day, 1month, 3month, 6month, or 12month. \
      By default, overall is used.',
      usage: '(period)',
    },
    {
      name: 'fm loved',
      desc: 'Shows your last 10 loved tracks.',
    },
    {
      name: 'vlive channel',
      aliases: ['vlive search', 'v channel', 'v search'],
      desc: 'Displays the last video for a VLive channel.',
      usage: '[VLive channel]'
    },
    {
      name: 'vlive video',
      aliases: ['v video'],
      desc: 'Gets information and direct video / subtitle links for a VLive video.',
      usage: '[VLive video URL]'
    },
    {
      name: 'vlivenotif add',
      permissions: 'MANAGE_GUILD',
      desc: 'Adds a notification for a VLive channel with optional role to mention for new videos.',
      usage: '[VLive channel] [Discord #channel or ID] (role name)'
    },
    {
      name: 'vlivenotif list',
      permissions: 'MANAGE_GUILD',
      desc: 'Lists VLive notifications for the guild.',
    },
    {
      name: 'vlivenotif delete',
      permissions: 'MANAGE_GUILD',
      desc: 'Deletes a VLive notification.',
      usage: '[VLive channel] [Discord #channel or ID]'
    },
    {
      name: 'urban',
      desc: 'Looks up a definition on Urban Dictionary.',
      aliases: ['ud'],
      usage: '[word]',
    },
    {
      name: 'crypto',
      desc: 'Gets current cryptocurrency prices.',
      usage: '(symbol)',
    },
  ],
  'User Info': [
    {
      name: 'userinfo',
      desc: 'Gets information about a user.',
      usage: '(@mention or ID)',
      example: {
        command: {
          content: '-userinfo @carlos'
        },
        response: {
          embed: {
            author: {
              name: 'carlos#8170',
              icon_url: '/static/carlos.png',
            },
            thumbnail: {
              url: '/static/carlos.png',
            },
            fields: [
              {
                name: 'ID',
                value: '250317545112993792',
                inline: true,
              },
              {
                name: 'Created At',
                value: '2016-11-21 17:52:33 UTC',
                inline: true,
              },
              {
                name: 'Joined At',
                value: '2018-01-06 22:47:19 UTC',
                inline: true,
              },
              {
                name: 'Last Message',
                value: '2018-01-30 22:32:01 UTC',
                inline: true,
              },
              {
                name: 'Status',
                value: 'Online',
                inline: true,
              },
              {
                name: 'Roles',
                value: 'Hey, hey, heyy',
              },
            ]
          }
        }
      }
    },
    {
      name: 'avatar',
      desc: 'Gets the avatar for a user.',
      usage: '(@mention or ID)',
      example: {
        command: {
          content: '-avatar @carlos'
        },
        response: {
          embed: {
            author: {
              name: 'carlos#8170\'s avatar'
            },
            color: 0x3498db,
            image: {
              url: '/static/carlos.png',
            },
          }
        }
      }
    },
  ],
  Tags: [
    {
      name: 'tag',
      desc: 'Gets a tag.  This is used as a "custom" command.',
      customUsage: '[prefix][name]',
      example: {
        command: {
          content: '-hey',
          avatar: '/static/carlos.png',
          username: 'carlos',
        },
        response: {
          content: 'hey hey heyyy wasawasawasawasaup'
        }
      }
    },
    {
      name: 'tag random',
      desc: 'Gets a random tag.',
      example: {
        command: {
          content: '-tag random',
          avatar: '/static/carlos.png',
          username: 'carlos',
        },
        response: {
          content: 'hey: hey hey heyyy wasawasawasawasaup'
        }
      }
    },
    {
      name: 'tag info',
      desc: 'Gets information about a tag.',
      usage: '[name]',
      example: {
        command: {
          content: '-tag info hey',
          avatar: '/static/carlos.png',
          username: 'carlos',
        },
        response: {
          embed: {
            author: {
              name: 'carlos#8170',
              icon_url: '/static/carlos.png',
            },
            fields: [
              {
                name: 'Name',
                value: 'hey',
                inline: true,
              },
              {
                name: 'Content',
                value: 'hey hey heyyy wasawasawasawasaup',
                inline: true,
              },
              {
                name: 'Use Count',
                value: '35',
                inline: true,
              },
              {
                name: 'Owner',
                value: '@carlos',
                inline: true,
              },
            ],
            footer: {
              text: 'Created on',
            },
            timestamp: '2018-03-03T05:06:33.246Z',
          }
        }
      }
    },
    {
      name: 'tag add',
      desc: 'Adds a new tag.',
      usage: '[name] [content]',
      example: {
        command: {
          content: '-tag add hey hey hey heyyy wasawasawasawasaup',
          avatar: '/static/carlos.png',
          username: 'carlos',
        },
        response: {
          content: 'Added a tag named `hey` with response `hey hey heyyy wasawasawasawasaup`.'
        }
      }
    },
    {
      name: 'tag list',
      desc: 'Lists available tags.',
      aliases: ['tags'],
    },
    {
      name: 'tag top',
      desc: 'Lists top 10 most used tags.',
    },
    {
      name: 'tag search',
      desc: 'Searches for a tag.',
      usage: '[search]',
    },
    {
      name: 'tag delete',
      desc: 'Deletes a tag.  Only the tag owner and users with MANAGE_GUILD may delete the tag.',
      usage: '[name]',
    },
    {
      name: 'tag edit',
      desc: 'Edits a tag\'s content.  Only the tag owner and users with MANAGE_GUILD may edit the tag.',
      usage: '[name] [new content]',
      example: {
        command: {
          content: '-tag edit hey faith and belief is the one thing we need to change the world',
          avatar: '/static/carlos.png',
          username: 'carlos',
        },
        response: {
          content: 'Edited the tag `hey` with new response `faith and belief is the one thing we need to change the world`.'
        }
      }
    },
    {
      name: 'tag rename',
      desc: 'Renames a tag.  Only the tag owner and users with MANAGE_GUILD may rename the tag.',
      usage: '[name] [new name]',
      example: {
        command: {
          content: '-tag rename hey faith',
          avatar: '/static/carlos.png',
          username: 'carlos',
        },
        response: {
          content: 'Renamed the tag `hey` to `faith`.'
        }
      }
    },
  ],
  Meta: [
    {
      name: 'ping',
      desc: 'Tests the bots ping.  This is not your ping.',
    },
    {
      name: 'events',
      desc: 'Shows the number of events handled by the bot.',
    },
    {
      name: 'stats',
      desc: 'Shows bot statistics.',
    },
  ],
  Text: [
    {
      name: 'hug',
      desc: 'Hug someone.  ლ(・ヮ・ლ)',
      usage: '[someone]',
      example: {
        command: {
          content: '-hug @Joshy',
        },
        response: {
          content: '(っ・∀・）っ @joshy'
        }
      }
    }
  ],
  'Misc.': [
    {
      name: 'play',
      desc: 'Evaluates Rust code in the playground.',
      usage: '[rust code]',
      example: {
        command: {
          content: '-play ```rust\nfn main() {\
            \n    println!("Hello, world!");\
          \n}```',
        },
        response: {
          content: '```Compiling playground v0.0.1 (file:///playground)\
            \n    Finished dev [unoptimized + debuginfo] target(s) in 0.47 secs\
            \n    Running `target/debug/playground`\
            \n\nHello, world!\
          ```',
        }
      }
    },
    {
      name: 'patreon',
      desc: 'Gets the patreon url.',
    },
  ],
  Moderation: [
    {
      name: 'modping',
      desc: 'Pings a single moderator for mod action.',
      example: {
        command: {
          content: '-modping',
        },
        response: {
          content: '@aModerator, you were pinged for a mod action by someone#1234.'
        }
      }
    },
    {
      name: 'reason',
      desc: 'Edits the reason for moderation action cases.',
      usage: '[case #](-case #) [reason]',
      permissions: 'BAN_MEMBERS',
      example: {
        command: {
          content: '-reason 32-36 bad boy',
        },
        response: {
          content: 'Finished updating case reasons.',
        }
      }
    },
    {
      name: 'history',
      desc: 'Looks up past cases for a user.',
      usage: '[@mention or ID]',
      permissions: 'BAN_MEMBERS',
      example: {
        command: {
          content: '-history @someone'
        },
        response: {
          embed: {
            author: {
              name: 'Case History for someone#1234',
              icon_url: 'https://cdn.discordapp.com/embed/avatars/1.png',
            },
            color: 0xe67e22,
            description: '`[Case #29]` mute by @sushiiDev for Automated Mute: User left with a mute role.\n\
              `[Case #23]` mute by @aModerator for toxic'
          }
        }
      }
    },
    {
      name: 'ban',
      desc: 'Bans one or more users.  You can specify multiple users by separating mentions or IDs with commas and no spaces.  \
      You can also use this command to ban users who are not in the guild.',
      usage: '[@mention or ID](,@mention or ID) (reason)',
      permissions: 'BAN_MEMBERS',
      example: {
        command: {
          content: '-ban @BadBoy,138024618928635905,170108425940893696 Raiders'
        },
        response: {
          content: '```Attempted to ban 3 users:\
          \n\nBadBoy#1234(10836498123764283) - Successfully banned.\
          \nadrian#0515(138024618928635905) - Successfully banned.\
          \nrei#0098(170108425940893696) - Successfully banned.```'
        }
      }
    },
    {
      name: 'unban',
      desc: 'Unbans one or more users.  You can specify multiple users by separating mentions or IDs with commas and no spaces.',
      usage: '[@mention or ID](,@mention or ID) (reason)',
      permissions: 'BAN_MEMBERS',
      example: {
        command: {
          content: '-unban 138024618928635905,206513529832996866 Ban appeal accepted',
        },
        response: {
          content: '```Attempted to unban 2 users:\
          \n\nadrian#0515(138024618928635905) - Successfully unbanned.\
          \nWindy#2934(206513529832996866) - Error: User is not banned.```'
        }
      }
    },
    {
      name: 'mute',
      desc: 'Mutes a member.',
      usage: '[@mention or ID] (reason)',
      permissions: 'BAN_MEMBERS',
      example: {
        command: {
          content: '-mute @adrian being too loud'
        },
        response: {
          content: 'Muted member adrian#0515 (138024618928635905) for `being too loud`',
        }
      }
    },
    {
      name: 'unmute',
      desc: 'Unmutes a member.',
      usage: '[@mention or ID] (reason)',
      permissions: 'BAN_MEMBERS',
      example: {
        command: {
          content: '-unmute @adrian sorry'
        },
        response: {
          content: 'Muted member adrian#0515 (138024618928635905) for `sorry`',
        }
      }
    },
    {
      name: 'prune',
      desc: 'Bulk deletes messages. Message count given excludes the message used to invoke this command.',
      usage: '[# of messages]',
      permissions: 'MANAGE_MESSAGES'
    },
  ],
  Settings: [
    {
      name: 'prefix',
      desc: 'Gives you the prefix for this guild, or sets a new prefix.',
      usage: '(prefix)',
      permissions: 'MANAGE_GUILD',
      optional: true,
    },
    {
      name: 'joinmsg',
      desc: 'Gets the guild join message or sets one if given.  \
      You can use the placeholders <mention>, <username>, <server> to get the corresponding values. \
      Set to none or off to disable.',
      usage: '(message)',
      permissions: 'MANAGE_GUILD'
    },
    {
      name: 'joinreact',
      desc: 'Gets the guild join react or sets one if given. This reacts to the join message set above.\
      Set to none or off to disable.',
      usage: '(emoji)',
      permissions: 'MANAGE_GUILD'
    },
    {
      name: 'leavemsg',
      desc: 'Gets the guild leave message or sets one if given. \
      You can use the same placeholders as listed above. \
      Set to none or off to disable.',
      usage: '(message)',
      permissions: 'MANAGE_GUILD'
    },
    {
      name: 'modlog',
      desc: 'Sets the moderation log channel.  Bans and mutes will be sent here.',
      usage: '[#channel or ID]',
      permissions: 'MANAGE_GUILD'
    },
    {
      name: 'msglog',
      desc: 'Sets the message log channel.',
      usage: '[#channel or ID]',
      permissions: 'MANAGE_GUILD'
    },
    {
      name: 'memberlog',
      desc: 'Sets the member log channel.   Member leave and join logs will be sent here.',
      usage: '[#channel or ID]',
      permissions: 'MANAGE_GUILD'
    },
    {
      name: 'joinleavechannel',
      desc: 'Sets the channel for join / leave messages.',
      usage: '[#channel or ID]',
      permissions: 'MANAGE_GUILD'
    },
    {
      name: 'inviteguard',
      desc: 'Enables or disables the invite guard.  This auto deletes Discord invite links.  \
      Users who can use this command also bypass the invite guard.',
      usage: '[enable / disable]',
      permissions: 'MANAGE_GUILD'
    },
    {
      name: 'muterole',
      desc: 'Sets the mute role.',
      usage: '[role name]',
      permissions: 'MANAGE_GUILD'
    },
    {
      name: 'maxmentions',
      desc: 'Sets the maximum mentions a user can have in a single message before automatically being muted.',
      usage: '[number]',
      permissions: 'MANAGE_GUILD'
    },
    {
      name: 'listids',
      desc: 'Lists the server role ids.',
      permissions: 'MANAGE_GUILD'
    },
    {
      name: 'disablechannel',
      desc: 'Disables a channel for commands.  Those with MANAGE_GUILD permissions bypass channel disables.',
      usage: '[#channel or ID]',
      permissions: 'MANAGE_GUILD'
    },
    {
      name: 'enablechannel',
      desc: 'Enables a channel for commands.',
      usage: '[#channel or ID]',
      permissions: 'MANAGE_GUILD'
    },
    {
      name: 'disabledchannels',
      desc: 'Lists the disabled channels.',
      permissions: 'MANAGE_GUILD'
    },
    {
      name: 'settings',
      desc: 'Lists the current settings for this guild.',
      permissions: 'MANAGE_GUILD'
    },
  ],
  Sushiiboard: [
    {
      name: 'sushiiboard channel',
      aliases: ['sushiboard channel', 'starboard channel'],
      desc: 'Sets the sushiiboard channel.',
      usage: '[#channel or ID]',
      permissions: 'MANAGE_GUILD',
    },
    {
      name: 'sushiiboard number',
      aliases: ['sushiboard number', 'starboard number'],
      desc: 'Sets the sushiiboard minimum reaction number. Default is 2.',
      usage: '[number]',
      permissions: 'MANAGE_GUILD',
    },
    {
      name: 'sushiiboard emoji',
      aliases: ['sushiboard emoji', 'starboard emoji'],
      desc: 'Sets the sushiiboard emoji. This can be a custom emoji.',
      usage: '[emoji]',
      permissions: 'MANAGE_GUILD',
    },
  ],
  Gallery: [
    {
      name: 'gallery list',
      desc: 'Lists active galleries.',
      permissions: 'MANAGE_GUILD'
    },
    {
      name: 'gallery add',
      desc: 'Adds a gallery.',
      usage: '[#channel or ID] [webhook url]',
      permissions: 'MANAGE_GUILD'
    },
    {
      name: 'gallery delete',
      desc: 'Deletes a gallery.',
      usage: '[gallery #]',
      permissions: 'MANAGE_GUILD'
    },
  ],
  Roles: [
    {
      name: 'roles set',
      desc: 'Sets the role configuration.',
      usage: '[role configuration] OR attach a file',
      permissions: 'MANAGE_GUILD'
    },
    {
      name: 'roles get',
      desc: 'Gets the role configuration.',

      permissions: 'MANAGE_GUILD'
    },
    {
      name: 'roles channel',
      desc: 'Sets the roles channel.',
      usage: '[#channel or ID]',
      permissions: 'MANAGE_GUILD'
    },
  ],
}

export default commands