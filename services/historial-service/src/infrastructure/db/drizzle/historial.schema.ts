import { pgTable, serial, integer, date, text } from 'drizzle-orm/pg-core';

export const historial_mascotas = pgTable('historial_mascotas', {
  id_historial: serial('id_historial').primaryKey(),
  id_mascota: integer('id_mascota').notNull(),
  id_cita: integer('id_cita'),
  id_veterinario: integer('id_veterinario').notNull(),
  fecha: date('fecha').notNull(),
  diagnostico: text('diagnostico'),
  tratamiento: text('tratamiento'),
  observaciones: text('observaciones'),
});

export type HistorialRecord = typeof historial_mascotas.$inferSelect;
export type NewHistorial = typeof historial_mascotas.$inferInsert;
