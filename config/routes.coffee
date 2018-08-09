debug = require('debug')('routes')
express = require('express')
mongoose = require('mongoose')
path = require('path')
fs = require('fs')
config = require('./config')
app = express()
router = express.Router()
readirRecursive = require('fs-readdir-recursive')

router.get "/api/logout", (req, res, next) ->
  if req.isAuthenticated()
    req.logout()
  res.send { login: false }

router.get "/api/status", (req, res, next) ->
  if req.isAuthenticated()
    res.send { login: true }
  else
    res.send { login: false }

router.get "/api/path", (req, res, next) ->
  return res.status(403).send('not authenticated') if not req.isAuthenticated()

  reqpath = path.normalize(req.query.path || '/')
  return res.status(500).send('bad query') if /^\.\./.test reqpath

  targetpath = path.join config.basepath, reqpath
  return res.status(500).send("not exists: #{targetpath}") if not fs.existsSync(targetpath)

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


router.get "/api/pathr", (req, res, next) ->

  res.status(403).end() if not req.isAuthenticated()

  reqpath = path.normalize(req.query.path || '/')
  res.status(500).end('Bad query') if /^\.\./.test reqpath

  targetpath = path.join config.basepath, reqpath
  res.status(500).end("Not exists: #{targetpath}") if not fs.existsSync(targetpath)

  if fs.statSync(targetpath).isDirectory()
    files = []
    for p in readirRecursive(targetpath) when not /^\..*/.test(p)
      stats = fs.statSync path.join(targetpath, p)
      files.push
        name: path.basename(p)
        path: path.join(reqpath, p)
        type: if stats.isDirectory() then 'directory' else 'file'
      if files.length > 200
        return res.status(500).end("Target Directory include over 200 files. Response is aborted.")
    res.type('json').send(files)
  else
    res.status(500).end('Path must be a directory.')

module.exports = router
