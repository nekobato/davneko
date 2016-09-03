<template lang="jade">
div
  a.button-collapse.top-nav.full.btn-floating(v-on:click='toggleNav')
    i.mdi-navigation-menu

ul.side-nav.fixed.collection.with-header(v-el:nav)
  div.side-nav-contents(v-el:filelist-box)
    li.collection-item.file-item(
      v-for='file in filelist' v-on:click='onSelectItem(file)')
      i.material-icons {{ file | file2IconName }}
      span.truncate {{file.name}}
  div.side-nav-header.fixed
    li.not-selectable.collection-header
      h1(v-on:click='toggleNav') davneko
      div.btn.file-trigger(v-on:click='addFilesAll')
        i.fa.fa-folder-open.yellow-text
        i.fa.fa-arrow-right
    li.collection-item.not-selectable.file-depth
      i.fa.fa-spinner.fa-pulse(v-show='reaction.loadingDir')
      i.material-icons(v-for='file in depth' v-on:click='onSelectDepth(file, $index)') keyboard_arrow_right
      span(v-if='depth[0]') {{depth[depth.length-1].name}}
</template>
<script>
import { fetchPath } from '../api'

export default {
  data() {
    return {
      depth: [],
      filelist: [],
      reaction: {
        loadingDir: false
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
  events: {
    'filer-set-dir': "setDir",
    'filer-get-dir': "getDir",
    'filer-add-depth': "addDepth",
    'depth:updated': "saveDepth"
  },
  methods: {
    toggleNav() {
      this.$els.nav.classList.toggle('show-mobile')
    },
    onSelectItem(file) {
      if (file.type === 'directory') {
        this.$set('depth[depth.length-1].scroll', this.$els.filelistBox.scrollTop)
        this.$emit('filer-get-dir', file)
      } else if (file.type === 'file') {
        this.$dispatch('dispatch-files', [file])
      }
    },
    onSelectDepth(file, depth) {
      this.$data.depth.length = depth
      this.$emit('filer-get-dir', file)
    },
    getDir(file) {
      this.$data.reaction.loadingDir = true
      fetchPath(file.path)
        .then((data) => {
          this.$emit('filer-set-dir', data)
          this.addDepth(file)
          this.$emit('depth:updated')
          this.$data.reaction.loadingDir = false
          this.$nextTick(() => {
            this.$els.filelistBox.scrollTop = this.$data.depth[this.$data.depth.length-1].scroll || 0
          })
        })
        .catch((err) => { throw(err) })
    },
    setDir(files) {
      this.$data.filelist = files
    },
    addDepth(file) {
      this.$data.depth.push(file)
    },
    addFilesAll() {
      this.$dispatch('dispatch-files', this.$data.filelist)
    },
    saveDepth() {
      localStorage.setItem('depth', JSON.stringify(this.$data.depth))
    },
    startOrResurrect() {
      if (localStorage.depth) {
        let depth = JSON.parse(localStorage.depth)
        let currentDir = depth.pop()
        this.$data.depth = depth
        this.getDir(currentDir)
      } else {
        this.getDir({ path: '/', name: '/' })
      }
    }
  },
  ready() {
    this.startOrResurrect()
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
