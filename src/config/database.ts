import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from './env';

const client = postgres(config.database.url);
export const db = drizzle(client);

console.log('🔌 Database connected:', config.database.url);
