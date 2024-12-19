import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

export type Env = {
  DB: PostgresJsDatabase;
  WORKER_ENV: "production" | "development" | "test";
};

export const JWT_SECRET_KEY = "your-secret-key";
