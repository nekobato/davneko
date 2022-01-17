<template>
  <router-link class="back-button" :to="src" v-if="src">
    <IconArrowBack class="nn-icon type-small" /><span>戻る</span>
  </router-link>
  <button class="back-button" @click="back" v-else>
    <IconArrowBack class="nn-icon type-small" /><span>戻る</span>
  </button>
</template>
<script lang="ts">
import Vue from "vue";
import IconArrowBack from "@/assets/icons/arrow_back.svg";
export default Vue.extend({
  props: ["src"],
  components: { IconArrowBack },
  methods: {
    back() {
      this.$router.back();
    },
  },
});
</script>
<style lang="postcss" scoped>
@import "@/assets/styles/variables.pcss";

.back-button {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  padding: 0;
  background: transparent;
  border: none;
  text-decoration: none;
  cursor: pointer;
  span {
    margin-left: 4px;
    color: $service-color-primary;
    font-weight: bold;
    text-decoration: none;
  }
  .nn-icon {
    margin: 0;
    fill: $service-color-primary;
  }
  &:hover,
  &:focus {
    span {
      color: $service-color-primary-lighten-20;
    }
    .nn-icon {
      fill: $service-color-primary-lighten-20;
    }
  }
  &:active {
    span {
      color: $service-color-primary-darken-20;
    }
    .nn-icon {
      fill: $service-color-primary-darken-20;
    }
  }
}
.nn-icon {
  margin-left: 4px;
}
</style>
