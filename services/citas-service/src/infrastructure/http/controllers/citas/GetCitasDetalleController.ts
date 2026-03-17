import { Request, Response, NextFunction } from 'express';
import { queryClient } from '../../../db/database';

export class GetCitasDetalleController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await queryClient`SELECT * FROM vw_citas_detalle ORDER BY fecha_cita DESC`;
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}