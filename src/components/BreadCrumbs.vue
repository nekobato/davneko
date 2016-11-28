<template lang="jade">
div.col.s12.blue-grey.lighten-2.breadcrumbs
  div.progress(v-show="status.isFetching")
    div.indeterminate
  div.breadcrumbs-content(v-show="!status.isFetching")
    i.material-icons.depth(v-for='file in files', track-by="$index", @click='selectDepth($index)') navigate_next
  span.dirname {{ headFileName }}
</template>
<script>
import { selectDepth } from '../vuex/actions'

export default {
  vuex: {
    getters: {
      files: ({ depth }) => depth.files,
      status: ({ uiStatus }) => uiStatus.filer
    },
    actions: {
      selectDepth
    }
  },
  computed: {
    headFileName() {
      if (!this.files.length) return ""
      return this.files[this.files.length-1].name
    }
  }
}
</script>
<style lang="stylus" scoped>
.breadcrumbs
  display: flex
  align-items: center
  position: relative
  width: 100%
  height: 60px
.progress
  position: absolute
  left: 0
  bottom: 0
  margin: auto
.depth
  display: inline-block
  width: 40px
  height: 100%
  font-size: 36px
  color: #ffffff
  text-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.32), 0 2px 10px 0 rgba(0, 0, 0, 0.18)
  cursor: pointer
  transition: color 0.2s ease 0s
  &:hover
    color: #455a64
.dirname
  position: absolute
  left: 5px
  bottom: 0
  font-size: 24px
  white-space: nowrap
  color: #d0d5d8
  pointer-events: none
</style>
