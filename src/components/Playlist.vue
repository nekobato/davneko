<template lang="jade">
div.white.playlist
  div.blue-grey.actions
    i.material-icons.action(@click='clearPlayList') clear_all
  ul.collection.white.blue-grey-text.darken-4.left-align.queues(v-el:playlist)
    li.collection-item(
      v-for='queue in queues', track-by="$index",
      @click='selectAudio($index)',
      @dblclick='replayAudio',
      :class='{ active: control.playIndex === $index }')
      i.material-icons.playlist-deleter(
        @click.prevent.stop='removeQueue($index)',
        :class='{ "white-text": control.playIndex === $index, "grey-text": control.playIndex !== $index }') close
      span.truncate {{ queue.name }}
      span.duration(v-if='queue.duration') {{ readableDuration(queue.duration) }}
</template>
<script>
import Sortable from 'sortablejs'
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
    replayAudio: function () {
      // player componentにイベント伝搬するのどうやるの
      document.querySelector('#audio_player').currentTime = 0
      document.querySelector('#audio_player').load()
    },
    clearPlayList: function () {
      this.$store.dispatch(types.REMOVE_QUEUES)
    },
    readableDuration: function (duration) {
      return Math.floor(duration / 60) + ':' + ('00' + Math.floor(duration % 60)).slice(-2)
    }
  },
  ready () {
    Sortable.create(this.$els.playlist, {
      onEnd: (e) => {
        this.$store.dispatch(types.UPDATE_QUEUES, e)
      }
    })
  }
}

</script>
<style lang="stylus" scoped>
$width-pc = 992px
$side-nav-width = 50%

.playlist {
  display: flex
  height: 100%
  align-items: stretch
}
.actions {
  display: flex
  align-items: flex-start
  flex-shrink: 0
  display: inline-block
  padding: 10px 0 0
  width: 46px
  height: 100%
}
.action {
  width: 100%
  height: 32px
  line-height: 32px
  text-align: center
  cursor: pointer
  color: #ffffff // white
  &:hover {
    color: #90caf9 // blue lighten-3
  }
}
.queues {
  margin: 0
  width: 100%
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
.duration {
  position: absolute
  top: 0
  right: 8px
  bottom: 0
  margin: auto
  height: 1.5em
}
</style>
