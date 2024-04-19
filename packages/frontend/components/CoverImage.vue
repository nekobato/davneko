<script setup lang="ts">
import { computed, type PropType } from "vue";

const props = defineProps({
  size: {
    type: Number as PropType<48 | 56 | 64 | 112 | 152>,
    required: false,
  },
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: false,
  },
});

const classes = computed(() => {
  return {
    "size-48": props.size === 48,
    "size-56": props.size === 56,
    "size-64": props.size === 64,
    "size-112": props.size === 112,
    "size-152": props.size === 152,
    fill: !props.size,
  };
});
</script>

<template>
  <div class="cover-image" :class="classes">
    <img :src="props.src" :alt="props.alt || ''" />
  </div>
</template>

<style lang="scss" scoped>
.cover-image {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  &.size-48 {
    width: 48px;
    height: 48px;
  }
  &.size-56 {
    width: 56px;
    height: 56px;
  }
  &.size-64 {
    width: 64px;
    height: 64px;
  }
  &.size-112 {
    width: 112px;
    height: 112px;
  }
  &.size-152 {
    width: 152px;
    height: 152px;
  }
  &.fill {
    width: 100%;
    height: 100%;
  }
  img {
    width: inherit;
    height: inherit;
    object-fit: cover;
  }
}
</style>
