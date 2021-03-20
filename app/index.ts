'use strict'
import fp from 'fastify-plugin'
import {FastifyInstance} from 'fastify'
import {amqpClient, Producer} from './amqp'
import * as config from '../app/utils/config'
import WorkerService from './workerservice/service'
import Worker from './workerservice'

import cors from 'fastify-cors'
import crypto from 'crypto'

import Telegraf from 'telegraf'
//const config = require('./config')
import Telegram from './telegram'
import {doesNotMatch} from 'node:assert'
import {Interface} from 'node:readline'

// const TelegramService = require('./telegram/service')

// const RabbitService = require('./rabbitmq/service')

// secretpath generate
const current_date: string = new Date().valueOf().toString()
const random: string = Math.random().toString()
const secretpath: string = crypto
  .createHash('sha1')
  .update(current_date + random)
  .digest('hex')

// async function initTelegramBot(fastify) {
//   console.log('TeleBot init...')

//   // Telegram bot
//   const botSettings = config.botList[config.botName]
//   const webHookPath = `https://${config.domen}/${secretpath}`

//   const bot = new Telegraf(botSettings)
//   bot.telegram.setWebhook(webHookPath)

//   fastify.decorate(`telebot`, bot)
//   console.log(`TeleBot ${config.botName} activated.`)
// }

async function connectToAMQP(
  fastify: FastifyInstance,
  opts: any,
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

async function decorateFastifyInstance(fastify: FastifyInstance, opts, done) {
  console.log('Decorate Is Loading...')
  fastify.decorate('telegramService', (a: number, b: number) => a + b)

  const amqpInst: amqpClient = fastify.amqp

  const workerService = new WorkerService(amqpInst)
  fastify.decorate('workerService', workerService)

  const publisher: Producer = await amqpInst.createPublisher('bot_to_backend', {
    durable: true,
    persistent: false
  })
  publisher.send('aaabbb').then((res) => {
    console.log(res)
  })

  //const telebot = fastify.telebot

  // const rabbitService = new RabbitService(amqpChannel, telebot)
  // const telegramService = new TelegramService(telebot, rabbitService)

  // fastify.decorate('telegramService', telegramService)
  // fastify.decorate('rabbitService', rabbitService)

  console.log('Decorate Loaded.', Object.keys(fastify))
}

export default async function (fastify: FastifyInstance, opts, done) {
  await fastify
    .register(fp(connectToAMQP))

    //done()
    //register(fp(initTelegramBot))
    .register(fp(decorateFastifyInstance))

    // .register(cors, {
    //   origin: /[\.kg|:8769|:8080]$/,
    //   path: '*',
    //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //   exposedHeaders: 'Location,Date'
    // })

    // // APIs modules
    // //.register(Rabbitmq)
    .register(Worker, {prefix: `/service`})
}
