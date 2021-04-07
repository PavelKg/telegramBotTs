import {Scenes} from 'telegraf'
import {botContext} from '../../types/telebot'
import {getBackKeyboard, getMainKeyboard} from '../../utils/keyboards'

const {enter, leave} = Scenes.Stage

const coursesScene = new Scenes.BaseScene<botContext>('courses')

coursesScene.enter((ctx) => {
  const backKeyboard = getBackKeyboard()
  ctx.reply('Back', backKeyboard.backKeyboard)
})
coursesScene.leave((ctx) => {
  const menuKeyboard = getMainKeyboard()
  ctx.reply('Main menu', menuKeyboard.menuKeyboard)
})

coursesScene.command('saveme', leave<botContext>())
coursesScene.hears('back', leave<botContext>())
//coursesScene.hears('hi', enter<botContext>('start'))
//coursesScene.on('text', (ctx) => {})

export default coursesScene

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
