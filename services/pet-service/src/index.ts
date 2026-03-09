import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import routes from './infrastructure/http/routes/routes';
import { errorHandler } from './infrastructure/http/middlewares/error.middleware';

const app: Application = express();
const PORT = process.env.PORT || 3003;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'pet-service', timestamp: new Date().toISOString() });
});

app.use('/api', routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Pet Service running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🐾 Pet endpoints: http://localhost:${PORT}/api/pets`);
});

export default app;