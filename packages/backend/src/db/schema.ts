import { text, sqliteTable } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
  id: text('id'),
  username: text('name'),
  password: text('password'),
  createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').notNull().default('CURRENT_TIMESTAMP'),
});

export const schema = {
  user,
};
