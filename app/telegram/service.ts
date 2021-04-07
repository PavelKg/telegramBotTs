import {Producer} from '../amqp/types/amqpclient'
import {Telegraf, Context, Markup, Scenes, session} from 'telegraf'
import {botContext} from './types/telebot'
import {FastifyRequest, FastifyReply} from 'fastify'
import {getMainKeyboard} from './utils/keyboards'
import {
  userMenuScene,
  startScene,
  coursesScene,
  profileScene,
  accomplishmentsScene,
  notificationsScene
} from './controllers'

const {enter, leave} = Scenes.Stage
export default class TelegramService {
  bot: Telegraf<botContext> | undefined = undefined
  notifier: Producer | undefined = undefined

  constructor(bot: Telegraf<botContext>, notifier: Producer) {
    this.bot = bot
    this.notifier = notifier
    this.init()
  }
  async init() {
    const bot = this.bot
    const mainKeyboard = getMainKeyboard()
    if (bot) {
      // this.bot.on('text', (ctx) => {
      //   console.log(ctx.update.message)
      //   ctx.reply('Hello World!!')
      //   if (this.notifier) {
      //     this.notifier.send(ctx.botInfo.first_name)
      //   }
      // })
      // bot.command('/video', (ctx) => {
      //   //console.log(ctx.update.message)
      //   ctx.reply('video list')
      //   if (this.notifier) {
      //     const chatId: number = ctx.update.message.chat.id
      //     const type: string = 'get'
      //     const content: object = {category: 'video', value: 'list'}
      //     const data: object = {chatId, type, content}
      //     this.notifier.send(JSON.stringify(data))
      //   }
      // })

      const stage = new Scenes.Stage<botContext>(
        [
          userMenuScene,
          startScene,
          coursesScene,
          profileScene,
          accomplishmentsScene,
          notificationsScene
        ],
        {
          /*ttl: 10*/
        }
      )

      bot.use(session())
      bot.use(stage.middleware())

      bot.start(async (ctx) => {
        console.log('start')
        ctx.scene.enter('start')
      })
      mainKeyboard.menuItems.forEach((item) => {
        bot.hears(item, enter<botContext>(item))
      })

      // bot.hears('/back', async (ctx) => {
      //   await ctx.reply('Main menu', mainKeyboard.menuKeyboard)
      // })

      await bot.launch()

      console.log('Telegram bot started')
    }
  }

  subscribeToNotifications() {
    const bot = this.bot
    return (msg: string) => {
      if (bot) {
        const {chatId, type, contentType, content} = JSON.parse(msg)
        if (contentType === 'pg-list') {
          const mediaGroup = content.map((item) => {
            return {media: item, caption: 'From file_id', type: 'photo'}
          })

          console.log(mediaGroup)
          //bot.telegram.sendMediaGroup(chatId, mediaGroup)

          //content.forEach(element =>  bot.telegram.sendMessage(chatId, element));
          //     }ctx.replyWithMediaGroup([
          // {
          //   media: 'AgADBAADXME4GxQXZAc6zcjjVhXkE9FAuxkABAIQ3xv265UJKGYEAAEC',
          //   caption: 'From file_id',
          //   type: 'photo'
          // },

          console.log(msg)
        }
      }
    }
  }
  async handleUpdate(req: FastifyRequest, reply: FastifyReply) {
    const body: any = req.body
    if (this.bot) {
      this.bot.handleUpdate(body)
    }
  }
}
