import Vue from "vue"
import App from "./App.vue"
import store from "./store"
import "./registerServiceWorker"

import "materialize-css/dist/css/materialize.css"
import "material-design-icons/iconfont/material-icons.css"
import "./stylesheets/base.pcss"

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount("#app")
