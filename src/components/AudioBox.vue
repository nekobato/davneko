<template lang="jade">
div
  div.controller.left-align
    button.btn-floating.teal.darken-4.z-depth-1(
      v-show='player.file.path'
      @click='onTriggerNext')
      i.fa.fa-step-forward
    button.btn-floating.teal.darken-4.z-depth-1(
      v-show='player.file.path'
    @click='togglePlayPause')
      i.fa.fa-pause(v-show='player.control.playing')
      i.fa.fa-play(v-show='!player.control.playing')
    button.btn-floating.teal.darken-4.z-depth-1.right(
      @click='clearPlaylist')
      i.fa.fa-trash-o
    button.btn-floating.teal.darken-4.z-depth-1.right.with-separater(
      @click='toggleLoop',
      v-bind:class='buttonDarken')
      i.fa.fa-repeat
  div.card.audiobox
    div.card-action.teal.white-text(:class="{ boundbox: reaction.addfile }")
      h5.truncate {{ player.file.name }}
      audio#audio_player(
        ref="audio_player",
        :loop='player.control.loop',
        :src='audioSrc',
        @play='onAudioPlay',
        @pause='onAudioPause',
        @stop='onAudioStop',
        @timeupdate='updateAudioTime | debounce(300)',
        autoplay)
      div.seekbar.black(
        ref="seekbar"
        @click='onClickSeekbar')
        div.seekbar-inner.red.darken-2(
          :style.width='seekbarWidth')

    ul.collection.blue-grey-text.darken-4.left-align.playlist
      li.collection-item(draggable='true' v-for='file in playlist')
        i.mdi-content-clear.btn-floating.btn-small.center.red.playlist-deleter(
          @click='deleteItem($index)')
        p.truncate {{file.name}}
</template>
<script>
import request from 'superagent'

export default {
  data() {
    return {
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
  },
  computed: {
    buttonDarken() {
      return this.$data.player.control.loop ? 'darken-2' : 'darken-4'
    },
    seekbarWidth() {
      return this.$data.player.control.currentSeekParcent + "%"
    },
    audioSrc() {
      if (!this.$data.player.file.path) return false
      return `/api/path?path=${encodeURIComponent(this.$data.player.file.path)}`
    }
  },
  filters: {
    currentTimeToSeekParcent(time) {}
  },
  events: {
    "set-files": "onReceiveFiles",
    "audio-trigger-next": "playNextQueue",
    "nowplaying ended": "playNextQueue",
    "file added": "reactionAddFile"
  },
  methods: {
    onReceiveFiles(files) {
      let valid = false // anything valid?
      for (const file of files) {
        if (/\.(ogg|wav|mp3|mp4|aac|m4a)$/.test(file.name)) {
          valid = true
          if (this.player.file.path === null) {
            this.player.file = file
          } else {
            this.playlist.push(JSON.parse(JSON.stringify(file)))
          }
        }
      }
      if (valid) this.$emit('file added')
    },
    playNextQueue() {
      if (this.playlist.length === 0) return false
      this.player.file = this.playlist.shift()
      setTimeout( () => {
        this.$refs.audio_player.play()
      }, 200)
    },
    onTriggerNext() {
      this.$emit('audio-trigger-next')
    },
    deleteItem(index) {
      this.$data.playlist.splice(index, 1)
    },
    clearPlaylist() {
      this.$data.playlist = []
    },
    toggleLoop() {
      this.$data.player.control.loop = this.$data.player.control.loop ? false : true
    },
    reactionAddFile() {
      this.$data.reaction.addfile = true
      setTimeout( () => {
        this.$data.reaction.addfile = false
      }, 500)
    },
    onAudioPlay() {
      this.player.control.playing = true
    },
    onAudioPause() {
      this.player.control.playing = false
    },
    onAudioStop() {
      this.player.control.playing = false
    },
    togglePlayPause() {
      if (this.player.control.playing) {
        this.$refs.audio_player.pause()
      } else {
        this.$refs.audio_player.play()
      }
    },
    updateAudioTime() {
      this.$data.player.control.currentTime = this.$refs.audio_player.currentTime
      this.$data.player.control.currentSeekParcent = this.$refs.audio_player.currentTime / this.$refs.audio_player.duration * 100
    },
    onClickSeekbar(e) {
      if (this.$refs.audio_player.src) {
        this.$refs.audio_player.currentTime = this.$refs.audio_player.duration * ( e.offsetX / this.$refs.seekbar.offsetWidth )
        this.updateAudioTime()
      }
    }
  },
  mounted() {
    let player = this.$refs.audio_player
    player.addEventListener('ended', () => {
      console.log('player ended')
      this.$emit('nowplaying ended')
    })
  }
}

</script>
<style lang="stylus">

</style>
