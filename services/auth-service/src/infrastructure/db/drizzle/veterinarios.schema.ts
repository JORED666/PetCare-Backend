import { pgTable, serial, integer, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';

export const veterinarios = pgTable('veterinarios', {
  id_veterinario: serial('id_veterinario').primaryKey(),
  id_rol: integer('id_rol').notNull(),
  nombre: varchar('nombre', { length: 100 }).notNull(),
  apellido: varchar('apellido', { length: 100 }).notNull(),
  email: varchar('email', { length: 150 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  telefono: varchar('telefono', { length: 20 }),
  cedula_profesional: varchar('cedula_profesional', { length: 50 }),
  especialidad: varchar('especialidad', { length: 100 }),
  activo: boolean('activo').default(true),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export type VeterinarioRecord = typeof veterinarios.$inferSelect;