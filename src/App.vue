<template>
  <div id="app" class="app">
    <router-view class="page-view" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { getLoginStatus } from "./api";

export default {
  name: "App",
  created() {
    getLoginStatus().then(res => {
      console.log(res);
    });
  },
};
</script>
<style>
html,
body {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<style lang="postcss" scoped>
.app {
  --header-height: 40px;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  .page-view {
    position: relative;
    width: 100%;
    overflow: scroll;
  }
}
.header {
  flex-shrink: 0;
  height: var(--header-height);
}
</style>
