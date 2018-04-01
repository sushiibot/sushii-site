import React from 'react'
import { Helmet } from 'react-helmet'
import LazyLoad from 'react-lazyload'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Loader from '../Loader'

/**
 * Zero pads a number, used for discriminators as they are
 * provided as numbers but should be displayed with padded zeros
 * 
 * @param {int} x - Number to pad
 */
function pad(x) {
  return ('0000' + x).slice(-4)
}

/**
 * Gets the required amount of total XP for the next level.
 * Ported from bot rust code to be used client side
 * 
 * @param {int} level - Level to get XP required for
 */
function next_level(level) {
  return 50 * (Math.pow(level, 2)) - (50 * level)
}

/**
 * Gets the current level of a user from their XP
 * 
 * @param {int} xp - XP to calculate a level from
 */
function get_level(xp) {
  let level = 0
  while (next_level(level + 1) <= xp) {
    level += 1
  }

  return level
}

class XpProgress extends React.Component {
  static propTypes = {
    xp: PropTypes.string.isRequired,
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
        <p className='heading' style={{ marginBottom: 0, lineHeight: '50%', fontSize: '13px' }}>
          { next_level_xp_progress.toLocaleString() }  / { next_level_xp_required.toLocaleString() } XP
        </p>
        <div className='xp_progress'>
          <div className='xp_progress' style={{ width: xp_percentage + '%' }}></div>
        </div>
      </div>
    )
  }
}

/**
 * Gets the colour (gold, silver, bronze) for a ranking position
 * 
 * @param {int} i - Ranking position 
 */
function getRankColor(i) {
  if (i == 0) {
    return '#fee423'
  } else if (i == 1) {
    return '#deecec'
  } else if (i == 2) {
    return '#e4a364'
  } else {
    return '#818092'
  }
}

/**
 * Converts a user or guild image url to use jpg and removes url parameters
 * 
 * @param {string} url - A raw image url
 */
function cleanDiscordImage(url) {
  return url.split('?')[0].replace('webp', 'jpg').replace('gif', 'jpg')
}

class Ranks extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  render() {
    let { data: { error, guild, ranks, globalRanks } } = this.props

    if (error) {
      console.error(error)
      return <h1 className='title'>Error loading ranks :(</h1>
    }

    // check if this is the global page, reassign ranks to global
    if (!ranks && globalRanks) {
      ranks = globalRanks
    }

    if (ranks) {
      // Check if Guild is found
      if (!guild && !ranks.length) {
        return <h1 className='title'>Guild not found. :(</h1>
      }

      const pageTitle = (guild ? guild.guild_name : 'Global') + ' Leaderboard'

      return (
        <div>
          <div className='guild-info'>
            { guild ? <img className='guild-icon' src={ cleanDiscordImage(guild.icon) } alt={ guild.guild_name } /> : null }
            <h1 className='title leaderboard-title'>{ pageTitle }</h1>
            <Helmet>
              <title>{ pageTitle + ' | sushii' }</title>
            </Helmet>
          </div>
          <table className='table is-fullwidth is-striped is-hoverable'>
            <tbody>
              {ranks.map((rank, i) => (
                <tr key={i} className='leaderboard-row'>
                  <td className='leaderboard-user'>
                    <span style={{ color: getRankColor(i) }}>
                      {'#' + (i + 1)}
                    </span>
                    <div
                      className='leaderboard-avatar'
                      style={{ display: 'inline-block', width: '60px', height: '60px', margin: '10px 15px 10px 15px' }}>
                      <LazyLoad height='60px' once>
                        <img
                          className='leaderboard-avatar-image'
                          src={rank.user ? cleanDiscordImage(rank.user.avatar) : 'https://cdn.discordapp.com/embed/avatars/0.png'}
                          style={{ height: '60px', borderRadius: '50%' }}
                        />
                      </LazyLoad>
                    </div>
                    <div
                      className={ !rank.user ? 'tooltip is-tooltip-top' : null}
                      data-tooltip={ !rank.user ? 'User not cached, check again later.' : null }
                      style={{ display: 'inline' }}>
                      {rank.user ? rank.user.user_name : 'unknown'}
                      <span
                        className='has-text-grey'>
                        #{rank.user ? pad(rank.user.discriminator) : '0000'}
                      </span>
                    </div>
                  </td>
                  <td className='leaderboard-xp'>
                    <XpProgress xp={rank.msg_all_time} />
                    <div className='leaderboard-level'>
                      <p className='heading'>LEVEL</p>
                      <p className='title' style={{ wordBreak: 'normal' }}>{get_level(rank.msg_all_time)}</p>
                    </div>
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>
      )
    }

    return <Loader />
  }
}

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

const GlobalRanksQuery = gql`
  query GlobalRanks {
    globalRanks {
      user {
        avatar
        user_name
        discriminator
      }
      msg_all_time
    }
  }
`

// HOC? for different GraphQL queries for global / guild leaderboards
export default class WithQuery extends React.Component {
  static propTypes = {
    url: PropTypes.object,
  }

  render() {
    const url = this.props.url

    // default global ranks
    let query = GlobalRanksQuery
    let options = {}

    if (url.query.guild_id) {
      query = RanksQuery
      options = {
        options: {
          variables: {
            guild_id: url.query.guild_id,
          }
        }
      }
    }
    const Wrapped = graphql(query, options)(Ranks)

    return <Wrapped {...this.props} />
  }
}
