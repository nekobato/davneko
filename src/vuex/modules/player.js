import _ from 'lodash'
import {
  PLAY_QUEUE,
  ADD_QUEUE,
  ADD_QUEUES,
  AUDIO_PLAYED,
  AUDIO_PAUSED,
  AUDIO_TIME_UPDATED,
  AUDIO_ENDED,
  AUDIO_TOGGLE_MUTE,
  AUDIO_VOLUME_UP,
  AUDIO_VOLUME_DOWN,
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
    volume: 1,
    muted: false
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
  [AUDIO_ENDED] (state) {
    state.control.isPlaying = false
  },
  [AUDIO_TOGGLE_MUTE] () {
    state.control.muted = !state.control.muted
  },
  [AUDIO_VOLUME_UP] () {
    if (state.control.volume === 1) return
    state.control.volume += 0.1
  },
  [AUDIO_VOLUME_DOWN] () {
    if (state.control.volume === 0) return
    state.control.volume -= 0.1
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
