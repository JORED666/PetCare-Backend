import { Request, Response, NextFunction } from 'express';
import { DeleteAgendaUseCase } from '../../../../application/use-cases/DeleteAgendaUseCase';
import { AgendaRepository } from '../../../db/repositories/AgendaRepository';

const deleteAgendaUseCase = new DeleteAgendaUseCase(new AgendaRepository());

export class DeleteAgendaController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await deleteAgendaUseCase.execute(parseInt(req.params.id));
      res.json({ success: true, message: 'Agenda eliminada correctamente' });
    } catch (error) {
      next(error);
    }
  }
}