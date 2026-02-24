import { pgTable, serial, integer, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';

export const personal = pgTable('personal', {
  id_personal: serial('id_personal').primaryKey(),
  id_rol: integer('id_rol').notNull(),
  nombre: varchar('nombre', { length: 100 }).notNull(),
  apellido: varchar('apellido', { length: 100 }).notNull(),
  activo: boolean('activo').default(true).notNull()
});
