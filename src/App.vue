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

// header
header {
  .nav-wrapper {
    padding-left: 20px
  }
  .side-nav {
    @media only screen and (max-width: $width-pc) {
      width: 100%
    }
    min-width: $side-nav-width
    height: 100%
    transition: left 0.4s ease 0s
    &.show-mobile {
      left: 0
    }
    .side-nav-contents {
      position: absolute
      top: 127px
      left: 0
      right: 0
      bottom: 0
      overflow-y: scroll
      border-top: 3px solid #ddd
    }
    li.not-selectable {
      &:hover {
        background: white
      }
    }
    .file-depth {
      position: relative
      vertical-align: bottom
      white-space: nowrap
      i {
        font-size: 2em
        &.fa-spinner {
          position: absolute
          left: 10px
          font-size: 22px
          width: 22px
          height: 22px
        }
      }
      span {
        font-size: 1.2em
        line-height: 1.8em
      }
    }
    .file-trigger {
      position: absolute
      top: 46px
      right: 10px
      padding: 0
      width: 40px
      height: 30px
      i {
        position: absolute
        margin: 0
        font-size: 18px
      }
      .fa-folder-open {
        top: 2px
        left: 5px
      }
      .fa-arrow-right {
        top: -6px
        left: 20px
      }
    }
    .file-item {
      position: relative
      height: 44px
      animation: filer-arrival 0.1s ease 0s 1 normal
      a {
        font-size: 14px
        position: relative
        left: -60px
        padding: 0 10px
        transition: left 0.2s ease 0s
      }
      &:hover {
        a {
          left: 0
        }
      }
    }
  }
  .collection-item {
    display: flex
    cursor: pointer
    i {
      margin-right: 15px
    }
    a {
      height: 1.5rem
      line-height: 1.5rem
    }
  }
  a.button-collapse.top-nav {
    position: fixed
    text-align: center
    height: 40px
    width: 40px
    left: 20px
    top: 12px
    float: none
    color: white
    font-size: 32px
    z-index: 2
  }
}
$keyframes filer-arrival {
  0% {
    left: 30%
  }
  100% {
    left: 0
  }
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
