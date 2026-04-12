import { Request, Response, NextFunction } from 'express';
import { db } from '../../../db/database';
import { sql } from 'drizzle-orm';

export class GetPacientesDetalleController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await db.execute(sql`
        SELECT
          m.id_mascota,
          m.nombre,
          m.especie,
          m.raza,
          m.sexo,
          m.peso,
          m.fecha_nacimiento,
          m.activo,
          (u.nombre || ' ' || u.apellido) AS propietario,
          u.email AS email_propietario
        FROM mascotas m
        JOIN users u ON u.id_user = m.id_user
        ORDER BY m.id_mascota DESC
      `);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}