import {Channel, Connection} from 'amqplib'

export interface ServerOpts {
  host: string | undefined 
  port: string | undefined 
  user: string | undefined 
  password: string | undefined 
}

export interface Conn {
  connection: Connection | undefined
  channel: Channel | undefined
}

export interface QueueOpt {
  queue: string
  isNoAck?: boolean
  durable?: boolean
  prefetch?: boolean
}

export interface PubOpts {
  durable?: boolean
  persistent?: boolean
}

export interface Producer {
  send: Function
  stop: Function
}
