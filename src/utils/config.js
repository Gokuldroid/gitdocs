const fs = require('fs-extra')
const syspath = require('path')
const { tempDir } = require('./temp')
const { addToNodePath } = require('./system')
// const deepmerge = require('deepmerge')

const FILENAMES = [
  '.gitdocs.json',
  '.gitdocs.js',
]

const JSON_FORMAT = {
  spaces: 2,
}

const DEFAULT_CONFIG = {
  name: 'GitDocs',
  // logo: '',
  root: '.',
  output: '.gitdocs_build',
  temp: tempDir(),
  static: '_static',
  host: 'localhost',
  port: 8000,
  languages: ['bash', 'json'],
  theme: 'default',
  theme_custom: {
    syntaxTheme: 'prism',
    syntaxLineNumbers: false,
  },
  // sidebar: [],
  sidebar_links: [],
  header_links: [],
  sources: [],
  order: {},
}

function getConfigFilename () {
  return FILENAMES.find(fs.pathExistsSync)
}

function readConfigFile (file) {
  const ext = syspath.extname(file)

  return ext === '.js'
    ? require(syspath.resolve(file))
    : fs.readJson(file)
}

function getExternalConfigFilename (dir, name) {
  return FILENAMES
    .map(f => `${dir}/${name}/${f}`)
    .find(fs.pathExistsSync)
}

function getExternalConfig (dir, name) {
  const file = getExternalConfigFilename(dir, name)
  return file ? readConfigFile(file) : {}
}

async function getConfig (customFile) {
  // prioritize custom config file if passed,
  // but still fallback to default files
  if (customFile) {
    FILENAMES.unshift(customFile)

    if (!await fs.pathExists(customFile)) {
      throw new Error(`Config file was not found: ${customFile}`)
    }
  }

  const configFile = getConfigFilename()
  const userConfig = configFile ? await readConfigFile(configFile) : {}

  // return deepmerge(DEFAULT_CONFIG, userConfig)
  const masterConfig = {
    ...DEFAULT_CONFIG,
    ...userConfig,
  }

  masterConfig.temp = syspath.resolve(masterConfig.temp)
  await fs.emptyDir(masterConfig.temp)
  addToNodePath(masterConfig.temp)

  masterConfig.static = syspath.resolve(
    masterConfig.root,
    masterConfig.static,
  )

  return masterConfig
}

module.exports = {
  getConfig,
  getExternalConfig
}

module.exports.createConfig = async (name, root) => {
  if (getConfigFilename()) {
    throw new Error('GitDocs is already initialized in this folder!')
  }

  const newConfig = {
    name,
    root,
  }

  const configFile = FILENAMES[0]
  await fs.outputJson(configFile, newConfig, JSON_FORMAT)

  return configFile
}
