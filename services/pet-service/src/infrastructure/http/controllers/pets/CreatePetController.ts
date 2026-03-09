import { Request, Response, NextFunction } from 'express';
import { CreatePetUseCase } from '../../../../application/use-cases/CreatePetUseCase';
import { PetRepository } from '../../../db/repositories/PetRepository';

const createPetUseCase = new CreatePetUseCase(new PetRepository());

export class CreatePetController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const pet = await createPetUseCase.execute(req.body);
      res.status(201).json({ success: true, data: pet });
    } catch (error) {
      next(error);
    }
  }
}