import { nanoid } from "nanoid";
import { directoryTable } from "../schema";
import { db } from "..";

export const insertDirectory = async (path: string) => {
  const result = await db
    .insert(directoryTable)
    .values({
      id: nanoid(),
      path
    })
    .onConflictDoNothing()
    .returning();

  return result[0];
};
