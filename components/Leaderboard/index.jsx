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

// Calculate rank from XP client side, ported from bot rust
function next_level(level) {
  return 50 * (Math.pow(level, 2)) - (50 * level)
}

function get_level(xp) {
  let level = 0
  while (next_level(level + 1) <= xp) {
    level += 1
  }

  return level
}

class XpProgress extends React.Component {
  static propTypes = {
    xp: PropTypes.number.isRequired,
  }

  render() {
    const xp = this.props.xp
    const level = get_level(xp)
    const last_level_total_xp_required = next_level(level)
    const next_level_total_xp_required = next_level(level + 1)

    const next_level_xp_required = next_level_total_xp_required - last_level_total_xp_required
    const next_level_xp_remaining = next_level_total_xp_required - xp
    const next_level_xp_progress = next_level_xp_required - next_level_xp_remaining

    let xp_percentage = ((next_level_xp_progress / next_level_xp_required) * 100.0)

    if (xp_percentage > 100) {
      xp_percentage = 0
    }

    return (
      <div>
        <progress className="progress is-link is-small xp_progress" value={ xp_percentage } max="100">{ xp_percentage }</progress>
        <span className='has-text-grey-light'>{ next_level_xp_progress } / { next_level_xp_required }</span>
      </div>
    )
  }
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
          <table className='table is-fullwidth is-striped is-hoverable'>
            <thead>
              <tr>
                <th>User</th>
                <th>XP</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              {ranks.map((rank, i) => (
                <tr key={i} className='leaderboard-row'>
                  <th>
                    { '#' + (i + 1) }
                    <img 
                      src={rank.user.avatar.replace('webp', 'jpg').replace('gif', 'jpg')} 
                      style={{ height: '60px', borderRadius: '50%', margin: '10px 15px 10px 15px' }}
                    />

                    { rank.user.user_name }<span className='has-text-grey'>#{ pad(rank.user.discriminator) }</span>
                  </th>
                  <td>
                    <XpProgress xp={rank.msg_all_time} />
                  </td>
                  <td>
                    <span className='has-text-grey-light'>LEVEL</span>
                    <br/>
                    <b>{ get_level(rank.msg_all_time) }</b>
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>
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
