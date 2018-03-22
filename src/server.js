require('dotenv').config()

const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const Body = require('koa-bodyparser')
const { graphqlKoa } = require('apollo-server-koa')
const { graphiqlKoa } = require('apollo-server-koa')
const { ApolloEngine } = require('apollo-engine')
const schema = require('./schema')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = new Koa()
    const router = new Router()

    server.use(Body())

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

    // Initialize engine with your API key
    const engine = new ApolloEngine({
      apiKey: process.env.APOLLO_ENGINE_KEY
    })

    engine.listen({
      port: port,
      koaApp: server,
    }, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
