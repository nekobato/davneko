<template>
  <Layout>
    <div class="container">
      <div class="file-list-container">
        <FileList :list="fileList" />
        <Breadcrumb :list="breadcrumbList" />
      </div>
      <div class="queue-container">
        <QueueList :list="queueList" />
      </div>
      <div class="player-container">
        <Player :player="player" />
      </div>
      <div class="preview-container">
        <Preview :preview="metadata" />
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
    metadata() {
      return this.$store.state.metadata;
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
  display: grid;
  grid-template-columns: 360px 360px 360px;
  grid-template-rows: 1fr 96px;
  gap: 8px;
  width: 1120px;
  height: 640px;
  margin: auto;
}
.file-list-container,
.player-container,
.preview-container,
.queue-container {
  display: grid;
  border: 1px solid #ddd;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}
.file-list-container {
  grid-row: 1 / 3;
  grid-column: 1;
  grid-template-rows: 1fr 48px;
  margin-right: 24px;
}
.queue-container {
  grid-row: 1 / 2;
  grid-column: 2;
}
.preview-container {
  grid-row: 1 / 2;
  grid-column: 3;
}
.player-container {
  grid-row: 2 / 3;
  grid-column: 2 / 4;
}
</style>
