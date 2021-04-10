// @ts-nocheck

import {Context, Scenes, Markup, Composer} from 'telegraf'
import {botContext} from '../../types/telebot'
import {getMainKeyboard, getBackKeyboard} from '../../utils/keyboards'

const {enter, leave} = Scenes.Stage
const sceneName = 'profile'

const iscene = new Scenes.BaseScene<botContext>(sceneName)

iscene.enter((ctx) => {
  const backKeyboard = getBackKeyboard()
  const {
    first_name,
    username,
    language_code,
    role = 'Students',
    email = 'bestStudent@gmail.com'
  } = ctx.update.message.from

  const profile = `First name:  <b><i>${first_name}</i></b>
Username:  <b><i>${username}</i></b>
Language:  <b><i>${language_code}</i></b>
Role:  <b><i>${role}</i></b>
Email:  <b><i>${email}</i></b>`
  ctx.replyWithHTML(profile, backKeyboard.backKeyboard)
})
iscene.leave((ctx) => {
  const menuKeyboard = getMainKeyboard()
  ctx.reply('Main menu', menuKeyboard.menuKeyboard)
})

iscene.command('saveme', leave<botContext>())
iscene.hears(/back/, leave<botContext>())

export default iscene
