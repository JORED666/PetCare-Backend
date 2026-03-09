import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const router = Router();

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

router.use(createProxyMiddleware({
  target: AUTH_SERVICE_URL,
  changeOrigin: true,
  proxyTimeout: 30000,
  timeout: 30000,
}));

export default router;  