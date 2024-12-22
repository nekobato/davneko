import {
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
  id: text().notNull().primaryKey(),
  email: text().notNull().unique(),
  password: text().notNull(),
  status: text({ enum: ["active", "inactive"] }).notNull(),
  updatedAt: text("updated_at").notNull(),
  createdAt: text("created_at").notNull()
});

export const userSigninHistoryTable = sqliteTable("user_signin_history", {
  id: text().notNull().primaryKey(),
  email: text("email").notNull(),
  ipAddress: text("ip_address").notNull(),
  status: text({ enum: ["success", "failure"] }).notNull(),
  createdAt: text("created_at").notNull()
});