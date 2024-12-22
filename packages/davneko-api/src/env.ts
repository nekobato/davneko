import type { LibSQLDatabase } from "drizzle-orm/libsql";

export type Env = {
  DB: LibSQLDatabase;
  WORKER_ENV: "production" | "development" | "test";
};

export const JWT_SECRET_KEY = "your-secret-key";

export const COOKIE_NAME = "davneko";
