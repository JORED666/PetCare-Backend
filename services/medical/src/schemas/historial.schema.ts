import { pgTable, serial, integer, text, decimal, date, timestamp } from 'drizzle-orm/pg-core';

export const historialMedico = pgTable('historial_medico', {
  id_historial: serial('id_historial').primaryKey(),
  id_mascota: integer('id_mascota').notNull(),
  id_veterinario: integer('id_veterinario').notNull(),
  id_cita: integer('id_cita'),
  id_tipo: integer('id_tipo').notNull().default(1),
  motivo_consulta: text('motivo_consulta'),
  diagnostico: text('diagnostico'),
  tratamiento: text('tratamiento'),
  observaciones: text('observaciones'),
  peso: decimal('peso', { precision: 5, scale: 2 }),
  temperatura: decimal('temperatura', { precision: 4, scale: 1 }),
  frecuencia_cardiaca: integer('frecuencia_cardiaca'),
  proxima_cita: date('proxima_cita'),
  fecha_atencion: timestamp('fecha_atencion').defaultNow(),
  created_at: timestamp('created_at').defaultNow()
});
