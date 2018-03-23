const { makeExecutableSchema } = require('graphql-tools')
const joinMonsterAdapt         = require('join-monster-graphql-tools-adapter')
const resolvers                = require('./resolvers')
const typeDefs                 = require('./typeDefs')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

joinMonsterAdapt(schema, {
  Query: {
    fields: {
      stats: {
        orderBy: {
          stat_name: 'asc'
        }
      },
      ranks: {
        where: (table, { guild_id }) => `${table}.guild_id = ${guild_id}`,
        orderBy: {
          msg_all_time: 'desc'
        },
        limit: 50,
      },
      guild: {
        where: (table, { id }) => `${table}.id = ${id}`
      },
    }
  },
  Stat: {
    sqlTable: 'stats',
    uniqueKey: 'stat_name',
    fields: {
      stat_name: { sqlColumn: 'stat_name' },
      count: { sqlColumn: 'count' },
      category: { sqlColumn: 'category' },
    }
  },
  Rank: {
    sqlTable: 'levels',
    uniqueKey: 'user_id',
    fields: {
      user_id: { sqlColumn: 'user_id' },
      user: {
        sqlJoin: (rankTable, userTable) => `${rankTable}.user_id = ${userTable}.id`,
      },
      msg_all_time: { sqlColumn: 'msg_all_time' },
      msg_month: { sqlColumn: 'msg_month' },
      msg_week: { sqlColumn: 'msg_week' },
      msg_day: { sqlColumn: 'msg_day' },
      last_msg: { sqlColumn: 'last_msg' },
    }
  },
  CachedUser: {
    sqlTable: 'cache_users',
    uniqueKey: 'id',
    fields: {
      id: { sqlColumn: 'id' },
      avatar: { sqlColumn: 'avatar' },
      user_name: { sqlColumn: 'user_name' },
      discriminator: { sqlColumn: 'discriminator' },
    }
  },
  CachedGuild: {
    sqlTable: 'cache_guilds',
    uniqueKey: 'id',
    fields: {
      id: { sqlColumn: 'id' },
      guild_name: { sqlColumn: 'guild_name' },
      icon: { sqlColumn: 'icon' },
      member_count: { sqlColumn: 'member_count' },
      owner_id: { sqlColumn: 'owner_id' },
    }
  }
})

module.exports = schema
