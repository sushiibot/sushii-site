const { find } = require('lodash')
const Sequelize = require('sequelize')

const db = new Sequelize(process.env.DB_URL, {
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
})

// check postgres connection
db
  .authenticate()
  .then(() => {
    console.log('[PG] Connection has been established successfully.')
  })
  .catch(err => {
    console.error('[PG] Unable to connect to the database:', err)
  })

// postgres models
const Stat = db.define('stats', {
  stat_name: { type: Sequelize.STRING, primaryKey: true },
  count: Sequelize.BIGINT,
  category: Sequelize.STRING,
}, {
  timestamps: false,
  underscored: true,
})

// example data 
const guilds = [
  {
    guild_name: 'BLACKPINK',
    icon: 'some_url',
    member_count: 12345,
    owner_id: 293487928374234
  },
  {
    guild_name: 'TWICE',
    icon: 'another_url',
    member_count: 52345,
    owner_id: 234362987345
  }
]

const users = [
  {
    id: 987398475345,
    avatar: 'some_avatar',
    user_name: 'some_username',
    discriminator: 1234
  },
  {
    id: 645987345345,
    avatar: 'another_avatar',
    user_name: 'another_username',
    discriminator: 54321
  }
]

module.exports = {
  Query: {
    guilds: () => guilds,
    user: (_, { id }) => find(users, { id: id }),
    stats: () => Stat.findAll({ order: [['stat_name', 'DESC']] }),
  }
}
