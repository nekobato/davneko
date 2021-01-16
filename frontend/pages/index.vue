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
  data: () => ({
    fileList: [0, 1, 2],
    file: {},
  }),
  computed: {
    breadcrumbList() {
      return this.$store.state.breadcrumb;
    },
    queueList() {
      return this.$store.state.queueList;
    },
  },
  watch: {
    breadcrumbList(newList) {
      this.$axios
        .get("/audio/list", { params: { path: newList[newList.length - 1].path } })
        .then((res) => {
          this.$data.fileList = res.data.list;
        })
        .catch(console.error);
    },
  },
  mounted() {
    this.$axios
      .get("/audio/list")
      .then((res) => {
        this.$data.fileList = res.data.list;
      })
      .catch(console.error);
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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
