import { Router, Request, Response } from 'express';
import axios from 'axios';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const CITAS_SERVICE_URL = process.env.CITAS_SERVICE_URL || 'http://localhost:3004';

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${CITAS_SERVICE_URL}/api/citas`, {
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
    const response = await axios.get(`${CITAS_SERVICE_URL}/api/citas/${req.params.id}`, {
      headers: { Authorization: req.headers.authorization || '' },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    res.status(err.response?.status ?? 500).json(err.response?.data ?? { success: false, error: 'Error' });
  }
});

router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${CITAS_SERVICE_URL}/api/citas`, req.body, {
      headers: { Authorization: req.headers.authorization || '', 'Content-Type': 'application/json' },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    res.status(err.response?.status ?? 500).json(err.response?.data ?? { success: false, error: 'Error' });
  }
});

router.put('/:id/status', authMiddleware, async (req: Request, res: Response) => {
  try {
    const response = await axios.put(`${CITAS_SERVICE_URL}/api/citas/${req.params.id}/status`, req.body, {
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
    const response = await axios.delete(`${CITAS_SERVICE_URL}/api/citas/${req.params.id}`, {
      headers: { Authorization: req.headers.authorization || '' },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    res.status(err.response?.status ?? 500).json(err.response?.data ?? { success: false, error: 'Error' });
  }
});

router.get('/detalle', authMiddleware, async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${CITAS_SERVICE_URL}/api/citas/detalle`, {
      headers: { Authorization: req.headers.authorization || '' },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    res.status(err.response?.status ?? 500).json(err.response?.data ?? { success: false, error: 'Error' });
  }
});
export default router;