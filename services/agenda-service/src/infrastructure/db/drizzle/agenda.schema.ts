import { pgTable, serial, integer, date, varchar, timestamp } from 'drizzle-orm/pg-core';

export const agenda_veterinaria = pgTable('agenda_veterinaria', {
  id: serial('id').primaryKey(),
  veterinario_id: integer('veterinario_id').notNull(),
  fecha: date('fecha').notNull(),
  dia_nombre: varchar('dia_nombre', { length: 20 }).notNull(),
  hora_inicio: varchar('hora_inicio', { length: 10 }).notNull(),
  hora_fin: varchar('hora_fin', { length: 10 }).notNull(),
  estado: varchar('estado', { length: 20 }).notNull().default('disponible'),
  creado_en: timestamp('creado_en').defaultNow(),
});

export type AgendaRecord = typeof agenda_veterinaria.$inferSelect;
export type NewAgenda = typeof agenda_veterinaria.$inferInsert;
