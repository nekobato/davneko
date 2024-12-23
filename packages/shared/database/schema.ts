import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
  id: text().notNull().primaryKey(),
  email: text().notNull().unique(),
  password: text().notNull(),
  status: text({ enum: ["active", "inactive"] }).notNull(),
  updatedAt: text("updated_at").notNull(),
  createdAt: text("created_at").notNull()
});

export const userSigninHistoryTable = sqliteTable("user_signin_history", {
  id: text().notNull().primaryKey(),
  email: text("email").notNull(),
  ipAddress: text("ip_address").notNull(),
  status: text({ enum: ["success", "failure"] }).notNull(),
  createdAt: text("created_at").notNull()
});

export const audioTable = sqliteTable("audio", {
  id: text().notNull().primaryKey(),
  type: text({ enum: ["audio", "podcast", "youtube"] }).notNull(),
  path: text(),
  url: text(),
  title: text().notNull(),
  duration: integer().notNull(),
  artistId: text("artist_id").notNull(),
  albumId: text("album_id").notNull(),
  genreId: text("genre_id").notNull(),
  directoryId: text("directory_id"),
  updatedAt: text("updated_at").notNull(),
  createdAt: text("created_at").notNull()
});

export const artistTable = sqliteTable("artist", {
  id: text().notNull().primaryKey(),
  name: text().notNull(),
  updatedAt: text("updated_at").notNull(),
  createdAt: text("created_at").notNull()
});

export const albumTable = sqliteTable("album", {
  id: text().notNull().primaryKey(),
  name: text().notNull(),
  artistId: text("artist_id").notNull(),
  updatedAt: text("updated_at").notNull(),
  createdAt: text("created_at").notNull()
});

export const genreTable = sqliteTable("genre", {
  id: text().notNull().primaryKey(),
  name: text().notNull(),
  updatedAt: text("updated_at").notNull(),
  createdAt: text("created_at").notNull()
});

export const directoryTable = sqliteTable("directory", {
  id: text().notNull().primaryKey(),
  path: text().notNull(),
  name: text().notNull(),
  updatedAt: text("updated_at").notNull(),
  createdAt: text("created_at").notNull()
});

export const playlistTable = sqliteTable("playlist", {
  id: text().notNull().primaryKey(),
  name: text().notNull(),
  updatedAt: text("updated_at").notNull(),
  createdAt: text("created_at").notNull()
});

export const audioGenreTable = sqliteTable("audio_genre", {
  audioId: text("audio_id").notNull(),
  genreId: text("genre_id").notNull()
});

export const audioPlaylistTable = sqliteTable("audio_playlist", {
  audioId: text("audio_id").notNull(),
  playlistId: text("playlist_id").notNull(),
  order: integer().notNull()
});

export const audioDirectoryTable = sqliteTable("audio_directory", {
  audioId: text("audio_id").notNull(),
  directoryId: text("directory_id").notNull()
});

export const configTable = sqliteTable("config", {
  key: text().notNull().primaryKey(),
  value: text().notNull()
});
