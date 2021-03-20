import fastify, {FastifyInstance, FastifyLoggerInstance} from 'fastify'
import {Server, IncomingMessage, ServerResponse} from 'http'

import {PORT} from './app/utils/config'
import app from './app'

const server: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse,
  FastifyLoggerInstance
> = fastify({
  logger: true,
  ignoreTrailingSlash: true,
  bodyLimit: 7291456
})

server.register(app).then(() => {})

server.listen(PORT || 8765, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
