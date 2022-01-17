<template>
  <ul>
    <li v-for="(item, index) in list" :key="index" @click="play(index)">
      <span class="title">{{ item.name }}</span>
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
  methods: {
    play(index: number) {
      this.$store.commit(rootTypes.SET_PLAYITEM, index);
    },
  },
});
</script>

<style lang="postcss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-y: scroll;
}
li {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  border-top: 1px solid #ddd;
  cursor: pointer;
  overflow: hidden;
  &:first-child {
    border-top: none;
  }
}
.title {
  display: inline-flex;
  align-items: center;
  margin: auto auto auto 8px;
  height: 2em;
  font-size: 14px;
  line-height: 16px;
  word-break: break-all;
  text-overflow: ellipsis;
}
.duration {
  flex-shrink: 0;
  margin: auto 8px auto auto;
}
</style>
