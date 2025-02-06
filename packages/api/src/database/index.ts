import { drizzle } from "drizzle-orm/libsql";
import type { LibSQLDatabase } from "drizzle-orm/libsql";

import * as schema from "./schema";

export const db = drizzle({
  connection: {
    url: "file:db.sqlite"
  },
  schema
});

export type Database = LibSQLDatabase<typeof schema>;
