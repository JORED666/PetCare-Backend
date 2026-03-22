import { Request, Response, NextFunction } from 'express';
import { UpdateProfileUseCase } from '../../../../application/use-cases/UpdateProfileUseCase';
import { UserRepository } from '../../../db/repositories/UserRepository';

const updateProfileUseCase = new UpdateProfileUseCase(new UserRepository());

export class UpdateProfileController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, rol, nombre, apellido, email, telefono, cedula_profesional, avatar_url } = req.body;
      await updateProfileUseCase.execute(id, rol, { nombre, apellido, email, telefono, cedula_profesional, avatar_url });
      res.json({ success: true, message: 'Perfil actualizado correctamente' });
    } catch (error) {
      next(error);
    }
  }
}