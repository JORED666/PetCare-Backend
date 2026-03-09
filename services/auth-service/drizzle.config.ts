import type { Config } from 'drizzle-kit';

export default {
  schema: './src/infrastructure/db/drizzle/*.schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://veterinaria:vet123@localhost:5432/veterinaria',
  },
} satisfies Config;