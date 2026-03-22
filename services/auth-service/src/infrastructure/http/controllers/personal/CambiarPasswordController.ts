import { Request, Response, NextFunction } from 'express';
import { ChangePasswordUseCase } from '../../../../application/use-cases/ChangePasswordUseCase';
import { UserRepository } from '../../../db/repositories/UserRepository';
import { AuthRequest } from '../../middlewares/auth.middleware';

const changePasswordUseCase = new ChangePasswordUseCase(new UserRepository());

export class CambiarPasswordController {
  async handle(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await changePasswordUseCase.execute(req.userId!, req.userRol!, req.body);
      res.json({ success: true, message: 'Contraseña actualizada correctamente' });
    } catch (error) {
      next(error);
    }
  }
}