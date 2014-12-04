express = require('express')
mongoose = require('mongoose')
path = require('path')
fs = require('fs')
config = require('./config')
app = express()
router = express.Router()

router.get "/", (req, res, next) ->
  dataModel = require path.resolve 'models/dataModel'
  res.render "auth"
  return

router.get "/explore", (req, res, next) ->
  res.render "explore"

router.get "/api/path", (req, res, next) ->

  reqpath = path.normalize(req.param('path') || '/')
  res.status(500).end() if /\.\./.test reqpath

  targetpath = path.join config.basepath, reqpath
  res.status(500).end() if not fs.existsSync(targetpath)

  if fs.statSync(targetpath).isDirectory()
    finder = []
    for p in fs.readdirSync(targetpath) when not /^\..*/.test(p)
      stats = fs.statSync path.join(targetpath, p)
      finder.push {
        name: p
        type: if stats.isDirectory() then 'directory' else 'file'
      }
    res.send JSON.stringify(finder)

  else
    res.sendFile targetpath, {
      dotfiles: 'deny'
      headers:
        'x-timestamp': Date.now()
        'x-sent': true
    }, (err) ->
      res.status(err.status).end() if err




module.exports = router
