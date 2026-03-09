import { Request, Response, NextFunction } from 'express';
import { SendNotificationUseCase } from '../../../../application/use-cases/SendCitaConfirmadaUseCase';

const sendNotificationUseCase = new SendNotificationUseCase();

export class SendNotificationController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await sendNotificationUseCase.execute(req.body);
      res.json({ success: true, message: 'Notificación enviada correctamente' });
    } catch (error) {
      next(error);
    }
  }
}