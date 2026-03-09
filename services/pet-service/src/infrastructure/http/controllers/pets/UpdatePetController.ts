import { Request, Response, NextFunction } from 'express';
import { UpdatePetUseCase } from '../../../../application/use-cases/UpdatePetUseCase';
import { PetRepository } from '../../../db/repositories/PetRepository';

const updatePetUseCase = new UpdatePetUseCase(new PetRepository());

export class UpdatePetController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const pet = await updatePetUseCase.execute(parseInt(req.params.id), req.body);
      res.json({ success: true, data: pet });
    } catch (error) {
      next(error);
    }
  }
}