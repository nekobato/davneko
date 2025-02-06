import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
  id: text().notNull().primaryKey().unique(),
  email: text().notNull().unique(),
  status: text({ enum: ["active", "inactive"] }).notNull(),
  updatedAt: integer("updated_at").notNull(),
  createdAt: integer("created_at").notNull()
});

export const userAuthPasswordTable = sqliteTable("user_auth_password", {
  userId: text("user_id").notNull().unique(),
  password: text("password").notNull(),
  updatedAt: integer("updated_at").notNull(),
  createdAt: integer("created_at").notNull()
});

export const userAuthRefreshTokenTable = sqliteTable(
  "user_auth_refresh_token",
  {
    id: text().notNull().primaryKey().unique(),
    userId: text("user_id").notNull(),
    token: text(),
    refreshCount: integer("refresh_count").notNull().default(0),
    expiresAt: integer("expires_at").notNull(),
    revokedAt: integer("revoked_at"),
    createdAt: integer("created_at").notNull()
  }
);

export const userSigninHistoryTable = sqliteTable("user_signin_history", {
  id: text().notNull().primaryKey().unique(),
  email: text("email").notNull(),
  ipAddress: text("ip_address").notNull(),
  status: text({ enum: ["success", "failure"] }).notNull(),
  createdAt: integer("created_at").notNull()
});

export const audioTable = sqliteTable("audio", {
  id: text().notNull().primaryKey().unique(),
  type: text({ enum: ["audio", "podcast", "youtube"] }).notNull(),
  path: text(),
  url: text(),
  title: text().notNull().unique(),
  track: integer(),
  duration: integer().notNull(),
  albumId: text("album_id"),
  artistId: text("artist_id"),
  directoryId: text("directory_id"),
  updatedAt: integer("updated_at").notNull(),
  createdAt: integer("created_at").notNull()
});

export const artistTable = sqliteTable("artist", {
  id: text().notNull().primaryKey().unique(),
  name: text().notNull().unique(),
  updatedAt: integer("updated_at").notNull(),
  createdAt: integer("created_at").notNull()
});

export const albumTable = sqliteTable("album", {
  id: text().notNull().primaryKey().unique(),
  artistId: text("artist_id").notNull(),
  title: text().notNull(),
  updatedAt: integer("updated_at").notNull(),
  createdAt: integer("created_at").notNull()
});

export const genreTable = sqliteTable("genre", {
  id: text().notNull().primaryKey().unique(),
  name: text().notNull(),
  updatedAt: integer("updated_at").notNull(),
  createdAt: integer("created_at").notNull()
});

// Directory table by Path Enumeration
export const directoryTable = sqliteTable("directory", {
  id: text().notNull().primaryKey().unique(),
  path: text().notNull().unique()
});

export const playlistTable = sqliteTable("playlist", {
  id: text().notNull().primaryKey().unique(),
  name: text().notNull(),
  updatedAt: integer("updated_at").notNull(),
  createdAt: integer("created_at").notNull()
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
  key: text().notNull().primaryKey().unique(),
  value: text().notNull()
});
