<template>
  <div class="preview">
    <img class="artwork" src="" />
    <div class="description">
      <span class="title">Audio Title</span>
      <span class="author">Audio Author</span>
      <span class="album">Audio Album</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { rootTypes } from "~/store";

export default Vue.extend({
  components: {},
  props: ["file"],
  data: () => ({
    isPlaying: false,
  }),
  methods: {},
});
</script>

<style lang="postcss" scoped>
.preview {
  position: relative;
  margin: auto;
  width: 320px;
  height: 320px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}
.artwork {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.description {
  position: relative;
  display: flex;
  flex-direction: column;
  place-content: flex-start flex-end;
  padding: 8px;
  width: 100%;
  height: 100%;
}
.title {
  font-size: 18px;
  font-weight: bold;
}
.author {
  font-size: 14px;
}
.album {
  font-size: 14px;
}
</style>
