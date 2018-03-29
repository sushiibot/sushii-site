const { query }   = require('./database')
const joinMonster = require('join-monster').default
const dev         = process.env.NODE_ENV !== 'production'


function joinMonsterQuery(resolveInfo, ctx) {
  return joinMonster(resolveInfo, ctx, sql => {
    // Log SQL queries to console if dev
    if (dev) console.log(sql)

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
    }
  }
}

module.exports = resolvers
