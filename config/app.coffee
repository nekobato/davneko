debug = require('debug')('application')
bodyParser = require("body-parser")
express = require("express")
path = require("path")
app = express()

pkg = require('../package')
config = require('./config')
passport = require('./auth')


app.use require('express-session')({
  secret: config.secret,
  resave: false,
  saveUninitialized: false
})

app.use passport.initialize()
app.use passport.session()

# app set
# app.set "views", path.join(__dirname, '../views')
app.set "view engine", "pug"
if app.get("env") is "development"
  app.set 'view options', { pretty: true }
  app.use(require('cors')())

# app use
# app.use require("serve-favicon")('./public/favicon.ico')
app.use require("morgan")("dev")
app.use bodyParser.json()
app.use bodyParser.urlencoded extended: true
app.use require("cookie-parser")()
app.post '/auth', passport.authenticate('local'), (req, res) ->
  console.log(req, res)
  if (req.isAuthenticated())
    res.send({ login: true })
  else
    res.send({ login: false })
app.use '/', require './routes'
app.use express.static path.join(__dirname, '../dist')

# catch 404 and forward to error handler
app.use (req, res, next) ->
  err = new Error("Not Found")
  err.status = 404
  next err
  return

# error handlers

# development error handler
# will print stacktrace
if app.get("env") is "development"
  app.use (err, req, res, next) ->
    res.status err.status or 500
    res.send
      message: err.message
      error: err
    return

# production error handler
# no stacktraces leaked to user
app.use (err, req, res, next) ->
  res.status err.status or 500
  res.send
    message: err.message
    error: {}
  return

module.exports = app
