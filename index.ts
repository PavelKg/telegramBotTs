import fs from 'fs'
import path from 'path'

import {SERVER_TYPE} from './app/utils/config'
import {Server, IncomingMessage, ServerResponse} from 'http'
import fastify, {FastifyInstance, FastifyLoggerInstance} from 'fastify'

import {PORT} from './app/utils/config'
import app from './app'

const https = {
  key: fs.readFileSync('ssl_keys/privkey.pem'),
  cert: fs.readFileSync('ssl_keys/fullchain.pem')
}
const add_opt = SERVER_TYPE === 'https' ? {https} : {}

const server: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse,
  FastifyLoggerInstance
> = fastify({
  ...add_opt,
  logger: true,
  ignoreTrailingSlash: true,
  bodyLimit: 7291456
})

server.register(app).then(() => {})

server.listen(PORT || 8765, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
