import React from 'react'
import PropTypes from 'prop-types'
import checkLoggedIn from './checkLoggedIn'
import cookie from 'cookie'
import redirect from './redirect'

export default Page => {
  return class Index extends React.Component {
    static propTypes = {
      client: PropTypes.object,
    }

    static async getInitialProps(context, apolloClient) {
      const { loggedInUser } = await checkLoggedIn(context, apolloClient)
      console.log('getInitialProps:', loggedInUser)
      return { loggedInUser }
    }

    signout = () => {
      document.cookie = cookie.serialize('koa:sess', '', {
        maxAge: -1 // Expire the cookie immediately
      })

      // Force a reload of all the current queries now that the user is
      // logged in, so we don't accidentally leave any state around.
      this.props.client.cache.reset().then(() => {
        // Redirect to a more useful page when signed out
        redirect({}, '/')
      })
    }

    render() {
      return (
        <Page {...this.props} />
      )
    }
  }
}
