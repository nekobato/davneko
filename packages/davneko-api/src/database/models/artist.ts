import { nanoid } from "nanoid";
import { db } from "..";
import { artistTable } from "../schema";
import { eq } from "drizzle-orm";

export const insertArtist = async (name: string) => {
  const artist = await db.query.artistTable.findFirst({
    where: eq(artistTable, name)
  });

  if (artist) {
    return artist;
  }

  const result = await db
    .insert(artistTable)
    .values({
      id: nanoid(),
      name,
      updatedAt: Date.now(),
      createdAt: Date.now()
    })
    .returning();

  return result[0];
};
