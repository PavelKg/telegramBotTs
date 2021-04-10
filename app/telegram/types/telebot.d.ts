import {Context, Scenes, Markup, Composer} from 'telegraf'

type BaseBotContext = Context & Scenes.SceneContext
interface botContext extends BaseBotContext {
  myProp?: string
  myOtherProp?: number
}

export {botContext}
