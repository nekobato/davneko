<template>
  <Layout>
    <div class="container">
      <div class="file-list-container">
        <FileList :list="fileList" />
        <Breadcrumb :list="breadcrumbList" />
      </div>
      <div class="player-container">
        <QueueList :list="queueList" />
        <Player :player="player" />
      </div>
      <div class="preview-container">
        <Preview :file="file" />
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { rootTypes } from "~/store";
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
    player() {
      return this.$store.state.player;
    },
  },
  watch: {
    $route(to, from) {
      if (to.query.dir !== from.query.dir) {
        this.fetchAudioList(to.query.dir);
      }
    },
  },
  methods: {
    fetchAudioList(dir: string) {
      this.$store.commit(rootTypes.SET_DEPTH, dir);
      this.$axios
        .get("/audio/list", {
          params: {
            path: dir,
          },
        })
        .then((res) => {
          this.$data.fileList = res.data.list;
        })
        .catch(console.error);
    },
  },
  mounted() {
    this.fetchAudioList((this.$route.query.dir as string) || "");
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
