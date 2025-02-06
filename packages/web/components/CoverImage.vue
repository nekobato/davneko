<script lang="ts" setup>
defineProps({
  src: String,
  alt: String,
  size: {
    type: String as PropType<"w48" | "w56" | "w64" | "w112" | "w152" | "fill">,
    default: "fill"
  }
});
</script>
<template>
  <NuxtImg :src="src" :alt="alt" :class="['cover-image', size]" />
</template>
<style lang="scss" scoped>
.cover-image {
  object-fit: cover;

  &.w48 {
    width: 48px;
    height: 48px;
  }

  &.w56 {
    width: 56px;
    height: 56px;
  }

  &.w64 {
    width: 64px;
    height: 64px;
  }

  &.w112 {
    width: 112px;
    height: 112px;
  }

  &.w152 {
    width: 152px;
    height: 152px;
  }

  &.fill {
    width: 100%;
    height: 100%;
  }
}
</style>
