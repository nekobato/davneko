import {
  RECEIVE_DIR
} from '../mutation-types'

const state = []

const mutations = {
  [RECEIVE_DIR] (state, files) {
    state.filelist = files
  }
}

export default {
  state,
  mutations
}
