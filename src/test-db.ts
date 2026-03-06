import postgres from 'postgres';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const connectionString = process.env.DATABASE_URL;

async function testConnection() {
    console.log('🔍 Testing connection to:', connectionString);
    if (!connectionString) {
        console.error('❌ DATABASE_URL is not defined');
        process.exit(1);
    }

    const sql = postgres(connectionString);

    try {
        const result = await sql`SELECT 1 as connected`;
        console.log('✅ Connected successfully:', result);
        process.exit(0);
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        process.exit(1);
    }
}

testConnection();
