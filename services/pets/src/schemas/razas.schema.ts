import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';

export const razas = pgTable('razas', {
  id_raza: serial('id_raza').primaryKey(),
  id_especie: integer('id_especie').notNull(),
  nombre: varchar('nombre', { length: 100 }).notNull()
});

export type Raza = typeof razas.$inferSelect;
