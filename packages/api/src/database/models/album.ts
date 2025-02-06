import { nanoid } from "nanoid";
import { db } from "..";
import { albumTable } from "../schema";
import { and, eq } from "drizzle-orm";

export const insertAlbum = async (title: string, artistId: string) => {
  const album = await db.query.albumTable.findFirst({
    where: and(eq(albumTable.title, title), eq(albumTable.artistId, artistId))
  });

  if (album) {
    return album;
  }

  const result = await db
    .insert(albumTable)
    .values({
      id: nanoid(),
      title,
      artistId,
      updatedAt: Date.now(),
      createdAt: Date.now()
    })
    .returning();

  return result[0];
};
