const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = `
  type Stat {
    stat_name: String!
    count: String!
    category: String!
  }

  type Rank {
    user_id: String!
    msg_all_time: String!
    msg_month: String!
    msg_week: String!
    msg_day: String!
    last_msg: String!
  }

  type Query {
    stats: [Stat]
    ranks(guild_id: String): [Rank]
  }
`


module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
})
