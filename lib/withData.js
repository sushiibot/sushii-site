import React from 'react'
import cookie from 'cookie'
import PropTypes from 'prop-types'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import Head from 'next/head'

import checkLoggedIn from './checkLoggedIn'
import redirect from './redirect'
import initApollo from './initApollo'

function parseCookies(context = {}, options = {}) {
  return cookie.parse(
    context.req && context.req.headers.cookie
      ? context.req.headers.cookie
      : document.cookie,
    options
  )
}

export default ComposedComponent => {
  return class WithData extends React.Component {
    static displayName = `WithData(${ComposedComponent.displayName})`
    static propTypes = {
      client: PropTypes.object,
      serverState: PropTypes.object.isRequired,
    }

    static async getInitialProps(context) {
      let serverState = {}

      // Setup a server-side one-time-use apollo client for initial props and
      // rendering (on server)
      let apollo = initApollo({})

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {}
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(context, apollo)
      }

      // Run all graphql queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        if (context.res && context.res.finished) {
          // When redirecting, the response is finished.
          // No point in continuing to render
          return
        }

        // Provide the `url` prop data in case a graphql query uses it
        const url = { query: context.query, pathname: context.pathname }
        try {
          // Run all GraphQL queries
          const app = (
            <ApolloProvider client={apollo}>
              <ComposedComponent url={url} {...composedInitialProps} />
            </ApolloProvider>
          )
          await getDataFromTree(app, {
            router: {
              query: context.query,
              pathname: context.pathname,
              asPath: context.asPath
            }
          })
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
        }
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()

        // Extract query data from the Apollo's store
        serverState = apollo.cache.extract()
      }

      const { loginInfo } = await checkLoggedIn(context, apollo)
      console.log(loginInfo)

      // checked if page requires auth and is logged in
      if (context.pathname.startsWith('/guild') && !Object.keys(loginInfo).length) {
        redirect(context, '/auth')
      }

      return {
        serverState,
        ...composedInitialProps,
        loginInfo,
      }
    }

    constructor(props) {
      super(props)
      // Note: Apollo should never be used on the server side beyond the initial
      // render within `getInitialProps()` above (since the entire prop tree
      // will be initialized there), meaning the below will only ever be
      // executed on the client.
      this.apollo = initApollo(this.props.serverState, {
        getLoginInfo: () => parseCookies().login_info
      })
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
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      )
    }
  }
}