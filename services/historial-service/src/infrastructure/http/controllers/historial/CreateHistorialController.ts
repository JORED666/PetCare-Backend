import { Request, Response, NextFunction } from 'express';
import { CreateHistorialUseCase } from '../../../../application/use-cases/CreateHistorialUseCase';
import { HistorialRepository } from '../../../db/repositories/HistorialRepository';

const createHistorialUseCase = new CreateHistorialUseCase(new HistorialRepository());

export class CreateHistorialController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const historial = await createHistorialUseCase.execute(req.body);
      res.status(201).json({ success: true, data: historial });
    } catch (error) {
      next(error);
    }
  }
}