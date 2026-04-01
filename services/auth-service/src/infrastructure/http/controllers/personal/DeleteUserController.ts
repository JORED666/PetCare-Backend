import { Request, Response } from 'express';
import { DeleteUserUseCase } from '../../../../application/use-cases/DeleteUserUseCase';
import { UserRepository } from '../../../db/repositories/UserRepository';

export class DeleteUserController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const id  = parseInt(req.params.id);
      const rol = req.query.rol as string;

      if (!id || !rol) {
        res.status(400).json({ success: false, error: 'id y rol son requeridos' });
        return;
      }

      const useCase = new DeleteUserUseCase(new UserRepository());
      await useCase.execute({ id, rol });

      res.status(200).json({ success: true, message: 'Usuario desactivado correctamente' });
    } catch (error: any) {
      res.status(404).json({ success: false, error: error.message });
    }
  }
}