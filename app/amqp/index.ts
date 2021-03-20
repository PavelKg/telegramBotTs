import amqp, {Channel, Connection} from 'amqplib/callback_api'

interface ServerOpts {
  host: string | undefined
  port: string | undefined
  user: string | undefined
  password: string | undefined
}

interface Conn {
  connection: Connection | undefined
  channel: Channel | undefined
}

interface QueueOpt {
  queue: string
  isNoAck?: boolean
  durable?: boolean
  prefetch?: boolean
}

interface PubOpts {
  durable?: boolean
  persistent?: boolean
}

interface Producer {
  send: Function
  stop: Function
}
class amqpClient {
  connections: Array<Conn> = []
  server: ServerOpts = {
    host: undefined,
    port: undefined,
    user: undefined,
    password: undefined
  }
  constructor(opts: ServerOpts) {
    this.server = {...opts}
  }

  init() {}
  info() {
    return {connCount: this.connections.length}
  }
  async close() {
    this.connections.forEach((conn) => {
      conn.connection?.close()
    })
  }

  async createConn(): Promise<Conn> {
    const {host, port, user, password} = this.server
    const conn: Conn = {connection: undefined, channel: undefined}
    const connections = this.connections
    return new Promise((resolve: Function, reject: Function) => {
      amqp.connect(
        `amqp://${user}:${password}@${host}:${port}/`,
        function (err, connection) {
          if (err) {
            console.log({err})
            reject(err)
          }
          conn.connection = connection
          connection.createChannel(function (err1, channel) {
            if (err1) {
              reject(err1)
            }
            conn.channel = channel
            connections.push(conn)
            resolve(conn)
          })
        }
      )
    })
  }

  async createPublisher(queue: string, opts: PubOpts): Promise<Producer> {
    const conn = await this.createConn()
    const {durable = true, persistent = false} = opts

    if (!conn.channel) {
      return Promise.reject()
    }

    await conn.channel.assertQueue(queue, {durable})
    const produce: Producer = {
      send: async function (message: string) {
        if (!conn.channel) {
          Promise.reject('Channel is down')
        } else {
          return await conn.channel.sendToQueue(queue, Buffer.from(message), {
            persistent
          })
        }
      },
      stop: () => {
        conn.connection?.close()
      }
    }
    return produce
  }
  async runConsumerForService(opts: QueueOpt, serviceCb: Function) {
    const {queue, isNoAck = false, durable = false, prefetch = false} = opts
    //await this.conns.consumer.channel?.assertQueue(queue, {durable})
  }
}

export {Producer, amqpClient}
