import { Request, Response, NextFunction } from 'express';
import { GetHistorialByMascotaUseCase } from '../../../../application/use-cases/GetHistorialByMascotaUseCase';
import { HistorialRepository } from '../../../db/repositories/HistorialRepository';

const getHistorialByMascotaUseCase = new GetHistorialByMascotaUseCase(new HistorialRepository());

export class GetHistorialByMascotaController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const historial = await getHistorialByMascotaUseCase.execute(parseInt(req.params.mascotaId));
      res.json({ success: true, data: historial });
    } catch (error) {
      next(error);
    }
  }
}