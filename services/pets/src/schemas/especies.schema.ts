import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const especies = pgTable('especies', {
  id_especie: serial('id_especie').primaryKey(),
  nombre: varchar('nombre', { length: 50 }).notNull().unique()
});

export type Especie = typeof especies.$inferSelect;
