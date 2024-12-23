CREATE TABLE `audio` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`duration` integer NOT NULL,
	`updated_at` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user_signin_history` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`ip_address` text NOT NULL,
	`status` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`status` text NOT NULL,
	`updated_at` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);