import { RECEIVE_DIR } from '../mutation-types';

const state = {
  all: []
};

const mutations = {
  [RECEIVE_DIR](state, files) {
    state.all = files;
  }
};

export default {
  state,
  mutations
};
