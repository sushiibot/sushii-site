import React from 'react'
import Link from 'next/link'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Loader from '../Loader'

class Guild extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  render() {
    let { data: { error, user, OAuthGuilds } } = this.props

    if (error) {
      console.error(error)
      return <h1 className='title'>Error loading guild :(</h1>
    }

    if (OAuthGuilds && user) {
      const guilds = OAuthGuilds.filter(x => x.guild)

      return (
        <div>
          <Helmet title={ user.user_name + ' guilds | sushii' } />
          <h1 className='title is-1'>{ `${user.user_name}#${user.discriminator} Guilds` }</h1>
          
          {
            guilds.map((guild, i) => (
              <div key={i}>
                <Link href={ '/guild/' + guild.guild_id }>
                  <a>
                    { guild.guild.guild_name }
                  </a>
                </Link>
              </div>
            ))
          }
        </div>
      )
    }

    return <Loader />
  }
}

const GuildQuery = gql`
  query UserGuilds($user_id: String!) {
    OAuthGuilds(id: $user_id) {
      guild_id
      guild {
        id
        icon
        guild_name
        member_count
      }
      is_owner
      permissions
    }
    user(id: $user_id) {
      id
      avatar
      user_name
      discriminator
    }
  }
`


export default graphql(GuildQuery, {
  options: (props) => ({
    variables: {
      user_id: props.loginInfo ? props.loginInfo.user_id : null,
    }
  })
})(Guild)
