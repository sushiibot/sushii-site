import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { withApollo, compose } from 'react-apollo'
import Layout from '../layouts/'
import withData from '../lib/withData'
import GuildInfo from '../components/Guild/GuildInfo'
import GuildPicker from '../components/Guild/GuildPicker'
import redirect from '../lib/redirect'


// Shows a Guild chooser thing if there isn't a guild ID in url path
class GuildPage extends React.Component {
  static propTypes = {
    url: PropTypes.object.isRequired,
    loginInfo: PropTypes.object,
  }

  render() {
    const { loginInfo, url } = this.props
    
    let content

    if (!Object.keys(url.query).length) {
      content = <GuildPicker loginInfo={ loginInfo } />
    } else {
      content = <GuildInfo url={url} />
    }

    return (
      <Layout>
        <Helmet title="Guild | sushii" />
        <div className='container' style={{ marginTop: '100px' }}>
          {content}
        </div>
      </Layout>
    )
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo,
)(GuildPage)
