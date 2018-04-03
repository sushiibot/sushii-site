// next.config.js
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config')
const baseUrl = process.env.BASE_URL

module.exports = withSass(withCSS({
  webpack(config) {
    config = commonsChunkConfig(config, /\.(sass|scss|css)$/)
    return config
  },
  serverRuntimeConfig: { // Will only be available on the server side
    mySecret: 'shhh'
  },
  publicRuntimeConfig: { // Will be available on both server and client
    baseUrl: baseUrl
  }
}))
