import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { AuthService } from '../../services/AuthService';
import { logger } from '../../config/logger';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email y contraseña son requeridos'
        });
      }

      const result = await this.authService.login(email, password);

      return res.json({
        success: true,
        ...result
      });
    } catch (error: any) {
      logger.error('Login error:', error);
      next(error);
    }
  }

  async register(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await this.authService.registerClient(req.body);
      return res.status(201).json({
        success: true,
        data: result
      });
    } catch (error: any) {
      logger.error('Register error:', error);
      next(error);
    }
  }

  async registerPersonal(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await this.authService.registerPersonal(req.body);
      return res.status(201).json({
        success: true,
        data: result.personal,
        tempPassword: result.tempPassword
      });
    } catch (error: any) {
      logger.error('Register personal error:', error);
      next(error);
    }
  }

  async listPersonal(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const personal = await this.authService.listPersonal();
      return res.json({
        success: true,
        data: personal
      });
    } catch (error: any) {
      logger.error('List personal error:', error);
      next(error);
    }
  }

  async me(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      return res.json({
        success: true,
        user: req.user
      });
    } catch (error: any) {
      next(error);
    }
  }
}
