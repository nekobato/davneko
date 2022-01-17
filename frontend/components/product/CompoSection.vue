<script lang="ts" setup></script>

<template>
  <div class="compo">
    <slot></slot>
  </div>
</template>

<style lang="postcss" scoped>
.compo {
  border: 1px solid #ddd;
  border-radius: 8px;
  min-width: 320px;
  min-height: 240px;
  display: flex;
}
</style>
