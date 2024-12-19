CREATE SCHEMA "app";
--> statement-breakpoint
CREATE TYPE "app"."user_signin_status" AS ENUM('success', 'fail');--> statement-breakpoint
CREATE TYPE "app"."user_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app"."oauth_account" (
	"provider" text NOT NULL,
	"provider_user_id" text NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "oauth_account_provider_provider_user_id_pk" PRIMARY KEY("provider","provider_user_id"),
	CONSTRAINT "oauth_account_providerUserId_unique" UNIQUE("provider_user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app"."user_confirmation" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_unverified_id" varchar NOT NULL,
	"auth_token" varchar,
	"resend_token" varchar,
	"code" varchar NOT NULL,
	"count" integer NOT NULL,
	"updated_at" timestamp NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app"."user_oauth_google" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"id_token" varchar NOT NULL,
	"access_token" varchar NOT NULL,
	"refresh_token" varchar,
	"expiry_date" timestamp,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "user_oauth_google_userId_unique" UNIQUE("user_id"),
	CONSTRAINT "user_oauth_google_idToken_unique" UNIQUE("id_token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app"."user_password_reset" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"auth_token" varchar NOT NULL,
	"count" integer NOT NULL,
	"expires_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app"."user_signin_history" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"ip_address" varchar NOT NULL,
	"user_agent" varchar NOT NULL,
	"status" "app"."user_signin_status" NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app"."user" (
	"id" varchar PRIMARY KEY NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"email" varchar NOT NULL,
	"avatar_picture_url" text,
	"status" "app"."user_status" DEFAULT 'active' NOT NULL,
	"updated_at" timestamp NOT NULL,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app"."user_unverified" (
	"id" varchar PRIMARY KEY NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"email_verified" integer NOT NULL,
	"avatar_picture_url" text,
	"status" "app"."user_status" DEFAULT 'active' NOT NULL,
	"updated_at" timestamp NOT NULL,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "user_unverified_username_unique" UNIQUE("username")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app"."oauth_account" ADD CONSTRAINT "oauth_account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "app"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
