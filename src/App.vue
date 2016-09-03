<template lang="jade">
header
  filer
main
  section
    component(:is='app_component')
</template>
<script>
import Filer from './components/Filer'
import AudioBox from './components/AudioBox'

export default {
  el: "#davneko",
  replace: false,
  components: {
    Filer,
    AudioBox
  },
  data: {
    app_component: 'audio-box'
  },
  events: {
    'dispatch-files': function(files) {
      this.$broadcast('set-files', files)
    }
  },
  methods: {},
  ready() {
    this.$on('dispatch-file', (file) => {
      this.$broadcast('set-file', file)
    })
  }
}
</script>
<style lang="stylus">
$width-pc = 992px
$side-nav-width = 50%

* {
  box-sizing: border-box
}
html,
body {
  height: 100%
  min-height: 100%
  background-color: #ffffff
}
h1 {
  font-size: 3rem
  font-weight: 300
  margin: 10px auto
  line-height: 1
}
h2 {
  font-size: 2.4rem
  font-weight: 300
  margin: 0 auto
  line-height: 64px
}
.bold {
  font-weight: bold
}
.dn_auth-container {
  margin: 0 auto
  max-width: 250px
}

// main
header,
main,
footer {
  @media only screen and (max-width: $width-pc) {
    text-align: center
  }
  @media only screen and (min-width: $width-pc) {
    padding-left: $side-nav-width
  }
}
main {
  height: 100%
  section {
    position: relative
    height: 100%
    padding: 30px 10px 20px
    .controller {
      position: absolute
      top: 12px
      left: 65px
      right: 20px
      font-size: 1.8em
      z-index: 3
      .btn-floating,
      .btn-small {
        margin-left: 5px
        cursor: pointer
        &.with-separater {
          margin-right: 42px
        }
      }
    }
  }
}
</style>
