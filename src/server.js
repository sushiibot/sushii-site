require('dotenv').config()

const Koa              = require('koa')
const Body             = require('koa-bodyparser')
const Router           = require('koa-router')
const next             = require('next')
const session          = require('koa-session')
const simpleOauth2     = require('simple-oauth2')
const crypto           = require('crypto')
const discord          = require('./discord')
const db               = require('./database')
const crypt            = require('./crypt')

const { graphqlKoa }   = require('apollo-server-koa')
const { graphiqlKoa }  = require('apollo-server-koa')
const { ApolloEngine } = require('apollo-engine')
const schema           = require('./schema')

const dev    = process.env.NODE_ENV !== 'production'
const port   = parseInt(process.env.PORT, 10) || 3000

const app    = next({ dev })
const handle = app.getRequestHandler()

// Discord OAuth information
const discord_oauth = {
  client: {
    id: process.env.DISCORD_ID,
    secret: process.env.DISCORD_SECRET,
  },
  auth: {
    tokenHost: 'https://discordapp.com',
    tokenPath: '/api/oauth2/token',
    authorizePath: '/api/oauth2/authorize',
  },
}
const oauth2 = simpleOauth2.create(discord_oauth)
const redirectUri = process.env.REDIRECT_URI || 'http://localhost:3000/callback'


function main() {
  const server = new Koa()
  const router = new Router()

  server.use(session(server))
  server.use(Body())

  // Set signed cookie keys
  server.keys = process.env.KOA_KEYS.split(',')

  // GraphQL Endpoints
  router.post('/graphql', graphqlKoa({
    schema: schema,
    tracing: true,
    cacheControl: true,
  }))

  router.get('/graphql', graphqlKoa({
    schema: schema,
    tracing: true,
    cacheControl: true,
  }))

  router.get(
    '/graphiql',
    graphiqlKoa({
      endpointURL: '/graphql', // a POST endpoint that GraphiQL will make the actual requests to
    })
  )

  // OAuth login
  router.get('/auth', async ctx => {
    if (!ctx.session.isNew) {
      ctx.redirect('/')
      return
    }

    // create random state and save to cookies (httpOnly enabled by default)
    const state = crypto.randomBytes(16).toString('hex')
    ctx.cookies.set('state', state)

    // build the auth url
    const authorizationUri = oauth2.authorizationCode.authorizeURL({
      redirect_uri: redirectUri,
      scope: 'identify guilds',
      state,
    })

    ctx.redirect(authorizationUri)
  })

  // OAuth callback
  router.get('/callback', async ctx => {
    const tokenConfig = {
      code: ctx.query.code,
      redirect_uri: redirectUri,
    }
    
    try {
      const tokenObj = await oauth2.authorizationCode.getToken(tokenConfig)
      const token = oauth2.accessToken.create(tokenObj)
      const { user, guilds } = await discord.getUserData(token)

      // to save to DB, discord user id + OAuth
      const userToken = {
        id: user.id,
        access_token: tokenObj.access_token,
        expires_at: token.token.expires_at,
        refresh_token: tokenObj.refresh_token,
      }

      // encrypt user and save data to db
      const encryptedUser = crypt.encryptUser(userToken)
      await db.upsertUser(encryptedUser)
      await db.upsertGuilds(guilds)

      // set session data
      ctx.session.access_token = userToken.access_token
      ctx.session.user_id = userToken.id
      ctx.redirect('/')
    } catch(err) {
      console.error('Access Token Error:', err.message)
      ctx.status = 500
      ctx.body = 'Authentication Failed'
      ctx.redirect('/')
    }
  })

  // destroys a user session
  router.get('/logout', async ctx => {
    ctx.session = null
    ctx.redirect('/')
  })

  // invite url
  router.get('/invite', async ctx => {
    ctx.redirect(process.env.INVITE_URL)
  })

  // Dynamic Next.js Pages
  router.get('/leaderboard/:id', async ctx => {
    const queryParams = { guild_id: ctx.params.id }
    app.render(ctx.req, ctx.res, '/leaderboard', queryParams)
    ctx.respond = false
  })


  // Next.js Pages
  router.get('*', async ctx => {
    // only remove trailing / if not a HMR url:
    // /_next/on-demand-entries-ping?page=/
    // otherwise this will cause index page to constantly reload
    if (dev && !ctx.url.endsWith('page=/')) {
      ctx.url = ctx.url.replace(/\/$/, '')
      if (ctx.url == '') {
        ctx.url = '/'
      }
    }
    
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.use(router.routes())
  server.use(router.allowedMethods())

  // Initialize Apollo Engine
  const engine = new ApolloEngine({
    apiKey: process.env.APOLLO_ENGINE_KEY
  })

  // Handle Apollo Engine errors.
  engine.on('error', err => {
    console.log('There was an error starting the server or Engine.')
    console.error(err)

    process.exit(1)
  })

  engine.listen({
    port: port,
    koaApp: server,
  }, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
}

app.prepare()
  .then(main)
