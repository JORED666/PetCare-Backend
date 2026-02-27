import { pgTable, serial, integer, date, varchar, timestamp } from 'drizzle-orm/pg-core';

export const registroVacunas = pgTable('registro_vacunas', {
  id_registro: serial('id_registro').primaryKey(),
  id_mascota: integer('id_mascota').notNull(),
  id_vacuna: integer('id_vacuna').notNull(),
  id_veterinario: integer('id_veterinario'),
  id_historial: integer('id_historial'),
  numero_dosis: integer('numero_dosis').default(1),
  fecha_aplicacion: date('fecha_aplicacion').notNull(),
  proxima_dosis: date('proxima_dosis'),
  lote: varchar('lote', { length: 50 }),
  created_at: timestamp('created_at').defaultNow()
});
