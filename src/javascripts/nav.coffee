request = require('superagent')

module.exports =

  template: '#davneko_nav'

  replace: false

  data: ->
    depth: []
    current: {}
    filelist: []

  filters:
    file2IconName: (file) ->
      if /\.(ogg|wav|mp3|aac|m4a)$/.test file.name
        return "fa fa-music"
      if file.type is "directory"
        return "fa fa-folder"

  events:
    'filer-set-dir': "setDir"
    'filer-get-dir': "getDir"
    'filer-get-item': "onSelectItemName"
    'filer-add-depth': "addDepth"

  methods:

    toggleNav: (e) ->
      e.preventDefault()
      nav = document.querySelector '.side-nav'
      nav.classList.toggle 'show-mobile'

    onSelectItem: (file) ->

      if file.type is 'directory'
        @$emit 'filer-get-dir', file
      else if file.type is 'file'
        @$dispatch 'dispatch-files', [file]

    onSelectDepth: (file, depth) ->

      @$data.depth.length = depth
      @$emit 'filer-get-dir', file

    getDir: (file) ->
      request.get '/api/path'
      .query
        path: file.path
      .set 'Accept', 'application/json'
      .end (err, res) =>
        throw err if err
        @$emit 'filer-set-dir', JSON.parse res.text
        @addDepth file

    setDir: (files) ->
      @$set 'filelist', files

    addDepth: (file) ->
      @$data.depth.push file

    addFilesAll: () ->
      @$dispatch 'dispatch-files', @$data.filelist

  ready: () ->

    @getDir { path: '/', name: '/' }
