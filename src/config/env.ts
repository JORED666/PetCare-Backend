import dotenv from 'dotenv';
dotenv.config();

export const config = {
  server: {
    port: parseInt(process.env.PORT || '3000'),
    env: process.env.NODE_ENV || 'development',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000'
  },
  database: {
    url: process.env.DATABASE_URL || 'postgresql://petcare:petcare123@localhost:5434/petcare'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'petcare-secret-key-2024',
    expiresIn: '24h'
  }
};
