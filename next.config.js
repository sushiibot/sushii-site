// next.config.js
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config')

module.exports = withSass(withCSS({
  webpack(config) {
    config = commonsChunkConfig(config, /\.(sass|scss|css)$/)
    return config
  }
}))
