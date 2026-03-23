import { Request, Response, NextFunction } from 'express';
import { AgendaRepository } from '../../../db/repositories/AgendaRepository';

const agendaRepository = new AgendaRepository();

export class DeleteAgendaByVeterinarioController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await agendaRepository.deleteByVeterinarioId(parseInt(req.params.vetId));
      res.json({ success: true, message: 'Agenda eliminada correctamente' });
    } catch (error) {
      next(error);
    }
  }
}