'use strict'
import fp from 'fastify-plugin'
import cors from 'fastify-cors'
import crypto from 'crypto'
import * as config from '../app/utils/config'
import {FastifyInstance, FastifyPluginOptions} from 'fastify'

import {Producer} from './amqp/types/ampqclient'
import {amqpClient} from './amqp'

import WorkerService from './workerservice/service'
import Worker from './workerservice'

import {Telegraf, Context} from 'telegraf'
import Telegram from './telegram'
import TelegramService from './telegram/service'

declare module 'fastify' {
  interface FastifyInstance {
    amqp: amqpClient
    telebot: Context
  }
}

// secretpath generate
const current_date: string = new Date().valueOf().toString()
const random: string = Math.random().toString()
const secretpath: string = crypto
  .createHash('sha1')
  .update(current_date + random)
  .digest('hex')

async function initTelegramBot(fastify: FastifyInstance) {
  console.log('TeleBot init...')
  // Telegram bot
  const {
    TELE_BOT_NAME: name,
    TELE_BOT_DOMAIN: domain,
    TELE_BOT_TOKEN: token,
    TELE_BOT_MODE: mode
  } = config

  if (token) {
    const bot = new Telegraf<Context>(token)
    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
    const opts: Telegraf.LaunchOptions = {}

    if (mode === 'webhook') {
      const hookPath = `/${secretpath}`
      opts.webhook = {domain, hookPath}
    }
    await bot.launch(opts)
    fastify.decorate(`telebot`, bot)
    console.log(`TeleBot ${name} lanched. Mode is ${mode}`)
  }
}

async function connectToAMQP(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: Function
) {
  const {
    AMQP_USER: user,
    AMQP_PASS: password,
    AMQP_HOST: host,
    AMQP_PORT: port
  } = config

  console.log('AMQP init...')
  const rabbitClient = new amqpClient({host, port, user, password})
  try {
    await rabbitClient.init()
    fastify.decorate(`amqp`, rabbitClient)
    fastify.addHook('onClose', () => rabbitClient.close())
    console.log('AMQP is ready')
    done()
  } catch (err) {
    console.log('AMQP init error', err)
  }
}

async function decorateFastifyInstance(fastify: FastifyInstance) {
  const {QUEUE_TO_BOT: q_to_bot = '', QUEUE_TO_BACK: q_to_back = ''} = config
  console.log('Decorate Is Loading...')

  const amqpInst: amqpClient = fastify.amqp
  const workerService = new WorkerService(amqpInst)
  fastify.decorate('workerService', workerService)

  const publisher: Producer = await amqpInst.createPublisher(q_to_back, {
    durable: true,
    persistent: false
  })

  const telebot: any = fastify.telebot
  const telegramService = new TelegramService(telebot, publisher)
  const subscribeHandler = telegramService.subscribeToNotifications()

  await amqpInst.runConsumerForService(
    {queue: q_to_bot, isNoAck: true},
    subscribeHandler
  )

  fastify.decorate('telegramService', telegramService)
  console.log('Decorate Loaded.')
}

export default async function (fastify: FastifyInstance) {
  await fastify
    .register(fp(connectToAMQP))
    .register(fp(initTelegramBot))
    .register(fp(decorateFastifyInstance))

    .register(cors, {
      origin: /[\.kg|:8765]$/,
      //path: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      exposedHeaders: 'Location,Date'
    })

    // // APIs modules
    .register(Worker, {prefix: `/service`})
    .register(Telegram, {prefix: `/${secretpath}`})
}
