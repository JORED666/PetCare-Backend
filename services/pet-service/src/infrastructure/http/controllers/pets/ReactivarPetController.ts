import { Request, Response, NextFunction } from 'express';
import { db } from '../../../db/database';
import { mascotas } from '../../../db/drizzle/mascotas.schema';
import { eq } from 'drizzle-orm';

export class ReactivarPetController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await db.update(mascotas).set({ activo: true }).where(eq(mascotas.id_mascota, parseInt(req.params.id)));
      res.json({ success: true, message: 'Mascota reactivada correctamente' });
    } catch (error) {
      next(error);
    }
  }
}
