import { Response, NextFunction } from 'express';
import { UserRepository } from '../../../db/repositories/UserRepository';
import { AuthRequest } from '../../middlewares/auth.middleware';

const userRepository = new UserRepository();

export class MeController {
  async handle(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = await userRepository.findById(req.userId!);
      if (!user) {
        return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
      }

      const { password, ...userSinPassword } = user;
      res.json({ success: true, user: userSinPassword });
    } catch (error) {
      next(error);
    }
  }
}