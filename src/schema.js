const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = `
  type Stat {
    stat_name: String!
    count: String!
    category: String!
  }

  type CacheUser {
    avatar: String!
    user_name: String!
    discriminator: String!
  }

  type Rank {
    user_id: String!
    user: CacheUser!
    msg_all_time: String!
    msg_month: String
    msg_week: String
    msg_day: String
    last_msg: String
  }

  type Guild {
    id: String!
    guild_name: String!
    icon: String!
    member_count: String!
    owner_id: String!
  }

  type Query {
    stats: [Stat]
    ranks(guild_id: String): [Rank]
    user(id: String!): CacheUser
    guild(id: String): Guild
  }
`


module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
})
