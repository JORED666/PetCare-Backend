import { Request, Response, NextFunction } from 'express';
import { db } from '../../../db/database';
import { mascotas } from '../../../db/drizzle/mascotas.schema';
import { citas } from '../../../db/drizzle/citas.schema';
import { eq } from 'drizzle-orm';

export class DeletePermanentePetController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await db.delete(citas).where(eq(citas.id_mascota, id));
      await db.delete(mascotas).where(eq(mascotas.id_mascota, id));
      res.json({ success: true, message: 'Mascota eliminada permanentemente' });
    } catch (error) {
      next(error);
    }
  }
}