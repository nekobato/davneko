export type Env = {
  WORKER_ENV: "production" | "development" | "test";
};

export const JWT_SECRET_KEY = "your-secret-key";

export const ACCESS_TOKEN_NAME = "davneko-access-token";
export const REFRESH_TOKEN_NAME = "davneko-refresh-token";
