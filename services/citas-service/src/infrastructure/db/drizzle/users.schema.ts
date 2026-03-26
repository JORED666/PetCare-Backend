import { pgTable, serial, integer, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id_user:   serial('id_user').primaryKey(),
  id_rol:    integer('id_rol').notNull(),
  nombre:    varchar('nombre', { length: 100 }).notNull(),
  apellido:  varchar('apellido', { length: 100 }).notNull(),
  email:     varchar('email', { length: 150 }).notNull(),
  telefono:  varchar('telefono', { length: 20 }),
  activo:    boolean('activo').default(true),
  created_at: timestamp('created_at').defaultNow(),
});