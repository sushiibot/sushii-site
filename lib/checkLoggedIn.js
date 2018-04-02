import gql from 'graphql-tag'

export default (context, apolloClient) => (
  apolloClient.query({
    query: gql`
      query loginInfo {
        getCurrentUser {
          id
          user {
            user_name
            discriminator
            avatar
          }
        }
      }
    `
  }).then(data => {
    return { loginInfo: data }
  }).catch(e => {
    console.error(e)
    // Fail gracefully
    return { loginInfo: {} }
  })
)
