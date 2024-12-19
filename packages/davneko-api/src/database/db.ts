import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";

import * as schema from "./schema";

export const db = drizzle({
  connection: {
    url: process.env.DATABASE_URL
  },
  schema
});

export type Database = LibSQLDatabase<typeof schema>;
