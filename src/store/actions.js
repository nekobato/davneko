import * as api from '../api'
import * as types from './mutation-types'
import _ from 'lodash'

const defaultDir = {
  path: '/',
  name: 'me',
  type: 'directory'
}

export const ressurectDepth = ({ commit }) => {
  let depth = JSON.parse(window.localStorage.getItem('depth'))
  if (_.isEmpty(depth)) {
    fetchDir({ commit }, defaultDir)
  } else {
    fetchDir({ commit }, depth.pop())
    commit(types.INIT_DEPTH, depth)
  }
}

export const selectFile = ({ commit }, file, scrollTop) => {
  if (file.type === 'directory') {
    commit(types.START_FETCH_DIR)
    api.fetchDir(file.path)
    .then( (files) => {
      commit(types.RECEIVE_DIR, files)
      commit(types.ADD_DEPTH, file, scrollTop)
    })
    .catch( (err) => {
      // lost auth
      if (err.response.status === 403) {
        // forceRestart()
      }
    })
  } else {
    commit(types.ADD_QUEUE, file)
  }
}

export const selectDepth = ({ commit, state }, index) => {
  const depth = state.depth.files
  commit(types.START_FETCH_DIR)
  api.fetchDir(depth[index].path)
  .then( (files) => {
    commit(types.RECEIVE_DIR, files)
    commit(types.UPDATE_DEPTH, index)
  })
  .catch( (err) => {
    // lost auth
    if (err.response.status === 403) {
      forceRestart()
    }
  })
}

export const fetchDir = ({ commit }, file) => {
  commit(types.START_FETCH_DIR)
  api.fetchDir(file.path)
    .then( (files) => {
      commit(types.RECEIVE_DIR, files)
      commit(types.ADD_DEPTH, file)
    })
    .catch( (err) => {
      // Network Error
      if (!err.response) {
        return
      }
      // lost auth
      if (err.response.status === 403) {
        forceRestart()
      }
      // lost dir
      if (err.response.status === 500) {
        localStorage.setItem('depth', JSON.stringify([]))
        ressurectDepth({ commit })
      }
    })
}

export const addQueue = ({ commit }, file) => {
  commit(types.ADD_QUEUE, file)
}

// Add Dir by Recursive
export const addDir2Queue = ({ commit, state }) => {
  api.fetchDirRecursive(state.depth.files[state.depth.files.length - 1])
  .then( (files) => {
    commit(types.ADD_QUEUES, files)
  })
  .catch( (err) => {
    // lost auth
    if (err.response.status === 403) {
      forceRestart()
    }
  })
}

export const removeQueue = ({ commit }, index) => {
  commit(types.REMOVE_QUEUE, index)
}

export const removeQueues = ({ commit }) => {
  commit(types.REMOVE_QUEUES)
}

export const play = ({ commit }) => {
  commit(types.AUDIO_PLAYED)
}

export const pause = ({ commit }) => {
  commit(types.AUDIO_PAUSED)
}

export const playPrev = ({ commit, state }) => {
  const maxIndex = state.playlist.queues.length - 1
  if (state.playlist.queues.length <= 1) {
    // nothing to do
  } else if (state.playlist.queues[index - 1]) {
    commit(types.PLAY_QUEUE, state.playlist.queues[index - 1], index - 1)
  } else {
    commit(types.PLAY_QUEUE, state.playlist.queues[maxIndex], maxIndex)
  }
}

export const playNext = ({ commit, state }) => {
  const index = state.player.control.playIndex
  if (state.playlist.queues.length <= 1) {
    // nothing to do
  } else if (state.playlist.queues[index + 1]) {
    commit(types.PLAY_QUEUE, state.playlist.queues[index + 1], index + 1)
  } else {
    commit(types.PLAY_QUEUE, state.playlist.queues[0], 0)
  }
}

export const onAudioEnded = ({ commit }) => {
  commit(types.AUDIO_ENDED)
}

export const changeLoop = ({ commit }) => {
  commit(types.CHANGE_LOOP)
}
