_ = require('lodash')
path = require('path')
assert = require('assert')

pkg = require path.resolve 'package'

app = require path.resolve 'config/app'

describe '# models', ->

  it 'model 1', () ->

    model = require path.resolve 'models/dataModel'

