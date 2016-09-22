<template lang="jade">
div.davneko
  filer
  div.audiobox(v-el:audiobox)
    player
    playlist
  button.btn.teal.filer-toggle(@click='toggleFiler')
    i.material-icons.white-text menu
</template>
<script>
import * as types from './vuex/mutation-types'

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
  display: flex
  height: 100%
.audiobox
  position: absolute
  left: 460px
  right: 0
  display: flex
  flex-direction: column
  margin: auto
  width: 460px
  height: 100%
  transition: left 0.4s ease 0s
  @media (max-width: $width-pc)
    left: 0
    &.filer-view
      left: 460px
.filer-toggle
  z-index: 1
  @media (min-width: $width-pc)
    display: none
</style>
