const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = `
  type Stat {
    stat_name: String!
    count: String!
    category: String!
  }

  type User {
    id: Float!
    avatar: String!
    user_name: String!
    discriminator: Int!
  }

  type Guild {
    guild_name: String!
    icon: String
    member_count: Int!
    owner_id: Float!
  }

  type Channel {
    id: Float!
    category_id: Int
    guild_id: Float!
    kind: String!
    channel_name: String!
    position: Int!
    topic: String!
    nsfw: Boolean
  }

  type Query {
    guilds: [Guild]
    user(id: Float!): User
    stats: [Stat]
  }
`


module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
})
