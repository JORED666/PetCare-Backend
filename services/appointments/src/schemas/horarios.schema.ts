import { pgTable, serial, integer, time, boolean, timestamp, unique } from 'drizzle-orm/pg-core';
import { personal } from './personal.schema';

export const horariosDisponibles = pgTable('horarios_disponibles', {
  id_horario: serial('id_horario').primaryKey(),
  id_personal: integer('id_personal').notNull().references(() => personal.id_personal, { onDelete: 'cascade' }),
  dia_semana: integer('dia_semana').notNull(), // 0=Domingo, 6=Sábado
  hora_inicio: time('hora_inicio').notNull(),
  hora_fin: time('hora_fin').notNull(),
  activo: boolean('activo').default(true),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
}, (table) => ({
  uniqueSchedule: unique().on(table.id_personal, table.dia_semana, table.hora_inicio)
}));