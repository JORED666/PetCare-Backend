import { Request, Response, NextFunction } from 'express';
import { GetAllClientsUseCase } from '../../../../application/use-cases/GetAllClientsUseCase';
import { ClientRepository } from '../../../db/repositories/ClientRepository';

const getAllClientsUseCase = new GetAllClientsUseCase(new ClientRepository());

export class GetAllClientsController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const clients = await getAllClientsUseCase.execute();
      res.json({ success: true, data: clients });
    } catch (error) {
      next(error);
    }
  }
}