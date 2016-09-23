import {
  PLAY_QUEUE,
  ADD_QUEUE,
  ADD_QUEUES,
  REMOVE_QUEUE,
  REMOVE_QUEUES,
  PLAY_PREV,
  PLAY_NEXT
} from '../mutation-types'

const state = {
  queues: []
}

const mutations = {

  [ADD_QUEUE] (state, file) {
    if (isAudioFile(file)) {
      state.queues.push(file)
    }
  },
  [ADD_QUEUES] (state, files) {
    for (let file of files) {
      if (isAudioFile(file)) {
        state.queues.push(file)
      }
    }
  },
  [REMOVE_QUEUE] (state, index) {
    state.queues.splice(index, 1)
  },
  [REMOVE_QUEUES] (state) {
    state.queues = []
  }
}

export default {
  state,
  mutations
}

// validate file
function isAudioFile (file) {
  if (/\.(ogg|wav|mp3|mp4|aac|m4a)$/.test(file.name)) {
    return true
  } else {
    return false
  }
}
