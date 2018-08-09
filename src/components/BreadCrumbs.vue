<template lang="pug">
div.blue-grey.lighten-2.breadcrumbs
  div.progress(v-show="status.isFetching")
    div.indeterminate
  span.blue-grey-text.text-lighten-3.dirname(v-show="!status.isFetching") {{ headFileName }}
  div.breadcrumbs-content
    i.material-icons.depth(v-show="!status.isFetching", v-for='(file, index) in files', :key="index", @click='selectDepth($index)') navigate_next
</template>
<script>
export default {
  computed: {
    headFileName() {
      if (!this.files.length) return ""
      return this.files[this.files.length-1].name
    },
    files () {
      return this.$store.state.depth.files
    },
    status () {
      return this.$store.state.uiStatus.filer
    }
  },
  methods: {
    selectDepth () {
      this.$store.dispatch('selectDepth')
    }
  }
}
</script>
<style lang="stylus" scoped>
.breadcrumbs
  position: relative
  width: 100%
  height: 60px
.progress
  position: absolute
  left: 0
  bottom: 0
  margin: auto
.depth
  position: relative
  display: inline-block
  width: 40px
  height: 100%
  font-size: 36px
  color: #ffffff
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.16), 0 2px 10px rgba(0, 0, 0, 0.12)
  cursor: pointer
  transition: color 0.1s ease 0s
  line-height: 60px
  &:hover
    color: #455a64
.breadcrumbs-content
  display: flex
  align-items: center
  width: 100%
  height: 60px
.dirname
  position: absolute
  left: 5px
  bottom: 0
  font-size: 24px
  white-space: nowrap
  pointer-events: none
</style>
