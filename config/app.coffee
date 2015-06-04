debug = require('debug')('application')
cookieParser = require("cookie-parser")
bodyParser = require("body-parser")
express = require("express")
favicon = require("serve-favicon")
logger = require("morgan")
passport = require('passport')
path = require("path")
app = express()

pkg = require '../package'
config = require './config'

# optional
# mongoose = require('mongoose')
# mongoose.connect "mongodb://localhost/#{pkg.name}"
# redis = require('redis').createClient()

session = require('express-session')
RedisStore = require('connect-redis')(session)
app.use session
  store: new RedisStore(),
  secret: config.secret
  cookie: { maxAge: 60 * 60 * 24 * 1000 }

app.use passport.initialize()
app.use passport.session()

# app set
app.set "views", './views'
app.set "view engine", "jade"
if app.get("env") is "development"
  app.set 'view options', { pretty: true };

# app use
app.use favicon './public/favicon.ico'
app.use logger "dev"
app.use bodyParser.json()
app.use bodyParser.urlencoded extended: false
app.use cookieParser()
app.use express.static './public'
app.use '/', require './routes'

(require './auth')(app)

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
    res.render "error",
      message: err.message
      error: err
    return


# production error handler
# no stacktraces leaked to user
app.use (err, req, res, next) ->
  res.status err.status or 500
  res.render "error",
    message: err.message
    error: {}
  return

module.exports = app
