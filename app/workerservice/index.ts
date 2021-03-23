import {
  FastifyInstance,
  FastifySchema,
  FastifyRequest,
  FastifyReply
} from 'fastify'

import {QuerystringSchema as QuerystringSchemaInterface} from './schemas/types/querystring'

// interface IQuerystring {
//   username: string
//   password: string
// }

interface Out {
  data: string
}

export default async function (fastify: FastifyInstance) {
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

async function getServices(
  this: any,
  req: FastifyRequest,
  reply: FastifyReply
) {
  console.log(Object.keys(req))
  console.log(Object.keys(reply))
  const info = await this.workerService.getServices()
  reply.code(200).send(info)
}
