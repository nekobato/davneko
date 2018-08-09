import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import materialize from 'materialize-css/bin/materialize.css'
import materialIcons from 'material-design-icons/iconfont/material-icons.css'
import globalStyle from './stylesheets/global.styl'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
