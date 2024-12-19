import {
  primaryKey,
  text,
  pgSchema,
  varchar,
  timestamp,
  integer
} from "drizzle-orm/pg-core";

export const appSchema = pgSchema("app");

export const userStatusEnum = appSchema.enum("user_status", [
  "active",
  "inactive"
]);

export const userSigninStatusEnum = appSchema.enum("user_signin_status", [
  "success",
  "fail"
]);

export const userTable = appSchema.table("user", {
  id: varchar().notNull().primaryKey(),
  username: varchar().notNull().unique(),
  password: varchar().notNull(),
  email: varchar().notNull().unique(),
  avatarPictureUrl: text("avatar_picture_url").default(""),
  status: userStatusEnum().notNull().default("active"),
  updatedAt: timestamp("updated_at").notNull(),
  createdAt: timestamp("created_at").notNull()
});

export const userUnverifiedTable = appSchema.table("user_unverified", {
  id: varchar().notNull().primaryKey(),
  username: varchar().notNull().unique(),
  password: varchar().notNull(),
  emailVerified: integer("email_verified").notNull(),
  avatarPictureUrl: text("avatar_picture_url").default(""),
  status: userStatusEnum().notNull().default("active"),
  updatedAt: timestamp("updated_at").notNull(),
  createdAt: timestamp("created_at").notNull()
});

export const userConfirmationTable = appSchema.table("user_confirmation", {
  id: varchar().notNull().primaryKey(),
  userUnverifiedId: varchar("user_unverified_id").notNull(),
  authToken: varchar("auth_token").notNull(),
  resendToken: varchar("resend_token").notNull(),
  code: varchar().notNull(),
  count: integer().notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  createdAt: timestamp("created_at").notNull()
});

export const userOauthGoogleTable = appSchema.table("user_oauth_google", {
  id: varchar().notNull().primaryKey(),
  userId: varchar("user_id").notNull().unique(),
  idToken: varchar("id_token").notNull().unique(),
  accessToken: varchar("access_token").notNull(),
  refreshToken: varchar("refresh_token"),
  expiryDate: timestamp(),
  updatedAt: timestamp("updated_at").notNull(),
  createdAt: timestamp("created_at").notNull()
});

export const userSigninHistoryTable = appSchema.table("user_signin_history", {
  id: varchar().notNull().primaryKey(),
  email: varchar("email").notNull(),
  ipAddress: varchar("ip_address").notNull(),
  userAgent: varchar("user_agent").notNull(),
  status: userSigninStatusEnum().notNull(),
  createdAt: timestamp("created_at").notNull()
});

export const userPasswordResetTable = appSchema.table("user_password_reset", {
  id: varchar().notNull().primaryKey(),
  userId: varchar("user_id").notNull(),
  authToken: varchar("auth_token").notNull(),
  count: integer().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  createdAt: timestamp("created_at").notNull()
});

export const oauthAccountTable = appSchema.table(
  "oauth_account",
  {
    provider: text().notNull(),
    providerUserId: text("provider_user_id").notNull().unique(),
    userId: text()
      .notNull()
      .references(() => userTable.id)
  },
  (table) => ({
    pk: primaryKey({ columns: [table.provider, table.providerUserId] })
  })
);
