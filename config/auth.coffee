debug = require('debug')('auth')
passport = require('passport')
LocalStrategy = require('passport-local').Strategy

config = require('./config')
module.exports = (app) ->

  passport.serializeUser (user, done) ->
    console.log "serializeUser", user
    done(null, user.id)

  passport.deserializeUser (id, done) ->
    debug "deserializeUser: #{id}"
    findById id, (err, user) ->
      done(err, user)

  passport.use new LocalStrategy (username, password, done) ->
      debug "LocalStrategy #{username} #{password}"
      process.nextTick () ->

        debug '### passport find user  ###'

        findByUsername username, (err, user) ->
          debug "#{err} #{user}"
          return done(err) if err
          return done(null, false, { message: "Unknown user: #{username}" }) if not user
          return done(null, false, { message: 'Invalid password' }) if password is not user.password
          return done(null, user)


  app.all "/auth", (req, res, next) ->

    if req.isAuthenticated()
      req.logout()
      res.redirect '/'
      return

    passport.authenticate 'local',
      failureRedirect: '/failure'
      successRedirect: '/'
    .apply this, arguments

findById = (id, fn) ->
  debug "findByid: #{id}"
  idx = id - 1;
  if config.users[idx]
    fn(null, config.users[idx])
  else
    fn(new Error('User ' + id + ' does not exist'))

findByUsername = (username, fn) ->
  debug "findByUsername: #{username}"
  for user in config.users
    debug "user is #{user} ?"
    if username is user.username
      return fn(null, user)
  return fn(null, null)
