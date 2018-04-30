import test from 'ava'
import { run } from './helpers'

test('shows help menu with command', async t => {
  const res = await run('help')
  t.regex(res.stdout, /usage/)
})

test('shows help submenu with command', async t => {
  const res = await run('help start')
  t.regex(res.stdout, /gitdocs start/)
})

test('shows help submenu with flag', async t => {
  const res = await run('start -h')
  t.regex(res.stdout, /gitdocs start/)
})
