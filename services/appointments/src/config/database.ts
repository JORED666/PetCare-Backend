import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL || 'postgresql://petcare:petcare123@localhost:5434/petcare';

console.log('🔌 DATABASE_URL:', connectionString);

const client = postgres(connectionString);
export const db = drizzle(client);
