<template lang="jade">
div.card.blue-grey.darken-2.white-text.player
  div.card-content
    audio.audio#audio_player(
      v-el:audio,
      :loop='isLoopOne',
      :src='encodedAudioURL',
      @play='onPlay'
      @pause='onPause',
      @timeupdate='onTimeUpdate',
      @ended='onEnded',
      autoplay)
    span.card-title {{ file.name || 'No Audio' }}
    div.seekbar.black(v-el:seekbar, @click='onClickSeekbar($event)')
      div.seekbar-inner.red.darken-2(:style='{ width: seekingParcent }')
  div.card-action.controller
    div.btn-container
      button.btn.teal.controller-btn(@click='playPrev', v-if='isAudioExists')
        i.material-icons skip_previous
      button.btn.teal.darken-2.controller-btn(v-else)
        i.material-icons.grey-text skip_previous
    div.btn-container
      button.btn.teal.controller-btn(v-show='control.isPlaying', @click='pause')
        i.material-icons pause
      button.btn.teal.controller-btn(v-show='!control.isPlaying', @click='play', v-if='isAudioExists')
        i.material-icons play_arrow
      button.btn.teal.darken-2.controller-btn(v-else)
        i.material-icons.grey-text play_arrow
    div.btn-container
      button.btn.teal.controller-btn(@click='playNext', v-if='isAudioExists')
        i.material-icons skip_next
      button.btn.teal.darken-2.controller-btn(v-else)
        i.material-icons.grey-text skip_next
    div.btn-container.right
      button.btn.teal.controller-btn(@click='changeLoop')
        i.material-icons(v-show="control.loop === 'no'") arrow_forward
        i.material-icons(v-show="control.loop === 'one'") repeat_one
        i.material-icons(v-show="control.loop === 'all'") repeat
</template>
<script>
import _ from 'lodash'
import * as types from '../vuex/mutation-types'
import { changeLoop } from '../vuex/actions'

export default {
  vuex: {
    getters: {
      file: ({ player }) => player.file,
      control: ({ player }) => player.control,
      playlist: ({ playlist }) => playlist
    },
    actions: {
      changeLoop
    }
  },
  computed: {
    encodedAudioURL: function() {
      if (_.isEmpty(this.file)) return false
      return `/api/path?path=${encodeURIComponent(this.file.path)}`
    },
    seekingParcent: {
      cache: false,
      get: function () {
        return (this.control.currentTime / this.$els.audio.duration * 100) + '%'
      }
    },
    isLoopOne: function () {
      if (this.control.loop === 'one') {
        return true
      } else {
        return false
      }
    },
    isAudioExists: function () {
      if (_.isEmpty(this.file)) {
        return false
      } else {
        return true
      }
    },
  },
  methods: {
    play: function () {
      this.$els.audio.play()
    },
    pause: function () {
      this.$els.audio.pause()
    },
    playPrev: function () {
      const maxIndex = this.playlist.queues.length - 1
      if (this.playlist.queues.length <= 1) {
        // nothing to do
      } else if (this.playlist.queues[index - 1]) {
        this.$store.dispatch(types.PLAY_QUEUE, this.playlist.queues[index - 1], index - 1)
      } else {
        this.$store.dispatch(types.PLAY_QUEUE, this.playlist.queues[maxIndex], maxIndex)
      }
    },
    playNext: function () {
      const index = this.control.playIndex
      if (this.playlist.queues.length <= 1) {
        // nothing to do
      } else if (this.playlist.queues[index + 1]) {
        this.$store.dispatch(types.PLAY_QUEUE, this.playlist.queues[index + 1], index + 1)
      } else {
        this.$store.dispatch(types.PLAY_QUEUE, this.playlist.queues[0], 0)
      }
    },
    onPlay: function () {
      this.$store.dispatch(types.AUDIO_PLAYED)
    },
    onPause: function () {
      this.$store.dispatch(types.AUDIO_PAUSED)
    },
    onTimeUpdate: function () {
      this.$store.dispatch(types.AUDIO_TIME_UPDATED, this.$els.audio.currentTime)
    },
    onEnded: function () {
      this.$store.dispatch(types.AUDIO_ENDED)
    },
    onClickSeekbar: function (e) {
      const parcentage = e.offsetX / this.$els.seekbar.offsetWidth
      this.$els.audio.currentTime = this.$els.audio.duration * parcentage
    }
  }
}

</script>
<style lang="stylus" scoped>
$width-pc = 992px
$side-nav-width = 50%


@keyframes anime-boundbox
  0%
    transform: scale(1)
  30%
    transform: scale(1.02)
  100%
    transform: scale(1)

.player
  display: flex
  flex-direction: column
  flex-shrink: 0
  margin: 0
.audio
  display: none
.btn-container
  display: inline-block
  margin-right: 5px
  &:last-child
    margin-right: 0
.boundbox
  animation: anime-boundbox 0.3s ease 0s 1 normal
.seekbar
  position: relative
  margin: 10px 0 0
  width: 100%
  height: 10px
  border-radius: 5px
.seekbar-inner
  position: absolute
  top: 0
  left: 0
  height: 100%
  border-radius: 5px
  transition: width .1s ease 0s

</style>
