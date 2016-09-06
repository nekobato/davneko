<template lang="jade">
div.controller.left-align
  button.btn-floating.teal.darken-4.z-depth-1(
    v-show='player.file.path'
    v-on:click='onTriggerNext')
    i.fa.fa-step-forward
  button.btn-floating.teal.darken-4.z-depth-1(
    v-show='player.file.path'
  v-on:click='togglePlayPause')
    i.fa.fa-pause(v-show='player.control.playing')
    i.fa.fa-play(v-show='!player.control.playing')
  button.btn-floating.teal.darken-4.z-depth-1.right(
    v-on:click='clearPlaylist')
    i.fa.fa-trash-o
  button.btn-floating.teal.darken-4.z-depth-1.right.with-separater(
    v-on:click='toggleLoop',
    v-bind:class='{ "darken-2": player.control.loop, "darken-4": !player.control.loop }')
    i.fa.fa-repeat
div.card.audiobox
  div.card-action.teal.white-text(:class="{ boundbox: reaction.addfile }")
    h5.truncate {{player.file.name}}
    audio#audio_player(
      v-el:audio_player
      :loop='player.control.loop'
      v-bind:src='player.file.path | pathToQuery'
      @play='onAudioPlay'
      @pause='onAudioPause'
      @stop='onAudioStop'
      @timeupdate='updateAudioTime | debounce 300'
      autoplay)
    div.seekbar.black(
      v-el:seekbar
      @click='onClickSeekbar')
      div.seekbar-inner.red.darken-2(
        v-bind:style='{ width: player.control.currentSeekParcent + "%" }')

  ul.collection.blue-grey-text.darken-4.left-align.playlist
    li.collection-item(draggable='true' v-for='file in playlist')
      i.mdi-content-clear.btn-floating.btn-small.center.red.playlist-deleter(
        v-on:click='deleteItem($index)')
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
  filters: {
    currentTimeToSeekParcent: (time) => {},
    pathToQuery(path) {
      if (!path) return false
      return `/api/path?path=${encodeURIComponent(path)}`
    }
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
        this.$els.audio_player.play()
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
        this.$els.audio_player.pause()
      } else {
        this.$els.audio_player.play()
      }
    },
    updateAudioTime() {
      this.$data.player.control.currentTime = this.$els.audio_player.currentTime
      this.$data.player.control.currentSeekParcent = this.$els.audio_player.currentTime / this.$els.audio_player.duration * 100
    },
    onClickSeekbar(e) {
      if (this.$els.audio_player.src) {
        this.$els.audio_player.currentTime = this.$els.audio_player.duration * ( e.offsetX / this.$els.seekbar.offsetWidth )
        this.updateAudioTime()
      }
    }
  },
  ready() {
    let player = this.$els.audio_player
    player.addEventListener('ended', () => {
      console.log('player ended')
      this.$emit('nowplaying ended')
    })
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
  ul.playlist {
    position: absolute
    top: 90px
    bottom: 0
    margin: 0
    width: 100%
    overflow-y: scroll
    & > li {
      position: relative
      &:hover {
        .playlist-deleter,
        .playlist-replacer {
          display: inline-block
        }
      }
    }
    p {
      margin: 0
    }
    .playlist-deleter,
    .playlist-replacer {
      display: none
      position: absolute
    }
    .playlist-deleter {
      right: 5px
      top: 2px
    }
    .playlist-replacer {
      left: -6px
      font-size: 2em
      cursor: pointer
    }
  }
}
</style>
