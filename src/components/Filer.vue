<template lang="jade">
div
  a.button-collapse.top-nav.full.btn-floating(v-on:click='toggleNav')
    i.mdi-navigation-menu

ul.side-nav.fixed.collection.with-header(v-el:nav)
  div.side-nav-contents(v-el:filelist-box)
    li.collection-item.file-item(
      v-for='file in filelist' v-on:click='onSelectItem(file)')
      span
        i(:class='file | file2IconName')
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
import request from 'superagent'

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
        return "fa fa-music"
      }
      if (file.type === "directory") {
        return "fa fa-folder"
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
      request.get('/api/path')
      .query({ path: file.path })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) throw err
        this.$emit('filer-set-dir', JSON.parse(res.text))
        this.addDepth(file)
        this.$emit('depth:updated')
        this.$data.reaction.loadingDir = false
        this.$nextTick(() => {
          this.$els.filelistBox.scrollTop = this.$data.depth[this.$data.depth.length-1].scroll || 0
        })
      })
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
<style lang="stylus">

</style>
