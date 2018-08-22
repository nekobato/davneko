const debug = require('debug')('auth')
const passport = require('passport')
const { Strategy } = require('passport-local')
const config = require('./config')
const _ = require('lodash')

passport.use(new Strategy(function (username, password, done) {
  debug(`LocalStrategy ${username} ${password}`)
  const user = _.find(config.users, {
    username: username,
    password: password
  })
  if (user) {
    return done(null, user)
  } else {
    return done(null, false, {
      message: 'Invalid password or username'
    })
  }
}))

passport.serializeUser(function (user, done) {
  debug("serializeUser", user)
  return done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  debug("deserializeUser: " + id)
  const user = _.find(config.users, {
    id: id
  })
  if (user) {
    return done(null, user)
  } else {
    return new Error('User ' + id + ' does not exist')
  }
})
