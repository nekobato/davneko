<template lang="jade">
div.filer(:class='isShow')
  div.card.blue-grey.darken-2.white-text
    div.card-content
      span.title(@click='toggleNav') davneko
    div.card-action
      div.btn.file-trigger(@click='addDir2Queue')
        i.material-icons playlist_add
  breadcrumbs
  ul.collection.filelist(v-el:filelist-box)
    li.collection-item.grey-text.text-darken-1.file-item(v-for='file in filelist', @click='selectFile(file)')
      //- i.material-icons {{ file | file2IconName }}
      span.truncate {{file.name}}
</template>
<script>
import Breadcrumbs from './Breadcrumbs.vue'
import { fetchDir, addDir2Queue, selectFile, ressurectDepth } from '../vuex/actions'

const defaultDir = {
  path: '/',
  name: 'me',
  type: 'directory'
}

export default {
  vuex: {
    getters: {
      filelist: ({ filelist }) => filelist.all
    },
    actions: {
      fetchDir,
      addDir2Queue,
      selectFile,
      ressurectDepth
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
    this.ressurectDepth()
    .then((curerntDir) => {
      this.fetchDir(curerntDir)
    }).catch(() => {
      this.fetchDir(defaultDir)
    })
  }
}
</script>
<style lang="stylus" scoped>
$width-pc = 992px

$keyframes filer-arrival
  0%
    left: 30%
  100%
    left: 0

.filer
  position: absolute
  left: -440px
  right: 0
  display: flex
  flex-direction: column
  margin: auto
  width: 440px
  height: 100%
  z-index: 1
  transition: left 0.4s ease 0s
  @media (max-width: $width-pc)
    left: 0
.collection
  li.not-selectable
    &:hover
      background: white
.title
  font-size: 2em
.filelist
  overflow-x: hidden
  overflow-y: scroll
</style>
