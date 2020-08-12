const debug = require("debug")("routes");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const config = require("./config");

passport.use(
  new LocalStrategy(function(username, password, done) {
    debug(`LocalStrategy ${username} ${password}`);
    const user = config.users.find(user => {
      user === { username, password };
    });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Invalid password or username" });
    }
  })
);

passport.serializeUser(function(user, done) {
  debug("serializeUser", user);
  return done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  debug(`deserializeUser: ${id}`);
  const user = config.users.find(user => {
    user.id === id;
  });
  if (user) {
    return done(null, user);
  } else {
    return new Error(`User ${id} does not exist`);
  }
});

module.exports = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
});
