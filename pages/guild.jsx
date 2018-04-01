import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../layouts/'
import withData from '../lib/withData'
import Guild from '../components/Guild'

export default withData((props) => {
  return (
    <Layout>
      <Helmet title="Guild | sushii" />
      <div className='container' style={{ marginTop: '100px' }}>
        <Guild url={props.url} />
      </div>
    </Layout>
  )
})
