<template lang="jade">
ul.collection.white.blue-grey-text.darken-4.left-align.playlist
  li.collection-item(draggable='true' v-for='queue in queues' track-by="$index")
    i.material-icons.btn-floating.btn-small.center.red.playlist-deleter(
      v-on:click='removeQueue($index)') close
    span.truncate {{ queue.name }}
  li.collection-item
    button.btn.teal.white-text(@click='clearPlayList')
      i.material-icons clear_all
</template>
<script>
import * as types from '../vuex/mutation-types'
import { removeQueue, removeQueues } from '../vuex/actions'

export default {
  vuex: {
    getters: {
      queues: ({ playlist }) => playlist.queues
    },
    actions: {
      removeQueue,
      removeQueues
    }
  },
  methods: {
    clearPlayList: function () {
      this.$store.dispatch(types.REMOVE_QUEUES)
    }
  }
}

</script>
<style lang="stylus" scoped>
$width-pc = 992px
$side-nav-width = 50%

.playlist {
  margin: 0
  height: 100%
  overflow-y: scroll
  & > li {
    position: relative
    &:hover {
      .playlist-deleter,
      .playlist-replacer {
        display: inline-block
      }
    }
  }
}
.playlist-deleter,
.playlist-replacer {
  display: none
  position: absolute
}
.playlist-deleter {
  right: 5px
  top: 2px
}
.playlist-replacer {
  left: -6px
  font-size: 2em
  cursor: pointer
}
</style>
