import _ from 'lodash'
import {
  ADD_QUEUE,
  ADD_QUEUES,
  PLAYER_PLAYED,
  PLAYER_PAUSED,
  PLAYER_ENDED
} from '../mutation-types'

const state = {
  file: {},
  control: {
    isPlaying: false,
    loop: false,
    currentTime: 0
  },
  reaction: {
    addfile: false
  }
}

const mutations = {
  [ADD_QUEUE] (state, file) {
    if (_.isEmpty(state.file)) {
      state.file = file
      state.control.isPlaying = true
    }
  },
  [ADD_QUEUES] (state, files) {
    if (_.isEmpty(state.file)) {
      state.file = files[0]
    }
  },
  [PLAYER_PLAYED] (state) {
    state.control.isPlaying = true
  },
  [PLAYER_PAUSED] (state) {
    state.control.isPlaying = false
  }
}

export default {
  state,
  mutations
}
