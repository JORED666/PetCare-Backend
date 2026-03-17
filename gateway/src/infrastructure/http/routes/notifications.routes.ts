import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3007';

router.post('/', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${NOTIFICATION_SERVICE_URL}/api/notifications`, req.body, {
      headers: { 'Content-Type': 'application/json' },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    res.status(err.response?.status ?? 500).json(err.response?.data ?? { success: false, error: 'Error' });
  }
});

export default router;