import { Request, Response, NextFunction } from 'express';
import { CreateAgendaUseCase } from '../../../../application/use-cases/CreateAgendaUseCase';
import { AgendaRepository } from '../../../db/repositories/AgendaRepository';

const createAgendaUseCase = new CreateAgendaUseCase(new AgendaRepository());

export class CreateAgendaController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const agenda = await createAgendaUseCase.execute(req.body);
      res.status(201).json({ success: true, data: agenda });
    } catch (error) {
      next(error);
    }
  }
}