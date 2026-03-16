import { pgTable, serial, integer, date, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const citas = pgTable('citas', {
  id_cita: serial('id_cita').primaryKey(),
  id_user: integer('id_user').notNull(),
  id_mascota: integer('id_mascota').notNull(),
  id_servicio: integer('id_servicio').notNull(),
  id_veterinario: integer('id_veterinario').notNull(),
  id_agenda: integer('id_agenda').notNull(),
  fecha: date('fecha').notNull(),
  estado: varchar('estado', { length: 20 }).notNull().default('pendiente'),
  observaciones_cliente: text('observaciones_cliente'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export type CitaRecord = typeof citas.$inferSelect;
export type NewCita = typeof citas.$inferInsert;
