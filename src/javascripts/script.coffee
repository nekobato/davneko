Vue = require('vue')

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

  methods: {}

  ready: () ->
    @$on 'filer-dispatch-file', (file) ->
      console.log 'filer-dispatch-file'
      @$broadcast 'set-file', file
