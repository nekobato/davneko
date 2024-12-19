ALTER TABLE "app"."user_signin_history" RENAME COLUMN "user_id" TO "email";--> statement-breakpoint
ALTER TABLE "app"."oauth_account" DROP CONSTRAINT "oauth_account_providerUserId_unique";--> statement-breakpoint
ALTER TABLE "app"."user_oauth_google" DROP CONSTRAINT "user_oauth_google_userId_unique";--> statement-breakpoint
ALTER TABLE "app"."user_oauth_google" DROP CONSTRAINT "user_oauth_google_idToken_unique";--> statement-breakpoint
ALTER TABLE "app"."user_confirmation" ALTER COLUMN "auth_token" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "app"."user_confirmation" ALTER COLUMN "resend_token" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "app"."oauth_account" ADD CONSTRAINT "oauth_account_provider_user_id_unique" UNIQUE("provider_user_id");--> statement-breakpoint
ALTER TABLE "app"."user_oauth_google" ADD CONSTRAINT "user_oauth_google_user_id_unique" UNIQUE("user_id");--> statement-breakpoint
ALTER TABLE "app"."user_oauth_google" ADD CONSTRAINT "user_oauth_google_id_token_unique" UNIQUE("id_token");