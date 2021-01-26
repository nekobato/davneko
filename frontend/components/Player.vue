<template>
  <div class="player">
    <audio
      :src="src"
      @canplay="onCanPlay"
      @play="onPlay"
      @pause="onPause"
      @ended="onEnded"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetaData"
      @volumechange="onVolumeChange"
      ref="audio"
      autoplay
    />
    <div class="progress-bar" @click="seek" ref="seekbar">
      <div class="progress-bar-inner" :style="progressStyle"></div>
    </div>
    <div class="controller">
      <button class="previous">
        <IconPrevious class="icon" />
      </button>
      <button class="play-pause">
        <IconPause class="icon" v-if="isPlaying" @click="pause" />
        <IconPlay class="icon" v-else @click="play" />
      </button>
      <button class="next">
        <IconNext class="icon" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { rootTypes } from "~/store";
import IconPrevious from "~/assets/icons/skip_previous.svg";
import IconPlay from "~/assets/icons/play.svg";
import IconPause from "~/assets/icons/pause.svg";
import IconNext from "~/assets/icons/skip_next.svg";
import * as musicMetadata from "music-metadata-browser";

export default Vue.extend({
  components: {
    IconPrevious,
    IconPlay,
    IconPause,
    IconNext,
  },
  props: ["player"],
  data: () => ({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
  }),
  watch: {
    "player.currentTime"(val) {
      (this.$refs.audio as HTMLAudioElement).currentTime = val;
    },
  },
  computed: {
    src() {
      return this.player.item.path ? "/api/audio/file?path=" + this.player.item.path : "";
    },
    progressStyle() {
      return { width: ((this.$data.currentTime / this.$data.duration) * 100).toString() + "%" };
    },
  },
  methods: {
    play() {
      (this.$refs.audio as HTMLAudioElement).play();
      this.$store.commit(rootTypes.AUDIO_PLAY);
    },
    pause() {
      (this.$refs.audio as HTMLAudioElement).pause();
      this.$store.commit(rootTypes.AUDIO_PAUSE);
    },
    next() {
      this.$store.commit(rootTypes.AUDIO_NEXT);
      this.$store.commit(rootTypes.AUDIO_TIMEUPDATE, 0);
    },
    prev() {
      this.$store.commit(rootTypes.AUDIO_PREV);
      this.$store.commit(rootTypes.AUDIO_TIMEUPDATE, 0);
    },
    changeVolume() {},
    seek(e: MouseEvent) {
      this.$store.commit(
        rootTypes.AUDIO_SEEK,
        this.$data.duration * (e.offsetX / (this.$refs.seekbar as HTMLDivElement).offsetWidth)
      );
    },
    onCanPlay() {},
    onPlay() {
      this.$data.isPlaying = true;
    },
    onPause() {
      this.$data.isPlaying = false;
    },
    onEnded() {
      this.$store.commit(rootTypes.AUDIO_END);
    },
    onTimeUpdate(e: any) {
      this.$data.currentTime = e.target.currentTime;
      // this.$store.commit(rootTypes.AUDIO_TIMEUPDATE, e.target.currentTime);
    },
    onLoadedMetaData(e: any) {
      this.$data.duration = e.target.duration;
      this.$store.commit(rootTypes.AUDIO_LOADED, { duration: e.target.duration });
      (this as any).analyzeAudio();
    },
    onVolumeChange() {},
    analyzeAudio() {
      musicMetadata.fetchFromUrl((this as any).src).then((data) => {
        console.log(data);
        this.$store.commit(rootTypes.SET_METADATA, {
          title: data.common.title,
          artist: data.common.artist,
          album: data.common.album,
          thumbnail: data.common.picture ? data.common.picture[0] : null,
        });
      });
    },
  },
});
</script>

<style lang="postcss" scoped>
.player {
  display: grid;
  grid-template-rows: 36px 1fr;
  padding: 8px;
  height: 96px;
  border: 1px solid #ddd;
  border-radius: 16px;
}
.progress-bar {
  position: relative;
  width: 100%;
  height: 32px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}
.progress-bar-inner {
  width: 0;
  height: 100%;
  background: #ddd;
  transition: width 0.16s ease;
}
.controller {
  display: flex;
  place-content: center;
  & > button {
    display: inline-flex;
    margin: 0 8px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
  }
  .icon {
    width: 40px;
    height: 40px;
    fill: #222;
  }
}
</style>
