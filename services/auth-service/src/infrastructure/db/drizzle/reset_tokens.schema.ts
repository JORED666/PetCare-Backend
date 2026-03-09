import { pgTable, serial, integer, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';

export const reset_tokens = pgTable('reset_tokens', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  expires_at: timestamp('expires_at').notNull(),
  used: boolean('used').notNull().default(false),
  created_at: timestamp('created_at').defaultNow(),
});export type ResetTokenRecord = typeof reset_tokens.$inferSelect;
