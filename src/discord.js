const Promise = require('bluebird')
const axios   = require('axios')
const debug   = require('debug')('discord')
const version = require('../package.json').version

const DISCORD_BASE_URL = 'https://discordapp.com/api'
const DISCORD_API_VERSION = 6


/**
 * Sends a request to discord
 * 
 * @param {string} url URL to send request
 * @param {string} token Access Token Object
 */
function execute(tokenObj, url) {
  const config = {
    headers: {
      Authorization: `Bearer ${tokenObj.access_token}`,
      'User-Agent': `DiscordBot https://github.com/drklee3/sushii-site v${version}`,
    }
  }
  debug('GET', url)
  return axios.get(url, config)
}

/**
 * Builds the full URL for an API request
 * 
 * @param {string} path API path
 */
function buildApiUrl(path) {
  return `${DISCORD_BASE_URL}/v${DISCORD_API_VERSION + path}`
}

/**
 * Checks if an access token has expired and refreshes if it has
 * Resolves with the inner token object
 * 
 * @param {object} token Built Access Token object
 */
async function checkToken(token) {
  return new Promise(async (resolve, reject) => {
    if (token.expired()) {
      debug('Access Token expired, attempting to refresh')
      token.refresh()
        .then(refreshed => resolve(refreshed.token))
        .catch(err => reject(err))
    } else {
      resolve(token.token)
    }
  })
}

/**
 * Generic Discord API data requester
 * 
 * @param {object} token Built Access Token object
 * @param {string} endpoint Discord API request endpoint
 */
function makeRequest(token, endpoint) {
  return new Promise(async (resolve, reject) => {
    try {
      // check if token still valid, refresh if needed
      const tokenObj = await checkToken(token)
      // build the full discord API url
      const url = buildApiUrl(endpoint)
      resolve(await execute(tokenObj, url))
    } catch (err) {
      reject(err)
    }
  })
}

/**
 * Gets a list of a user's guilds
 * 
 * @param {object} token Built Access Token object
 */
function getGuilds(token) {
  return makeRequest(token, '/users/@me/guilds')
}

/**
 * Gets a user object
 * 
 * @param {object} token Built Access Token object
 */
function getUser(token) {
  return makeRequest(token, '/users/@me')
}

/**
 * Gets both data and guilds for a user
 * 
 * @param {object} token Built Access Token object
 */
function getUserData(token) {
  return new Promise(async (resolve, reject) => {
    try {
      const guilds = await getGuilds(token)
      const user = await getUser(token)

      // check both responses for errors
      if (guilds.status !== 200) {
        reject(guilds.statusText)
      }

      if (user.status !== 200) {
        reject(user.statusText)
      }

      // add the user id to each guild and restructure
      const guildsWithUserId = guilds.data.map(guild => {
        return {
          user_id: user.data.id,
          guild_id: guild.id,
          is_owner: guild.owner,
          permissions: guild.permissions,
        }
      })

      const data = {
        user: user.data,
        guilds: guildsWithUserId,
      }

      debug('User Data:', data)

      resolve(data)
    } catch(err) {
      reject(err)
    }
  })
}

module.exports = { getUserData }
