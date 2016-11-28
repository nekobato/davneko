<template lang="jade">
div.z-depth-1.davneko
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
  margin: auto
  height: 100%
  overflow: hidden
  @media (max-width: $width-pc)
    width: 460px
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
  top: 80px
  left: -40px
  z-index: 2
  margin: auto
  padding: 0
  width: 80px
  height: 40px
  border-radius: 5px
  .material-icons
    font-size: 2rem
  @media (min-width: $width-pc)
    display: none
</style>
