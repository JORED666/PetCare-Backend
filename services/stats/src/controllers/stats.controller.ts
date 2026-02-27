import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { db } from '../config/database';
import { citas } from '../schemas/citas.schema';
import { mascotas } from '../schemas/mascotas.schema';
import { personal } from '../schemas/personal.schema';
import { servicios } from '../schemas/servicios.schema';
import { eq, sql, and } from 'drizzle-orm';

export class StatsController {
  async citasDelMes(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await db.select({ count: sql<number>`count(*)` }).from(citas).where(sql`DATE_TRUNC('month', ${citas.fecha_hora}) = DATE_TRUNC('month', CURRENT_DATE)`);
      return res.json({ success: true, count: Number(result[0]?.count || 0) });
    } catch (error) { next(error); }
  }

  async pacientesActivos(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await db.select({ count: sql<number>`count(*)` }).from(mascotas).where(eq(mascotas.activo, true));
      return res.json({ success: true, count: Number(result[0]?.count || 0) });
    } catch (error) { next(error); }
  }

  async pacientesNuevos(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await db.select({ count: sql<number>`count(*)` }).from(mascotas).where(sql`${mascotas.created_at} >= DATE_TRUNC('month', CURRENT_DATE)`);
      return res.json({ success: true, count: Number(result[0]?.count || 0) });
    } catch (error) { next(error); }
  }

  async ingresosTotales(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await db.select({ total: sql<number>`SUM(CAST(${citas.costo} AS NUMERIC))` }).from(citas).where(and(sql`${citas.costo} IS NOT NULL`, sql`DATE_TRUNC('month', ${citas.fecha_hora}) = DATE_TRUNC('month', CURRENT_DATE)`));
      return res.json({ success: true, total: Number(result[0]?.total || 0) });
    } catch (error) { next(error); }
  }

  async citasGrafica(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await db.select({ mes: sql<string>`TO_CHAR(${citas.fecha_hora}, 'Mon')`, count: sql<number>`count(*)` }).from(citas).where(sql`${citas.fecha_hora} >= CURRENT_DATE - INTERVAL '6 months'`).groupBy(sql`TO_CHAR(${citas.fecha_hora}, 'Mon'), DATE_TRUNC('month', ${citas.fecha_hora})`).orderBy(sql`DATE_TRUNC('month', ${citas.fecha_hora})`);
      return res.json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async rendimientoVeterinarios(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await db.select({ id_veterinario: personal.id_personal, nombre: personal.nombre, apellido: personal.apellido, citas_completadas: sql<number>`count(*)`, estado: personal.activo }).from(citas).innerJoin(personal, eq(citas.id_veterinario, personal.id_personal)).where(eq(citas.id_estado, 4)).groupBy(personal.id_personal, personal.nombre, personal.apellido, personal.activo);
      return res.json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async veterinarioPacientesActivos(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id_veterinario } = req.params;
      const result = await db.select({ count: sql<number>`count(DISTINCT ${citas.id_mascota})` }).from(citas).where(eq(citas.id_veterinario, parseInt(id_veterinario)));
      return res.json({ success: true, count: Number(result[0]?.count || 0) });
    } catch (error) { next(error); }
  }

  async distribucionServicios(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await db.select({ servicio: servicios.nombre, count: sql<number>`count(*)` }).from(citas).innerJoin(servicios, eq(citas.id_servicio, servicios.id_servicio)).groupBy(servicios.nombre).orderBy(sql`count(*) DESC`);
      return res.json({ success: true, data: result });
    } catch (error) { next(error); }
  }
}
