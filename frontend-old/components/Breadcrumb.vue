<template>
  <nav role="Breadcrumb">
    <ol class="breadcrumb-list">
      <li
        v-for="(item, index) in list"
        :key="index"
        :aria-current="index === list.length - 1 ? 'page' : null"
      >
        <span class="page-title" v-if="index === list.length - 1">{{ item.name }}</span>
        <nuxt-link class="page-icon" :to="{ path: '/', query: { dir: item.path } }" v-else>
          <IconFolder class="nn-icon size-small" />
        </nuxt-link>
        <IconArrowRight
          class="nn-icon size-xsmall icon-arrow-right"
          v-if="index !== list.length - 1"
        />
      </li>
    </ol>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { rootTypes } from "~/store";
import IconArrowRight from "~/assets/icons/arrow_right.svg";
import IconFolder from "~/assets/icons/folder.svg";

export default Vue.extend({
  components: {
    IconArrowRight,
    IconFolder,
  },
  props: ["list"],
  data() {
    return {};
  },
  computed: {
    depthList() {
      return this.list.filter((item: any, index: number) => index !== this.list.length - 1);
    },
    currentItem() {
      return this.list[this.list.length - 1];
    },
  },
});
</script>

<style lang="postcss" scoped>
.breadcrumb-list {
  display: flex;
  flex-wrap: nowrap;
  padding: 0 8px;
  height: 100%;
  overflow-x: hidden;
  & > li {
    flex-shrink: 0;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
  }
  .page-title {
    font-size: 14px;
  }
  .page-icon {
    text-decoration: none;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
  }
  .icon-arrow-right {
    margin: 0 4px;
  }
}
</style>
