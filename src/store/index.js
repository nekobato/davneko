import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import filelist from './modules/filelist'
import playlist from './modules/playlist'
import depth from './modules/depth'
import player from './modules/player'
import uiStatus from './modules/uiStatus'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

Vue.config.debug = debug

export default new Vuex.Store({
  modules: {
    filelist,
    playlist,
    depth,
    player,
    uiStatus
  },
  actions: actions,
  strict: debug
})
