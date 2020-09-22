<template>
  <div class="modal-container" :class="{ hidden: hidden }">
    <div class="scrim" @click="close"></div>
    <div class="modal">
      <component class="modal-contents" :is="content" :payload="payload" />
      <button class="nn-icon-button close-button" @click="close">
        <IconClose class="nn-icon type-small" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import IconClose from "@/assets/icons/close.svg";
export default Vue.extend({
  name: "Modal",
  components: {
    IconClose,
  },
  props: ["hidden", "content", "payload"],
  methods: {
    close() {
      this.$store.commit("CLOSE_MODAL");
    },
  },
});
</script>

<style lang="postcss" scoped>
.modal-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  width: 100%;
  height: 100%;
  &.hidden {
    visibility: hidden;
  }
  .scrim {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  .modal {
    position: relative;
    min-width: 640px;
    min-height: 40px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 4px rgba(82, 72, 72, 0.32);
    overflow: hidden;
  }
  .modal-contents {
    display: flex;
    overflow-y: auto;
  }
  .close-button {
    position: absolute;
    top: 8px;
    right: 8px;
  }
}
</style>
