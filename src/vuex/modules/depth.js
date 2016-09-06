import {
  FETCH_DIR,
  INIT_DIR,
  INIT_DEPTH,
  ADD_DEPTH,
  MOVE_DEPTH
} from '../mutation-types'

const state = {
  files: []
}

const mutations = {
  [INIT_DEPTH] (state, files) {
    state.files = files
  },
  [ADD_DEPTH] (state, file) {
    state.files.push(file)
  },
  [MOVE_DEPTH] (state) {
    localStorage.setItem('depth', JSON.stringify(state.files))
  }
}

export default {
  state,
  mutations
}
