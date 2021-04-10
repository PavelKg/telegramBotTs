import {Context, Scenes, Markup, Composer} from 'telegraf'
import {botContext} from '../../types/telebot'
import {getMainKeyboard, getBackKeyboard} from '../../utils/keyboards'
import {courses, Courses} from '../helper'

const {enter, leave} = Scenes.Stage
const sceneName = 'accomplishments'

const iscene = new Scenes.BaseScene<botContext>(sceneName)

iscene.enter(async (ctx) => {
  const backKeyboard = getBackKeyboard()
  const complited = courses.finished_courses.list.map((item) => {
    return Markup.button.callback(
      `✅ ${item.title}: Grade Achieved: 100%`,
      `finished_courses_${item.title}`
    )
  })

  const in_progress = courses.current_courses.list.map((item) => {
    return Markup.button.callback(
      `🔄 ${item.title}: Grade Achieved: ${Math.round(Math.random() * 80)}%`,
      `current_courses_${item.title}`
    )
  })

  await ctx.replyWithHTML(
    `Complited:`,
    Markup.inlineKeyboard(complited, {columns: 1})
  )
  await ctx.replyWithHTML(
    `In progress:`,
    Markup.inlineKeyboard(in_progress, {columns: 1})
  )

  ctx.reply('\u2063', backKeyboard.backKeyboard)
})

iscene.action(/finished_courses_|current_courses_/, async (ctx) => {
  const selCourses = ctx.match[0].replace(/_$/, '')
  const courses_list = courses[selCourses as keyof Courses].list
  const reg = new RegExp(`${ctx.match[0]}(.*)`)
  const coursesName = reg.exec(ctx.match.input) ?? ['', '']
  const ct = courses_list.find((item) => item.title === coursesName[1])
  let textMess = '\u2063'
  if (ct && ct.sections) {
    ct.sections.forEach((sec) => {
      textMess += `
<b>${sec.name}</b>

`
      sec.modules?.forEach((mod) => {
        textMess += `<b>${mod.title}</b>: ${mod.value} | ${mod.rate}%
`
      })
    })
  }
  console.log(textMess)
  //const sections= courses_list.find(item=> item.title)

  await ctx.replyWithHTML(textMess)

  return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`)
})

iscene.leave((ctx) => {
  const menuKeyboard = getMainKeyboard()
  ctx.reply('Main menu', menuKeyboard.menuKeyboard)
})

iscene.command('saveme', leave<botContext>())
iscene.hears(/back/, leave<botContext>())

export default iscene
