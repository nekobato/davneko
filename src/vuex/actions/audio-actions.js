import * as api from '../../api'
import * as types from '../mutation-types'
import _ from 'lodash'

export const onPlay = (store) => {
  store.dispatch(types.AUDIO_PLAYED)
}

export const onPause = (store) => {
  store.dispatch(types.AUDIO_PAUSED)
}

export const timeUpdate = (store, currentTime) => {
  store.dispatch(types.AUDIO_TIME_UPDATED, currentTime)
}

export const onEnded = (store) => {
  store.dispatch(types.AUDIO_ENDED)
}

export const changeLoop = (store) => {
  store.dispatch(types.CHANGE_LOOP)
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
