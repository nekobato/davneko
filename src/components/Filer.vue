<template lang="jade">
div.filer(:class='isShow')
  div.card.blue-grey.darken-2.white-text
    div.card-content
      span.title davneko
    div.card-action
      div.input-field
        input#search_input.search-input(type='text', v-model='searchText')
        label.search-label(for='search_input', v-show='!searchText')
          i.material-icons search
      div.btn.right.action-btn.col.s2(@click='addDir2Queue')
        i.material-icons playlist_add
  breadcrumbs
  ul.collection.filelist(v-el:filelist-box)
    li.collection-item.grey-text.text-darken-1.file-item(
      v-for='file in filelist | filelistFilter',
      track-by="$index"
      @click='selectFile(file)')
      //- i.material-icons {{ file | file2IconName }}
      span.truncate {{file.name}}
</template>
<script>
import _ from 'lodash'
import Breadcrumbs from './BreadCrumbs.vue'
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
  data () {
    return {
      searchText: ''
    }
  },
  filters: {
    filelistFilter (filelist) {
      if (this.$data.searchText) {
        return _.filter(filelist, (file) => {
          const re = new RegExp(this.$data.searchText, 'g')
          return re.test(file.name)
        })
      }
      return this.filelist
    },
    file2IconName(file) {
      if (/\.(ogg|wav|mp3|aac|m4a)$/.test(file.name)) {
        return "file_audio"
      }
      if (file.type === "directory") {
        return "folder"
      }
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
.action-btn
  margin: 0 5px 0 0
  &:last-child
    margin: 0
.input-field
  display: inline-block
  margin: 0
  width: 160px
.search-input
  margin: 0
  height: 36px
.search-label
  top: 0.5rem
  left: auto
  right: 0.25rem
.title
  font-size: 2em
.filelist
  overflow-x: hidden
  overflow-y: scroll
</style>
