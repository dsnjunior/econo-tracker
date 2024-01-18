CREATE TABLE IF NOT EXISTS "credit_card" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"color" text NOT NULL,
	"due_day" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "credit_card_expense" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"credit_card_id" text NOT NULL,
	"amount" integer NOT NULL,
	"description" text NOT NULL,
	"date" date NOT NULL,
	"time_zone" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "credit_card_limit" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"credit_card_id" text NOT NULL,
	"limit" integer NOT NULL,
	"date" date NOT NULL,
	"time_zone" varchar NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "credit_card" ADD CONSTRAINT "credit_card_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "credit_card_expense" ADD CONSTRAINT "credit_card_expense_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "credit_card_expense" ADD CONSTRAINT "credit_card_expense_credit_card_id_credit_card_id_fk" FOREIGN KEY ("credit_card_id") REFERENCES "credit_card"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "credit_card_limit" ADD CONSTRAINT "credit_card_limit_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "credit_card_limit" ADD CONSTRAINT "credit_card_limit_credit_card_id_credit_card_id_fk" FOREIGN KEY ("credit_card_id") REFERENCES "credit_card"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
