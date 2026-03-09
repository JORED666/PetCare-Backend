import { Request, Response, NextFunction } from 'express';
import { GetClientByIdUseCase } from '../../../../application/use-cases/GetClientByIdUseCase';
import { ClientRepository } from '../../../db/repositories/ClientRepository';

const getClientByIdUseCase = new GetClientByIdUseCase(new ClientRepository());

export class GetClientByIdController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const client = await getClientByIdUseCase.execute(parseInt(req.params.id));
      res.json({ success: true, data: client });
    } catch (error) {
      next(error);
    }
  }
}