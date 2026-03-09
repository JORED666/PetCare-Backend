import { Request, Response, NextFunction } from 'express';
import { DeleteClientUseCase } from '../../../../application/use-cases/DeleteClientUseCase';
import { ClientRepository } from '../../../db/repositories/ClientRepository';

const deleteClientUseCase = new DeleteClientUseCase(new ClientRepository());

export class DeleteClientController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await deleteClientUseCase.execute(parseInt(req.params.id));
      res.json({ success: true, message: 'Cliente eliminado correctamente' });
    } catch (error) {
      next(error);
    }
  }
}