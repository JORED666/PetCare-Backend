import { Request, Response, NextFunction } from 'express';
import { GetPetsByUserIdUseCase } from '../../../../application/use-cases/GetPetsByUserIdUseCase';
import { PetRepository } from '../../../db/repositories/PetRepository';

const getPetsByUserIdUseCase = new GetPetsByUserIdUseCase(new PetRepository());

export class GetPetsByUserIdController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const pets = await getPetsByUserIdUseCase.execute(parseInt(req.params.userId));
      res.json({ success: true, data: pets });
    } catch (error) {
      next(error);
    }
  }
}