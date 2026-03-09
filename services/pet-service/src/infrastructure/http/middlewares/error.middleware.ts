import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('❌ Error:', error);

  const status = error.status || 500;
  const message = error.message || 'Error interno del servidor';

  res.status(status).json({
    success: false,
    error: message
  });
};
