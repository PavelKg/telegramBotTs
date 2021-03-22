import amqp, {Channel, Connection} from 'amqplib'
import {ServerOpts, Conn, PubOpts, Producer, QueueOpt} from './ampqclient'
class amqpClient {
  connections: Array<Conn> = []
  server: ServerOpts

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
    try {
      const connection = await amqp.connect(
        `amqp://${user}:${password}@${host}:${port}/`
      )
      const channel = await connection.createChannel()
      const conn: Conn = {connection, channel}
      this.connections.push(conn)
      return conn
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  async createPublisher(queue: string, opts: PubOpts): Promise<Producer> {
    try {
      const conn = await this.createConn()
      const {durable = true, persistent = false} = opts

      if (!conn.channel) {
        throw "Channel wasn't created"
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
    } catch (err) {
      throw err
    }
  }
  async runConsumerForService(opts: QueueOpt, serviceCb: Function) {
    const {queue, isNoAck = false, durable = false, prefetch = false} = opts
    //await this.conns.consumer.channel?.assertQueue(queue, {durable})
  }
}

export {Producer, amqpClient}
