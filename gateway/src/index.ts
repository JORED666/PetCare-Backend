import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { requestLogger } from './proxy';
import authRoutes from './infrastructure/http/routes/auth.routes';
import clientsRoutes from './infrastructure/http/routes/clients.routes';
import petsRoutes from './infrastructure/http/routes/pets.routes';
import citasRoutes from './infrastructure/http/routes/citas.routes';
import agendaRoutes from './infrastructure/http/routes/agenda.routes';
import notificationsRoutes from './infrastructure/http/routes/notifications.routes';
import historialRoutes from './infrastructure/http/routes/historial.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(requestLogger);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'gateway', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/pets', petsRoutes);
app.use('/api/citas', citasRoutes);
app.use('/api/agenda', agendaRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/notifications', notificationsRoutes);

app.listen(PORT, () => {
  console.log(`Ì∫Ä Gateway running on port ${PORT}`);
  console.log(`Ì≥ç Health check: http://localhost:${PORT}/health`);
  console.log(`Ì¥ê Auth:      http://localhost:${PORT}/api/auth`);
  console.log(`Ì±• Clients:   http://localhost:${PORT}/api/clients`);
  console.log(`Ì∞æ Pets:      http://localhost:${PORT}/api/pets`);
  console.log(`Ì≥Ö Citas:     http://localhost:${PORT}/api/citas`);
  console.log(`Ì≥Ü Agenda:    http://localhost:${PORT}/api/agenda`);
  console.log(`Ì≥ã Historial: http://localhost:${PORT}/api/historial`);
});

export default app;
