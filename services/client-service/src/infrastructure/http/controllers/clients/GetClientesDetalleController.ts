import { Request, Response, NextFunction } from 'express';
import { db } from '../../../db/database';
import { sql } from 'drizzle-orm';

export class GetClientesDetalleController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await db.execute(sql`
        SELECT 
          u.id_user,
          u.nombre,
          u.apellido,
          u.email,
          u.telefono,
          u.activo,
          u.id_rol,
          COALESCE(
            STRING_AGG(m.nombre, ', ') FILTER (WHERE m.nombre IS NOT NULL),
            ''
          ) AS mascotas
        FROM users u
        LEFT JOIN mascotas m ON m.id_user = u.id_user AND m.activo = true
        WHERE u.id_rol = 3
        GROUP BY u.id_user, u.nombre, u.apellido, u.email, u.telefono, u.activo, u.id_rol
        ORDER BY u.id_user DESC
      `);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}