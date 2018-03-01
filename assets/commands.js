const commands = {
  User: [
    {
      name: 'profile',
      desc: 'Shows your profile.',
      aliases: ['rank'],
      usage: '(@mention or ID)'
    },
    {
      name: 'toplevels',
      desc: 'Shows the top user levels in the guild.',
      usage: '(global)',
    },
    {
      name: 'topreps',
      desc: 'Shows the top users.',
      usage: '(global)',
    },
    {
      name: 'rep',
      desc: 'Rep a user.',
      usage: '(@mention or ID)',
    },
    {
      name: 'fishy',
      desc: 'Go fishing.  You can get a random amount of fishies betwen 5-20 \
      if fishing for yourself, or 15-30 if fishing for someone else.',
      usage: '(@mention or ID)',
    },
    {
      name: 'topfishies',
      desc: 'Top 10 users with most fishies.',
      usage: '(global)',
    }
  ],
  Notifications: [
    {
      name: 'notification add',
      desc: 'Adds a keyword notification.  \
      Sushii will DM you when this keyword is mentioned in chat.',
      usage: '(global) [keyword]',
    },
    {
      name: 'notification list',
      desc: 'Lists your set notifications.',
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
    },
    {
      name: 'reminder list',
      desc: 'Shows your pending reminders.',
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
      desc: 'Gets the last played track on last.fm',
      usage: '(set) (username)',
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
    },
    {
      name: 'avatar',
      desc: 'Gets the avatar for a user.',
      usage: '(@mention or ID)',
    },
  ],
  Tags: [
    {
      name: 't',
      desc: 'Gets a tag.',
      usage: '[name]',
    },
    {
      name: 'tag random',
      desc: 'Gets a random tag.',
    },
    {
      name: 'tag info',
      desc: 'Gets information about a tag.',
      usage: '[name]',
    },
    {
      name: 'tag add',
      desc: 'Adds a new tag.',
      usage: '[name] [content]',
    },
    {
      name: 'tag list',
      desc: 'Lists available tags.',
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
      desc: 'Deletes a tag.',
      usage: '[name]',
    },
    {
      name: 'tag edit',
      desc: 'Edits an existing tag.',
      usage: '[name] [new name] [new content]',
    },
  ],
  Meta: [
    {
      name: 'ping',
      desc: 'Tests the bots ping.  This is not your ping.',
    },
    {
      name: 'latency',
      desc: 'Calculates the heartbeat latency between the shard and the gateway.',
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
  'Misc.': [
    {
      name: 'play',
      desc: 'Evaluates Rust code in the playground.',
      usage: '[rust code]',
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
    },
    {
      name: 'reason',
      desc: 'Edits the reason for moderation action cases.',
      usage: '[case #](-case #) [reason]',
      permissions: 'BAN_MEMBERS'
    },
    {
      name: 'history',
      desc: 'Looks up past cases for a user.',
      usage: '[@mention or ID]',
      permissions: 'BAN_MEMBERS'
    },
    {
      name: 'ban',
      desc: 'Bans a user or ID.',
      usage: '[@mention or ID] (reason)',
      permissions: 'BAN_MEMBERS'
    },
    {
      name: 'unban',
      desc: 'Unbans a user or ID.',
      usage: '[@mention or ID] (reason)',
      permissions: 'BAN_MEMBERS'
    },
    {
      name: 'mute',
      desc: 'Mutes a member.',
      usage: '[@mention or ID] (reason)',
      permissions: 'BAN_MEMBERS'
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
      desc: 'Gets the guild join message or sets one if given.',
      usage: '(message)',
      permissions: 'MANAGE_GUILD'
    },
    {
      name: 'leavemsg',
      desc: 'Gets the guild leave message or sets one if given.',
      usage: '(message)',
      permissions: 'MANAGE_GUILD'
    },
    {
      name: 'modlog',
      desc: 'Sets the moderation log channel.',
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
      desc: 'Sets the member log channel.',
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
      desc: 'Enables or disables the invite guard.',
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
      desc: 'Disables a channel for commands.',
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