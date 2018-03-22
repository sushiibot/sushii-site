import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../layouts/'
import withData from '../lib/withData'
import Leaderboard from '../components/Leaderboard'

export default withData((props) => {
  const guild_id = props.url.query.guild_id

  return (
    <Layout>
      <Helmet title="Leaderboard | sushii" />
      <div className='container' style={{ marginTop: '100px' }}>
        <h1 className='title'>
          Leaderboard - { guild_id ? guild_id : 'Global' }
        </h1>
        <Leaderboard url={props.url} />
      </div>
    </Layout>
  )
})
