import { Router, Request, Response } from 'express';
import axios from 'axios';
import FormData from 'form-data';
import multer from 'multer';

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

const upload = multer({ storage: multer.memoryStorage() });

router.post('/register', upload.single('avatar'), async (req: Request, res: Response) => {
  try {
    const form = new FormData();

    Object.entries(req.body).forEach(([key, value]) => {
      form.append(key, value as string);
    });

    if (req.file) {
      form.append('avatar', req.file.buffer, {
        filename:    req.file.originalname,
        contentType: req.file.mimetype,
      });
    }

    const response = await axios.post(`${AUTH_SERVICE_URL}/api/auth/register`, form, {
      headers: { ...form.getHeaders() },
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

router.get('/users/admins', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${AUTH_SERVICE_URL}/api/users/admins`, {
      headers: { Authorization: req.headers.authorization || '' },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    res.status(err.response?.status ?? 500).json(err.response?.data ?? { success: false, error: 'Error' });
  }
});

router.get('/google', (req: Request, res: Response) => {
  res.redirect(`${AUTH_SERVICE_URL}/api/auth/google`);
});

router.get('/google/callback', (req: Request, res: Response) => {
  res.redirect(`${AUTH_SERVICE_URL}/api/auth/google/callback?${new URLSearchParams(req.query as Record<string, string>).toString()}`);
});

router.get('/google/failed', (req: Request, res: Response) => {
  res.redirect('http://localhost:3000/login?error=google_failed');
});

export default router;