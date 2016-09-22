import _ from 'lodash'
import {
  PLAY_QUEUE,
  ADD_QUEUE,
  ADD_QUEUES,
  AUDIO_PLAYED,
  AUDIO_PAUSED,
  AUDIO_TIME_UPDATED,
  AUDIO_ENDED,
  CHANGE_LOOP
} from '../mutation-types'

const state = {
  file: {},
  control: {
    isPlaying: false,
    loop: 'no',
    currentTime: null,
    duration: null,
    playIndex: null,
    volume: 100
  },
  reaction: {
    addfile: false
  }
}

const mutations = {
  [PLAY_QUEUE] (state, file, index) {
    state.file = file
    state.control.isPlaying = true
    state.control.playIndex = index
  },
  [AUDIO_TIME_UPDATED] (state, time) {
    state.control.currentTime = time
  },
  [ADD_QUEUE] (state, file) {
    if (_.isEmpty(state.file)) {
      state.file = file
      state.control.isPlaying = true
      state.control.playIndex = 0
    }
  },
  [ADD_QUEUES] (state, files) {
    if (_.isEmpty(state.file)) {
      state.file = files[0]
      state.control.isPlaying = true
      state.control.playIndex = 0
    }
  },
  [AUDIO_PLAYED] (state) {
    state.control.isPlaying = true
  },
  [AUDIO_PAUSED] (state) {
    state.control.isPlaying = false
  },
  [CHANGE_LOOP] (state) {
    if (state.control.loop === 'no') {
      state.control.loop = 'one'
    } else if (state.control.loop === 'one') {
      state.control.loop = 'all'
    } else {
      state.control.loop = 'no'
    }
  }
}

export default {
  state,
  mutations
}
