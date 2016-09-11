<template lang="jade">
div.audio-box
  div.card.blue-grey.darken-2.white-text.audiobox
    div.card-content
      audio.audio#audio_player(
        v-el:audio
        :loop='control.loop',
        :src='file.path | pathToQuery',
        @play='onAudioPlay',
        @pause='onAudioPause',
        @stop='onAudioStop',
        @timeupdate='updateAudioTime | debounce 300',
        @ended='onAudioEnded',
        autoplay)
      span.card-title {{ file.name || 'No Audio' }}
      div.seekbar.black(
        v-el:seekbar
        @click='onClickSeekbar')
        div.seekbar-inner.red.darken-2(
          :style='{ width: seekbarWidth + '%' }')
    div.card-action.controller
      button.btn.teal.controller-btn(@click='togglePlayPause')
        i.material-icons(v-show='control.isPlaying') pause
        i.material-icons(v-show='!control.isPlaying') play_arrow
      button.btn.teal.controller-btn(@click='playNext')
        i.material-icons skip_next
      button.btn.teal.right.controller-btn(
        @click='toggleLoop',
        v-bind:class='{ "darken-2": !control.loop }')
        i.material-icons repeat
  playlist
</template>
<script>
import { PLAYER_PLAYED, PLAYER_PAUSED, PLAYER_ENDED } from '../vuex/mutation-types'
import { togglePlayPause, playNext } from '../vuex/actions'
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
      playNext,
      toggleLoop: () => {},
      onAudioPlay: () => {},
      onAudioPause: () => {},
      onAudioStop: () => {},
      onAudioEnded: () => {},
      onClickSeekbar: () => {},
      updateAudioTime: () => {}
    }
  },
  watch: {
    'control.isPlaying' (newVal, oldVal) {
      newVal ? this.$els.audio.play() : this.$els.audio.pause()
    }
  },
  filters: {
    currentTimeToSeekParcent: (time) => {},
    pathToQuery(path) {
      if (!path) return false
      return `/api/path?path=${encodeURIComponent(path)}`
    }
  },
  computed: {
    seekbarWidth () {
      return this.control.currentTime / this.$el.audio.duration * 100
    }
  }
}

</script>
<style lang="stylus" scoped>
$width-pc = 992px
$side-nav-width = 50%

.audio-box {
  display: flex
  flex-direction: column
  margin: 0 0 0 50%
  height: 100%
}

.audio {
  display: none
}

.controller-btn {
  margin-right: 5px

  &:last-child {
    margin-right: 0
  }
}

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
  width: 100%
  .seekbar {
    position: relative
    margin: 10px 0 0
    width: 100%
    height: 10px
    border-radius: 5px
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
