import { Router, Request, Response } from 'express';
import axios from 'axios';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const AGENDA_SERVICE_URL = process.env.AGENDA_SERVICE_URL || 'http://localhost:3005';

router.get('/veterinario/:vetId', authMiddleware, async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${AGENDA_SERVICE_URL}/api/agenda/veterinario/${req.params.vetId}`, {
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
    const response = await axios.post(`${AGENDA_SERVICE_URL}/api/agenda`, req.body, {
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
    const response = await axios.put(`${AGENDA_SERVICE_URL}/api/agenda/${req.params.id}/status`, req.body, {
      headers: { Authorization: req.headers.authorization || '', 'Content-Type': 'application/json' },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    res.status(err.response?.status ?? 500).json(err.response?.data ?? { success: false, error: 'Error' });
  }
});

router.delete('/veterinario/:vetId', authMiddleware, async (req: Request, res: Response) => {
  try {
    const response = await axios.delete(`${AGENDA_SERVICE_URL}/api/agenda/veterinario/${req.params.vetId}`, {
      headers: { Authorization: req.headers.authorization || '' },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    res.status(err.response?.status ?? 500).json(err.response?.data ?? { success: false, error: 'Error' });
  }
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const response = await axios.delete(`${AGENDA_SERVICE_URL}/api/agenda/${req.params.id}`, {
      headers: { Authorization: req.headers.authorization || '' },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    res.status(err.response?.status ?? 500).json(err.response?.data ?? { success: false, error: 'Error' });
  }
});

export default router;