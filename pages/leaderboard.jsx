import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../layouts/'
import withData from '../lib/withData'
import Leaderboard from '../components/Leaderboard'

export default withData((props) => {
  return (
    <Layout>
      <Helmet title="Leaderboard | sushii" />
      <div className='container' style={{ marginTop: '100px' }}>
        <Leaderboard url={props.url} />
      </div>
    </Layout>
  )
})
