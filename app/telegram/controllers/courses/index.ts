import {Context, Scenes, Markup, Composer} from 'telegraf'
import {botContext} from '../../types/telebot'
import {getMainKeyboard, getBackKeyboard} from '../../utils/keyboards'
import {courses, Courses} from '../helper'

const {enter, leave} = Scenes.Stage
const sceneName = 'courses'

const iscene = new Scenes.BaseScene<botContext>(sceneName)

iscene.enter((ctx) => {
  const backKeyboard = getBackKeyboard()
  ctx.reply('\u2063', backKeyboard.backKeyboard)
  ctx.reply(
    'Select:',
    Markup.inlineKeyboard([
      Markup.button.callback('Available courses', 'available_courses'),
      Markup.button.callback('Complited courses', 'finished_courses'),
      Markup.button.callback('In Progress', 'current_courses')
    ])
  )
})

iscene.action(/available_courses|finished_courses|current_courses/, (ctx) => {
  const type: string = `${ctx.match[0]}`
  const list = courses[type as keyof Courses].list
  const buttons = list.map((btn: any) => {
    return Markup.button.callback(
      btn.title,
      `courses_title_${btn.title.replace(' ', '_')}`
    )
  })
  ctx.reply('List:', Markup.inlineKeyboard(buttons))
  return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`)
})

iscene.action(/courses_title_/, (ctx) => {
  const match = /courses_title_(.+)/.exec(ctx.match.input) ?? ['', '']
  const title = match[1]

  let selCourses
  Object.keys(courses).forEach((item: any) => {
    const ind = courses[item as keyof Courses].list.findIndex(
      (list: any) => list.title.replace(' ', '_') === title
    )

    if (~ind) {
      selCourses = courses[item as keyof Courses].list[ind].description
    }
  })
  if (selCourses) {
    ctx.replyWithHTML(`<b><i>${title}</i></b>${selCourses}`)
  }
  return ctx.answerCbQuery(title.replace('_', ' '))
})

iscene.leave((ctx) => {
  const menuKeyboard = getMainKeyboard()
  ctx.reply('Main menu', menuKeyboard.menuKeyboard)
})

iscene.command('saveme', leave<botContext>())
iscene.hears(/back/, leave<botContext>())

export default iscene
