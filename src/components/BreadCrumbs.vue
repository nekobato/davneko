<template lang="jade">
div.nav-wrapper.breadcrumbs
  div.col.s12
    i.fa.fa-spinner.fa-pulse
    i.material-icons.breadcrumb-icon(v-for='file in files' track-by="$index"
      @click='selectDepth($index)') keyboard_arrow_right
    span.dirname {{ headFileName }}
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
.breadcrumb-icon {
  cursor: pointer
}
.dirname {
  display: inline-block
  line-height: 24px
}
</style>
