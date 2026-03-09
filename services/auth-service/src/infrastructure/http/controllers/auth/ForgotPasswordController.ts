import { Request, Response, NextFunction } from 'express';
import { ForgotPasswordUseCase } from '../../../../application/use-cases/ForgotPasswordUseCase';
import { UserRepository } from '../../../db/repositories/UserRepository';
import { ResetTokenRepository } from '../../../db/repositories/ResetTokenRepository';

const forgotPasswordUseCase = new ForgotPasswordUseCase(
  new UserRepository(),
  new ResetTokenRepository()
);

export class ForgotPasswordController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await forgotPasswordUseCase.execute(req.body);
      res.json({ success: true, message: 'Si el email existe, recibirás un enlace para restablecer tu contraseña' });
    } catch (error) {
      next(error);
    }
  }
}