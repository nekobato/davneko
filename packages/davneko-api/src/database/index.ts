import { drizzle } from "drizzle-orm/libsql";
import type { LibSQLDatabase } from "drizzle-orm/libsql";

import * as schema from "./schema";

export const db = drizzle({
  connection: {
    url: "libsql://davneko.sqlite"
  },
  schema
});

export type Database = LibSQLDatabase<typeof schema>;
