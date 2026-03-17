import { Router, Request, Response } from 'express';
import axios from 'axios';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const HISTORIAL_SERVICE_URL = process.env.HISTORIAL_SERVICE_URL || 'http://localhost:3006';

router.get('/mascota/:mascotaId', authMiddleware, async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${HISTORIAL_SERVICE_URL}/api/historial/mascota/${req.params.mascotaId}`, {
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
    const response = await axios.post(`${HISTORIAL_SERVICE_URL}/api/historial`, req.body, {
      headers: { Authorization: req.headers.authorization || '', 'Content-Type': 'application/json' },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    res.status(err.response?.status ?? 500).json(err.response?.data ?? { success: false, error: 'Error' });
  }
});

export default router;