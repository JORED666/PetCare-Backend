import { pgTable, serial, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';

export const passwordResetTokens = pgTable('password_reset_tokens', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 150 }).notNull(),
  token: varchar('token', { length: 255 }).unique().notNull(),
  expires_at: timestamp('expires_at').notNull(),
  used: boolean('used').default(false).notNull(),
  created_at: timestamp('created_at').defaultNow()
});
