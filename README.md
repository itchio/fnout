# fnout

![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Coverage Status](https://coveralls.io/repos/itchio/fnout/badge.svg?service=github)](https://coveralls.io/github/itchio/fnout)
[![Build Status](https://travis-ci.org/itchio/fnout.svg?branch=master)](https://travis-ci.org/itchio/fnout)

fnout (file snout) lets you find what the contents of files are: in particular,
whether they're executable or not.

## Usage

```javascript
const fnout = require('fnout')

var buf = new Buffer('#!/bin/bash')
fnout(buf).then((res) => {
  // res = {ext: 'sh', mime: 'application/x-sh', linuxExecutable: true, macExecutable: true}
})

fnout.path('path/to/App.dmg').then((res) => {
  // res = {ext: 'dmg', mime: 'application/x-apple-diskimage'}
})
```

`fnout` expects a node.js Buffer and returns a Promise which resolves to an
object of the following shape:

```javascript
{
  ext: '', // typical file extension, might be empty,
  mime: '', // mime-type, might fall back to `application/octet-stream`
  macExecutable: true, // truthy if can be executed on OSX
  linuxExecutable: true, // truthy if can be executed on Linux
}
```

`fnout.path` takes a path and an optional `readHeader` function. The `readHeader`
function should take a path and return the first 262 bytes of the file.

Providing your own readHeader function is especially useful if you're not working
off the disk, but reading from an archive for example.

