import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import serviciosRoutes from './routes/servicios.routes';
import professionalsRoutes from './routes/professionals.routes';
import horariosRoutes from './routes/horarios.routes';
import citasRoutes from './routes/citas.routes';
import { errorHandler } from './middlewares/error.middleware';

const app: Application = express();
const PORT = process.env.PORT || 3004;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'appointments-service',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/appointments/services', serviciosRoutes);
app.use('/api/appointments/professionals', professionalsRoutes);
app.use('/api/appointments', horariosRoutes);
app.use('/api/appointments', citasRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Appointments Service running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`💉 Services: http://localhost:${PORT}/api/appointments/services`);
  console.log(`👨‍⚕️ Professionals: http://localhost:${PORT}/api/appointments/professionals`);
  console.log(`📅 Appointments: http://localhost:${PORT}/api/appointments`);
  console.log(`⏰ Schedules: http://localhost:${PORT}/api/appointments/personal/:id/horarios`);
});

export default app;
