CREATE TABLE IF NOT EXISTS "okozukai_board_histories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"okozukai_board_id" uuid NOT NULL,
	"date" timestamp NOT NULL,
	"title" text NOT NULL,
	"value" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "okozukai_boards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "okozukai_boards_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"access_token_hash" text NOT NULL,
	"access_token_expire_at" timestamp NOT NULL,
	"reset_token_hash" text NOT NULL,
	"reset_token_expire_at" timestamp NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "okozukai_board_histories_date_index" ON "okozukai_board_histories" ("date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "okozukai_board_histories_title_index" ON "okozukai_board_histories" ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "okozukai_board_histories_value_index" ON "okozukai_board_histories" ("value");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "okozukai_board_histories_created_at_index" ON "okozukai_board_histories" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "okozukai_board_histories_updated_at_index" ON "okozukai_board_histories" ("updated_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "okozukai_boards_name_index" ON "okozukai_boards" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "okozukai_boards_created_at_index" ON "okozukai_boards" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "okozukai_boards_updated_at_index" ON "okozukai_boards" ("updated_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_sessions_access_token_hash_index" ON "user_sessions" ("access_token_hash");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_sessions_access_token_expire_at_index" ON "user_sessions" ("access_token_expire_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_sessions_reset_token_hash_index" ON "user_sessions" ("reset_token_hash");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_sessions_reset_token_expire_at_index" ON "user_sessions" ("reset_token_expire_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_sessions_created_at_index" ON "user_sessions" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_sessions_updated_at_index" ON "user_sessions" ("updated_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_name_index" ON "users" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_password_hash_index" ON "users" ("password_hash");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_created_at_index" ON "users" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_updated_at_index" ON "users" ("updated_at");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "okozukai_board_histories" ADD CONSTRAINT "okozukai_board_histories_okozukai_board_id_okozukai_boards_id_fk" FOREIGN KEY ("okozukai_board_id") REFERENCES "okozukai_boards"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
