<template>
  <Layout>
    <div class="container">
      <div class="file-list-container">
        <FileList :list="fileList" />
        <Breadcrumb :list="breadcrumbList" />
      </div>
      <div class="player-container">
        <QueueList :list="queueList" />
        <Player :file="file" />
      </div>
      <div class="preview-container">
        <Preview :file="file" />
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      breadcrumbList: [0, 1, 2],
      fileList: [],
      file: {},
    };
  },
  computed: {
    queueList() {
      return this.$store.state.queueList;
    },
  },
  mounted() {
    this.$axios
      .get("/audio/list", {
        params: { path: "/" },
      })
      .then((res) => {
        this.$data.fileList = res.data.files;
      })
      .catch((error: Error) => {
        console.error(error);
      });
  },
});
</script>

<style lang="postcss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.file-list-container,
.player-container,
.preview-container {
  display: grid;
  width: 360px;
  height: 640px;
  border: 1px solid #ddd;
  border-radius: 16px;
  overflow: hidden;
}
.file-list-container {
  grid-template-rows: 1fr 48px;
}
.player-container {
  margin-left: 16px;
  grid-template-rows: 1fr 120px;
}
.preview-container {
  margin-left: 16px;
}
</style>
