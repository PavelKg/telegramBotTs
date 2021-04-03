import {Producer} from '../amqp/types/amqpclient'
import {Telegraf, Context, Markup} from 'telegraf'
import {FastifyRequest, FastifyReply} from 'fastify'
import {MenuTemplate, MenuMiddleware} from 'telegraf-inline-menu'
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
      // this.bot.on('text', (ctx) => {
      //   console.log(ctx.update.message)
      //   ctx.reply('Hello World!!')
      //   if (this.notifier) {
      //     this.notifier.send(ctx.botInfo.first_name)
      //   }
      // })
      this.bot.command('/video', (ctx) => {
        console.log(ctx.update.message)
        ctx.reply('video list')
        if (this.notifier) {
          const chatId : number = ctx.update.message.chat.id
          const type : string = 'get'
          const content : object = { category : 'video', value:'list'}
          const data : object = {chatId,type,content}
          this.notifier.send(JSON.stringify(data))
        }
      })
    }
  }

  subscribeToNotifications() {
    const bot = this.bot
    return (msg: string) => {
      if (bot) {
        const {chatId,type,contentType,content} = JSON.parse(msg)
        if(contentType==='pg-list'){
          bot.telegram.sendMediaGroup(chatId,content)

          // content.forEach(element =>  bot.telegram.sendMessage(chatId, element));
        }
       
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
