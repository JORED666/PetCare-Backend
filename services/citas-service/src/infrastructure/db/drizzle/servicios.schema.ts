import { pgTable, serial, varchar, text, numeric, boolean } from 'drizzle-orm/pg-core';

export const servicios = pgTable('servicios', {
  id_servicio: serial('id_servicio').primaryKey(),
  nombre:      varchar('nombre', { length: 100 }).notNull(),
  descripcion: text('descripcion'),
  precio:      numeric('precio', { precision: 10, scale: 2 }),
  activo:      boolean('activo').default(true),
});