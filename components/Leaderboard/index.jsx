import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const RanksQuery = gql`
  query ranks($guild_id: String) {
    ranks(guild_id: $guild_id) {
      user_id
      msg_all_time
      msg_month
      msg_week
      msg_day
    }
  }
`

class Ranks extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  render() {
    console.log(this.props)
    const { data: { error, ranks } } = this.props

    if (error) {
      console.error(error)
      return <div>Error loading ranks</div>
    }
    if (ranks) {
      return (
        <ul>
          { ranks.map((rank, i) => (
            <li key={i}>
              { rank.user_id } - { rank.msg_all_time }
            </li>
          )) }
        </ul>
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
