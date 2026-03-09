import { Request, Response, NextFunction } from 'express';
import { DeletePetUseCase } from '../../../../application/use-cases/DeletePetUseCase';
import { PetRepository } from '../../../db/repositories/PetRepository';

const deletePetUseCase = new DeletePetUseCase(new PetRepository());

export class DeletePetController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await deletePetUseCase.execute(parseInt(req.params.id));
      res.json({ success: true, message: 'Mascota eliminada correctamente' });
    } catch (error) {
      next(error);
    }
  }
}