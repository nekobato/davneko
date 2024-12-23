import type { JwtVariables } from "hono/jwt";
import type { Database } from "@davneko/shared/database";
import type { Env } from "./env";

type Variables = JwtVariables & {
  db: Database;
};

export interface AppContext {
  Bindings: Env;
  Variables: Variables;
}
