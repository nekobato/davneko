<script></script>
<template>
  <div class="layout">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.layout {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--color-grey-800);
}
</style>
