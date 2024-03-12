CREATE TABLE `user` (
	`id` text,
	`name` text,
	`email` text,
	`password` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL
);
