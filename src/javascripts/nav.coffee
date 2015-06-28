request = require('superagent')
_ = require('lodash')


root_dir = [{
  name: 'Music'
  path: 'Music'
  type: 'component'
  icon: 'mdi-av-my-library-music'
  component_name: 'filer_music'
}, {
  name: 'Book'
  path: 'Books'
  type: 'component'
  icon: 'mdi-av-my-library-books'
  component_name: 'filer_book'
}]

module.exports =

  template: '#davneko_nav'

  data: () ->
    depth: []
    current:
      name: 'Root'
    filelist: root_dir

  methods:

    toggleNav: (e) ->
      e.preventDefault()
      nav = document.querySelector '.side-nav'
      nav.classList.toggle 'show-mobile'

    onSelectItemName: (file) ->

      console.log 'onselectitemName', file

      file = JSON.parse JSON.stringify file

      if file.type is 'directory' or file.type is 'component'
        @$emit 'filer-get-dir',   file
        @$emit 'filer-set-depth', file

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

    onSelectDepth: (file) ->
      @$emit 'filer-get-dir',   file
      @$emit 'filer-set-depth', file


    getDir: (file) ->
      console.log 'getdir', file

      request.get '/api/path'
      .query
        path: file.path
      .set 'Accept', 'application/json'
      .end (err, res) =>
        @$emit 'filer-set-dir', JSON.parse res.text


    setDir: (files) ->
      console.log 'setdir', files

      @filelist = files

    setDepth: (file) ->
      @depth = file.path.split '/'

      console.log 'setdepth', @depth

  ready: () ->

    @$on 'filer-get-dir', @getDir
    @$on 'filer-set-dir', @setDir

    @$on 'filer-set-depth', @setDepth
