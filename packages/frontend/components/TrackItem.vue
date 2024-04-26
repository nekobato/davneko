<script setup lang="ts">
import { computed, type PropType } from "vue";
import { Icon } from "@iconify/vue";
import CoverImage from "./CoverImage.vue";

type Option = {
  label: string;
  action: "addQueue";
};

const props = defineProps({
  type: {
    type: String as PropType<"track" | "album" | "playlist" | "directory">,
    required: true,
  },
  coverSrc: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: false,
  },
  options: {
    type: Array as PropType<Option[]>,
    required: false,
  },
});

const imageSize = computed(() => {
  switch (props.type) {
    case "track":
      return 48;
    case "album":
    case "playlist":
    case "directory":
      return 56;
  }
});

const coverType = computed(() => {
  switch (props.type) {
    case "track":
    case "album":
      return "image";
    case "playlist":
    case "directory":
    case "directory":
      return "icon";
  }
});
</script>

<template>
  <div class="track-item" :class="[props.type]">
    <CoverImage class="image" :src="props.coverSrc!" :size="imageSize" v-if="coverType === 'image'" />
    <Icon class="icon" icon="mingcute:folder-line" v-if="coverType === 'icon'" />
    <div class="title-group">
      <span class="title">{{ props.title }}</span>
      <span class="sub-title">{{ props.subTitle }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.track-item {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: var(--token-color-foreground);
  cursor: pointer;

  &:hover {
    background-color: var(--token-color-foreground-hover);
  }

  .title-group {
    gap: 2px;
    margin-left: 8px;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .title {
    font-size: var(--font-size-16);
    line-height: 1;
    font-weight: normal;
    color: var(--token-color-text-primary);
  }

  .sub-title {
    font-size: var(--font-size-12);
    line-height: 1;
    color: var(--token-color-text-secondary);
    font-weight: normal;
  }
}
</style>
