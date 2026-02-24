import { pgTable, serial, integer, text, decimal, timestamp } from 'drizzle-orm/pg-core';

export const citas = pgTable('citas', {
  id_cita: serial('id_cita').primaryKey(),
  id_cliente: integer('id_cliente').notNull(),
  id_mascota: integer('id_mascota').notNull(),
  id_veterinario: integer('id_veterinario'),
  id_servicio: integer('id_servicio').notNull(),
  id_estado: integer('id_estado').notNull().default(1),
  id_motivo: integer('id_motivo'),
  fecha_hora: timestamp('fecha_hora').notNull(),
  motivo_detalle: text('motivo_detalle'),
  costo: decimal('costo', { precision: 10, scale: 2 }),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
});
