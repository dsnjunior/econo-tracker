CREATE TABLE IF NOT EXISTS "earning" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"amount" integer NOT NULL,
	"category_id" text,
	"description" text NOT NULL,
	"date" date NOT NULL,
	"time_zone" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "earning_category" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"color" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "expense" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"amount" integer NOT NULL,
	"category_id" text,
	"description" text NOT NULL,
	"date" date NOT NULL,
	"time_zone" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "expense_category" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"color" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fixed_earning" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"amount" integer NOT NULL,
	"category_id" text,
	"description" text NOT NULL,
	"due_day" integer NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"time_zone" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fixed_earning_register" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"fixed_earning_id" text NOT NULL,
	"amount" integer NOT NULL,
	"due_date" date NOT NULL,
	"time_zone" varchar NOT NULL,
	"status" varchar DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fixed_expense" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"amount" integer NOT NULL,
	"category_id" text,
	"description" text NOT NULL,
	"due_day" integer NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"time_zone" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fixed_expense_register" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"fixed_expense_id" text NOT NULL,
	"amount" integer NOT NULL,
	"due_date" date NOT NULL,
	"time_zone" varchar NOT NULL,
	"status" varchar DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "earning" ADD CONSTRAINT "earning_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "earning" ADD CONSTRAINT "earning_category_id_earning_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "earning_category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "earning_category" ADD CONSTRAINT "earning_category_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "expense" ADD CONSTRAINT "expense_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "expense" ADD CONSTRAINT "expense_category_id_expense_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "expense_category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "expense_category" ADD CONSTRAINT "expense_category_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fixed_earning" ADD CONSTRAINT "fixed_earning_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fixed_earning" ADD CONSTRAINT "fixed_earning_category_id_earning_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "earning_category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fixed_earning_register" ADD CONSTRAINT "fixed_earning_register_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fixed_earning_register" ADD CONSTRAINT "fixed_earning_register_fixed_earning_id_fixed_earning_id_fk" FOREIGN KEY ("fixed_earning_id") REFERENCES "fixed_earning"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fixed_expense" ADD CONSTRAINT "fixed_expense_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fixed_expense" ADD CONSTRAINT "fixed_expense_category_id_expense_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "expense_category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fixed_expense_register" ADD CONSTRAINT "fixed_expense_register_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fixed_expense_register" ADD CONSTRAINT "fixed_expense_register_fixed_expense_id_fixed_expense_id_fk" FOREIGN KEY ("fixed_expense_id") REFERENCES "fixed_expense"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
