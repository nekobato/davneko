<script lang="ts" setup></script>
<template>
  <NuxtLayout name="main" class="player-layout">
    <div class="compobox left"></div>
    <div class="compobox"></div>
    <div class="compobox right"></div>
  </NuxtLayout>
</template>
<style lang="scss" scoped>
.player-layout {
  gap: 16px;
}
.compobox {
  border: 4px solid var(--color-grey-50);
  width: 360px;
  height: 640px;
  border-radius: 24px;
  // neon effect
  box-shadow: 0 0 16px 4px var(--color-white-t200);

  &.left {
    transform: perspective(1600px) rotateY(30deg);
    transform-origin: center right;
  }

  &.right {
    transform: perspective(1600px) rotateY(-30deg);
    transform-origin: center left;
  }
}
</style>
