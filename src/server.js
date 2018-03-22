require('dotenv').config()

const Koa              = require('koa')
const next             = require('next')
const Body             = require('koa-bodyparser')
const Router           = require('koa-router')

const { graphqlKoa }   = require('apollo-server-koa')
const { graphiqlKoa }  = require('apollo-server-koa')
const { ApolloEngine } = require('apollo-engine')
const schema           = require('./schema')

const dev    = process.env.NODE_ENV !== 'production'
const port   = parseInt(process.env.PORT, 10) || 3000

const app    = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = new Koa()
    const router = new Router()

    server.use(Body())

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

    // invite url
    router.get('/invite', async ctx => {
      ctx.redirect(process.env.INVITE_URL)
    })

    // Dynamic Next.js Pages
    router.get('/leaderboard/:id', async ctx => {
      // Redirect global leaderboard with trailing slash
      if (!ctx.params.id) {
        ctx.redirect('/leaderboard')
        ctx.status = 301
      }
      
      const queryParams = { guild_id: ctx.params.id }
      app.render(ctx.req, ctx.res, '/leaderboard', queryParams)
      ctx.respond = false
    })

    // Next.js Pages
    router.get('*', async ctx => {
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
  })
