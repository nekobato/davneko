import {
  ADD_QUEUE,
  REMOVE_QUEUE,
  REMOVE_QUEUES
} from '../mutation-types'

const state = {
  queues: []
}

const mutations = {
  [ADD_QUEUE] (state, file) {
    if (/\.(ogg|wav|mp3|mp4|aac|m4a)$/.test(file.name)) {
      state.queues.push(file)
    }
  },
  [REMOVE_QUEUE] (state, index) {
    state.queues.splice(index, 1)
  },
  [REMOVE_QUEUES] (state) {
    console.log(state)
    state.queues = []
  }
}

export default {
  state,
  mutations
}
