<script lang="ts" setup>
// import IconPrevious from "~/assets/icons/skip_previous.svg";
// import IconPlay from "~/assets/icons/play.svg";
// import IconPause from "~/assets/icons/pause.svg";
// import IconNext from "~/assets/icons/skip_next.svg";

const audioEl: HTMLAudioElement = ref(null);

const props = defineProps({
  player: Object,
});

const audioState = reactive({
  isPlaying: false,
  currentTime: 0,
  duration: 0,
});

watch(
  () => props.player.currentTime,
  (currentTime, _) => {
    audioEl.currentTime = currentTime;
  }
);

const src = computed(() =>
  props.player.item.path ? "/api/audio/file?path=" + props.player.item.path : ""
);

const progressStyle = computed(() => {
  return {
    width:
      ((audioState.currentTime / audioState.duration) * 100).toString() + "%",
  };
});

const play = () => {
  audioEl.play();
};

const pause = () => {
  audioEl.pause();
};
const next = () => {
  // this.$store.commit(rootTypes.AUDIO_NEXT);
  // this.$store.commit(rootTypes.AUDIO_TIMEUPDATE, 0);
};
const prev = () => {
  // this.$store.commit(rootTypes.AUDIO_PREV);
  // this.$store.commit(rootTypes.AUDIO_TIMEUPDATE, 0);
};
const changeVolume = () => {};
const seek = (e: MouseEvent) => {
  // this.$store.commit(
  //   rootTypes.AUDIO_SEEK,
  //   duration *
  //     (e.offsetX / (this.$refs.seekbar as HTMLDivElement).offsetWidth)
  // );
};
const onCanPlay = () => {};
const onPlay = () => {
  audioState.isPlaying = true;
};
const onPause = () => {
  audioState.isPlaying = false;
};
const onEnded = () => {
  // this.$store.commit(rootTypes.AUDIO_END);
};
const onTimeUpdate = (e: any) => {
  audioState.currentTime = e.target.currentTime;
  // this.$store.commit(rootTypes.AUDIO_TIMEUPDATE, e.target.currentTime);
};
const onLoadedMetaData = (e: any) => {
  audioState.duration = e.target.duration;
  // this.$store.commit(rootTypes.AUDIO_LOADED, { duration: e.target.duration });
  (this as any).analyzeAudio();
};
const onVolumeChange = () => {};
</script>

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
        <IconPause class="icon" v-if="audioState.isPlaying" @click="pause" />
        <IconPlay class="icon" v-else @click="play" />
      </button>
      <button class="next">
        <IconNext class="icon" />
      </button>
    </div>
  </div>
</template>

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
