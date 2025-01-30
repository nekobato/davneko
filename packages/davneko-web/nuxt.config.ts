// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-01-30",
  devtools: { enabled: true },
  css: ["~/assets/styles/index.scss"],
  modules: ["@nuxt/image", "@nuxt/http"],
  vite: {
    server: {
      proxy: {
        "/api/": {
          target: process.env.PROXY_API_URL,
          secure: false
        }
      }
    }
  }
});
