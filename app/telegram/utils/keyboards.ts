// @ts-nocheck
import Markup from 'telegraf'


//import {botContext} from './types/telebot'
/**
 * Returns back keyboard and its buttons
 * @param ctx - telegram context
 */
//@ts-ignore 
const getBackKeyboard = (/*ctx: botContext*/) => {
  const backKeyboardBack = 'back'
  let backKeyboard = Markup.keyboard([backKeyboardBack])

  backKeyboard = backKeyboard.resize().oneTime()

  return {
    backKeyboard,
    backKeyboardBack
  }
}
/**
 *
 *Returns main keyboard and its buttons
 * @param {*} ctx
 * @return {*}
 */
// @ts-ignore  
const getMainKeyboard = (/*ctx*/) => {
  const coursesKeyboard = 'courses'
  const profileKeyboard = 'profile'
  const accomplishmentsKeyboard = 'accomplishments'
  const notificationsKeyboard = 'notifications'
  const menuKeyboard = Markup.keyboard([
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
