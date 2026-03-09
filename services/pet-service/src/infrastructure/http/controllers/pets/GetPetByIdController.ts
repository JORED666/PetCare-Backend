import { Request, Response, NextFunction } from 'express';
import { GetPetByIdUseCase } from '../../../../application/use-cases/GetPetByIdUseCase';
import { PetRepository } from '../../../db/repositories/PetRepository';

const getPetByIdUseCase = new GetPetByIdUseCase(new PetRepository());

export class GetPetByIdController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const pet = await getPetByIdUseCase.execute(parseInt(req.params.id));
      res.json({ success: true, data: pet });
    } catch (error) {
      next(error);
    }
  }
}