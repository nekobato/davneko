<template lang="jade">
div.side-nav.fixed
  div
    a.button-collapse.top-nav.full.btn-floating(@click='toggleNav')
      i.mdi-navigation-menu
  div.header-container
    h1(@click='toggleNav') davneko
  breadcrumbs
  div.btn.file-trigger(@click='addDir2Queue()')
    i.fa.fa-folder-open.yellow-text
    i.fa.fa-arrow-right
  ul.collection(v-el:filelist-box)
    li.collection-item.file-item(v-for='file in filelist', @click='selectFile(file)')
      i.material-icons {{ file | file2IconName }}
      span.truncate {{file.name}}
</template>
<script>
import Breadcrumbs from './Breadcrumbs.vue'
import { fetchDir, addDir2Queue, selectFile } from '../vuex/actions'

export default {
  vuex: {
    getters: {
      filelist: ({ filelist }) => filelist.all
    },
    actions: {
      fetchDir,
      addDir2Queue,
      selectFile
    }
  },
  components: {
    Breadcrumbs
  },
  data() {
    return {
      nav: {
        isVisible: true
      }
    }
  },
  filters: {
    file2IconName(file) {
      if (/\.(ogg|wav|mp3|aac|m4a)$/.test(file.name)) {
        return "file_audio"
      }
      if (file.type === "directory") {
        return "folder"
      }
    }
  },
  methods: {
    toggleNav() {
      this.$data.nav.isVisible = !this.$data.nav.isVisible
    }
  },
  created() {
    // start or resurrect
    if (window.localStorage.depth) {
      let depth = JSON.parse(window.localStorage.depth)
      let currentDir = depth.pop()
      this.fetchDir(currentDir.path)
    } else {
      this.fetchDir('/')
    }
  }
}
</script>
<style lang="stylus" scoped>
$width-pc = 992px
$side-nav-width = 50%

$keyframes filer-arrival {
  0% {
    left: 30%
  }
  100% {
    left: 0
  }
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

  li.not-selectable {
    &:hover {
      background: white
    }
  }
}
.side-nav-contents {
  position: absolute
  top: 138px
  left: 0
  right: 0
  bottom: 0
  overflow-y: scroll
  border-top: 3px solid #ddd
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
.button-collapse.top-nav {
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
</style>
