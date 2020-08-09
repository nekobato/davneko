const bodyParser = require("body-parser")
const express = require("express")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const path = require("path")
const cors = require("cors")
const app = express()

const config = require("./config")

app.use(
  session({
    secret: config.secret,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      url: "mongodb://root@localhost/davneko_session",
    }),
    cookie: {
      httpOnly: false,
    },
  })
)

app.use(cors())

app.use(passport.initialize())
app.use(passport.session())

// app set
app.set("views", path.join(__dirname, "../views"))
app.set("view engine", "html")
if (app.get("env") === "development") {
  app.set("view options", { pretty: true })
}

// app use
// app.use require("serve-favicon")('./public/favicon.ico')
app.use(require("morgan")("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require("cookie-parser")())
app.use("/", require("./routes"))
app.use(express.static(path.join(__dirname, "../dist")))
app.post("/auth", require("./auth"))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found")
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use((err, req, res) => {
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  })
})

module.exports = app
