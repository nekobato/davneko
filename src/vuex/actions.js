import * as api from '../api'
import * as types from './mutation-types'
import _ from 'lodash'

export const ressurectDepth = ({ dispatch }) => {
  return new Promise((resolve, reject) => {
    if (window.localStorage.depth) {
      let depth = JSON.parse(window.localStorage.depth)
      resolve(depth.pop())
      dispatch(types.INIT_DEPTH, depth)
    } else {
      reject(null)
    }
  })
}

export const selectFile = ({ dispatch }, file) => {
  if (file.type === 'directory') {
    api.fetchDir(file.path)
    .then((files) => {
      dispatch(types.RECEIVE_DIR, files)
      dispatch(types.ADD_DEPTH, file)
    })
    .catch(() => {
      // FIXME
    })
  } else {
    dispatch(types.ADD_QUEUE, file)
  }
}

export const selectDepth = ({ dispatch, state }, index) => {
  const depth = state.depth.files
  api.fetchDir(depth[index].path)
  .then((files) => {
    dispatch(types.RECEIVE_DIR, files)
    dispatch(types.UPDATE_DEPTH, index)
  })
  .catch(() => {
    // FIXME
  })
}

export const fetchDir = ({ dispatch }, file) => {
  api.fetchDir(file.path)
  .then((files) => {
    dispatch(types.RECEIVE_DIR, files)
    dispatch(types.ADD_DEPTH, file)
  })
  .catch(() => {
    // FIXME
  })
}

export const addQueue = ({ dispatch }, file) => {
  dispatch(types.ADD_QUEUE, file)
}

export const addDir2Queue = ({ dispatch, state }) => {
  const files = [...state.filelist]
  dispatch(types.ADD_QUEUE, state.filelist)
}

export const removeQueue = ({ dispatch }, index) => {
  dispatch(types.REMOVE_QUEUE, index)
}

export const removeQueues = ({ dispatch }) => {
  dispatch(types.REMOVE_QUEUES_ALL)
}

export const togglePlayPause = ({ dispatch, state }) => {
  if (state.player.control.isPlaying) {
    dispatch(types.PLAYER_PAUSED)
  } else {
    dispatch(types.PLAYER_PLAYED)
  }
}

export const playNext = ({ dispatch, state }) => {
  const nowPlayingIndex = _.findIndex(state.playlist.queues, state.playlist.file)
  if (state.playlist.file.length === 0) {
    // nothing to do
  } else if (state.playlist.file[nowPlayingIndex + 1]) {
    dispatch(types.PLAY_QUEUE, state.playlist.file[nowPlayingIndex + 1])
  } else {
    dispatch(types.PLAY_QUEUE, state.playlist.file[0])
  }
}
