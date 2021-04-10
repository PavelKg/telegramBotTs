import {Scenes, Markup} from 'telegraf'
import {botContext} from '../../types/telebot'

const {enter, leave} = Scenes.Stage

const startScene = new Scenes.BaseScene<botContext>('start')

startScene.enter((ctx) =>
  ctx.reply('Hello!', Markup.keyboard(['menu']).oneTime().resize())
)
startScene.command('saveme', leave<botContext>())
//startScene.leave((ctx) => ctx.reply('Bye'))
startScene.hears('menu', enter<botContext>('usermenu'))
// startScene.on('text', (ctx) => {
//   console.log('start')
//   //ctx.replyWithMarkdown('Send `hi`')
// })

export default startScene
