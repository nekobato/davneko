import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/proxy", "@nuxtjs/pwa", "nuxt-svg-loader"],
  css: ["@/assets/styles/base.pcss"],
});
