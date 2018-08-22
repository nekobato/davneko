const debug = require('debug')('application')
const bodyParser = require('body-parser')
const express = require('express')
const passport = require('passport')
const path = require('path')
const app = express()

const config = require('./config')
require('./auth')

const DEV = app.get('env') === 'development'

app.use(require('express-session')({
  secret: config.secret,
  resave: true,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

// app set
// app.set 'views', path.join(__dirname, '../views')
app.set('view engine', 'pug')
if (DEV) {
  app.set('view options', { pretty: true })
  app.use(require('cors')())
}

// app use
// app.use(require('serve-favicon')('./public/favicon.ico')
app.use(require('morgan')('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('cookie-parser')())
app.get('/auth', (req, res) => res.render('./auth'))
app.post('/auth', passport.authenticate('local'), (req, res) => {
  res.send({ login: req.isAuthenticated() })
})
app.use('/api', require('./apis'))
app.use(express.static(path.join(__dirname, '../dist')))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    message: err.message,
    error: DEV ? err : {}
  })
})

module.exports = app
