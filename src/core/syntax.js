const fs = require('fs-extra')
const syspath = require('path')
const { log } = require('../utils/emit')
const { namespaces } = require('../utils/temp')

const NODE_MODS = syspath.resolve(__dirname, '../../node_modules')
const PATH = `${NODE_MODS}/react-syntax-highlighter`

module.exports = async (config) => {
  const {
    temp,
    languages,
    theme_custom,
  } = config

  const langs = languages
    .filter(lang => fs.pathExistsSync(`${PATH}/languages/prism/${lang}`))
    .map(lang => `{ name: '${lang}', func: require('${PATH}/languages/prism/${lang}').default },`)
    .join('\n')

  const content = `module.exports = {
    theme: require('${PATH}/styles/prism/${theme_custom.syntaxTheme}').default,
    languages: [${langs}]
  }`

  const path = `${temp}/${namespaces.codegen}/loadSyntax.js`
  await fs.outputFile(path, content)
  log('[\u2713] Syntax loaded')
  return path
}
