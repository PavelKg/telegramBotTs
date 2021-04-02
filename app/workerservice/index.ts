import {FastifyInstance, FastifyRequest, FastifyReply} from 'fastify'

import {QuerystringSchema as QuerystringSchemaInterface} from './schemas/types/querystring'
import QuerystringSchema from './schemas/querystring.json'

const html_temp = `
<html >
  <head>
    <title>The Rock (1996)</title>
    <meta name="description" content="A mild-mannered chemist and an ex-con must lead the counterstrike" />
<meta property="og:description" content="A mild-mannered chemist and an ex-con must lead the counterstrike" />
<meta property="og:title" content="The Rock11" />
<meta property="og:type" content="video.movie" />
<meta property="og:url" content="https://botkg.ga/service/player" />
<meta property="og:image" content="https://miro.medium.com/max/1838/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" />
<meta property="og:image:type" content="image/jpeg" />
    	
    
  </head>
  <body><H1>AAAABBB</h1></body>
</html>`

interface Out {
  data: string
}

export default async function (fastify: FastifyInstance) {
  fastify.get<{
    Querystring: QuerystringSchemaInterface
    Reply: {200: {data: string}}
  }>(
    '/',
    {
      schema: {
        querystring: QuerystringSchema
      }
    },
    getServices
  )

  fastify.get('/player', getPlayer)
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

async function getPlayer(this: any, req: FastifyRequest, reply: FastifyReply) {
  console.log('html')
  const html = html_temp
  reply.type('text/html').send(html)
}
