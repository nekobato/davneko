<template lang="jade">
div.nav-wrapper.breadcrumbs
  div.col.s12
    i.fa.fa-spinner.fa-pulse
    span.breadcrumb
      i.material-icons(v-for='file in files' @click='selectDepth(file, $index)') keyboard_arrow_right
    span {{ headFileName }}
</template>
<script>
import { selectDepth } from '../vuex/actions'

export default {
  vuex: {
    getters: {
      files: ({ depth }) => depth.files
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
<style lang="stylus">
.breadcrumb {
  color: #000000
}
</style>
