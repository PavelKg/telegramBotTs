import {Context, Scenes, Markup, Composer} from 'telegraf'
import {botContext} from '../../types/telebot'
import {getMainKeyboard, getBackKeyboard} from '../../utils/keyboards'

const {enter, leave} = Scenes.Stage
const sceneName = 'notifications'

const noteDef = `No notifications
We'll let you know when deadlines are approaching, or there is a course update`

const noteMess = `
<b>01.03.2021</>
<i>✌ Well done on completing the Essential Training Course!</i>

<b>01.10.2020</b>
<i>🍾 Congratulations!
You've completed all the training modules in [[TrainingCampaignDescription]].</i>

<b>01.09.2020</b>
<i>📝 We notice you have not yet completed your Essential Training.</i>`

const iscene = new Scenes.BaseScene<botContext>(sceneName)

iscene.enter((ctx) => {
  const backKeyboard = getBackKeyboard()
  console.log(enter)
  ctx.replyWithHTML(noteMess, backKeyboard.backKeyboard)
})
iscene.leave((ctx) => {
  const menuKeyboard = getMainKeyboard()
  ctx.reply('Main menu', menuKeyboard.menuKeyboard)
})

iscene.command('saveme', leave<botContext>())
iscene.hears(/back/, leave<botContext>())

export default iscene
