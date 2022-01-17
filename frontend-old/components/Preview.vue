<template>
  <div class="preview">
    <img class="artwork" :src="thumbnail" />
    <div class="description">
      <span class="title">{{ preview.title }}</span>
      <span class="author">{{ preview.artist }}</span>
      <span class="album">{{ preview.album }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { rootTypes } from "~/store";

export default Vue.extend({
  components: {},
  props: ["preview"],
  data: () => ({
    isPlaying: false,
  }),
  computed: {
    thumbnail() {
      return (this.preview as any).thumbnail?.data
        ? URL.createObjectURL(
            new Blob([this.preview.thumbnail.data.buffer], { type: this.preview.thumbnail.format })
          )
        : null;
    },
  },
});
</script>

<style lang="postcss" scoped>
.preview {
  position: relative;
  margin: auto;
  width: 320px;
  height: 480px;
}
.artwork {
  width: 320px;
  height: 320px;
  border-radius: 8px;
}
.description {
  position: relative;
  display: flex;
  flex-direction: column;
  place-content: flex-start flex-end;
  padding: 8px 0;
  width: 100%;
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
