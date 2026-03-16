import { pgTable, serial, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id_user: serial('id_user').primaryKey(),
  nombre: varchar('nombre', { length: 100 }).notNull(),
  apellido: varchar('apellido', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  telefono: varchar('telefono', { length: 20 }),
  activo: boolean('activo').default(true),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export type UserRecord = typeof users.$inferSelect;
