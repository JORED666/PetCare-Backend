import { pgTable, serial, integer, timestamp, varchar, text, boolean } from 'drizzle-orm/pg-core';

export const citas = pgTable('citas', {
  id_cita: serial('id_cita').primaryKey(),
  id_user: integer('id_user').notNull(),
  id_mascota: integer('id_mascota').notNull(),
  id_servicio: integer('id_servicio').notNull(),
  id_veterinario: integer('id_veterinario'),
  id_agenda: integer('id_agenda'),
  fecha: timestamp('fecha').notNull(),
  estado: varchar('estado', { length: 20 }).notNull().default('PENDIENTE'),
  observaciones_cliente: text('observaciones_cliente'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
  // ── nuevas ──
  recordatorio_24h_enviado: boolean('recordatorio_24h_enviado').notNull().default(false),
  recordatorio_1h_enviado:  boolean('recordatorio_1h_enviado').notNull().default(false),
});

export type CitaRecord = typeof citas.$inferSelect;