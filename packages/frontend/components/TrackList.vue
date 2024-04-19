<script setup lang="ts"></script>

<template>
  <div class="track-list">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.track-list {
  overflow-y: scroll;
  height: 100%;
  width: 100%;
}
</style>
