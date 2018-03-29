const fs        = require('fs')
const { Pool }  = require('pg')
const Promise   = require('bluebird')


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

// check postgres connection and run 'migrations'
pool.query('SELECT 1 + 1 AS result')
  .then(() => {
    console.log('[PG] Connection has been established successfully.')
    runMigrations()
  })
  .catch(err => console.error('[PG] Unable to connect to the database:', err))

// Clean exit
process.on('SIGINT', async () => {
  console.log('Cleaning up...')
  await pool.end()
  console.log('[PG] Connection pool drained.')
  console.log('Goodbye.')
  process.exit(0)
})

/**
 * Runs simple SQL migrations, not the best system but enough for now
 * as there shouldn't be too many
 */
async function runMigrations() {
  // bunch o blocking i/o but it runs only at startup so shouldn't matter
  console.log('[PG] Running migrations')
  const migrations = fs.readdirSync('./migrations')
  const promises = migrations.map(x => {
    console.log('[PG] Running migration:', x)
    const migration = fs.readFileSync('./migrations/' + x, 'utf8')
    return query(migration)
  })
  await Promise.all(promises)
  console.log('[PG] Finished migrations')
}


/**
 * Executes a SQL query on the connection pool
 * 
 * @param {string} sql SQL query to execute
 */
function query(sql) {
  return pool.query(sql)
}

const UPSERT_USER = fs.readFileSync('./sql/upsertUser.sql', 'utf8')
const UPSERT_GUILD = fs.readFileSync('./sql/upsertGuild.sql', 'utf8')

const SELECT_USER = fs.readFileSync('./sql/selectUser.sql', 'utf8')
const SELECT_GUILD_BY_USER_ID = fs.readFileSync('./sql/selectGuildsByUserId.sql', 'utf8')

/**
 * Inserts a new or updates an existing entry for a user
 * This is mainly just to store refresh tokens 
 * 
 * @param {object} user User Object data from Discord REST API
 */
function upsertUser(user) {
  const values = [
    user.id,
    user.access_token,
    user.expires_at,
    user.refresh_token,
  ]

  return pool.query(UPSERT_USER, values)
}


/**
 * Inserts a new or updates an existing entry for a guild a user is in
 * 
 * @param {object} guild Partial Guild data from Discord REST API
 */
function upsertGuild(guild) {
  const values = [
    guild.user_id,
    guild.guild_id,
    guild.is_owner,
    guild.permissions,
  ]

  return pool.query(UPSERT_GUILD, values)
}

/**
 * Inserts an array of guilds 
 * 
 * @param {array} guilds Array of Partial Guilds to save to database
 */
async function upsertGuilds(guilds) {
  // convert guilds array to array of promises
  const res = guilds.map(guild => upsertGuild(guild))
  await Promise.all(res)
}

function selectUser(id) {
  return pool.query(SELECT_USER, [id])
}

function selectGuildByUserId(user_id) {
  return pool.query(SELECT_GUILD_BY_USER_ID, [user_id])
}

module.exports = { 
  query,
  upsertUser,
  upsertGuild,
  upsertGuilds,
  selectUser,
  selectGuildByUserId,
}
