Vue = require('vue')

require('materialize-css/bin/materialize.css')
require('./style.styl')

new Vue

  el: "#davneko"

  replace: false

  components:
    filer: require './nav'
    audiobox: require './audiobox'
    appempty:
      template: '<p>hoge</p>'

  data:
    app_component: 'audiobox'

  events:
    'dispatch-files': (files) ->
      @$broadcast 'set-files', files

  methods: {}

  ready: () ->
    @$on 'dispatch-file', (file) ->
      @$broadcast 'set-file', file
