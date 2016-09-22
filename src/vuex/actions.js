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
  const files = [...state.filelist.all]
  dispatch(types.ADD_QUEUES, files)
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
