debug = require('debug')('routes')
express = require('express')
mongoose = require('mongoose')
path = require('path')
fs = require('fs')
config = require('./config')
app = express()
router = express.Router()

router.get "/", (req, res, next) ->
  if req.isAuthenticated()
    res.render "explore"
  else
    res.render "auth"
  return

router.get "/failure", (req, res, next) ->
  res.render "auth"
  return

router.get "/api/path", (req, res, next) ->

  console.log 'path:', req.query.path

  res.status(403).end() if not req.isAuthenticated()

  reqpath = path.normalize(req.query.path || '/')
  res.status(500).end('bad query') if /^\.\./.test reqpath

  targetpath = path.join config.basepath, reqpath
  res.status(500).end("not exists: #{targetpath}") if not fs.existsSync(targetpath)

  if fs.statSync(targetpath).isDirectory()
    finder = []
    for p in fs.readdirSync(targetpath) when not /^\..*/.test(p)
      stats = fs.statSync path.join(targetpath, p)
      finder.push
        name: p
        path: path.join(reqpath, p)
        type: if stats.isDirectory() then 'directory' else 'file'
    res
    .type 'json'
    .send finder

  if req.query.download
    res.download targetpath

  else
    res.sendFile targetpath, {
      dotfiles: 'deny'
      headers:
        'x-timestamp': Date.now()
        'x-sent': true
    }, (err) ->
      res.status(err.status).end() if err

module.exports = router
