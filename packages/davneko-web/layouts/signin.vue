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
  flex-direction: column;
  height: 100vh;
}
</style>
