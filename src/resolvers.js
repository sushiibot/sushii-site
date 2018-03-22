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

const CachedGuild = db.define('cache_guilds', {
  id: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  guild_name: { type: Sequelize.STRING, allowNull: false },
  icon: { type: Sequelize.STRING },
  member_count: { type: Sequelize.STRING, allowNull: false },
  owner_id: { type: Sequelize.STRING, allowNull: false },
}, {
  timestamps: false,
  underscored: true,
})

const CachedUser = db.define('cache_users', {
  id: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  avatar: { type: Sequelize.STRING, allowNull: false },
  user_name: { type: Sequelize.STRING, allowNull: false },
  discriminator: { type: Sequelize.INTEGER, allowNull: false },
}, {
  timestamps: false,
  underscored: true,
})

const Rank = db.define('levels', {
  user_id: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  msg_all_time: { type: Sequelize.STRING, allowNull: false },
  msg_month: { type: Sequelize.STRING },
  msg_week: { type: Sequelize.STRING },
  msg_day: { type: Sequelize.STRING },
  last_msg: { type: Sequelize.STRING },
}, {
  timestamps: false,
  underscored: true,
})

const GlobalRank = db.define('levels', {
  user_id: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  msg_all_time: { type: Sequelize.STRING, allowNull: false },
}, {
  timestamps: false,
  underscored: true,
})

function getRanks(guild_id) {
  if (guild_id) {
    return Rank.findAll({
      where: { guild_id: guild_id },
      order: [['msg_all_time', 'DESC']],
      limit: 50,
      attributes: {
        exclude: ['last_msg']
      }
    }).then(res => {
      console.log(JSON.stringify(res, null, 4))
      return res
    })
  } else {
    // global levels
    return db.query(`
      SELECT
        t.user_id,
        t.msg_all_time
      FROM (
        SELECT user_id, SUM(msg_all_time) AS msg_all_time
        FROM levels
        GROUP BY user_id
      ) t
      JOIN levels l ON l.user_id = t.user_id
      GROUP BY t.user_id, t.msg_all_time
      ORDER BY t.msg_all_time DESC
      LIMIT 10
    `, { model: GlobalRank })
  }
}

module.exports = {
  Query: {
    stats: () => Stat.findAll({ order: [['stat_name', 'DESC']] }),
    ranks: (_, { guild_id }) => getRanks(guild_id),
    guild: (_, { id }) => CachedGuild.findById(id),
  },
  Rank: {
    user: (rank) => CachedUser.findById(rank.user_id)
  }
}
