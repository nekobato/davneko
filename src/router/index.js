import Vue from "vue";
import VueRouter from "vue-router";
import Auth from "@/views/Auth.vue";
import Player from "@/views/Player.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "auth",
    component: Auth,
  },

  {
    path: "/player",
    name: "player",
    component: Player,
  },
];

const router = new VueRouter({
  mode: "hash",
  routes,
});

export default router;
