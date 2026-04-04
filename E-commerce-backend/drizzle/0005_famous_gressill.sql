ALTER TABLE "orders" ALTER COLUMN "phone" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "order_id" SET NOT NULL;