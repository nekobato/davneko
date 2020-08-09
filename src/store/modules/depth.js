import { INIT_DEPTH, ADD_DEPTH, UPDATE_DEPTH } from "../mutation-types";

const state = {
  files: [],
};

const mutations = {
  [INIT_DEPTH](state, files) {
    state.files = files;
  },
  [ADD_DEPTH](state, file, scrollTop) {
    if (state.files.length)
      state.files[state.files.length - 1].scrollTop = scrollTop;
    state.files.push(file);
    localStorage.setItem("depth", JSON.stringify(state.files));
  },
  [UPDATE_DEPTH](state, index) {
    state.files.splice(index + 1);
    localStorage.setItem("depth", JSON.stringify(state.files));
  },
};

export default {
  state,
  mutations,
};
