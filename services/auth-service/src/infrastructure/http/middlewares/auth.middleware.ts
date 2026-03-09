import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../utils/jwt.util';

export interface AuthRequest extends Request {
  userId?: number;
  userEmail?: string;
  userRol?: string;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = verifyToken(token) as any;
    req.userId = payload.id;
    req.userEmail = payload.email;
    req.userRol = payload.rol;
    next();
  } catch {
    return res.status(401).json({ success: false, error: 'Token inválido o expirado' });
  }
}