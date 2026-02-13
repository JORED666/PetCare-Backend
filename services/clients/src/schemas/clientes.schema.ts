import { pgTable, serial, varchar, boolean, text, timestamp } from 'drizzle-orm/pg-core';

export const clientes = pgTable('clientes', {
  id_cliente: serial('id_cliente').primaryKey(),
  nombre: varchar('nombre', { length: 100 }).notNull(),
  apellido: varchar('apellido', { length: 100 }).notNull(),
  email: varchar('email', { length: 150 }).notNull().unique(),
  telefono: varchar('telefono', { length: 20 }).notNull(),
  direccion: text('direccion'),
  password_hash: varchar('password_hash', { length: 255 }),
  password_temporal: boolean('password_temporal').default(false),
  foto_perfil: varchar('foto_perfil', { length: 255 }),
  activo: boolean('activo').default(true),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
});

export type Cliente = typeof clientes.$inferSelect;
export type NewCliente = typeof clientes.$inferInsert;
