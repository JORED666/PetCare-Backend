import { Request, Response, NextFunction } from 'express';
import { DeletePetUseCase } from '../../../../application/use-cases/DeletePetUseCase';
import { PetRepository } from '../../../db/repositories/PetRepository';
import { db } from '../../../db/database';
import { citas } from '../../../db/drizzle/citas.schema';
import { mascotas } from '../../../db/drizzle/mascotas.schema';
import { eq } from 'drizzle-orm';

const deletePetUseCase = new DeletePetUseCase(new PetRepository());

export class DeletePetController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);

      const citasDeMascota = await db
        .select({ id_cita: citas.id_cita })
        .from(citas)
        .where(eq(citas.id_mascota, id))
        .limit(1);

      if (citasDeMascota.length === 0) {
        await db.delete(mascotas).where(eq(mascotas.id_mascota, id));
        res.json({ success: true, message: 'Mascota eliminada permanentemente', tipo: 'permanente' });
      } else {
        await deletePetUseCase.execute(id);
        res.json({ success: true, message: 'Mascota desactivada correctamente', tipo: 'soft' });
      }
    } catch (error) {
      next(error);
    }
  }
}