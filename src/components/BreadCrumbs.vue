<template lang="jade">
div.col.s12.breadcrumbs
    i.fa.fa-spinner.fa-pulse
    i.material-icons.breadcrumb-icon(v-for='file in files' track-by="$index"
      @click='selectDepth($index)') chevron_right
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
<style lang="stylus" scoped>
.breadcrumbs {
  display: flex
  flex-shrink: 0
  align-items: center
  padding: 0 0 0 20px
  color: #000000
}
.breadcrumb-icon {
  font-size: 28px
  cursor: pointer
}
.dirname {
  display: inline-block
  line-height: 28px
}
</style>
