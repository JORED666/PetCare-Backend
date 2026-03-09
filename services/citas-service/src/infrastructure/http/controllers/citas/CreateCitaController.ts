import { Request, Response, NextFunction } from 'express';
import { CreateCitaUseCase } from '../../../../application/use-cases/CreateCitaUseCase';
import { CitaRepository } from '../../../db/repositories/CitaRepository';

const createCitaUseCase = new CreateCitaUseCase(new CitaRepository());

export class CreateCitaController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const cita = await createCitaUseCase.execute(req.body);
      res.status(201).json({ success: true, data: cita });
    } catch (error) {
      next(error);
    }
  }
}