import { Request, Response, NextFunction } from 'express';
import { logger } from '../../config/logger';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error('Error:', err);
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';
  res.status(status).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
