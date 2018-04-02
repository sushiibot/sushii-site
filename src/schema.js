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
      user: {
        where: (table, { id }, ctx) => {
          console.log(ctx)
          return escape(`${table}.id = %L`, id)
        }
      },
      guild: {
        where: (table, { id }) => escape(`${table}.id = %L`, id)
      },
      OAuthUser: {
        where: (table, { id }, ctx) => {
          console.log(JSON.stringify(ctx))

          return escape(`${table}.id = %L`, id)
        },
      },
      getCurrentUser: {
        where: (table, args, ctx) => {
          console.log(JSON.stringify(ctx))

          return escape(`${table}.id = %L`, ctx.user_id)
        },
      },
      OAuthGuilds: {
        where: (table, { id }, ctx) => {
          console.log(ctx)

          return escape(`${table}.user_id = %L`, id)
        },
      },
      messageActivity: {
        orderBy: {
          time: 'desc',
        },
        limit: 50,
      },
    },
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
  },
  OAuthUser: {
    sqlTable: 'oauth_users',
    uniqueKey: 'id',
    fields: {
      id: { sqlColumn: 'id' },
      user: { 
        sqlJoin: (OAuthUserTable, userTable) => `CAST (${OAuthUserTable}.id AS INT8) = ${userTable}.id`,
      },
      access_token: { sqlColumn: 'access_token' },
      expires_at: { sqlColumn: 'expires_at' },
      refresh_token: { sqlColumn: 'refresh_token' },
    }
  },
  OAuthGuild: {
    sqlTable: 'oauth_guilds',
    uniqueKey: ['user_id', 'guild_id'],
    fields: {
      user_id: { sqlColumn: 'user_id' },
      guild_id: { sqlColumn: 'guild_id' },
      guild: {
        sqlJoin: (OAuthGuildTable, guildTable) => `CAST (${OAuthGuildTable}.guild_id AS INT8) = ${guildTable}.id`,
      },
      is_owner: { sqlColumn: 'is_owner' },
      permissions: { sqlColumn: 'permissions' },
    }
  },
  MessageCount: {
    sqlTable: ({ resolution, id }) => escape(`(
      SELECT
        to_char(date_trunc(%L, "created"), 'YYYY-MM-DD HH24:MI') AS time,
        count(*) AS count
      FROM messages
      WHERE guild = %L
      GROUP BY 1
    )`, resolution, id, resolution, resolution, resolution),
    uniqueKey: 'time',
    fields: {
      time: { sqlColumn: 'time' },
      count: { sqlColumn: 'count' }
    }
  }
})

module.exports = schema
