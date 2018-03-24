import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const StatsQuery = gql`
  query stats($filter: [String!]) {
    stats(filter: $filter) {
      stat_name
      count
      category
    }
  }
`

const statsInfo = {
  guilds_count: {
    name: 'Guilds',
    position: 0,
  },
  users_count: {
    name: 'Users',
    position: 1,
  },
  commands_executed: {
    name: 'Commands Executed',
    position: 2,
  },
  messages_recieved: {
    name: 'Messages Processed',
    position: 3,
  },
}

/**
 * Comparator function for sorting an array based on set positions
 * 
 * @param {stat} a - Statistics object from GraphQL
 * @param {stat} b 
 */
function compareStat(a, b) {
  return statsInfo[a.stat_name].position - statsInfo[b.stat_name].position
}

/**
 * Gets a prettier name for statistics
 * 
 * @param {stat} stat - Statistic object
 */
function getStatName(stat) {
  return statsInfo[stat].name
}

function formatNumber(num) {
  return parseInt(num, 10).toLocaleString()
}

class Stats extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  render() {
    const { data: { error, stats } } = this.props

    if (error) return <div>Error loading stats</div>
    if (stats) {
      // Sort a cloned array as stats is immutable
      let sorted = stats.slice(0).sort(compareStat)

      return (
        sorted.map((stat, i) => (
          <div className='level-item has-text-centered' key={i}>
            <div>
              <p className="heading">{ getStatName(stat.stat_name) }</p>
              <p className="title">{ formatNumber(stat.count) }</p>
            </div>
          </div>
        ))
      )
    }

    // Default stuff with same structure so it doesn't shift elements around when loading
    return (
      <div className='level-item has-text-centered'>
        <div>
          <p className="heading">Loading stats...</p>
          <p className="title" style={{ visibility: 'hidden' }}>Loading...</p>
        </div>
      </div>
    )
  }
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default graphql(StatsQuery, {
  options: {
    variables: {
      filter: ['messages_recieved', 'commands_executed', 'guilds_count', 'users_count']
    }
  }
})(Stats)
