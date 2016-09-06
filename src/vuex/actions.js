import * as api from '../api'
import * as types from './mutation-types'

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
    fetchDir(file)
  } else {
    dispatch(types.ADD_QUEUE, file)
  }
}

export const selectDepth = ({ dispatch }, file) => {
  fetchDir(file)
}

export const fetchDir = ({ dispatch }, file) => {
  console.log(file)
  api.fetchDir(file.path)
    .then((files) => {
      dispatch(types.RECEIVE_DIR, files)
      dispatch(types.ADD_DEPTH, file)
    })
    .catch(() => {
      // FIXME
    })
}

export const addQueue = ({ dispatch, state }, file) => {
  dispatch(types.ADD_QUEUE, file)
}

export const addDir2Queue = ({ dispatch, state }) => {
  const files = [...state.filelist]
  dispatch(types.ADD_QUEUE, state.filelist)
}
