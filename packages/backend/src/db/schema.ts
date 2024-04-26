import { sql } from 'drizzle-orm';
import { text, sqliteTable, int } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
  id: text('id').notNull().primaryKey().unique(),
  username: text('name').notNull().unique(),
  password: text('password').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export const directory = sqliteTable('directory', {
  id: text('id').notNull().primaryKey().unique(),
  name: text('name').notNull(),
  path: text('path').notNull(),
  hierarchyLevel: int('hierarchy_level').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export const audio = sqliteTable('audio', {
  id: text('id').notNull().primaryKey().unique(),
  title: text('name').notNull(),
  filePath: text('path').notNull(),
  imagePath: text('image_path'),
  duration: int('duration').notNull(),
  albumId: text('album_id').references(() => album.id),
  directoryId: text('directory_id')
    .notNull()
    .references(() => directory.id),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export const artist = sqliteTable('artist', {
  id: text('id').notNull().primaryKey().unique(),
  name: text('name').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export const audioArtist = sqliteTable('audio_artist', {
  id: text('id').notNull().primaryKey().unique(),
  audioId: text('audio_id')
    .notNull()
    .references(() => audio.id, { onDelete: 'cascade' }),
  artistId: text('artist_id')
    .notNull()
    .references(() => artist.id, { onDelete: 'cascade' }),
});

export const album = sqliteTable('album', {
  id: text('id').notNull().primaryKey().unique(),
  name: text('title').notNull(),
  imagePath: text('image_path'),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export const albumArtist = sqliteTable('album_artist', {
  id: text('id').notNull().primaryKey().unique(),
  albumId: text('album_id')
    .notNull()
    .references(() => album.id, { onDelete: 'cascade' }),
  artistId: text('artist_id')
    .notNull()
    .references(() => artist.id, { onDelete: 'cascade' }),
});

// Genre + Tag
export const tag = sqliteTable('tag', {
  id: text('id').notNull().primaryKey().unique(),
  name: text('name').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export const audioTag = sqliteTable('audio_tag', {
  id: text('id').notNull().primaryKey().unique(),
  audioId: text('audio_id')
    .notNull()
    .references(() => audio.id, { onDelete: 'cascade' }),
  tagId: text('genre_id')
    .notNull()
    .references(() => tag.id, { onDelete: 'cascade' }),
});

export const fav = sqliteTable('fav', {
  id: text('id').notNull().primaryKey().unique(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  audioId: text('audio_id')
    .notNull()
    .references(() => audio.id, { onDelete: 'cascade' }),
  favAt: text('fav_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export const userAudioHistory = sqliteTable('user_audio_history', {
  id: text('id').notNull().primaryKey().unique(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  audioId: text('audio_id')
    .notNull()
    .references(() => audio.id),
  from: text('from', {
    enum: [
      'file',
      'audio',
      'artist',
      'album',
      'tag',
      'genre',
      'search',
      'directory',
      'playlist',
      'history',
      'fav',
      'recommendation',
      'other',
    ],
  }).notNull(),
  playedAt: text('played_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export const playlist = sqliteTable('playlist', {
  id: text('id').notNull().primaryKey().unique(),
  name: text('name').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export const playlistAudio = sqliteTable('playlist_audio', {
  id: text('id').notNull().primaryKey().unique(),
  playlistId: text('playlist_id')
    .notNull()
    .references(() => playlist.id, { onDelete: 'cascade' }),
  audioId: text('audio_id')
    .notNull()
    .references(() => audio.id, { onDelete: 'cascade' }),
  orderInPlaylist: int('order_in_playlist').notNull(),
});
