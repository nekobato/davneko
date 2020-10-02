import { MutationTree } from "vuex";

export type RootState = {
  auth: {
    status: boolean;
    data: {};
  };
  user?: {
    id: number;
    provider: string;
    uid: string;
    allow_password_change: boolean;
    name: string;
    nickname: string;
    image: string;
    email: string;
    company_id: number;
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
};

const typeList = [
  "OPEN_MODAL",
  "OPEN_DIALOG",
  "CLOSE_MODAL",
  "CLOSE_DIALOG",
  "SET_AUTH",
  "SET_USER",
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
};

export type mutationTypes = keyof typeof mutations;

// const store = {
//   state,
//   mutations,
//   actions: {},
//   modules: {},
// };

// export default new Vuex.Store(store);
