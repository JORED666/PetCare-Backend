import { Request, Response, NextFunction } from 'express';
import { RegisterUseCase } from '../../../../application/use-cases/RegisterUseCase';
import { UserRepository } from '../../../db/repositories/UserRepository';

const registerUseCase = new RegisterUseCase(new UserRepository());

export class RegisterController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await registerUseCase.execute(req.body);
      res.status(201).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }
}