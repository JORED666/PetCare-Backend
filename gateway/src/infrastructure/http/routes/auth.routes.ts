import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

router.post('/login', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/api/auth/login`, req.body, {
      headers: { 'Content-Type': 'application/json' },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    res.status(err.response?.status ?? 500).json(err.response?.data ?? { success: false, error: 'Error en login' });
  }
});

router.post('/register', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/api/auth/register`, req.body, {
      headers: { 'Content-Type': 'application/json' },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    res.status(err.response?.status ?? 500).json(err.response?.data ?? { success: false, error: 'Error en register' });
  }
});

router.get('/me', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${AUTH_SERVICE_URL}/api/auth/me`, {
      headers: { Authorization: req.headers.authorization || '' },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    res.status(err.response?.status ?? 500).json(err.response?.data ?? { success: false, error: 'Error en me' });
  }
});

router.post('/forgot-password', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/api/auth/forgot-password`, req.body, {
      headers: { 'Content-Type': 'application/json' },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    res.status(err.response?.status ?? 500).json(err.response?.data ?? { success: false, error: 'Error' });
  }
});

router.post('/reset-password', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/api/auth/reset-password`, req.body, {
      headers: { 'Content-Type': 'application/json' },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    res.status(err.response?.status ?? 500).json(err.response?.data ?? { success: false, error: 'Error' });
  }
});

export default router;