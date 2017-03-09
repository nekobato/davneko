debug = require('debug')('routes')
passport = require('passport')
LocalStrategy = require('passport-local').Strategy
config = require('./config')
_ = require('lodash')

passport.use new LocalStrategy (username, password, done) ->
  debug "LocalStrategy #{username} #{password}"
  user = _.find(config.users, { username: username, password: password })
  if user
    return done(null, user)
  else
    return done(null, false, { message: 'Invalid password or username' })

passport.serializeUser (user, done) ->
  debug "serializeUser", user
  done(null, user.id)

passport.deserializeUser (id, done) ->
  debug "deserializeUser: #{id}"
  user = _.find(config.users, { id: id })
  if user
    done(null, user)
  else
    new Error('User ' + id + ' does not exist')

module.exports = passport.authenticate 'local', {
  successRedirect: '/'
  failureRedirect: '/failure'
}
