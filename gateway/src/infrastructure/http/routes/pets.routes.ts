import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const PET_SERVICE_URL = process.env.PET_SERVICE_URL || 'http://localhost:3003';

router.use(authMiddleware, createProxyMiddleware({
  target: PET_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (path) => `/api/pets${path}`,
}));

export default router;