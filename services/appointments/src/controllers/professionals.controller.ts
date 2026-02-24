import { Request, Response, NextFunction } from 'express';
import { db } from '../config/database';
import { personal } from '../schemas/personal.schema';
import { eq } from 'drizzle-orm';

export class ProfessionalsController {
  async listar(req: Request, res: Response, next: NextFunction) {
    try {
      const veterinarios = await db
        .select({
          id: personal.id_personal,
          nombre: personal.nombre,
          apellido: personal.apellido,
          email: personal.email,
          especialidad: personal.especialidad,
          cedula_profesional: personal.cedula_profesional,
          foto_perfil: personal.foto_perfil
        })
        .from(personal)
        .where(eq(personal.id_rol, 2));

      return res.json({
        success: true,
        data: veterinarios
      });
    } catch (error) {
      next(error);
    }
  }
}
