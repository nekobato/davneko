import { rootTypes } from "~/store";

export default function ({ store, redirect }: any) {
  if (!store.state.auth.status) {
    const authFromLS = window.localStorage.getItem("auth");
    if (!authFromLS) {
      return redirect("/auth/signin");
    } else {
      store.commit(rootTypes.SET_AUTH, JSON.parse(authFromLS));
    }
  }
}
