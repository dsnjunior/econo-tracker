CREATE TABLE IF NOT EXISTS "buy" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"description" text NOT NULL,
	"date" date NOT NULL,
	"time_zone" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "buy_register" (
	"buy_id" text NOT NULL,
	"amount" integer NOT NULL,
	"quantity" integer NOT NULL,
	"product_type_id" text NOT NULL,
	"product_size_id" text NOT NULL,
	"product_color_id" text NOT NULL,
	CONSTRAINT "buy_register_product_type_id_product_size_id_product_color_id_buy_id_unique" UNIQUE("product_type_id","product_size_id","product_color_id","buy_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_color" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"color" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_in_stock" (
	"user_id" text NOT NULL,
	"quantity" integer NOT NULL,
	"product_type_id" text NOT NULL,
	"product_size_id" text NOT NULL,
	"product_color_id" text NOT NULL,
	CONSTRAINT "product_in_stock_product_type_id_product_size_id_product_color_id_pk" PRIMARY KEY("product_type_id","product_size_id","product_color_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_size" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"product_type_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_type" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sell" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"description" text NOT NULL,
	"date" date NOT NULL,
	"time_zone" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sell_register" (
	"sell_id" text,
	"amount" integer NOT NULL,
	"quantity" integer NOT NULL,
	"product_type_id" text NOT NULL,
	"product_size_id" text NOT NULL,
	"product_color_id" text NOT NULL,
	CONSTRAINT "sell_register_product_type_id_product_size_id_product_color_id_sell_id_unique" UNIQUE("product_type_id","product_size_id","product_color_id","sell_id")
);
--> statement-breakpoint
DROP TABLE "earning";--> statement-breakpoint
DROP TABLE "earning_category";--> statement-breakpoint
DROP TABLE "expense";--> statement-breakpoint
DROP TABLE "expense_category";--> statement-breakpoint
DROP TABLE "fixed_earning";--> statement-breakpoint
DROP TABLE "fixed_earning_register";--> statement-breakpoint
DROP TABLE "fixed_expense";--> statement-breakpoint
DROP TABLE "fixed_expense_register";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "buy" ADD CONSTRAINT "buy_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "buy_register" ADD CONSTRAINT "buy_register_buy_id_buy_id_fk" FOREIGN KEY ("buy_id") REFERENCES "buy"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "buy_register" ADD CONSTRAINT "buy_register_product_type_id_product_type_id_fk" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "buy_register" ADD CONSTRAINT "buy_register_product_size_id_product_size_id_fk" FOREIGN KEY ("product_size_id") REFERENCES "product_size"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "buy_register" ADD CONSTRAINT "buy_register_product_color_id_product_color_id_fk" FOREIGN KEY ("product_color_id") REFERENCES "product_color"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_color" ADD CONSTRAINT "product_color_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_in_stock" ADD CONSTRAINT "product_in_stock_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_in_stock" ADD CONSTRAINT "product_in_stock_product_type_id_product_type_id_fk" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_in_stock" ADD CONSTRAINT "product_in_stock_product_size_id_product_size_id_fk" FOREIGN KEY ("product_size_id") REFERENCES "product_size"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_in_stock" ADD CONSTRAINT "product_in_stock_product_color_id_product_color_id_fk" FOREIGN KEY ("product_color_id") REFERENCES "product_color"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_size" ADD CONSTRAINT "product_size_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_size" ADD CONSTRAINT "product_size_product_type_id_product_type_id_fk" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_type" ADD CONSTRAINT "product_type_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sell" ADD CONSTRAINT "sell_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sell_register" ADD CONSTRAINT "sell_register_product_type_id_product_type_id_fk" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sell_register" ADD CONSTRAINT "sell_register_product_size_id_product_size_id_fk" FOREIGN KEY ("product_size_id") REFERENCES "product_size"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sell_register" ADD CONSTRAINT "sell_register_product_color_id_product_color_id_fk" FOREIGN KEY ("product_color_id") REFERENCES "product_color"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
