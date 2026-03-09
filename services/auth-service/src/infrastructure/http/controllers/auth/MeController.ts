import { Request, Response, NextFunction } from 'express';

export class MeController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      res.json({ success: true, user: req.user });
    } catch (error) {
      next(error);
    }
  }
}