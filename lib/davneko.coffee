'use strict'

fs = require('fs')
path = require('path')

exports = module.exports = class Davneko

  constructor: (options) ->

    throw new Error '"dir" option required' if not options.dir
   
    @ignores = options.ignores || []
    @dir = options.dir


  get: (name, callback) ->
    ###
    for dir in name.split path.sep
      console.log dir
      for i in @ignores
        re = new RegExp i
        return callback null if re.test name
    ###
    aname = path.resolve path.join @dir, name

    return callback null if not fs.existsSync aname

    stats = fs.statSync aname

    if stats.isDirectory()
      files = []
      filepaths = fs.readdirSync aname
      for filepath in filepaths
        files.push
          name: path.join name, filepath
      return callback files
    if stats.isFile()
      return callback name
    else
      return callback null


  find: (name) ->
    return json
