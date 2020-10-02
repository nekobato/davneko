<template>
  <ul>
    <li v-for="(item, index) in list" :key="index">
      <span class="title">Item Title</span>
      <span class="duration">12:34</span>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { rootTypes } from "~/store";

export default Vue.extend({
  components: {},
  props: ["list"],
  data() {
    return {};
  },
  methods: {},
});
</script>

<style lang="postcss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: scroll;
}
li {
  display: flex;
  align-items: center;
  height: 40px;
  border-top: 1px solid #ddd;
  &:first-child {
    border-top: none;
  }
}
.title {
  margin: auto auto auto 8px;
  font-size: 16px;
}
.duration {
  margin: auto 8px auto auto;
}
</style>
