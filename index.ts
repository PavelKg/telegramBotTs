import fastify from 'fastify'
import Telegraf from 'telegraf'

const server = fastify()

import app from './app'

fastify().register(app)

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

server.listen(8081, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
