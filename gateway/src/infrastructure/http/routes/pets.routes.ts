import { Router, Request, Response } from 'express';
import axios from 'axios';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const PET_SERVICE_URL = process.env.PET_SERVICE_URL || 'http://localhost:3003';

router.get('/user/:userId', authMiddleware, async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${PET_SERVICE_URL}/api/pets/user/${req.params.userId}`, {
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
    const response = await axios.get(`${PET_SERVICE_URL}/api/pets/${req.params.id}`, {
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
    const response = await axios.post(`${PET_SERVICE_URL}/api/pets`, req.body, {
      headers: {
        Authorization:  req.headers.authorization || '',
        'Content-Type': 'application/json',
      },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    res.status(err.response?.status ?? 500).json(err.response?.data ?? { success: false, error: 'Error' });
  }
});

router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const response = await axios.put(`${PET_SERVICE_URL}/api/pets/${req.params.id}`, req.body, {
      headers: {
        Authorization:  req.headers.authorization || '',
        'Content-Type': 'application/json',
      },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    res.status(err.response?.status ?? 500).json(err.response?.data ?? { success: false, error: 'Error' });
  }
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const response = await axios.delete(`${PET_SERVICE_URL}/api/pets/${req.params.id}`, {
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
    const response = await axios.get(`${PET_SERVICE_URL}/api/pets/detalle`, {
      headers: { Authorization: req.headers.authorization || '' },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    res.status(err.response?.status ?? 500).json(err.response?.data ?? { success: false, error: 'Error' });
  }
});

router.patch('/:id/reactivar', authMiddleware, async (req: Request, res: Response) => {
  try {
    const response = await axios.patch(`${PET_SERVICE_URL}/api/pets/${req.params.id}/reactivar`, {}, {
      headers: { Authorization: req.headers.authorization || '' },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    res.status(err.response?.status ?? 500).json(err.response?.data ?? { success: false, error: 'Error' });
  }
});

router.delete('/:id/permanente', authMiddleware, async (req: Request, res: Response) => {
  try {
    const response = await axios.delete(`${PET_SERVICE_URL}/api/pets/${req.params.id}/permanente`, {
      headers: { Authorization: req.headers.authorization || '' },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    res.status(err.response?.status ?? 500).json(err.response?.data ?? { success: false, error: 'Error' });
  }
});

export default router;