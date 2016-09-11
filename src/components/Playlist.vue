<template lang="jade">
ul.collection.blue-grey-text.darken-4.left-align.playlist
  li.collection-item(draggable='true' v-for='queue in queues' track-by="$index")
    i.mdi-content-clear.btn-floating.btn-small.center.red.playlist-deleter(
      v-on:click='removeQueue($index)')
    p.truncate {{queue.name}}
</template>
<script>
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
  }
}

</script>
<style lang="stylus" scoped>
$width-pc = 992px
$side-nav-width = 50%

.playlist {
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
  p {
    margin: 0
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
