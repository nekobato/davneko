CREATE TABLE `album` (
	`id` text PRIMARY KEY NOT NULL,
	`artist_id` text NOT NULL,
	`title` text NOT NULL,
	`updated_at` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `album_id_unique` ON `album` (`id`);--> statement-breakpoint
CREATE TABLE `artist` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`updated_at` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `artist_id_unique` ON `artist` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `artist_name_unique` ON `artist` (`name`);--> statement-breakpoint
CREATE TABLE `audio_directory` (
	`audio_id` text NOT NULL,
	`directory_id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `audio_genre` (
	`audio_id` text NOT NULL,
	`genre_id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `audio_playlist` (
	`audio_id` text NOT NULL,
	`playlist_id` text NOT NULL,
	`order` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `audio` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`path` text,
	`url` text,
	`title` text NOT NULL,
	`track` integer,
	`duration` integer NOT NULL,
	`album_id` text,
	`artist_id` text,
	`directory_id` text,
	`updated_at` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `audio_id_unique` ON `audio` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `audio_title_unique` ON `audio` (`title`);--> statement-breakpoint
CREATE TABLE `config` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `config_key_unique` ON `config` (`key`);--> statement-breakpoint
CREATE TABLE `directory` (
	`id` text PRIMARY KEY NOT NULL,
	`path` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `directory_id_unique` ON `directory` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `directory_path_unique` ON `directory` (`path`);--> statement-breakpoint
CREATE TABLE `genre` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`updated_at` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `genre_id_unique` ON `genre` (`id`);--> statement-breakpoint
CREATE TABLE `playlist` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`updated_at` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `playlist_id_unique` ON `playlist` (`id`);--> statement-breakpoint
CREATE TABLE `user_auth_password` (
	`user_id` text NOT NULL,
	`password` text NOT NULL,
	`updated_at` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_auth_password_user_id_unique` ON `user_auth_password` (`user_id`);--> statement-breakpoint
CREATE TABLE `user_auth_refresh_token` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`token` text,
	`refresh_count` integer DEFAULT 0 NOT NULL,
	`expires_at` integer NOT NULL,
	`revoked_at` integer,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_auth_refresh_token_id_unique` ON `user_auth_refresh_token` (`id`);--> statement-breakpoint
CREATE TABLE `user_signin_history` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`ip_address` text NOT NULL,
	`status` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_signin_history_id_unique` ON `user_signin_history` (`id`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`status` text NOT NULL,
	`updated_at` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_id_unique` ON `user` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);