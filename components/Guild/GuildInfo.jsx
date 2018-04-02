import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Loader from '../Loader'

class Guild extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.graph = React.createRef()
  }

  componentDidUpdate(prevProps) {
    // return if already has messageactivity
    if (prevProps.data.messageActivity) {
      return
    }

    // only do this in client side not on server
    if (window !== undefined) {
      const Chart = require('chart.js')

      const graph = this.graph.current

      const data = this.props.data.messageActivity.map(val => {
        return { x: val.time, y: val.count }
      })

      console.log('graphdata:', data)

      // gradient
      const ctx = graph.getContext('2d')
      const grd = ctx.createLinearGradient(150.000, 0.000, 150.000, 300.000)

      // Add colors
      grd.addColorStop(0.000, '#49baff')
      grd.addColorStop(1.000, 'rgba(0, 0, 0, 0.000)')

      const chartData = {
        datasets: [{
          label: 'Messages',
          data: data,
          backgroundColor: grd,
          borderColor: '#49baff',
          borderWidth: 1,
          lineTension: 0.1
        }]
      }
      // build graph
      let guildGraph = new Chart(graph, {
        type: 'line',
        data: chartData,
        options: {
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                unit: 'hour',
              },
              gridLines: {
                display: false,
                drawBorder: false,
              },
            }],
            yAxes: [{
              gridLines: {
                display: false,
                drawBorder: false,
              },
            }]
          },
          legend: {
            display: false,
          },
        },
      })

      this.setState({ graph: guildGraph })
    }
  }

  render() {
    let { data: { error, guild } } = this.props

    if (error) {
      console.error(error)
      return <h1 className='title'>Error loading guild :(</h1>
    }

    if (guild) {
      return (
        <div>
          <Helmet title={ guild.guild_name + ' Stats | sushii'} />
          <h1 className='title is-1'>{ guild.guild_name }</h1>
          <h4 className='title is-4'>Chat Activity</h4>
          <canvas ref={ this.graph } height={ '200' } width={ '600' }></canvas>
        </div>
      )
    }

    return <Loader />
  }
}

const GuildQuery = gql`
  query Guild($guild_id: String, $resolution: String) {
    guild(id: $guild_id) {
      guild_name
      icon
      member_count
      owner_id
    }
    messageActivity(id: $guild_id, resolution: $resolution) {
      time
      count
    }
  }
`


export default graphql(GuildQuery, {
  options: (props) => ({
    variables: {
      guild_id: props.url.query.guild_id,
      resolution: 'hour',
    }
  })
})(Guild)
