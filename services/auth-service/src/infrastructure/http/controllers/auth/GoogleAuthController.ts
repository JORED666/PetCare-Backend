import { Request, Response, NextFunction } from 'express';
import { GoogleAuthUseCase } from '../../../../application/use-cases/GoogleAuthUseCase';
import { UserRepository } from '../../../db/repositories/UserRepository';

const googleAuthUseCase = new GoogleAuthUseCase(new UserRepository());

export class GoogleAuthController {
  async handleCallback(req: Request, res: Response, next: NextFunction) {
    try {
      const profile = req.user as any;
      console.log('👤 Profile recibido:', profile)
      
      const token = await googleAuthUseCase.execute(profile);
      console.log('🎟️ Token generado:', token ? 'OK' : 'NULL')
      
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      console.log('🔀 Redirigiendo a:', `${frontendUrl}/auth/callback`)
      
      res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
    } catch (error) {
      console.error('❌ Error en GoogleAuthController:', error)
      next(error);
    }
  }
}