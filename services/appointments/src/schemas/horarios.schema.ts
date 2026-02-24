import { pgTable, serial, integer, varchar, time, boolean, timestamp } from 'drizzle-orm/pg-core';

export const horariosDisponibles = pgTable('horarios_disponibles', {
  id_horario: serial('id_horario').primaryKey(),
  id_personal: integer('id_personal').notNull(),
  dia_semana: varchar('dia_semana', { length: 20 }).notNull(),
  hora_inicio: time('hora_inicio').notNull(),
  hora_fin: time('hora_fin').notNull(),
  duracion_cita: integer('duracion_cita').notNull(),
  activo: boolean('activo').default(true).notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
});
