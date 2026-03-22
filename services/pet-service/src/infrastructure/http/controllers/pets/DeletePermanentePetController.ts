import { Request, Response, NextFunction } from 'express';
import { db } from '../../../db/database';
import { mascotas } from '../../../db/drizzle/mascotas.schema';
import { eq } from 'drizzle-orm';

export class DeletePermanentePetController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await db.delete(mascotas).where(eq(mascotas.id_mascota, parseInt(req.params.id)));
      res.json({ success: true, message: 'Mascota eliminada permanentemente' });
    } catch (error) {
      next(error);
    }
  }
}
