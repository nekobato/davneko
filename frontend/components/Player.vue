<template>
  <div class="player">
    <div class="progress-bar">
      <div class="progress-bar-inner"></div>
    </div>
    <div class="controller">
      <button class="previous">
        <IconPrevious class="icon" />
      </button>
      <button class="play-pause">
        <IconPause class="icon" v-if="isPlaying" />
        <IconPlay class="icon" v-else />
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

export default Vue.extend({
  components: {
    IconPrevious,
    IconPlay,
    IconPause,
    IconNext,
  },
  props: ["file"],
  data: () => ({
    isPlaying: false,
  }),
  methods: {},
});
</script>

<style lang="postcss" scoped>
.player {
  display: grid;
  grid-template-rows: 40px 1fr;
  padding: 8px;
  height: 120px;
  border: 1px solid #ddd;
  border-radius: 16px;
}
.progress-bar {
  position: relative;
  width: 100%;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 20px;
  overflow: hidden;
}
.progress-bar-inner {
  width: 50%;
  height: 100%;
  background: #ddd;
}
.controller {
  display: flex;
  place-content: center;
  & > button {
    display: inline-flex;
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
