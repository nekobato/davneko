<template lang="pug">
div.filer
  div.card.blue-grey.darken-2.white-text.actions
    div.card-action.actions-content
      div.input-field
        input#search_input.search-input(type='text', v-model='searchText')
        label.search-label(for='search_input', v-show='!searchText')
          i.material-icons search
        i.material-icons.search-clear(v-show='searchText', @click='clearSearch') close
      div.btn.right.action-btn.col.s2(@click='addDir2Queue')
        i.material-icons playlist_add
  breadcrumbs
  ul.collection.filelist(ref='filelist')
    li.collection-item.grey-text.text-darken-1.file-item(
      v-for='file in filelistFilter(filelist)'
      @click='onClickFile(file)')
      span.truncate {{file.name}}
</template>
<script>
import _ from 'lodash'
import Breadcrumbs from './BreadCrumbs.vue'

export default {
  components: {
    Breadcrumbs
  },
  data () {
    return {
      searchText: ''
    }
  },
  computed: {
    filelist () {
      return this.$store.state.filelist.all
    },
    depthDirs () {
      return this.$store.state.depth.files
    }
  },
  watch: {
    ['depthDirs'] (dirs, oldDirs) {
      if (dirs[dirs.length-1] && dirs[dirs.length-1].scrollTop) {
        this.$refs['filelist'].scrollTop = dirs[dirs.length-1].scrollTop
      }
    }
  },
  methods: {
    filelistFilter (filelist) {
      if (this.$data.searchText) {
        return _.filter(filelist, (file) => {
          const re = new RegExp(this.$data.searchText, 'g')
          return re.test(file.name)
        })
      }
      return this.filelist
    },
    fetchDir () {
      this.$store.dispatch('fetchDir')
    },
    addDir2Queue () {
      this.$store.dispatch('addDir2Queue')
    },
    selectFile () {
      this.$store.dispatch('selectFile')
    },
    ressurectDepth () {
      this.$store.dispatch('ressurectDepth')
    },
    clearSearch () {
      this.$data.searchText = ''
    },
    onClickFile (file) {
      this.selectFile(file, this.$refs['filelist'].scrollTop)
    }
  },
  mounted() {
    // start or resurrect
    this.$store.dispatch('ressurectDepth')
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
.actions
  margin-bottom: 0
.actions-content
  padding: 10px 20px
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
.search-clear
  position: absolute
  top: 0.5rem
  right: 0.25rem
  cursor: pointer
.filelist
  margin-top: 0
  overflow-x: hidden
  overflow-y: scroll
</style>
