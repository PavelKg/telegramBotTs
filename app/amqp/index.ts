import amqp from 'amqplib'
import EventEmitter from 'events'
import {
  Producer,
  ServerOpts,
  Conn,
  QueueOpt,
  PublisherOpts
} from './types/ampqclient'

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
    let conn: Conn = {connection: undefined, channel: undefined}
    try {
      const connection = await amqp.connect(
        `amqp://${user}:${password}@${host}:${port}/`
      )
      if (connection) {
        const channel = await connection.createChannel()
        conn = {...conn, connection, channel}
        process.once('SIGINT', function () {
          connection.close()
        })
        this.connections.push(conn)
      }
    } catch (err) {
      console.log(err)
      throw err
    }
    return conn
  }

  async createPublisher(queue: string, opts: PublisherOpts): Promise<Producer> {
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
  async runConsumerForService(
    opts: QueueOpt,
    serviceCb: Function
  ): Promise<boolean> {
    const {queue, isNoAck = false, durable = false} = opts
    let consumeEmitter: EventEmitter
    try {
      const conn = await this.createConn()
      if (!conn.channel) {
        throw 'Channel is down'
      } else {
        await conn.channel.assertQueue(queue, {durable})

        conn.channel.consume(
          queue,
          (message) => {
            if (message !== null) {
              serviceCb(message.content.toString())
            } else {
              throw 'NullMessageException'
            }
          },
          {noAck: isNoAck}
        )
      }
    } catch (error) {
      throw error
    }
    return Promise.resolve(true)
  }
}

export {amqpClient}
