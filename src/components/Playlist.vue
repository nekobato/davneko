<template lang="jade">
ul.collection.white.blue-grey-text.darken-4.left-align.playlist
  li.collection-item(
    v-for='queue in queues', track-by="$index",
    @click='selectAudio($index)',
    :class='{ active: control.playIndex === $index }')
    i.material-icons.grey-text.playlist-deleter(
      @click.prevent='removeQueue($index)') close
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
      queues: ({ playlist }) => playlist.queues,
      control: ({ player }) => player.control
    },
    actions: {
      removeQueue,
      removeQueues
    }
  },
  methods: {
    selectAudio: function (index) {
      this.$store.dispatch(types.PLAY_QUEUE, this.queues[index], index)
    },
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
    cursor: pointer
    &:hover {
      .playlist-deleter,
      .playlist-replacer {
        display: inline-block
      }
    }
  }
}
.playlist-deleter {
  right: 5px
  display: none
  position: absolute
}
</style>
