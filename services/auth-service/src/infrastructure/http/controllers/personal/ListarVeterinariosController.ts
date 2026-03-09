import { Request, Response, NextFunction } from 'express';
import { db } from '../../../db/database';
import { veterinarios } from '../../../db/drizzle/veterinarios.schema';
import { eq } from 'drizzle-orm';

export class ListarVeterinariosController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const todos = await db.select({
        id: veterinarios.id_veterinario,
        nombre: veterinarios.nombre,
        apellido: veterinarios.apellido,
        email: veterinarios.email,
        telefono: veterinarios.telefono,
        cedula_profesional: veterinarios.cedula_profesional,
        especialidad: veterinarios.especialidad,
        activo: veterinarios.activo
      }).from(veterinarios).where(eq(veterinarios.activo, true));

      return res.json({ success: true, data: todos });
    } catch (error) {
      next(error);
    }
  }
}