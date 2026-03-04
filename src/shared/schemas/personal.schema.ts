import { pgTable, serial, varchar, boolean, integer, timestamp } from 'drizzle-orm/pg-core';

export const personal = pgTable('personal', {
  id_personal: serial('id_personal').primaryKey(),
  id_rol: integer('id_rol').notNull(),
  nombre: varchar('nombre', { length: 100 }).notNull(),
  apellido: varchar('apellido', { length: 100 }).notNull(),
  email: varchar('email', { length: 150 }).notNull().unique(),
  telefono: varchar('telefono', { length: 20 }),
  cedula_profesional: varchar('cedula_profesional', { length: 50 }),
  especialidad: varchar('especialidad', { length: 100 }),
  password_hash: varchar('password_hash', { length: 255 }),
  password_temporal: boolean('password_temporal').default(true),
  foto_perfil: varchar('foto_perfil', { length: 255 }),
  activo: boolean('activo').default(true),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
});

export type Personal = typeof personal.$inferSelect;
export type NewPersonal = typeof personal.$inferInsert;
