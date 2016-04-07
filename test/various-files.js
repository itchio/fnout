
import test from 'zopf'
import assert from 'assert'

import sniff from '../src'

test('sniff', t => {
  const types = [
    ['broken-symlink', null],
    ['empty', null],
    ['txt', null],
    ['elf', {ext: '', mime: 'application/octet-stream', linuxExecutable: true}],
    ['mach-o', {ext: '', mime: 'application/octet-stream', macExecutable: true}],
    ['mach-o-bis', {ext: '', mime: 'application/octet-stream', macExecutable: true}],
    ['mach-o-universal', {ext: '', mime: 'application/octet-stream', macExecutable: true}],
    ['sh', {ext: 'sh', mime: 'application/x-sh', macExecutable: true, linuxExecutable: true}],
    ['tar', {ext: 'tar', mime: 'application/x-tar'}],
    ['fallback.tar', {ext: 'tar', mime: null}],
    ['dmg', {ext: 'dmg', mime: 'application/x-apple-diskimage'}],
    ['bz2.dmg', {ext: 'dmg', mime: 'application/x-apple-diskimage'}],
    ['gz.dmg', {ext: 'dmg', mime: 'application/x-apple-diskimage'}],
    ['fallback.jar', {ext: 'jar', mime: 'application/java-archive', linuxExecutable: true, macExecutable: true}],
    ['bz2', {ext: 'bz2', mime: 'application/x-bzip2'}],
    ['gz', {ext: 'gz', mime: 'application/gzip'}]
  ]

  types.forEach((pair) => {
    const [file, expected] = pair
    t.case(file, async t => {
      const filePath = `${__dirname}/fixtures/${file}`
      const res = await sniff.path(filePath)
      assert.deepEqual(res, expected)
    })
  })
})
