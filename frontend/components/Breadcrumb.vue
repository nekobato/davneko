<template>
  <nav role="Breadcrumb">
    <ol class="breadcrumb-list">
      <li v-for="(item, index) in depthList" :key="index">
        <nuxt-link class="page-icon" to=""><IconFolder class="nn-icon size-small" /></nuxt-link>
        <IconArrowRight class="nn-icon size-xsmall icon-arrow-right" />
      </li>
      <li aria-current="page">
        <span class="page-title">Page Title</span>
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
    font-size: 16px;
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
