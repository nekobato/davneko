import Vue from 'vue';
import Vuex from 'vuex';
import filelist from './modules/filelist';
import playlist from './modules/playlist';
import depth from './modules/depth';
import player from './modules/player';
import uiStatus from './modules/uiStatus';
import * as actions from './actions';

Vue.use(Vuex);

Vue.config.debug = true;

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions: { ...actions },
  modules: {
    filelist,
    playlist,
    depth,
    player,
    uiStatus,
  },
  strict: debug,
});
