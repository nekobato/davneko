Vue = require('vue')
request = require('superagent')
_ = require('lodash')

# Vue.config.debug = true

window.DN = new Vue

  el: "#davneko"

  components:
    header: require './header'
    filer: require './filer'
    audiobox: require './audiobox'
    appempty:
      template: '<p>hoge</p>'

  data:
    app_component: 'audiobox'

  filters: {}

  methods: {}

  ready: () ->
