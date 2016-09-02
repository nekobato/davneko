import Vue from 'vue'
import materialize from 'materialize-css/bin/materialize.css'
import materialIcons from 'material-design-icons/iconfont/material-icons.css'
import store from './store'
import App from './App.vue'

new Vue({
  el: '#davneko',
  store,
  components: { App }
})
