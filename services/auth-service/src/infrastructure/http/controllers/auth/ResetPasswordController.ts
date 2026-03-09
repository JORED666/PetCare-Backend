import { Request, Response, NextFunction } from 'express';
import { ResetPasswordUseCase } from '../../../../application/use-cases/ResetPasswordUseCase';
import { UserRepository } from '../../../db/repositories/UserRepository';
import { ResetTokenRepository } from '../../../db/repositories/ResetTokenRepository';

const resetPasswordUseCase = new ResetPasswordUseCase(
  new UserRepository(),
  new ResetTokenRepository()
);

export class ResetPasswordController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await resetPasswordUseCase.execute(req.body);
      res.json({ success: true, message: 'Contraseña restablecida correctamente' });
    } catch (error) {
      next(error);
    }
  }
}