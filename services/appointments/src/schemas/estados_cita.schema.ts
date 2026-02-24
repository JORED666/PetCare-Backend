import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const estadosCita = pgTable('estados_cita', {
  id_estado: serial('id_estado').primaryKey(),
  nombre: varchar('nombre', { length: 50 }).notNull().unique(),
  color: varchar('color', { length: 7 }).default('#000000'),
  created_at: timestamp('created_at').defaultNow()
});
