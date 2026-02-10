import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('❌ Error:', error);

  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'development' 
      ? error.message 
      : 'Internal server error'
  });
}
