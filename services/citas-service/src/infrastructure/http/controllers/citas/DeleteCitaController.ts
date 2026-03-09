import { Request, Response, NextFunction } from 'express';
import { DeleteCitaUseCase } from '../../../../application/use-cases/DeleteCitaUseCase';
import { CitaRepository } from '../../../db/repositories/CitaRepository';

const deleteCitaUseCase = new DeleteCitaUseCase(new CitaRepository());

export class DeleteCitaController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await deleteCitaUseCase.execute(parseInt(req.params.id));
      res.json({ success: true, message: 'Cita eliminada correctamente' });
    } catch (error) {
      next(error);
    }
  }
}