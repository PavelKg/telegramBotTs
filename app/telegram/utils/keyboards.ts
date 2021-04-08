import {Markup} from 'telegraf'
import {ReplyKeyboardMarkup} from 'typegram'

import {keyboard} from '../../../node_modules/telegraf/src/markup'
//./core/types/typegram
///node_modules/telegraf/typings/index

// interface keyboard {
//   markup: ReplyKeyboardMarkup
//   keys: Array<string>
// }
//import {botContext} from './types/telebot'
/**
 * Returns back keyboard and its buttons
 * @param ctx - telegram context
 */
function makeKeyboard(buttons: Array<string>): any {
  return Markup.keyboard(buttons)
}

export const keyBack = '◀️ back'

const getBackKeyboard = (/*ctx: botContext*/) => {
  
  let backKeyboard = makeKeyboard([keyBack])
  backKeyboard = backKeyboard.resize().oneTime()

  return {
    backKeyboard,
    keyBack
  }
}
/**
 *
 *Returns main keyboard and its buttons
 * @param {*} ctx
 * @return {*}
 */

const getMainKeyboard = (/*ctx*/) => {
  const coursesKeyboard = '✍️ courses'
  const profileKeyboard = '⚙️ profile'
  const accomplishmentsKeyboard = '🚀 accomplishments'
  const notificationsKeyboard = '🔔 notifications'
  const menuKeyboard = makeKeyboard([
    coursesKeyboard,
    profileKeyboard,
    accomplishmentsKeyboard,
    notificationsKeyboard
  ])
    .oneTime()
    .resize()

  return {
    menuKeyboard,
    menuItems: [
      coursesKeyboard,
      profileKeyboard,
      accomplishmentsKeyboard,
      notificationsKeyboard
    ]
  }
}

export {getMainKeyboard, getBackKeyboard}
