module.exports = async function (fastify, opts) {
  fastify.get<{string}>('/', {}, getServices)
}

// module.exports[Symbol.for('plugin-meta')] = {
//   decorators: {
//     fastify: ['workerService']
//   }
// }

async function getServices(req, reply) {
  const info = await this.workerService.getServices()
  reply.code(200).send(info)
}
