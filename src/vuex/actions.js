import * as api from '../api'
import * as types from './mutation-types'
import _ from 'lodash'

const defaultDir = {
  path: '/',
  name: 'me',
  type: 'directory',
  scrollTop: 0
}

function forceRestart () {
  window.location.reload()
}

export const ressurectDepth = ({ dispatch }) => {
  let depth = JSON.parse(window.localStorage.getItem('depth'))
  if (_.isEmpty(depth)) {
    fetchDir({ dispatch }, defaultDir)
  } else {
    fetchDir({ dispatch }, depth.pop())
    dispatch(types.INIT_DEPTH, depth)
  }
}

export const selectFile = ({ dispatch }, file, scrollTop) => {
  if (file.type === 'directory') {
    dispatch(types.START_FETCH_DIR)
    api.fetchDir(file.path)
    .then( (files) => {
      dispatch(types.RECEIVE_DIR, files)
      dispatch(types.ADD_DEPTH, file, scrollTop)
    })
    .catch( (err) => {
      // lost auth
      if (err.response.status === 403) {
        forceRestart()
      }
    })
  } else {
    dispatch(types.ADD_QUEUE, file)
  }
}

export const selectDepth = ({ dispatch, state }, index) => {
  const depth = state.depth.files
  dispatch(types.START_FETCH_DIR)
  api.fetchDir(depth[index].path)
  .then( (files) => {
    dispatch(types.RECEIVE_DIR, files)
    dispatch(types.UPDATE_DEPTH, index)
  })
  .catch( (err) => {
    // lost auth
    if (err.response.status === 403) {
      forceRestart()
    }
  })
}

export const fetchDir = ({ dispatch }, file) => {
  dispatch(types.START_FETCH_DIR)
  api.fetchDir(file.path)
  .then( (files) => {
    dispatch(types.RECEIVE_DIR, files)
    dispatch(types.ADD_DEPTH, file, 0)
  })
  .catch( (err) => {
    if (!err.response) return console.warn(err)
    // lost auth
    if (err.response.status === 403) {
      forceRestart()
    }
    // lost dir
    if (err.response.status === 500) {
      localStorage.setItem('depth', JSON.stringify([]))
      ressurectDepth({ dispatch })
    }
  })
}

export const addQueue = ({ dispatch }, file) => {
  dispatch(types.ADD_QUEUE, file)
}

// Add Dir by Recursive
export const addDir2Queue = ({ dispatch, state }) => {
  api.fetchDirRecursive(state.depth.files[state.depth.files.length - 1])
  .then( (files) => {
    dispatch(types.ADD_QUEUES, files)
  })
  .catch( (err) => {
    // lost auth
    if (err.response.status === 403) {
      forceRestart()
    }
  })
}

export const removeQueue = ({ dispatch }, index) => {
  dispatch(types.REMOVE_QUEUE, index)
}

export const removeQueues = ({ dispatch }) => {
  dispatch(types.REMOVE_QUEUES_ALL)
}

export const play = ({ dispatch }) => {
  dispatch(types.PLAYER_PLAYED)
}

export const pause = ({ dispatch }) => {
  dispatch(types.PLAYER_PAUSED)
}

export const playPrev = ({ dispatch, state }) => {
  const maxIndex = state.playlist.queues.length - 1
  if (state.playlist.queues.length <= 1) {
    // nothing to do
  } else if (state.playlist.queues[index - 1]) {
    dispatch(types.PLAY_QUEUE, state.playlist.queues[index - 1], index - 1)
  } else {
    dispatch(types.PLAY_QUEUE, state.playlist.queues[maxIndex], maxIndex)
  }
}

export const playNext = ({ dispatch, state }) => {
  const index = state.player.control.playIndex
  if (state.playlist.queues.length <= 1) {
    // nothing to do
  } else if (state.playlist.queues[index + 1]) {
    dispatch(types.PLAY_QUEUE, state.playlist.queues[index + 1], index + 1)
  } else {
    dispatch(types.PLAY_QUEUE, state.playlist.queues[0], 0)
  }
}

export const onAudioEnded = ({ dispatch }) => {
  dispatch(types.PLAYER_ENDED)
}

export const changeLoop = ({ dispatch }) => {
  dispatch(types.CHANGE_LOOP)
}
