import {
  FETCH_DIR,
  RECEIVE_DIR,
  ADD_DEPTH,
  UPDATE_DEPTH,
  ADD_QUEUE
} from '../mutation-types'

const state = {
  file: {
    name: 'no audio',
    path: null
  },
  control: {
    playing: false,
    loop: false,
    currentTime: 0,
    currentSeekParcent: 0
  },
  reaction: {
    addfile: false
  }
}

const mutations = {

}

export default {
  state,
  mutations
}
