import {Context, Scenes, Markup, Composer} from 'telegraf'
import {botContext} from '../../types/telebot'
import {getMainKeyboard} from '../../utils/keyboards'

const {enter} = Scenes.Stage
const menuKeyboard = getMainKeyboard()

const userMenuScene = new Scenes.BaseScene<botContext>('usermenu')
userMenuScene.enter((ctx) => {
  ctx.reply('Main menu', menuKeyboard.menuKeyboard)
})

//userMenuScene.leave((ctx) => ctx.reply('Bye'))
//userMenuScene.hears('courses', enter<botContext>('courses'))
// userMenuScene.hears(
//   menuKeyboard.profileKeyboard,
//   enter<botContext>(menuKeyboard.profileKeyboard)
// )
// userMenuScene.hears(
//   menuKeyboard.accomplishmentsKeyboard,
//   enter<botContext>(menuKeyboard.accomplishmentsKeyboard)
// )
// userMenuScene.hears(
//   menuKeyboard.notificationsKeyboard,
//   enter<botContext>(menuKeyboard.notificationsKeyboard)
// )
export default userMenuScene

// // const {
// //   languageSettingsAction,
// //   languageChangeAction,
// //   accountSummaryAction,
// //   closeAccountSummaryAction
// // } = require('./actions')

// const {getMainKeyboard, getBackKeyboard} = require('../../utils/keyboards')
// const {
//   getMainKeyboard: getSettingsMainKeyboard,
//   sendMessageToBeDeletedLater
// } = require('./helpers')
// const {deleteFromSession} = require('../../utils/session')
// const {leave} = Stage

// settings.enter(async (ctx) => {
//   logger.debug(ctx, 'Enters settings scene')
//   const {backKeyboard} = getBackKeyboard(ctx)

//   deleteFromSession(ctx, 'settingsScene')
//   await sendMessageToBeDeletedLater(
//     ctx,
//     ctx.i18n.t('scenes.settings.what_to_change'),
//     getSettingsMainKeyboard(ctx)
//   )
//   await sendMessageToBeDeletedLater(
//     ctx,
//     ctx.i18n.t('scenes.settings.settings'),
//     backKeyboard
//   )
// })

// settings.leave(async (ctx) => {
//   logger.debug(ctx, 'Leaves settings scene')
//   const {mainKeyboard} = getMainKeyboard(ctx)
//   await ctx.reply(ctx.i18n.t('shared.what_next'), mainKeyboard)
//   deleteFromSession(ctx, 'settingsScene')
// })

// settings.command('saveme', leave())
// settings.hears(match('keyboards.back_keyboard.back'), leave())

// settings.action(/languageSettings/, languageSettingsAction)
// settings.action(/languageChange/, languageChangeAction)
// settings.action(/accountSummary/, accountSummaryAction)
// settings.action(/closeAccountSummary/, closeAccountSummaryAction)
