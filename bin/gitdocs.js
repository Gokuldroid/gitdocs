#!/usr/bin/env node
/* eslint-disable */
const chalk = require('chalk')
const isGlobal = require('is-global')
const path = require('path')
const yargs = require('yargs')

const cwd = process.cwd()

// 3 possible cases:
//    Global install - need to go up and into node modules to find react static
//    Local install - need to go up and directly to react static because we're already in node-modules
//    Local dev - same as global
const reactStatic =
  isGlobal() || !__dirname.includes('/node_modules/')
    ? path.join(__dirname, '/../node_modules/react-static/bin/react-static')
    : path.join(__dirname, '../../react-static/bin/react-static')
const reactStaticWorkDir = path.join(__dirname, '..')

const buildHandler = require('./commands/build')
const initHandler = require('./commands/init')
const serveHandler = require('./commands/serve')

// commands:
// serve (port, version)
// build (version, output)
// init (@config) (create /doc, /docs/public, docs.json, etc)

var argv = yargs
  .version()
  .usage('Usage: gitdocs <command> [options]')
  .command({
    command: 'serve [path]',
    alias: 's',
    desc: chalk.gray('serve'),
    builder: yargs =>
      yargs.options({
        port: {
          alias: 'P',
          default: 3000,
          desc: chalk.gray('Port to use. Only applies if a path is specified.'),
          nargs: 1,
          requiresArg: true,
          type: 'number',
        },
      }),
    handler: argv => {
      serveHandler({
        argv,
        cwd,
        reactStatic,
        reactStaticWorkDir,
      })
    },
  })
  .command({
    command: 'build [output] [doc-version]',
    alias: 'b',
    desc: chalk.gray('build'),
    builder: yargs =>
      yargs.options({
        output: {
          alias: 'o',
          default: 'docs-dist',
          desc: chalk.gray('build.output'),
          nargs: 1,
          requiresArg: true,
          type: 'string',
        },
        'doc-version': {
          alias: 'v',
          default: '',
          desc: chalk.gray('Version to display. Overrides the version in docs.json'),
          nargs: 1,
          requiresArg: false,
          type: 'string',
        },
      }),
    handler: argv => {
      buildHandler({
        argv,
        cwd,
        reactStatic,
        reactStaticWorkDir,
      })
    },
  })
  .command({
    command: 'init',
    alias: 'i',
    desc: chalk.gray('init'),
    handler: async argv => {
      await initHandler(argv, cwd)
    },
  })
  .command({
    command: 'deploy [location]',
    alias: 'd',
    desc: chalk.gray('deploy'),
    builder: yargs =>
      yargs.options({
        force: {
          alias: 'f',
          default: false,
          desc: chalk.gray('Force overriding deploy directory'),
          nargs: 0,
          requiresArg: false,
          type: Boolean,
        },
        location: {
          alias: 'l',
          default: 'gh-pages',
          desc: chalk.gray('deploy.location'),
          nargs: 1,
          requiresArg: true,
          type: 'string',
        },
      }),
    handler: async argv => {
      // Need to build first
      buildHandler({
        argv: { output: 'docs-dist' },
        cwd,
        reactStatic,
        reactStaticWorkDir,
      })

      switch (argv.location) {
        case 'gh-pages':
          const handler = require('./commands/deploy/gh-pages')
          const config = require(path.join(cwd, 'docs', 'docs.json'))
          handler(config, argv.force)
          break
        default:
          console.error(chalk.red(`Unknown deploy location ${argv.location} provided.`))
          process.exit(1)
      }
    },
  })
  .demand(1, 'must provide a valid command')
  .help('h')
  .alias('h', 'help').argv
