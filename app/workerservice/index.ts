import {FastifyInstance, FastifySchema, RouteHandlerMethod} from 'fastify'
import { QuerystringSchema as QuerystringSchemaInterface } from '../../types/querystring'

// interface IQuerystring {
//   username: string
//   password: string
// }

interface Out {
  data: string
}

module.exports = async function (fastify: FastifyInstance) {
  fastify.get<{
    Querystring: QuerystringSchemaInterface
    Reply: {200: {data: string}}
  }>('/', getServices)
}

// module.exports[Symbol.for('plugin-meta')] = {
//   decorators: {
//     fastify: ['workerService']
//   }
// }

async function getServices(req, reply) {
  console.log(Object.keys(req))
  console.log(Object.keys(reply))
  const info = await this.workerService.getServices()
  reply.code(200).send(info)
}
