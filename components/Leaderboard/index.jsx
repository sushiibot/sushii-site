import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const RanksQuery = gql`
  query GuildRanks($guild_id: String) {
    guild(id: $guild_id) {
      guild_name
      icon
      member_count
      owner_id
    }
    ranks(guild_id: $guild_id) {
      user_id
      user {
        avatar
        user_name
        discriminator
      }
      msg_all_time
      msg_month
      msg_week
      msg_day
    }
  }
`

function pad(x) {
  return ('0000' + x).slice(-4)
}

class Ranks extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  render() {
    console.log(this.props)
    const { data: { error, guild, ranks } } = this.props

    if (error) {
      console.error(error)
      return <div>Error loading ranks</div>
    }
    if (ranks) {
      return (
        <div>
          <h1 className='title'>Leaderboard - { guild ? guild.guild_name : 'Global'}</h1>
          <ul>
            {ranks.map((rank, i) => (
              <li key={i}>
                <img src={rank.user.avatar.replace('webp', 'jpg')} style={{ height: '30px' }} />
                { `${ rank.user.user_name }#${ pad(rank.user.discriminator) }` } - { rank.msg_all_time }
              </li>
            ))}
          </ul>
        </div>
      )
    }

    return <div>Loading</div>
  }
}

export default graphql(RanksQuery, {
  options: (props) => ({
    variables: {
      guild_id: props.url.query.guild_id,
    }
  })
})(Ranks)
