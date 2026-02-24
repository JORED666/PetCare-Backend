import { Request, Response, NextFunction } from 'express';
import { db } from '../config/database';
import { servicios } from '../schemas/servicios.schema';
import { eq } from 'drizzle-orm';

export class ServiciosController {
  async listar(req: Request, res: Response, next: NextFunction) {
    try {
      const listaServicios = await db
        .select()
        .from(servicios)
        .where(eq(servicios.activo, true));

      return res.json({
        success: true,
        data: listaServicios
      });
    } catch (error) {
      next(error);
    }
  }

  async obtener(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const [servicio] = await db
        .select()
        .from(servicios)
        .where(eq(servicios.id_servicio, parseInt(id)))
        .limit(1);

      if (!servicio) {
        return res.status(404).json({
          success: false,
          error: 'Servicio no encontrado'
        });
      }

      return res.json({
        success: true,
        data: servicio
      });
    } catch (error) {
      next(error);
    }
  }
}
