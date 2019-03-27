import { START_FETCH_DIR, RECEIVE_DIR } from '../mutation-types';

const state = {
  filer: {
    isFetching: false
  }
};

const mutations = {
  [START_FETCH_DIR](state) {
    state.filer.isFetching = true;
  },

  [RECEIVE_DIR](state) {
    state.filer.isFetching = false;
  }
};

export default {
  state,
  mutations
};
