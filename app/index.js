#!/usr/bin/env node

require('coffee-script/register')
const debug = require('debug')('express-template')
const app = require('./app')

app.set('port', process.env.PORT || 3000)

const server = app.listen(app.get('port'), function () {
  debug('Express server listening on port ' + server.address().port)
})
