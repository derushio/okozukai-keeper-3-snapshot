CREATE TABLE IF NOT EXISTS "okozukai_board_schedules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"okozukai_board_id" uuid NOT NULL,
	"title" text NOT NULL,
	"value" integer NOT NULL,
	"type" text,
	"first_date" date NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "okozukai_board_schedules_title_index" ON "okozukai_board_schedules" ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "okozukai_board_schedules_value_index" ON "okozukai_board_schedules" ("value");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "okozukai_board_schedules_type_index" ON "okozukai_board_schedules" ("type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "okozukai_board_schedules_first_date_index" ON "okozukai_board_schedules" ("first_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "okozukai_board_schedules_created_at_index" ON "okozukai_board_schedules" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "okozukai_board_schedules_updated_at_index" ON "okozukai_board_schedules" ("updated_at");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "okozukai_board_schedules" ADD CONSTRAINT "okozukai_board_schedules_okozukai_board_id_okozukai_boards_id_fk" FOREIGN KEY ("okozukai_board_id") REFERENCES "okozukai_boards"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
