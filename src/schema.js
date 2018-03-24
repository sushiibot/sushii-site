const { makeExecutableSchema } = require('graphql-tools')
const joinMonsterAdapt         = require('join-monster-graphql-tools-adapter')
const escape                   = require('pg-escape')
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
        // Searches for those that are in the filter array
        where: (table, { filter }) => escape(`${table}.stat_name IN %L`, filter),
        orderBy: {
          stat_name: 'asc'
        } 
      },
      ranks: {
        where: (table, { guild_id }) => escape(`${table}.guild_id = %L`, guild_id),
        orderBy: {
          msg_all_time: 'desc'
        },
        limit: 50,
      },
      globalRanks: {
        orderBy: {
          msg_all_time: 'desc'
        },
        limit: 50,
      },
      guild: {
        where: (table, { id }) => escape(`${table}.id = %L`, id)
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
  GlobalRank: {
    sqlTable: `(
      SELECT user_id, SUM(msg_all_time) AS msg_all_time
      FROM levels
      GROUP BY user_id
    )`,
    uniqueKey: 'user_id',
    fields: {
      user_id: { sqlColumn: 'user_id' },
      user: {
        sqlJoin: (globalTable, userTable) => `${globalTable}.user_id = ${userTable}.id`,
      },
      msg_all_time: { sqlColumn: 'msg_all_time' },
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
