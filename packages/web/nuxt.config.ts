// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-01-30",
  devtools: { enabled: true },
  css: ["~/assets/styles/index.scss"],
  modules: ["@nuxt/image"],
  imports: {
    dirs: ["composables"]
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.BASE_API_URL
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler"
        }
      }
    }
  }
});
