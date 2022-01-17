<template>
  <ul>
    <li v-for="(item, index) in list" :key="index">
      <nuxt-link
        class="item-content"
        v-if="item.type === 'directory'"
        :to="{ path: '/', query: { dir: `${item.path}` } }"
      >
        <IconFolder class="nn-icon size-small dir-icon" />
        <span class="title">{{ item.name }}</span>
      </nuxt-link>
      <div class="item-content" v-else @click="addQueue(item)">
        <span class="title">{{ item.name }}</span>
        <span class="duration">12:34</span>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { rootTypes } from "~/store";
import IconFolder from "~/assets/icons/folder.svg";

export default Vue.extend({
  components: { IconFolder },
  props: ["list"],
  data() {
    return {};
  },
  methods: {
    addDepth(item: any) {
      this.$store.commit(rootTypes.ADD_DEPTH, item);
    },
    addQueue(item: any) {
      this.$store.commit(rootTypes.ADD_QUEUE, item);
    },
  },
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
  width: 100%;
  height: 40px;
  border-top: 1px solid #ddd;
  cursor: pointer;
  overflow: hidden;
  &:first-child {
    border-top: none;
  }
}
.item-content {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  text-decoration: none;
  color: #333333;
}
.nn-icon {
  flex-shrink: 0;
  margin: auto 0 auto 8px;
  fill: rgba(0, 0, 0, 0.32);
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
  margin: auto 8px auto 4px;
}
</style>
