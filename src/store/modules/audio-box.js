import * as types from '../mutation-types'

const state = {
  player: {
    file: {
      name: 'no audio',
      path: null
    },
    control: {
      playing: false,
      loop: false,
      currentTime: 0,
      currentSeekParcent: 0,
    }
  },
  playlist: [],
  reaction: {
    addfile: false
  }
}
