const { query }   = require('./database')
const joinMonster = require('join-monster').default
const debug   = require('debug')('resolvers')


function joinMonsterQuery(resolveInfo, ctx) {
  return joinMonster(resolveInfo, ctx, sql => {
    debug(sql)

    return query(sql)
  }, { dialect: 'pg' })
}

const resolvers = {
  Query: {
    stats(parent, args, ctx, resolveInfo) {
      return joinMonsterQuery(resolveInfo, ctx)
    },
    ranks(parent, args, ctx, resolveInfo) {
      return joinMonsterQuery(resolveInfo, ctx)
    },
    globalRanks(parent, args, ctx, resolveInfo) {
      return joinMonsterQuery(resolveInfo, ctx)
    },
    guild(parent, args, ctx, resolveInfo) {
      return joinMonsterQuery(resolveInfo, ctx)
    },
    user(parent, args, ctx, resolveInfo) {
      return joinMonsterQuery(resolveInfo, ctx)
    },
    OAuthUser(parent, args, ctx, resolveInfo) {
      return joinMonsterQuery(resolveInfo, ctx)
    },
    getCurrentUser(parent, args, ctx, resolveInfo) {
      // console.log('resolveinfo:', JSON.stringify(resolveInfo))
      return joinMonsterQuery(resolveInfo, { user_id: ctx.user_id })
    },
    OAuthGuilds(parent, args, ctx, resolveInfo) {
      return joinMonsterQuery(resolveInfo, ctx)
    },
    messageActivity(parent, args, ctx, resolveInfo) {
      return joinMonsterQuery(resolveInfo, ctx)
    }
  }
}

module.exports = resolvers
