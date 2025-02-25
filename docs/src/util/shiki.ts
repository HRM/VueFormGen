import { createHighlighterCoreSync } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import langVue from '@shikijs/langs/vue'
import langTs from '@shikijs/langs/typescript'
import themeOneDarkPro from '@shikijs/themes/one-dark-pro'

export const highlighter = createHighlighterCoreSync({
  themes: [
    themeOneDarkPro
  ],
  langs: [
    langTs,
    langVue
  ],
  engine: createJavaScriptRegexEngine({
    target: 'ES2018'
  })
})