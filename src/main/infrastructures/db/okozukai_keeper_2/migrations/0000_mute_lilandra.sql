-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "OkozukaiTable" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "OkozukaiRule" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"title" text NOT NULL,
	"value" integer NOT NULL,
	"mode" text NOT NULL,
	"spanEvery" text NOT NULL,
	"spanPeriod" integer NOT NULL,
	"date" timestamp(3) NOT NULL,
	"startTime" timestamp(3) NOT NULL,
	"endTime" timestamp(3),
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserSession" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"accessToken" text NOT NULL,
	"accessTokenExpiredAt" timestamp(3) NOT NULL,
	"resetToken" text NOT NULL,
	"resetTokenExpiredAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "OkozukaiHistory" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"date" timestamp(3) NOT NULL,
	"value" integer NOT NULL,
	"ruleId" text,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"okozukaiTableId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserPassword" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"password" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "UserPassword_userId_key" ON "UserPassword" ("userId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "OkozukaiRule" ADD CONSTRAINT "OkozukaiRule_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserSession" ADD CONSTRAINT "UserSession_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "OkozukaiHistory" ADD CONSTRAINT "OkozukaiHistory_ruleId_OkozukaiRule_id_fk" FOREIGN KEY ("ruleId") REFERENCES "OkozukaiRule"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "OkozukaiHistory" ADD CONSTRAINT "OkozukaiHistory_okozukaiTableId_OkozukaiTable_id_fk" FOREIGN KEY ("okozukaiTableId") REFERENCES "OkozukaiTable"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserPassword" ADD CONSTRAINT "UserPassword_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/