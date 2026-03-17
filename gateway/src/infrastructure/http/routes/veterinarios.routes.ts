import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

router.get('/listar', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${AUTH_SERVICE_URL}/api/veterinarios/listar`, {
      headers: { Authorization: req.headers.authorization || '' },
    });
    res.json(response.data);
  } catch (error: unknown) {
    res.status(500).json({ success: false, error: 'Error al listar veterinarios' });
  }
});

router.post('/registrar', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/api/veterinarios/registrar`, req.body, {
      headers: {
        Authorization:  req.headers.authorization || '',
        'Content-Type': 'application/json',
      },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    res.status(500).json({ success: false, error: 'Error al registrar veterinario' });
  }
});

router.put('/cambiar-password', async (req: Request, res: Response) => {
  try {
    const response = await axios.put(`${AUTH_SERVICE_URL}/api/veterinarios/cambiar-password`, req.body, {
      headers: {
        Authorization:  req.headers.authorization || '',
        'Content-Type': 'application/json',
      },
    });
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    res.status(500).json({ success: false, error: 'Error al cambiar contraseña' });
  }
});

export default router;