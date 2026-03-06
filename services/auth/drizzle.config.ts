import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schemas/*',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: 'postgresql://veterinaria:vet123@localhost:5432/veterinaria',
  },
} satisfies Config;
