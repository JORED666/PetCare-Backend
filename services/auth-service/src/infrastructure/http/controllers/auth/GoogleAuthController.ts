import { Request, Response, NextFunction } from 'express';
import { GoogleAuthUseCase } from '../../../../application/use-cases/GoogleAuthUseCase';
import { UserRepository } from '../../../db/repositories/UserRepository';

const googleAuthUseCase = new GoogleAuthUseCase(new UserRepository());

export class GoogleAuthController {
  async handleCallback(req: Request, res: Response, next: NextFunction) {
    try {
      const profile = req.user as any;
      const token = await googleAuthUseCase.execute(profile);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
    } catch (error) {
      next(error);
    }
  }
}