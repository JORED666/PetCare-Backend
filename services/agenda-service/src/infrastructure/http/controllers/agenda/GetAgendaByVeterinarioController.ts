import { Request, Response, NextFunction } from 'express';
import { GetAgendaByVeterinarioUseCase } from '../../../../application/use-cases/GetAgendaByVeterinarioUseCase';
import { AgendaRepository } from '../../../db/repositories/AgendaRepository';

const getAgendaByVeterinarioUseCase = new GetAgendaByVeterinarioUseCase(new AgendaRepository());

export class GetAgendaByVeterinarioController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const agenda = await getAgendaByVeterinarioUseCase.execute(parseInt(req.params.vetId));
      res.json({ success: true, data: agenda });
    } catch (error) {
      next(error);
    }
  }
}