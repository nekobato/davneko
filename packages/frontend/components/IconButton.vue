<script setup lang="ts">
import { computed, type PropType } from "vue";

const props = defineProps({
  size: {
    type: Number as PropType<undefined | 24 | 32 | 40>,
  },
  label: {
    type: String,
  },
});
</script>

<template>
  <button class="icon-button" :class="[`size-${props.size}`]">
    <slot />
    <span class="label" v-if="props.label">{{ props.label }}</span>
  </button>
</template>

<style lang="scss" scoped>
.icon-button {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
  border: none;
  border-radius: 4px;
  background-color: var(--token-color-foreground);

  &:hover {
    background-color: var(--token-color-foreground-hover);
  }

  &.size-24 {
    width: 24px;
    height: 24px;
  }

  &.size-32 {
    width: 32px;
    height: 32px;
  }

  &.size-40 {
    width: 40px;
    height: 40px;
  }

  .label {
    font-size: var(--font-size-10);
    font-weight: bold;
    line-height: 1;
    color: var(--token-color-text);
  }
}
</style>
