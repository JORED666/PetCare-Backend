import { Request, Response, NextFunction } from 'express';
import { GetAllPetsUseCase } from '../../../../application/use-cases/GetAllPetsUseCase';
import { PetRepository } from '../../../db/repositories/PetRepository';

const getAllPetsUseCase = new GetAllPetsUseCase(new PetRepository());

export class GetAllPetsController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const pets = await getAllPetsUseCase.execute();
      res.json({ success: true, data: pets });
    } catch (error) {
      next(error);
    }
  }
}