const { Pool } = require('pg')

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

function query(sql) {
  return pool.query(sql)
}


module.exports = query
