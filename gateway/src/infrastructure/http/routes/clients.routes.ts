import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const CLIENT_SERVICE_URL = process.env.CLIENT_SERVICE_URL || 'http://localhost:3002';

router.use(authMiddleware, createProxyMiddleware({
  target: CLIENT_SERVICE_URL,
  changeOrigin: true
}));

export default router;