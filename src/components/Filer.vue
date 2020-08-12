<template>
  <div class="filer">
    <div class="card blue-grey darken-2 white-text actions">
      <div class="card-action actions-content">
        <div class="input-field">
          <input
            class="search-input"
            id="search_input"
            type="text"
            v-model="searchText"
          />
          <label class="search-label" for="search_input" v-show="!searchText">
            <i class="material-icons">search</i>
          </label>
          <i
            class="material-icons search-clear"
            v-show="searchText"
            @click="clearSearch"
            >close</i
          >
        </div>
        <div class="btn right action-btn col s2" @click="addDir2Queue">
          <i class="material-icons">playlist_add</i>
        </div>
      </div>
    </div>
    <Breadcrumbs />
    <ul class="collection filelist" ref="filelist-box">
      <li
        class="collection-item grey-text text-darken-1 file-item"
        v-for="(file, index) in filelistFilter"
        :key="index"
        @click="onClickFile(file)"
      >
        <span class="truncate">{{ file.name }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import Breadcrumbs from "./BreadCrumbs.vue";
import { mapActions } from "vuex";

export default {
  components: {
    Breadcrumbs,
  },
  data() {
    return {
      searchText: "",
    };
  },
  watch: {
    ["depthDirs"](dirs) {
      if (dirs[dirs.length - 1] && dirs[dirs.length - 1].scrollTop) {
        this.$refs["filelist-box"].scrollTop = dirs[dirs.length - 1].scrollTop;
      }
    },
  },
  filters: {
    filelistFilter(filelist) {
      if (this.$data.searchText) {
        return filelist.filter(file => {
          const re = new RegExp(this.$data.searchText, "g");
          return re.test(file.name);
        });
      }
      return this.filelist;
    },
  },
  computed: {
    filelist() {
      return this.$store.state.filelist.all;
    },
    depthDirs() {
      return this.$store.state.depth.files;
    },
    filelistFilter() {
      if (this.$data.searchText) {
        return this.filelist.filter(file => {
          const re = new RegExp(this.$data.searchText, "g");
          return re.test(file.name);
        });
      }
      return this.filelist;
    },
  },
  methods: {
    ...mapActions(["fetchDir", "addDir2Queue", "selectFile", "ressurectDepth"]),
    // only handling model
    clearSearch() {
      this.$data.searchText = "";
    },
    onClickFile(file) {
      this.selectFile(file, this.$refs["filelist-box"].scrollTop);
    },
  },
  mounted() {
    // start or resurrect
    this.ressurectDepth();
  },
};
</script>
<style lang="postcss" scoped>
@keyframes filer-arrival {
  0% {
    left: 30%;
  }

  100% {
    left: 0;
  }
}

.filer {
  position: absolute;
  left: -440px;
  right: 0;
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 440px;
  height: 100%;
  z-index: 1;
  transition: left 0.4s ease 0s;

  @media (max-width: 992px) {
    left: 0;
  }
}

.actions {
  margin-bottom: 0;
}

.actions-content {
  padding: 10px 20px;
}

.collection {
  li.not-selectable {
    &:hover {
      background: white;
    }
  }
}

.action-btn {
  margin: 0 5px 0 0;

  &:last-child {
    margin: 0;
  }
}

.input-field {
  display: inline-block;
  margin: 0;
  width: 160px;
}

.search-input {
  margin: 0;
  height: 36px;
  color: #fff;
}

.search-label {
  top: 0.5rem;
  left: auto;
  right: 0.25rem;
}

.search-clear {
  position: absolute;
  top: 0.5rem;
  right: 0.25rem;
  cursor: pointer;
}

.filelist {
  margin-top: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
