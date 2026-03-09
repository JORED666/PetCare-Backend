import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const AGENDA_SERVICE_URL = process.env.AGENDA_SERVICE_URL || 'http://localhost:3005';

router.use(authMiddleware, createProxyMiddleware({
  target: AGENDA_SERVICE_URL,
  changeOrigin: true
}));

export default router;
