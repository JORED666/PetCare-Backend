import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import medicalRoutes from './routes/medical.routes';
import { errorHandler } from './middlewares/error.middleware';

const app: Application = express();
const PORT = process.env.PORT || 3006;

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'medical-service', timestamp: new Date().toISOString() });
});

app.use('/api/medical', medicalRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Medical Service running on port ${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/health`);
  console.log(`🏥 Medical: http://localhost:${PORT}/api/medical`);
});

export default app;
