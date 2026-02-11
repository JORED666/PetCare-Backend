import dotenv from 'dotenv';
import path from 'path';

// Cargar .env desde la raíz del servicio
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../schemas';

const connectionString = process.env.DATABASE_URL!;
console.log('🔌 DATABASE_URL:', connectionString);

const queryClient = postgres(connectionString);
export const db = drizzle(queryClient, { schema });