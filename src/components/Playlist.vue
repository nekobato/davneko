<template>
  <div class="white playlist">
    <div class="blue-grey actions">
      <i class="material-icons action" @click="clearPlayList">clear_all</i>
    </div>
    <ul
      class="collection white blue-grey-text darken-4 left-align queues"
      ref="playlist"
    >
      <li
        class="collection-item"
        v-for="(queue, index) in queues"
        :key="index"
        @click="selectAudio(index)"
        @dblclick="replayAudio"
        :class="{ active: control.playIndex === index }"
      >
        <i
          class="material-icons playlist-deleter"
          @click.prevent.stop="removeQueue(index)"
          :class="{
            'white-text': control.playIndex === index,
            'grey-text': control.playIndex !== index,
          }"
          >close</i
        >
        <span class="truncate">{{ queue.name }}</span>
        <span class="duration" v-if="queue.duration">{{
          readableDuration(queue.duration)
        }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import Sortable from 'sortablejs';
import * as types from '../store/mutation-types';
import { removeQueue, removeQueues } from '../store/actions';
import { mapActions } from 'vuex';

export default {
  computed: {
    queues() {
      return this.$store.state.playlist.queues;
    },
    control() {
      return this.$store.state.player.control;
    },
  },
  methods: {
    ...mapActions(['removeQueue', 'removeQueues']),
    selectAudio: function(index) {
      this.$store.commit(types.PLAY_QUEUE, { index, ...this.queues[index] });
    },
    replayAudio: function() {
      // player componentにイベント伝搬するのどうやるの
      document.querySelector('#audio_player').currentTime = 0;
      document.querySelector('#audio_player').load();
    },
    clearPlayList: function() {
      this.$store.commit(types.REMOVE_QUEUES);
    },
    readableDuration: function(duration) {
      return (
        Math.floor(duration / 60) +
        ':' +
        ('00' + Math.floor(duration % 60)).slice(-2)
      );
    },
  },
  ready() {
    Sortable.create(this.$refs.playlist, {
      onEnd: e => {
        this.$store.commit(types.UPDATE_QUEUES, e);
      },
    });
  },
};
</script>
<style lang="stylus" scoped>
$width-pc = 992px;
$side-nav-width = 50%;

.playlist {
  display: flex;
  height: 100%;
  align-items: stretch;
}

.actions {
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  display: inline-block;
  padding: 10px 0 0;
  width: 46px;
  height: 100%;
}

.action {
  width: 100%;
  height: 32px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  color: #ffffff; // white

  &:hover {
    color: #90caf9; // blue lighten-3
  }
}

.queues {
  margin: 0;
  width: 100%;
  overflow-y: scroll;

  & > li {
    position: relative;
    cursor: pointer;

    &:hover {
      .playlist-deleter, .playlist-replacer {
        display: inline-block;
      }
    }
  }
}

.playlist-deleter {
  right: 5px;
  display: none;
  position: absolute;
}

.duration {
  position: absolute;
  top: 0;
  right: 8px;
  bottom: 0;
  margin: auto;
  height: 1.5em;
}
</style>
