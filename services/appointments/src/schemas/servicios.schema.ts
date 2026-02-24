import { pgTable, serial, varchar, text, integer, decimal, boolean, timestamp } from 'drizzle-orm/pg-core';

export const servicios = pgTable('servicios', {
  id_servicio: serial('id_servicio').primaryKey(),
  nombre: varchar('nombre', { length: 100 }).notNull(),
  descripcion: text('descripcion'),
  duracion_estimada: integer('duracion_estimada').default(30),
  precio: decimal('precio', { precision: 10, scale: 2 }),
  activo: boolean('activo').default(true).notNull(),
  created_at: timestamp('created_at').defaultNow()
});
