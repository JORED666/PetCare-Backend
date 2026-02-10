import { pgTable, serial, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const roles = pgTable('roles', {
  id_rol: serial('id_rol').primaryKey(),
  nombre_rol: varchar('nombre_rol', { length: 50 }).notNull().unique(),
  descripcion: text('descripcion'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
});

export type Role = typeof roles.$inferSelect;
export type NewRole = typeof roles.$inferInsert;
