import { text, sqliteTable, int } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
  id: text('id').notNull().primaryKey().unique(),
  username: text('name').notNull().unique(),
  password: text('password').notNull(),
  createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').notNull().default('CURRENT_TIMESTAMP'),
});

export const audio = sqliteTable('audio', {
  id: text('id').notNull().primaryKey().unique(),
  title: text('name').notNull(),
  albumId: text('album_id'),
  filePath: text('path').notNull(),
  directoryPath: text('directory_path').notNull(),
  hierarchyLevel: int('hierarchy_level').notNull(),
  createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').notNull().default('CURRENT_TIMESTAMP'),
});

export const artist = sqliteTable('artist', {
  id: text('id').notNull().primaryKey().unique(),
  name: text('name').notNull(),
  createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').notNull().default('CURRENT_TIMESTAMP'),
});

export const audioArtist = sqliteTable('audio_artist', {
  id: int('id').notNull().primaryKey().unique(),
  audioId: int('audio_id').notNull(),
  artistId: int('artist_id').notNull(),
});

export const album = sqliteTable('album', {
  id: text('id').notNull().primaryKey().unique(),
  name: text('title').notNull(),
  artistId: text('artist_id').notNull(),
  createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').notNull().default('CURRENT_TIMESTAMP'),
});

export const userSelectedAudio = sqliteTable('user_selected_audio', {
  id: int('id').notNull().primaryKey().unique(),
  userId: int('user_id').notNull(),
  audioId: int('audio_id').notNull(),
  selectedAt: text('selected_at').notNull().default('CURRENT_TIMESTAMP'),
});

export const playlist = sqliteTable('playlist', {
  id: int('id').notNull().primaryKey().unique(),
  userId: int('user_id').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').notNull().default('CURRENT_TIMESTAMP'),
});

export const playlistAudio = sqliteTable('playlist_audio', {
  id: int('id').notNull().primaryKey().unique(),
  playlistId: int('playlist_id').notNull(),
  audioId: int('audio_id').notNull(),
  orderInPlaylist: int('order_in_playlist').notNull(),
});

export const queue = sqliteTable('queue', {
  id: int('id').notNull().primaryKey().unique(),
  userId: int('user_id').notNull(),
  audioId: int('audio_id').notNull(),
  status: text('status').notNull().$type<'upcoming' | 'played'>(),
  queuedAt: text('queued_at').notNull().default('CURRENT_TIMESTAMP'),
  playedAt: text('played_at'),
});

export const schema = {
  user,
  userSelectedAudio,
  audio,
  artist,
  audioArtist,
  album,
  playlist,
  playlistAudio,
  queue,
};
