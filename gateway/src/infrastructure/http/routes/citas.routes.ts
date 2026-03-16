import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const CITAS_SERVICE_URL = process.env.CITAS_SERVICE_URL || 'http://localhost:3004';

router.use(authMiddleware, createProxyMiddleware({
  target: CITAS_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/': '/api/citas/' },
}));

export default router;