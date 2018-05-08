const fs = require('fs-extra')
const renderTemplate = require('./template')
const { concurrentChunks } = require('../utils/promise')

module.exports = async (env, stats, props, onEachItem) => {
  const { files } = props.manifest
  const bundleFiles = stats.entrypoints.main.assets

  await concurrentChunks(2, files.map(item => async () => {
    const rendered = await renderTemplate(env, item, props, bundleFiles)
    await fs.outputFile(item.fileOutput, rendered)

    typeof onEachItem === 'function' &&
      onEachItem(item)
  }))

  return props.config.output
}
