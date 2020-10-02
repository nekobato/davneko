<template>
  <div class="layout">
    <div class="contents-container">
      <div class="contents" :class="{ full: nonav }">
        <slot />
      </div>
    </div>
    <Modal :content="modal.content" :hidden="modal.hidden" :payload="modal.payload" />
    <Dialog :content="dialog.content" :hidden="dialog.hidden" :payload="dialog.payload" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { RootState } from "@/store";

type Type = "default" | "full";

export default Vue.extend({
  name: "Layout",
  props: ["type", "nonav", "nospacing"],
  computed: {
    modal(): RootState["modal"] {
      return this.$store.state.modal;
    },
    dialog(): RootState["dialog"] {
      return this.$store.state.dialog;
    },
  },
});
</script>

<style lang="postcss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  .contents-container {
    display: flex;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .contents {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    &.full {
      overflow-y: hidden;
    }
  }
}
</style>
