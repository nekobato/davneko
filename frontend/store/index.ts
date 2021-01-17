import { spliceStr } from "sequelize/types/lib/utils";
import { MutationTree } from "vuex";

export type RootState = {
  auth: {
    status: boolean;
    data: {};
  };
  user?: {
    id: number;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
  };
  modal: {
    content: string;
    hidden: boolean;
    payload: any;
  };
  dialog: {
    content: string;
    hidden: boolean;
    payload: any;
  };
  queueList: any[];
  audioList: any[];
  breadcrumb: any[];
  player: {
    item: any;
    itemIndex: number;
    isPlaying: boolean;
    duration?: number;
    currentTime?: number;
  };
};

const typeList = [
  "OPEN_MODAL",
  "OPEN_DIALOG",
  "CLOSE_MODAL",
  "CLOSE_DIALOG",
  "SET_AUTH",
  "SET_USER",
  "ADD_QUEUE",
  "REMOVE_QUEUE",
  "ADD_DEPTH",
  "SET_DEPTH",
  "SET_PLAYITEM",
  "AUDIO_PLAY",
  "AUDIO_PAUSE",
  "AUDIO_END",
  "AUDIO_SEEK",
  "AUDIO_NEXT",
  "AUDIO_PREV",
  "AUDIO_TIMEUPDATE",
  "AUDIO_LOADED",
  "AUDIO_VOLUMECHANGE",
] as const;

export const rootTypes: {
  [key in typeof typeList[number]]: string;
} = typeList.reduce((obj: any, type) => {
  obj[type] = type;
  return obj;
}, {});

export const state: () => RootState = () => ({
  auth: {
    status: false,
    data: {},
  },
  user: undefined,
  modal: {
    content: "",
    hidden: true,
    payload: {},
  },
  dialog: {
    content: "",
    hidden: true,
    payload: {},
  },
  queueList: [],
  audioList: [],
  breadcrumb: [
    {
      name: "Root",
      path: "/",
    },
  ],
  player: {
    item: {},
    itemIndex: 0,
    isPlaying: false,
    duration: undefined,
    currentTime: undefined,
  },
});

export const mutations: MutationTree<RootState> = {
  [rootTypes.OPEN_MODAL](store, payload) {
    store.modal.content = payload.content;
    store.modal.hidden = false;
    store.modal.payload = payload.payload;
  },
  [rootTypes.OPEN_DIALOG](store, payload) {
    store.dialog.content = payload.content;
    store.dialog.hidden = false;
    store.dialog.payload = payload.payload;
  },
  [rootTypes.CLOSE_MODAL](store) {
    store.modal.content = "";
    store.modal.hidden = true;
  },
  [rootTypes.CLOSE_DIALOG](store) {
    store.dialog.content = "";
    store.dialog.hidden = true;
    store.dialog.payload = {};
  },
  [rootTypes.SET_AUTH](store, payload) {
    store.auth.status = true;
    store.auth.data = payload;
  },
  [rootTypes.SET_USER](store, payload) {
    store.user = payload;
  },
  [rootTypes.ADD_QUEUE](store, queue: object | object[]) {
    if (store.queueList.length === 0) {
      store.player.item = typeof queue === "object" ? queue : queue[0];
    }
    if (typeof queue === "object") {
      store.queueList.push(queue);
    } else {
      store.queueList = Object.assign(store.queueList, queue);
    }
  },
  [rootTypes.ADD_DEPTH](store, item) {
    store.breadcrumb.push(item);
  },
  [rootTypes.SET_DEPTH](store, dir) {
    store.breadcrumb = dir
      .replace(/^\//, "")
      .split("/")
      .reduce(
        (acc: any[], value: string) => {
          acc.push({
            name: value,
            path: acc[acc.length - 1].path + value + "/",
          });
          return acc;
        },
        [
          {
            name: "Root",
            path: "/",
          },
        ]
      );
  },
  [rootTypes.SET_PLAYITEM](store, index) {
    store.player.item = store.queueList[index];
    store.player.itemIndex = index;
  },
  [rootTypes.AUDIO_PLAY](store) {
    store.player.isPlaying = true;
  },
  [rootTypes.AUDIO_PAUSE](store) {
    store.player.isPlaying = false;
  },
  [rootTypes.AUDIO_END](store) {
    if (store.queueList[store.player.itemIndex + 1]) {
      store.player.itemIndex += 1;
      store.player.item = store.queueList[store.player.itemIndex];
    } else {
      store.player.isPlaying = false;
    }
  },
  [rootTypes.AUDIO_SEEK](store, payload) {
    store.player.currentTime = payload;
  },
  [rootTypes.AUDIO_NEXT](store) {
    if (store.queueList[store.player.itemIndex + 1]) {
      store.player.itemIndex += 1;
      store.player.item = store.queueList[store.player.itemIndex];
    }
  },
  [rootTypes.AUDIO_PREV](store) {
    if (store.queueList[store.player.itemIndex - 1]) {
      store.player.itemIndex += 1;
      store.player.item = store.queueList[store.player.itemIndex];
    }
  },
  [rootTypes.AUDIO_TIMEUPDATE](store, payload) {
    store.player.currentTime = payload;
  },
  [rootTypes.AUDIO_LOADED](store, payload) {
    store.player.duration = payload.duration;
  },
  [rootTypes.AUDIO_VOLUMECHANGE](store, payload) {},
};

export type mutationTypes = keyof typeof mutations;

// const store = {
//   state,
//   mutations,
//   actions: {},
//   modules: {},
// };

// export default new Vuex.Store(store);
