ALTER TABLE `inquiries` ADD `source` text DEFAULT 'website' NOT NULL;--> statement-breakpoint
ALTER TABLE `inquiries` ADD `intake_json` text;