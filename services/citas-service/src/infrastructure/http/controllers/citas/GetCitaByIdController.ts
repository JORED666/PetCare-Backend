import { Request, Response, NextFunction } from 'express';
import { GetCitaByIdUseCase } from '../../../../application/use-cases/GetCitaByIdUseCase';
import { CitaRepository } from '../../../db/repositories/CitaRepository';

const getCitaByIdUseCase = new GetCitaByIdUseCase(new CitaRepository());

export class GetCitaByIdController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const cita = await getCitaByIdUseCase.execute(parseInt(req.params.id));
      res.json({ success: true, data: cita });
    } catch (error) {
      next(error);
    }
  }
}