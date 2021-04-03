import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply
} from 'fastify'

export default async function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  // Route registration
  // fastify.<method>(<path>, <schema>, <handler>)
  // schema is used to validate the input and serialize the output

  // Unlogged APIs
  fastify.post('/', {}, messHandler)
  fastify.get('/', {}, testHandler)
}

module.exports[Symbol.for('plugin-meta')] = {
  decorators: {
    fastify: ['TelegramService']
  }
}

async function messHandler(
  this: any,
  req: FastifyRequest,
  reply: FastifyReply
) {
  await this.telegramService.handleUpdate(req, reply)
  reply.code(200).send()
}
async function testHandler(req: FastifyRequest, reply: FastifyReply) {
  console.log('telegram')
  reply.code(200).send('Hello World !!!')
}
