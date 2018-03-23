module.exports = `
  type Stat {
    stat_name: String!
    count: String!
    category: String!
  }

  type CachedUser {
    id: String!
    avatar: String!
    user_name: String!
    discriminator: String!
  }

  type Rank {
    user_id: String!
    user: CachedUser!
    msg_all_time: String!
    msg_month: String
    msg_week: String
    msg_day: String
    last_msg: String
  }

  type CachedGuild {
    id: String!
    guild_name: String!
    icon: String!
    member_count: String!
    owner_id: String!
  }

  type Query {
    stats: [Stat]
    ranks(guild_id: String): [Rank]
    user(id: String!): CachedUser
    guild(id: String): CachedGuild
  }
`