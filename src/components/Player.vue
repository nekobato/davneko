<template>
  <div class="card blue-grey darken-2 white-text player">
    <div class="card-content player-content">
      <audio
        class="audio"
        id="audio_player"
        ref="audio"
        :loop="isLoopOne"
        :src="encodedAudioURL"
        @play="onPlay"
        @pause="onPause"
        @timeupdate="onTimeUpdate"
        @ended="onEnded"
        autoplay="autoplay"
      ></audio>
      <div class="audio-title-container">
        <span class="card-title audio-title">{{ fileName }}</span>
      </div>
      <div class="seekbar black" ref="seekbar" @click="onClickSeekbar($event)">
        <div class="seekbar-inner red darken-2" :style="{ width: seekingParcent }"/>
      </div>
    </div>
    <div class="card-action controller">
      <div class="play-btn-group">
        <div class="btn-flat">
          <i class="material-icons white-text" @click="playPrev" v-if="isAudioExists">skip_previous</i>
          <i class="material-icons grey-text" refse>skip_previous</i>
        </div>
        <div class="btn-floating waves-effect waves-light red">
          <i class="material-icons" v-show="control.isPlaying" @click="pause">pause</i>
          <i
            class="material-icons"
            v-show="!control.isPlaying"
            @click="play"
            v-if="isAudioExists"
          >play_arrow</i>
          <i class="material-icons" refse>play_arrow</i>
        </div>
        <div class="btn-flat">
          <i class="material-icons white-text" @click="playNext" v-if="isAudioExists">skip_next</i>
          <i class="material-icons grey-text" refse>skip_next</i>
        </div>
      </div>
      <div class="sub-actions">
        <div class="btn-flat white-text">
          <i class="material-icons" @click="toggleVolumeChangeMode">volume_up</i>
        </div>
        <div class="btn-flat white-text" @click="changeLoop">
          <i class="material-icons" v-show="control.loop === 'no'">arrow_forward</i>
          <i class="material-icons" v-show="control.loop === 'one'">repeat_one</i>
          <i class="material-icons" v-show="control.loop === 'all'">repeat</i>
        </div>
      </div>
    </div>
    <div class="volume-controller" v-show="volumeChangeMode">
      <i class="material-icons white-text">volume_down</i>
      <input
        class="volume-range"
        type="range"
        min="0"
        max="100"
        v-model="volume"
        @change="onVolumeChanged"
      >
      <i class="material-icons white-text">volume_up</i>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import * as types from "../store/mutation-types";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      volumeChangeMode: false,
      volume: 100
    };
  },
  computed: {
    file() {
      return this.$store.state.player.file;
    },
    control() {
      return this.$store.state.player.control;
    },
    playlist() {
      return this.$store.state.playlist;
    },
    encodedAudioURL: function() {
      if (_.isEmpty(this.file)) return false;
      return `/api/path?path=${encodeURIComponent(this.file.path)}`;
    },
    seekingParcent: {
      cache: false,
      get: function() {
        if (!this.$refs.audio) {
          return "0%";
        }
        return (
          (this.control.currentTime / this.$refs.audio.duration) * 100 + "%"
        );
      }
    },
    isLoopOne: function() {
      if (this.control.loop === "one") {
        return true;
      } else {
        return false;
      }
    },
    isAudioExists: function() {
      if (_.isEmpty(this.file)) {
        return false;
      } else {
        return true;
      }
    },
    fileName() {
      return this.file.name || "No Audio";
    }
  },
  methods: {
    ...mapActions(["changeLoop"]),
    play: function() {
      this.$refs.audio.play();
    },
    pause: function() {
      this.$refs.audio.pause();
    },
    playPrev: function() {
      const index = this.control.playIndex;
      const maxIndex = this.playlist.queues.length - 1;
      if (this.playlist.queues.length <= 1) {
        // nothing to do
      } else if (this.playlist.queues[index - 1]) {
        this.$store.dispatch(
          types.PLAY_QUEUE,
          this.playlist.queues[index - 1],
          index - 1
        );
      } else {
        this.$store.dispatch(
          types.PLAY_QUEUE,
          this.playlist.queues[maxIndex],
          maxIndex
        );
      }
    },
    playNext: function() {
      const index = this.control.playIndex;
      if (this.playlist.queues.length <= 1) {
        // nothing to do
      } else if (this.playlist.queues[index + 1]) {
        this.$store.dispatch(
          types.PLAY_QUEUE,
          this.playlist.queues[index + 1],
          index + 1
        );
      } else {
        this.$store.dispatch(types.PLAY_QUEUE, this.playlist.queues[0], 0);
      }
    },
    onPlay: function() {
      this.$store.dispatch(types.AUDIO_PLAYED);
    },
    onPause: function() {
      this.$store.dispatch(types.AUDIO_PAUSED);
    },
    onTimeUpdate: function() {
      this.$store.dispatch(
        types.AUDIO_TIME_UPDATED,
        this.$refs.audio.currentTime
      );
    },
    onEnded: function() {
      this.$store.dispatch(types.AUDIO_ENDED);
      if (
        this.control.loop === "no" &&
        this.control.playIndex === this.playlist.queues.length - 1
      ) {
        return;
      } else if (this.control.loop !== "one") {
        this.playNext();
      }
    },
    toggleMute: function() {
      this.$store.dispatch(types.AUDIO_TOGGLE_MUTE);
    },
    onVolumeChanged: function() {
      this.$refs.audio.volume = this.$data.volume / 100;
    },
    onClickSeekbar: function(e) {
      const parcentage = e.offsetX / this.$refs.seekbar.offsetWidth;
      this.$refs.audio.currentTime = this.$refs.audio.duration * parcentage;
    },
    toggleVolumeChangeMode: function() {
      this.$data.volumeChangeMode = !this.$data.volumeChangeMode;
    }
  }
};
</script>
<style lang="stylus" scoped>
@keyframes anime-boundbox {
  0% {
    transform: scale(1);
  }

  30% {
    transform: scale(1.02);
  }

  100% {
    transform: scale(1);
  }
}

.player {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0;
}

.player-content {
  padding: 10px 20px;
}

.card-title {
  word-break: break-all;
  white-space: nowrap;
}

.audio-title-container {
  overflow-x: hidden;
  height: 36px;

  .audio-title {
    line-height: 36px;
  }
}

.audio {
  display: none;
}

.play-btn-group {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  .btn-flat {
    padding: 0 8px;
  }
}

.btn-container {
  display: inline-block;
  cursor: pointer;
}

.sub-actions {
  position: absolute;
  top: 8px;
  right: 8px;
  margin: auto;
  height: 24px;

  .btn-flat {
    padding: 0 8px;
  }
}

.boundbox {
  animation: anime-boundbox 0.3s ease 0s 1 normal;
}

.seekbar {
  position: relative;
  margin: 10px 0 0;
  width: 100%;
  height: 10px;
  border-radius: 5px;
}

.seekbar-inner {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 5px;
  transition: width 0.1s ease 0s;
}

.controller {
  padding: 8px 20px;
  text-align: center;
}

.volume-controller {
  display: flex;
  padding: 8px;

  .volume-range {
    margin: 0 8px;
    border: 0;
  }
}
</style>
