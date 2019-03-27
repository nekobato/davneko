import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './registerServiceWorker';

import materialize from 'materialize-css/bin/materialize.css';
import materialIcons from 'material-design-icons/iconfont/material-icons.css';
import globalStyle from './stylesheets/global.styl';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
