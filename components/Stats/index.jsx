import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const StatsQuery = gql`
  query {
    stats {
      stat_name
      count
      category
    }
  }
`

class Stats extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  render() {
    console.log(this.props)
    const { data: { error, stats } } = this.props

    if (error) return <div>Error loading stats</div>
    if (stats) {
      return (
        <ul>
          {stats.map((stat, i) => (
            <li key={i}>
              {stat.stat_name} - {stat.count}
            </li>
          ))}
        </ul>
      )
    }

    return <div>Loading</div>
  }
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default graphql(StatsQuery)(Stats)
