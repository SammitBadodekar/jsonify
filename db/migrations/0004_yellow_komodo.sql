ALTER TABLE `api_keys` ADD `name` text;--> statement-breakpoint
ALTER TABLE `api_keys` ADD `created_at` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `api_keys` ADD `updated_at` integer NOT NULL;