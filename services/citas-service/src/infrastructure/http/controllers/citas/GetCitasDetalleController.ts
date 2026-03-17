import { Request, Response, NextFunction } from 'express';
import { queryClient } from '../../../db/database';

export class GetCitasDetalleController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await queryClient.unsafe(`
        SELECT 
          c.id_cita,
          c.fecha AS fecha_cita,
          c.estado AS estado_cita,
          (u.nombre || ' ' || u.apellido) AS dueno,
          u.email AS email_dueno,
          u.telefono AS telefono_dueno,
          m.nombre AS mascota,
          m.especie,
          s.nombre AS servicio,
          s.precio,
          (v.nombre || ' ' || v.apellido) AS veterinario,
          v.especialidad,
          c.observaciones_cliente
        FROM citas c
        JOIN users u ON u.id_user = c.id_user
        JOIN mascotas m ON m.id_mascota = c.id_mascota
        JOIN servicios s ON s.id_servicio = c.id_servicio
        LEFT JOIN veterinarios v ON v.id_veterinario = c.id_veterinario
        ORDER BY c.fecha DESC
      `);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}