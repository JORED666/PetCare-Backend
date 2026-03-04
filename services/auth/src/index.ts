import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import personalRoutes from './routes/personal.routes';
import { errorHandler } from './middlewares/error.middleware';
import { PasswordResetController } from './controllers/password-reset.controller';

const app: Application = express();
const PORT = process.env.PORT || 3001;

// ✅ PRIMERO: Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ LUEGO: Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'auth-service',
    timestamp: new Date().toISOString()
  });
});

// ✅ DESPUÉS: Rutas
app.use('/api/auth', authRoutes);
app.use('/api/personal', personalRoutes);

// ✅ Rutas de password reset
const passwordResetController = new PasswordResetController();
app.post('/api/auth/forgot-password', passwordResetController.forgotPassword.bind(passwordResetController));
app.post('/api/auth/reset-password', passwordResetController.resetPassword.bind(passwordResetController));

// ✅ FINALMENTE: Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Auth Service running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Auth: http://localhost:${PORT}/api/auth`);
  console.log(`👥 Personal: http://localhost:${PORT}/api/personal`);
});

export default app;
