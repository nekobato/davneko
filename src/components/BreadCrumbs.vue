<template lang="jade">
div.nav-wrapper.breadcrumbs
  div.col.s12
    i.fa.fa-spinner.fa-pulse
    span.breadcrumb
      i.material-icons(v-for='file in depth' @click='selectDepth(file, $index)') keyboard_arrow_right
    span.breadcrumb pathname
</template>
<script>
import { selectDepth } from '../vuex/actions'

export default {
  vuex: {
    actions: {
      selectDepth
    }
  }
}
</script>
<style lang="stylus">

</style>
