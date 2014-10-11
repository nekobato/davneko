# _ = require('lodash')
path = require('path')
assert = require('assert')

pkg = require path.resolve 'package'

describe '# davneko', ->

  it 'readfile', () ->

    Davneko = require path.resolve 'lib/davneko'
    dav = new Davneko { dir: '../', ignores: ['^\..+'] }

    dav.get 'davneko/README.md', (name) ->
      console.info name

  it 'readdir', () ->

    Davneko = require path.resolve 'lib/davneko'
    dav = new Davneko { dir: '../', ignores: ['^\..+'] }

    dav.get 'davneko', (files) ->
      console.info files
