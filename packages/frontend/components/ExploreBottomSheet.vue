<script lang="ts" setup>
import { SwipeModal } from "@takuma-ru/vue-swipe-modal";

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <SwipeModal :modelValue="props.open" :isBackdrop="false" :isFullScreen="false" snapPoint="calc(100vh - 48px)">
    <slot />
  </SwipeModal>
</template>

<style lang="scss" scoped></style>
