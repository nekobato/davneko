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
  "SET_PLAYITEM",
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
    if (typeof queue === "object") {
      store.queueList.push(queue);
    } else {
      store.queueList = Object.assign(store.queueList, queue);
    }
  },
  [rootTypes.ADD_DEPTH](store, item) {
    store.breadcrumb.push(item);
  },
  [rootTypes.SET_PLAYITEM](store, item) {
    store.player.item = item;
  },
};

export type mutationTypes = keyof typeof mutations;

// const store = {
//   state,
//   mutations,
//   actions: {},
//   modules: {},
// };

// export default new Vuex.Store(store);
