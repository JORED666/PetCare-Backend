import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { db } from '../config/database';
import { citas } from '../schemas/citas.schema';
import { horariosDisponibles } from '../schemas/horarios.schema';
import { eq } from 'drizzle-orm';

export class CitasController {
  async verificarDisponibilidad(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_personal, fecha } = req.query;
      if (!id_personal || !fecha) {
        return res.status(400).json({ success: false, error: 'Faltan parámetros' });
      }
      return res.json({ success: true, disponible: true });
    } catch (error) {
      next(error);
    }
  }

  async obtenerHorariosDisponibles(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_personal, fecha } = req.query;
      if (!id_personal || !fecha) {
        return res.status(400).json({ success: false, error: 'Faltan parámetros' });
      }
      return res.json({ success: true, data: [] });
    } catch (error) {
      next(error);
    }
  }

  async crear(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_cliente, id_mascota, id_veterinario, id_servicio, fecha_hora, motivo_detalle } = req.body;
      if (!id_cliente || !id_mascota || !id_servicio || !fecha_hora) {
        return res.status(400).json({ success: false, error: 'Faltan campos requeridos' });
      }
      const [nuevaCita] = await db.insert(citas).values({
        id_cliente,
        id_mascota,
        id_veterinario: id_veterinario || null,
        id_servicio,
        id_estado: 1,
        fecha_hora,
        motivo_detalle: motivo_detalle || null
      }).returning();
      return res.json({ success: true, data: nuevaCita });
    } catch (error) {
      next(error);
    }
  }

  async listarPorCliente(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id_cliente } = req.params;
      const citasCliente = await db.select().from(citas).where(eq(citas.id_cliente, parseInt(id_cliente)));
      return res.json({ success: true, data: citasCliente });
    } catch (error) {
      next(error);
    }
  }

  async obtener(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const [cita] = await db.select().from(citas).where(eq(citas.id_cita, parseInt(id))).limit(1);
      if (!cita) {
        return res.status(404).json({ success: false, error: 'Cita no encontrada' });
      }
      return res.json({ success: true, data: cita });
    } catch (error) {
      next(error);
    }
  }

  async cancelar(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await db.update(citas).set({ id_estado: 5 }).where(eq(citas.id_cita, parseInt(id)));
      return res.json({ success: true, message: 'Cita cancelada' });
    } catch (error) {
      next(error);
    }
  }
}
