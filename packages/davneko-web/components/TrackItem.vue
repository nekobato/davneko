<script lang="ts" setup>
import type { Track } from "~/types/app";

const props = defineProps({
  track: {
    type: Object as PropType<Track>,
    required: true
  }
});

const durationTime = computed(() => {
  const minutes = Math.floor(props.track.duration / 60);
  const seconds = props.track.duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});
</script>
<template>
  <div class="track-item">
    <CoverImage
      class="thumbnail"
      :src="track.thumbnailUrl"
      alt="thumbnail"
      size="w56"
    />
    <div class="track-info">
      <span class="title">{{ track.title }}</span>
      <span class="artist">{{ track.artist.name }}</span>
      <span class="duration">{{ durationTime }}</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.track-item {
  display: flex;
  height: 56px;
}

.thumbnail {
  flex: 0 0 auto;
}

.track-info {
  display: inline-flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 2px;
  flex: 1 0 auto;
  padding: 0 8px;

  .title {
    flex: 0 0 auto;
    font-size: var(--font-size-12);
    font-weight: bold;
    color: var(--color-white);
    overflow: hidden;
  }

  .artist {
    flex: 0 0 auto;
    font-size: var(--font-size-10);
    font-weight: bold;
    color: var(--color-grey-200);
    overflow: hidden;
  }

  .duration {
    position: absolute;
    right: 8px;
    margin: auto;
    font-size: var(--font-size-10);
    color: var(--color-grey-200);
  }
}
</style>
