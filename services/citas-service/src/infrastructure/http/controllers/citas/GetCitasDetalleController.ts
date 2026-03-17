import { Request, Response, NextFunction } from 'express';
import { db } from '../../../db/database';
import { sql } from 'drizzle-orm';

export class GetCitasDetalleController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await db.execute(sql`SELECT * FROM vw_citas_detalle ORDER BY fecha_cita DESC`);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}