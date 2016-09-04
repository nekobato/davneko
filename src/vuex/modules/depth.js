import {
  RECEIVE_DIR,
  ADD_DEPTH,
  UPDATE_DEPTH,
  ADD_QUEUE
} from '../mutation-types'

const state = []

const mutations = {
  [ADD_DEPTH] ({ state }, file) {
    state.depth.push(file)
  },
  [UPDATE_DEPTH] ({ state }) {
    localStorage.setItem('depth', JSON.stringify(state.depth))
  },
}

export default {
  state,
  mutations
}
