import { Request, Response, NextFunction } from 'express';
import { GetCitasByUserIdUseCase } from '../../../../application/use-cases/GetCitasByUserIdUseCase';
import { CitaRepository } from '../../../db/repositories/CitaRepository';

const getCitasByUserIdUseCase = new GetCitasByUserIdUseCase(new CitaRepository());

export class GetCitasByUserIdController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const citas = await getCitasByUserIdUseCase.execute(parseInt(req.params.userId));
      res.json({ success: true, data: citas });
    } catch (error) {
      next(error);
    }
  }
}