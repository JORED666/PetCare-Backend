import { Request, Response, NextFunction } from 'express';
import { UpdateAgendaStatusUseCase } from '../../../../application/use-cases/UpdateAgendaStatusUseCase';
import { AgendaRepository } from '../../../db/repositories/AgendaRepository';

const updateAgendaStatusUseCase = new UpdateAgendaStatusUseCase(new AgendaRepository());

export class UpdateAgendaStatusController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const agenda = await updateAgendaStatusUseCase.execute(parseInt(req.params.id), req.body);
      res.json({ success: true, data: agenda });
    } catch (error) {
      next(error);
    }
  }
}