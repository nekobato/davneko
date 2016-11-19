<template lang="jade">
div.col.s12.blue-grey.lighten-2.breadcrumbs
    div.breadcrumbs-loader(v-show="status.isFetching")
      i.material-icons spinner
    div.breadcrumbs-content(v-show="!status.isFetching")
      span.btn.btn-floating.button(v-for='file in files', track-by="$index")
        i.material-icons.blue-grey-text.button-icon(@click='selectDepth($index)') chevron_right
      span.white-text.dirname {{ headFileName }}
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
.breadcrumbs {
  display: flex
  flex-shrink: 0
  align-items: center
  padding: 0 0 0 20px
  height: 60px
  color: #000000
}
.button {
  flex-shrink: 0
  margin: 0 6px 0 0
  background-color: #fff
  border: 2px solid #26a69a

  &:active {
    background-color: #ddd
  }
}
.button-icon {
  line-height: 33px
  font-size: 28px
  cursor: pointer
}
.dirname {
  display: inline-block
  margin: 0 0 0 6px
  white-space: nowrap
}
</style>
