import { pgTable, serial, integer, varchar, date, boolean, timestamp } from 'drizzle-orm/pg-core';

export const mascotas = pgTable('mascotas', {
  id_mascota: serial('id_mascota').primaryKey(),
  id_cliente: integer('id_cliente').notNull(),
  nombre: varchar('nombre', { length: 100 }).notNull(),
  activo: boolean('activo').default(true).notNull(),
  created_at: timestamp('created_at').defaultNow()
});
