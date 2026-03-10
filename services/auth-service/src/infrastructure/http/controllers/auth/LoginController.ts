import { Request, Response, NextFunction } from 'express';
import { LoginUseCase } from '../../../../application/use-cases/LoginUseCase';
import { UserRepository } from '../../../db/repositories/UserRepository';

const loginUseCase = new LoginUseCase(new UserRepository());

export class LoginController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginUseCase.execute(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}