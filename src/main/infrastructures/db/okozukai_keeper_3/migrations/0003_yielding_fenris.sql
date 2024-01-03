ALTER TABLE "okozukai_board_histories" ADD COLUMN "okozukai_board_schedule_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "okozukai_board_histories" ADD CONSTRAINT "okozukai_board_histories_okozukai_board_schedule_id_okozukai_board_schedules_id_fk" FOREIGN KEY ("okozukai_board_schedule_id") REFERENCES "okozukai_board_schedules"("id") ON DELETE set null ON UPDATE set null;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
