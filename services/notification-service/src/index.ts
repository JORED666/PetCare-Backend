import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import cron from 'node-cron';
import routes from './infrastructure/http/routes/routes';
import { errorHandler } from './infrastructure/http/middlewares/error.middleware';
import { SendRecordatorioCitaUseCase } from './application/use-cases/SendRecordatorioCitaUseCase';

const app: Application = express();
const PORT = process.env.PORT || 3007;

const recordatorioUseCase = new SendRecordatorioCitaUseCase();

// Cron: cada hora en punto → verifica citas en 24h y 1h
cron.schedule('0 * * * *', async () => {
  console.log('🕐 Cron: verificando recordatorios...');
  try {
    await recordatorioUseCase.executeRecordatorio24h();
    await recordatorioUseCase.executeRecordatorio1h();
  } catch (error) {
    console.error('❌ Error en cron de recordatorios:', error);
  }
});

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'notification-service', timestamp: new Date().toISOString() });
});

app.use('/api', routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Notification Service running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📧 Notifications: http://localhost:${PORT}/api/notifications/send`);
  console.log(`⏰ Cron: recordatorios cada hora`);
});

export default app;