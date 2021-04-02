import {Producer} from '../amqp/types/amqpclient'
import {Telegraf, Context, Markup} from 'telegraf'
import {FastifyRequest, FastifyReply} from 'fastify'
import {Update} from 'typegram'

export default class TelegramService {
  bot: Telegraf<Context> | undefined = undefined
  notifier: Producer | undefined = undefined

  constructor(bot: Telegraf<Context>, notifier: Producer) {
    this.bot = bot
    this.notifier = notifier
    this.init()
  }
  init() {
    if (this.bot) {
      this.bot.on('text', (ctx) => {
        console.log(ctx.update.message)
        ctx.reply('Hello World')
        if (this.notifier) {
          this.notifier.send(ctx.botInfo.first_name)
        }
      })
    }
  }

  subscribeToNotifications() {
    const bot = this.bot
    return (msg: string) => {
      if (bot) {
        bot.telegram.sendMessage(304230716, msg)
        console.log(msg)
      }
    }
  }

  async handleUpdate(req: FastifyRequest, reply: FastifyReply) {
     const body: Update = req.body
    if (this.bot) {
      this.bot.handleUpdate(body)
    }
  }
}
