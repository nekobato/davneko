request = require('superagent')

module.exports =

  template: '#davneko_nav'

  data: ->
    depth: []
    filelist: []
    reaction:
      loadingDir: false

  filters:
    file2IconName: (file) ->
      if /\.(ogg|wav|mp3|aac|m4a)$/.test file.name
        return "fa fa-music"
      if file.type is "directory"
        return "fa fa-folder"

  events:
    'filer-set-dir': "setDir"
    'filer-get-dir': "getDir"
    'filer-add-depth': "addDepth"
    'depth:updated': "saveDepth"

  methods:

    toggleNav: ->
      @$els.nav.classList.toggle 'show-mobile'

    onSelectItem: (file) ->
      if file.type is 'directory'
        @$set 'depth[depth.length-1].scroll', @$els.filelistBox.scrollTop
        @$emit 'filer-get-dir', file
      else if file.type is 'file'
        @$dispatch 'dispatch-files', [file]

    onSelectDepth: (file, depth) ->
      @$data.depth.length = depth
      @$emit 'filer-get-dir', file

    getDir: (file) ->
      @$data.reaction.loadingDir = true
      request.get '/api/path'
      .query
        path: file.path
      .set 'Accept', 'application/json'
      .end (err, res) =>
        throw err if err
        @$emit 'filer-set-dir', JSON.parse res.text
        @addDepth file
        @$emit 'depth:updated'
        @$data.reaction.loadingDir = false
        @$nextTick ->
          @$els.filelistBox.scrollTop = @$data.depth[@$data.depth.length-1].scroll || 0

    setDir: (files) ->
      @$set 'filelist', files

    addDepth: (file) ->
      @$data.depth.push file

    addFilesAll: ->
      @$dispatch 'dispatch-files', @$data.filelist

    saveDepth: ->
      localStorage.setItem 'depth', JSON.stringify(@$data.depth)

    startOrResurrect: ->
      if localStorage.depth
        depth = JSON.parse(localStorage.depth)
        currentDir = depth.pop()
        @$data.depth = depth
        @getDir currentDir
      else
        @getDir { path: '/', name: '/' }

  ready: () ->
    @startOrResurrect()
