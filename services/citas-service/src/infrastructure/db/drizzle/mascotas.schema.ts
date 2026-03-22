import { pgTable, serial, integer, varchar, date, boolean, numeric, timestamp } from 'drizzle-orm/pg-core';

export const mascotas = pgTable('mascotas', {
  id_mascota:       serial('id_mascota').primaryKey(),
  id_user:          integer('id_user').notNull(),
  especie:          varchar('especie', { length: 20 }).notNull(),
  nombre:           varchar('nombre', { length: 100 }).notNull(),
  fecha_nacimiento: date('fecha_nacimiento'),
  sexo:             varchar('sexo', { length: 10 }),
  peso:             numeric('peso', { precision: 5, scale: 2 }),
  activo:           boolean('activo').default(true),
  updated_at:       timestamp('updated_at').defaultNow(),
});