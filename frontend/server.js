const express = require('express')
const next = require('next')

const routes = require('./routes')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = routes.getRequestHandler(app)
const server = express()

app.prepare().then(() => {
  server.use(express.static('static'))
  server.use(handler)

  server.listen(3000)
})