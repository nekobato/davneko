<script lang="ts" setup>
const tracks = [
  {
    id: "1",
    title: "Track 1",
    thumbnailUrl: "https://via.placeholder.com/152",
    url: "https://via.placeholder.com/152",
    artist: {
      id: "1",
      name: "Artist 1"
    },
    album: {
      id: "1",
      title: "Album 1"
    },
    duration: 180
  },
  {
    id: "2",
    title: "Track 2",
    thumbnailUrl: "https://via.placeholder.com/152",
    url: "https://via.placeholder.com/152",
    artist: {
      id: "2",
      name: "Artist 2"
    },
    album: {
      id: "1",
      title: "Album 1"
    },
    duration: 240
  },
  {
    id: "3",
    title: "Track 3",
    thumbnailUrl: "https://via.placeholder.com/152",
    url: "https://via.placeholder.com/152",
    artist: {
      id: "3",
      name: "Artist 3"
    },
    album: {
      id: "1",
      title: "Album 1"
    },
    duration: 300
  }
];
</script>
<template>
  <NuxtLayout name="main">
    <div class="compobox-container">
      <div class="compobox left"></div>
      <div class="compobox"></div>
      <div class="compobox right">
        <TrackItem v-for="track in tracks" :key="track.id" :track="track" />
      </div>
    </div>
  </NuxtLayout>
</template>
<style lang="scss" scoped>
.compobox-container {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 16px;
}
.compobox {
  border: 2px solid var(--color-grey-50);
  width: 360px;
  height: 80%;
  border-radius: 24px;
  // neon effect
  box-shadow: 0 0 16px 4px var(--color-white-t200);
  overflow: hidden;

  &.left {
    transform: perspective(1600px) rotateY(30deg);
    transform-origin: center right;
  }

  &.right {
    transform: perspective(1600px) rotateY(-30deg);
    transform-origin: center left;
    padding: 16px;
  }
}
</style>
