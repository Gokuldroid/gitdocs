const fs = require('fs-extra')
const loadSyntax = require('./syntax')
const getManifest = require('./manifest')
const getCompiler = require('./compiler')

module.exports = async (env, config, bar) => {
  await fs.emptyDir(config.temp)
  await fs.emptyDir(config.output)
  await loadSyntax(config)

  const manifest = await getManifest(env, config)

  // this gets passed to the theme app
  const props = {
    config,
    manifest,
  }

  const compiler = await getCompiler(env, props)
  bar && compiler.onProgress(i => bar.tick(i))

  return { props, compiler }
}
