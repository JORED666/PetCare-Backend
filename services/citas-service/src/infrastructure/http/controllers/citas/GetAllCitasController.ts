import { Request, Response, NextFunction } from 'express';
import { GetAllCitasUseCase } from '../../../../application/use-cases/GetAllCitasUseCase';
import { CitaRepository } from '../../../db/repositories/CitaRepository';

const getAllCitasUseCase = new GetAllCitasUseCase(new CitaRepository());

export class GetAllCitasController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const citas = await getAllCitasUseCase.execute();
      res.json({ success: true, data: citas });
    } catch (error) {
      next(error);
    }
  }
}