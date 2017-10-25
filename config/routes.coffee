debug = require('debug')('routes')
express = require('express')
mongoose = require('mongoose')
audioDuration = require('../lib/audio-duration')
path = require('path')
fs = require('fs')
config = require('./config')
app = express()
router = express.Router()
readirRecursive = require('fs-readdir-recursive')

router.get "/", (req, res, next) ->
  if req.isAuthenticated()
    res.render "explore"
  else
    res.render "auth"
  return

router.get "/failure", (req, res, next) ->
  res.render "auth"
  return

router.get "/logout", (req, res, next) ->
  if req.isAuthenticated()
    console.log "### logout"
    req.logout()
    res.redirect '/'
  else
    res.redirect '/'


router.get "/api/path", (req, res, next) ->

  console.log 'path:', req.query.path

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
        duration: if /\.(ogg|wav|mp3|mp4|aac|m4a)$/.test(p) then audioDuration.getAudioDuration(path.join(targetpath, p)) else 0
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
        'x-sent': true,
        'Cache-Control': ['private', 'no-store', 'no-cache', 'must-revalidate'].join(',')
    }, (err) ->
      res.status(err.status).end() if err


router.get "/api/pathr", (req, res, next) ->

  res.status(403).end() if not req.isAuthenticated()

  reqpath = path.normalize(req.query.path || '/')
  res.status(500).end('Bad query') if /^\.\./.test reqpath

  targetpath = path.join config.basepath, reqpath
  res.status(500).end("Not exists: #{targetpath}") if not fs.existsSync(targetpath)

  if fs.statSync(targetpath).isDirectory()
    recursiveFiles = readirRecursive(targetpath)

    if recursiveFiles.length > 300
      res.status(200).type('json').end({})

    files = []
    for p in recursiveFiles when not /^\..*/.test(p)
      stats = fs.statSync path.join(targetpath, p)
      files.push
        name: path.basename(p)
        path: path.join(reqpath, p)
        type: if stats.isDirectory() then 'directory' else 'file'
        duration: if /\.(ogg|wav|mp3|mp4|aac|m4a)$/.test(p) then audioDuration.getAudioDuration(path.join(targetpath, p)) else 0
    res.type('json').send(files)
  else
    res.status(500).end('Path must be a directory.')

module.exports = router
