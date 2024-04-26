import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Davneko Components",
  description: "components",
  themeConfig: {
    sidebar: [
      {
        items: [
          { text: "Cover", link: "/cover" },
          { text: "Track", link: "/track" },
          { text: "Button", link: "/button" },
        ],
      },
    ],
  },
});
