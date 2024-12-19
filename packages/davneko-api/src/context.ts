import type { JwtVariables } from "hono/jwt";
import type { Database } from "./database/db";
import type { Env } from "./env";

type Variables = JwtVariables & {
  db: Database;
};

export interface AppContext {
  Bindings: Env;
  Variables: Variables;
}
