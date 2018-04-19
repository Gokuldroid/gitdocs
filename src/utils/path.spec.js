import test from 'ava'
import * as path from './path'

test('routify', t => {
  t.is(path.routify('foo/bar'), '/foo/bar/')
  t.is(path.routify('/foo/bar'), '/foo/bar/')
  t.is(path.routify('/foo/bar/index'), '/foo/bar/')
  t.is(path.routify('/foo/bar/index.md'), '/foo/bar/')
  t.is(path.routify('/foo/bar/index.html'), '/foo/bar/')
  t.is(path.routify('/foo/bar/baz.md'), '/foo/bar/baz/')
  t.is(path.routify('/foo/bar/'), '/foo/bar/')
  t.is(path.routify('foo'), '/foo/')
  t.is(path.routify('/'), '/')
  t.is(path.routify(''), '/')
})

test('outputify', t => {
  t.is(path.outputify('/foo.md', { ext: 'html' }), '/foo/index.html')
  t.is(path.outputify('/foo.md', { ext: 'js' }), '/foo/index.js')
  t.is(path.outputify('/foo/index.md'), '/foo/')
  t.is(path.outputify('/foo/bar.md', { ext: 'html' }), '/foo/bar/index.html')
  t.is(path.outputify('/foo/bar/index.md', { ext: 'html' }), '/foo/bar/index.html')
  t.is(path.outputify('/foo/bar/index.html', { ext: 'html' }), '/foo/bar/index.html')
  t.is(path.outputify('/foo/bar', { ext: 'html' }), '/foo/bar/index.html')
  t.is(path.outputify('/foo/bar/', { ext: 'html' }), '/foo/bar/index.html')
  t.is(path.outputify('/foo/bar/', { replace: ['/foo', '/baz'] }), '/baz/bar/')
  t.is(path.outputify('foo/bar'), 'foo/bar/')
  t.is(path.outputify('/', { ext: 'html' }), '/index.html')
  t.is(path.outputify('/'), '/')
  t.is(path.outputify('', { ext: 'html' }), '/index.html')
  t.is(path.outputify(''), '/')
})

test('titlify', t => {
  t.is(path.titlify('foo'), 'Foo')
  t.is(path.titlify('foo-bar'), 'Foo Bar')
  t.is(path.titlify('foo-bar.md'), 'Foo Bar')
  t.is(path.titlify('foo/bar/baz-qux.md'), 'Baz Qux')
  t.is(path.titlify('/foo-bar/'), 'Foo Bar')
  t.is(path.titlify('/foo-bar/index'), 'Foo Bar')
  t.is(path.titlify('/foo-bar/index.md'), 'Foo Bar')
  t.is(path.titlify('/foo-bar/baz-qux'), 'Baz Qux')
  t.is(path.titlify('/foo-bar/baz-qux/'), 'Baz Qux')
})
