import { Request, Response, NextFunction } from 'express';
import { UpdateCitaStatusUseCase } from '../../../../application/use-cases/UpdateCitaStatusUseCase';
import { CitaRepository } from '../../../db/repositories/CitaRepository';

const updateCitaStatusUseCase = new UpdateCitaStatusUseCase(new CitaRepository());

export class UpdateCitaStatusController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const cita = await updateCitaStatusUseCase.execute(parseInt(req.params.id), req.body);
      res.json({ success: true, data: cita });
    } catch (error) {
      next(error);
    }
  }
}