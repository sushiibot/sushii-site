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

const Rank = db.define('levels', {
  user_id: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  guild_id: { type: Sequelize.STRING, allowNull: false },
  msg_all_time: { type: Sequelize.STRING, allowNull: false },
  msg_month: { type: Sequelize.STRING, allowNull: false },
  msg_week: { type: Sequelize.STRING, allowNull: false },
  msg_day: { type: Sequelize.STRING, allowNull: false },
  last_msg: { type: Sequelize.STRING, allowNull: false },
}, {
  timestamps: false,
  underscored: true,
})


module.exports = {
  Query: {
    stats: () => Stat.findAll({ order: [['stat_name', 'DESC']] }),
    ranks: (_, { guild_id }) => Rank.findAll({
      where: { guild_id: guild_id },
      order: [['msg_all_time', 'DESC']],
      limit: 50,
      attributes: {
        exclude: ['last_msg', 'guild_id']
      }
    }),
  }
}
