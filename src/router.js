import Vue from 'vue'
import Router from 'vue-router'

import Auth from './components/Auth'
import App from './components/Davneko'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'auth',
      component: Auth
    },
    {
      path: '/app',
      name: 'app',
      component: App
    }
  ]
})
