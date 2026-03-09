import { Request, Response, NextFunction } from 'express';
import { UpdateClientUseCase } from '../../../../application/use-cases/UpdateClientUseCase';
import { ClientRepository } from '../../../db/repositories/ClientRepository';

const updateClientUseCase = new UpdateClientUseCase(new ClientRepository());

export class UpdateClientController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await updateClientUseCase.execute(parseInt(req.params.id), req.body);
      res.json({ success: true, data: updated });
    } catch (error) {
      next(error);
    }
  }
}