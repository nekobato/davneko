request = require('superagent')

module.exports =

  template: '#davneko_nav'

  replace: false

  data: ->
    depth: [
      { name: '/', path: '/' }
    ]
    current: {}
    filelist: {}

  methods:

    toggleNav: (e) ->
      e.preventDefault()
      nav = document.querySelector '.side-nav'
      nav.classList.toggle 'show-mobile'

    onSelectItemName: (file) ->

      console.log 'onselectitemName', file

      file = JSON.parse JSON.stringify file

      if file.type is 'directory'
        @$emit 'filer-get-dir',   file
        @$emit 'filer-add-depth', file

      if file.type is 'file'
        @$dispatch 'filer-dispatch-file', file

      if file.type is 'component'
        @$dispatch 'app-change', file.name

    onSelectItemFileIcon: (e, file) ->
      console.log 'onSelectItemFileIcon'
      @$dispatch 'filer-dispatch-file', file

    onSelectItemAddIcon: (file) ->
      console.log 'onSelectItemAddIcon'
      @$dispatch 'filer-dispatch-file', file

    onSelectDepth: (file, depth) ->

      @$data.depth.length = depth
      @$emit 'filer-get-dir', file

    getDir: (file) ->
      console.log 'getdir', file

      request.get '/api/path'
      .query
        path: file.path
      .set 'Accept', 'application/json'
      .end (err, res) =>
        throw err if err
        @$emit 'filer-set-dir', JSON.parse res.text

    setDir: (files) ->
      console.log 'setdir', files
      @filelist = files

    addDepth: (file) ->
      @depth.push file
      console.log 'setdepth', @depth

  ready: () ->

    @$on 'filer-set-dir', @setDir
    @$on 'filer-get-dir', @getDir
    @$on 'filer-get-item', @onSelectItemName
    @$on 'filer-add-depth', @addDepth

    @getDir { path: '/' }
