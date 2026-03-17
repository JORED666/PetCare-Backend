import { Router, Request, Response } from 'express';
import axios from 'axios';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const CLIENT_SERVICE_URL = process.env.CLIENT_SERVICE_URL || 'http://localhost:3002';

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${CLIENT_SERVICE_URL}/api/clients`, {
      headers: { Authorization: req.headers.authorization || '' },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    res.status(err.response?.status ?? 500).json(err.response?.data ?? { success: false, error: 'Error' });
  }
});

router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${CLIENT_SERVICE_URL}/api/clients/${req.params.id}`, {
      headers: { Authorization: req.headers.authorization || '' },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    res.status(err.response?.status ?? 500).json(err.response?.data ?? { success: false, error: 'Error' });
  }
});

router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const response = await axios.put(`${CLIENT_SERVICE_URL}/api/clients/${req.params.id}`, req.body, {
      headers: { Authorization: req.headers.authorization || '', 'Content-Type': 'application/json' },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    res.status(err.response?.status ?? 500).json(err.response?.data ?? { success: false, error: 'Error' });
  }
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const response = await axios.delete(`${CLIENT_SERVICE_URL}/api/clients/${req.params.id}`, {
      headers: { Authorization: req.headers.authorization || '' },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    res.status(err.response?.status ?? 500).json(err.response?.data ?? { success: false, error: 'Error' });
  }
});

export default router;