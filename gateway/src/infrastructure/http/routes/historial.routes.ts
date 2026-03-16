import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const HISTORIAL_SERVICE_URL = process.env.HISTORIAL_SERVICE_URL || 'http://localhost:3006';

router.use(authMiddleware, createProxyMiddleware({
  target: HISTORIAL_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (path) => `/api/historial${path}`,
}));

export default router;