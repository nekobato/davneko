import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  driver: "pglite",
  out: "./drizzle",
  dbCredentials: {
    url: "../database/"
  }
});
