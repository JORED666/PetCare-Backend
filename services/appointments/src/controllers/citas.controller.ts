import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { db } from '../config/database';
import { citas } from '../schemas/citas.schema';
import { horariosDisponibles } from '../schemas/horarios.schema';
import { personal } from '../schemas/personal.schema';
import { servicios } from '../schemas/servicios.schema';
import { eq, and, gte, lte, sql } from 'drizzle-orm';

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

  async actualizar(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { id_veterinario, fecha_hora, motivo_detalle, id_estado, costo } = req.body;

      const [citaActualizada] = await db
        .update(citas)
        .set({
          id_veterinario: id_veterinario || undefined,
          fecha_hora: fecha_hora || undefined,
          motivo_detalle: motivo_detalle || undefined,
          id_estado: id_estado || undefined,
          costo: costo || undefined,
          updated_at: new Date()
        })
        .where(eq(citas.id_cita, parseInt(id)))
        .returning();

      return res.json({ success: true, data: citaActualizada });
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

  async listarPorVeterinario(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id_veterinario } = req.params;
      const citasVet = await db.select().from(citas).where(eq(citas.id_veterinario, parseInt(id_veterinario)));
      return res.json({ success: true, data: citasVet });
    } catch (error) {
      next(error);
    }
  }

  async citasHoyVeterinario(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { id_veterinario } = req.params;
    
    const citasHoy = await db
      .select()
      .from(citas)
      .where(
        and(
          eq(citas.id_veterinario, parseInt(id_veterinario)),
          sql`DATE(${citas.fecha_hora}) = CURRENT_DATE`
        )
      );
    
    return res.json({ success: true, data: citasHoy, count: citasHoy.length });
  } catch (error) {
    next(error);
  }
}

  async listarTodas(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const todasCitas = await db.select().from(citas);
      return res.json({ success: true, data: todasCitas });
    } catch (error) {
      next(error);
    }
  }
}