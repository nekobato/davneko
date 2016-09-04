import api from '../api'
import * as types from './mutation-types'

export const selectFile = ({ dispatch }, file) => {
  if (file.type === 'directory') {
    dispatch(types.FETCH_DIR, file)
  } else {
    dispatch(types.ADD_QUEUE, file)
  }
}

export const selectDepth = ({ dispatch }, dir) => {
  dispatch(types.FETCH_DIR, dir)
}

export const fetchDir = ({ dispatch }, path) => {
  api.fetcDir(file.path)
    .then((files) => {
      dispatch(types.RECEIVE_DIR, files)
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
