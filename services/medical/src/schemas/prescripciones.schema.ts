import { pgTable, serial, integer, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const prescripciones = pgTable('prescripciones', {
  id_prescripcion: serial('id_prescripcion').primaryKey(),
  id_historial: integer('id_historial').notNull(),
  medicamento: varchar('medicamento', { length: 200 }).notNull(),
  dosis: varchar('dosis', { length: 100 }),
  frecuencia: varchar('frecuencia', { length: 100 }),
  duracion: varchar('duracion', { length: 100 }),
  via_administracion: varchar('via_administracion', { length: 50 }),
  indicaciones: text('indicaciones'),
  created_at: timestamp('created_at').defaultNow()
});
