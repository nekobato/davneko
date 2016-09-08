<template lang="jade">
div.controller.left-align
  button.btn-floating.teal.darken-4.z-depth-1(
    v-show='file.path'
    v-on:click='playNext')
    i.fa.fa-step-forward
  button.btn-floating.teal.darken-4.z-depth-1(
    v-show='file.path'
    @click='onTriggerPlayPause')
    i.material-icons(v-show='control.isPlaying') pause
    i.material-icons(v-show='!control.isPlaying') play_arrow
  button.btn-floating.teal.darken-4.z-depth-1.right.with-separater(
    v-on:click='toggleLoop',
    v-bind:class='{ "darken-2": control.loop, "darken-4": !control.loop }')
    i.material-icons repeat
div.card.audiobox
  div.card-action.teal.white-text
    h5.truncate {{file.name}}
    audio#audio_player(
      v-el:audio
      :loop='control.loop',
      :src='file.path | pathToQuery',
      @play='onAudioPlay',
      @pause='onAudioPause',
      @stop='onAudioStop',
      @timeupdate='updateAudioTime | debounce 300',
      @ended='onAudioEnded',
      autoplay)
    div.seekbar.black(
      v-el:seekbar
      @click='onClickSeekbar')
      div.seekbar-inner.red.darken-2(
        v-bind:style='{ width: control.currentSeekParcent + "%" }')
  playlist
</template>
<script>
import { PLAYER_PLAYED, PLAYER_PAUSED, PLAYER_ENDED } from '../vuex/mutation-types'
import { togglePlayPause } from '../vuex/actions'
import Playlist from './Playlist.vue'

export default {
  components: {
    Playlist
  },
  vuex: {
    getters: {
      file: ({ player }) => player.file,
      control: ({ player }) => player.control
    },
    actions: {
      togglePlayPause,
      playNext: () => {},
      toggleLoop: () => {},
      onAudioPlay: () => {},
      onAudioPause: () => {},
      onAudioStop: () => {},
      onAudioEnded: () => {},
      onClickSeekbar: () => {},
      updateAudioTime: () => {}
    }
  },
  filters: {
    currentTimeToSeekParcent: (time) => {},
    pathToQuery(path) {
      if (!path) return false
      return `/api/path?path=${encodeURIComponent(path)}`
    }
  },
  methods: {
    onTriggerPlayPause () {
      this.control.isPlaying ? this.$els.audio.pause() : this.$els.audio.play()
      this.togglePlayPause()
    }
  }
}

</script>
<style lang="stylus" scoped>
$width-pc = 992px
$side-nav-width = 50%

@keyframes anime-boundbox {
  0% {
    transform: scale(1)
  }
  30% {
    transform: scale(1.02)
  }
  100% {
    transform: scale(1)
  }
}
.boundbox {
  animation: anime-boundbox 0.3s ease 0s 1 normal
}

.audiobox {
  position: relative
  margin: 0
  height: 100%
  audio {
    display: none
  }
  .seekbar {
    position: absolute
    top: 77px
    left: 0
    right: 0
    width: 100%
    height: 10px
    border-raidus: 5px
    .seekbar-inner {
      position: absolute
      top: 0
      left: 0
      height: 100%
      transition: width .1s ease 0s
    }
  }
}
</style>
