require('dotenv').config()

const test = require('ava')
const db   = require('../src/database')

test('SQL user queries work properly', async t => {
  const exampleUser = {
    id: '1234567890',
    access_token: '2bb5e651ec26c10420ab',
    expires_in: '1234',
    refresh_token: '0ddcbc66ea678',
  }

  await db.upsertUser(exampleUser)
  const { rows } = await db.selectUser(exampleUser.id)

  // really weird stuff here since testing with just the two objects causes mismatches
  // with 'anonymous' in front of objects returned from query??
  t.deepEqual(Object.entries(exampleUser), Object.entries(rows[0]))
})

test('SQL guild queries work properly', async t => {
  const exampleGuilds = [
    {
      user_id: '1234567890',
      guild_id: '0987654321',
      is_owner: false,
      permissions: '12345',
    }
  ]

  await db.upsertGuilds(exampleGuilds)
  const { rows } = await db.selectGuildByUserId(exampleGuilds[0].user_id)

  // same here
  t.deepEqual(Object.entries(exampleGuilds[0]), Object.entries(rows[0]))
})
