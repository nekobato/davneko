<template lang="jade">
div.davneko
  filer
  div.z-depth-2.audiobox(v-el:audiobox)
    player
    playlist
    button.btn.teal.lighten-1.filer-toggle(@click='toggleFiler')
</template>
<script>
import store from './vuex/store'
import Filer from './components/Filer'
import Player from './components/Player'
import Playlist from './components/Playlist'

export default {
  el: "#davneko",
  components: {
    Filer,
    Player,
    Playlist
  },
  store,
  methods: {
    toggleFiler: function () {
      this.$els.audiobox.classList.toggle('filer-view')
    }
  }
}
</script>
<style lang="stylus" scoped>
$width-pc = 992px
$side-nav-width = 50%

.davneko
  position: relative
  display: flex
  height: 100%
  overflow: hidden
.audiobox
  position: absolute
  left: 460px
  right: 0
  display: flex
  flex-direction: column
  margin: auto
  width: 460px
  height: 100%
  z-index: 2
  transition: left 0.4s ease 0s
  @media (max-width: $width-pc)
    left: 0
    &.filer-view
      left: 460px
.filer-toggle
  position: absolute
  bottom: 10px
  left: -40px
  z-index: 2
  margin: auto
  padding: 0
  width: 80px
  height: 60px
  border-radius: 5px
  .material-icons
    font-size: 2rem
  @media (min-width: $width-pc)
    display: none
</style>
