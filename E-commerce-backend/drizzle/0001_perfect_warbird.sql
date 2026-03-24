ALTER TABLE "products" ALTER COLUMN "main_image" SET DEFAULT '{"url":"","public_id":""}'::json;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "main_image" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "product_images" DROP NOT NULL;