import { pgTable, serial, varchar, integer, date, decimal, text, boolean, timestamp, char } from 'drizzle-orm/pg-core';

export const mascotas = pgTable('mascotas', {
  id_mascota: serial('id_mascota').primaryKey(),
  id_cliente: integer('id_cliente').notNull(),
  id_especie: integer('id_especie').notNull(),
  id_raza: integer('id_raza'),
  id_veterinario_cabecera: integer('id_veterinario_cabecera'),
  nombre: varchar('nombre', { length: 100 }).notNull(),
  fecha_nacimiento: date('fecha_nacimiento'),
  sexo: char('sexo', { length: 1 }),
  color: varchar('color', { length: 50 }),
  peso_actual: decimal('peso_actual', { precision: 5, scale: 2 }),
  esterilizado: boolean('esterilizado').default(false),
  chip: varchar('chip', { length: 50 }),
  foto: varchar('foto', { length: 255 }),
  observaciones: text('observaciones'),
  activo: boolean('activo').default(true),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
});

export type Mascota = typeof mascotas.$inferSelect;
export type NewMascota = typeof mascotas.$inferInsert;
