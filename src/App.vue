<template lang="jade">
div.davneko
  filer
  div.audio-box-container
    audio-box
</template>
<script>
import store from './vuex/store'
import Filer from './components/Filer'
import AudioBox from './components/AudioBox'

export default {
  el: "#davneko",
  components: {
    Filer,
    AudioBox
  },
  store
}
</script>
<style lang="stylus" scoped>
$width-pc = 992px
$side-nav-width = 50%

.davneko {
  height: 100%
}

.audio-box-container {
  height: 100%
}
</style>
