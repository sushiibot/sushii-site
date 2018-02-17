const { find } = require('lodash')

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
  }
}
