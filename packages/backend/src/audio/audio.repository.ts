import { Inject, Injectable } from '@nestjs/common';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from 'src/db/schema';
import { and, eq } from 'drizzle-orm';
import { generateAudioId, generateId } from 'src/utils/crypt';

@Injectable()
export class AudioRepository {
  constructor(@Inject() private db: BetterSQLite3Database<typeof schema>) {}

  async findAllAudio() {
    return this.db.query.audio.findMany();
  }

  async findAudioById(audioId: string) {
    return this.db.query.audio.findFirst({
      where(fields) {
        return eq(fields.id, audioId);
      },
    });
  }

  async findAudioDetailById(audioId: string) {
    return this.db
      .select({
        id: schema.audio.id,
        title: schema.audio.title,
        filePath: schema.audio.filePath,
        imagePath: schema.audio.imagePath,
        duration: schema.audio.duration,
        album: {
          id: schema.audio.albumId,
          name: schema.album.name,
          imagePath: schema.album.imagePath,
        },
        artists: {
          id: schema.artist.id,
          name: schema.artist.name,
        },
        directory: {
          id: schema.directory.id,
          name: schema.directory.name,
          path: schema.directory.path,
          hierarchyLevel: schema.directory.hierarchyLevel,
        },
      })
      .from(schema.audio)
      .where(eq(schema.audio.id, audioId))
      .leftJoin(
        schema.directory,
        eq(schema.audio.directoryId, schema.directory.id),
      )
      .leftJoin(schema.album, eq(schema.audio.albumId, schema.album.id))
      .leftJoin(
        schema.audioArtist,
        eq(schema.audioArtist.audioId, schema.audio.id),
      )
      .leftJoin(
        schema.artist,
        eq(schema.audioArtist.artistId, schema.artist.id),
      )
      .execute();
  }

  async createAudio(newAudio: {
    title: string;
    filePath: string;
    directoryId: string;
    albumId: string;
    imagePath: string;
    duration: number;
  }) {
    return this.db
      .insert(schema.audio)
      .values({
        id: generateAudioId(),
        ...newAudio,
      })
      .returning();
  }

  async updateAudio(
    id: string,
    userId: string,
    newAudio: { title: string; filePath: string; imagePath: string },
  ) {
    return this.db
      .update(schema.audio)
      .set(newAudio)
      .where(and(eq(schema.audio.id, id), eq(schema.audio.userId, userId)))
      .execute();
  }

  async deleteAudio(audioId: string) {
    return this.db
      .delete(schema.audio)
      .where(eq(schema.audio.id, audioId))
      .execute();
  }

  async createFav(userId: string, audioId: string) {
    return this.db
      .insert(schema.fav)
      .values({
        id: generateId(),
        userId,
        audioId,
      })
      .execute();
  }

  async deleteFav(userId: string, audioId: string) {
    return this.db
      .delete(schema.fav)
      .where(
        and(eq(schema.fav.userId, userId), eq(schema.fav.audioId, audioId)),
      )
      .execute();
  }
}
