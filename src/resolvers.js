const { Pool }    = require('pg')
const joinMonster = require('join-monster').default
const dev         = process.env.NODE_ENV !== 'production'

// create a new connection pool
const pool = new Pool({
  connectionString: process.env.DB_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// Listen for database errors
pool.on('error', err => {
  console.error('Unexpected error on idle client: ', err)
  process.exit(-1)
})

// check postgres connection
pool.query('SELECT 1 + 1 AS result')
  .then(() => console.log('[PG] Connection has been established successfully.'))
  .catch(err => console.error('[PG] Unable to connect to the database:', err))

process.on('SIGINT', async () => {
  console.log('Shutting down...')
  await pool.end()
  console.log('[PG] Connection pool drained.')
  console.log('Goodbye.')
  process.exit(0)
})

function joinMonsterQuery(resolveInfo, ctx) {
  return joinMonster(resolveInfo, ctx, sql => {
    // Log SQL queries to console if dev
    if (dev) console.log(sql)

    return pool.query(sql)
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
