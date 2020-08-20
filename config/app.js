const bodyParser = require("body-parser");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const path = require("path");
const cors = require("cors");
const app = express();

const config = require("./config");

const redisClient = redis.createClient({
  host: "127.0.0.1",
  db: 1,
});

app.use(
  session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({ client: redisClient }),
    cookie: {
      path: "/",
    },
  })
);

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

// app set
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "html");

// app use
// app.use require("serve-favicon")('./public/favicon.ico')
app.use(require("morgan")("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("cookie-parser")());
app.post("/api/auth/login", require("./auth"));
app.use("/", require("./routes"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use((err, req, res) => {
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
      url: req.url,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

module.exports = app;
