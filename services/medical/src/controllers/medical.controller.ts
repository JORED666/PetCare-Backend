import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { db } from '../config/database';
import { historialMedico } from '../schemas/historial.schema';
import { prescripciones } from '../schemas/prescripciones.schema';
import { registroVacunas } from '../schemas/vacunas.schema';
import { eq } from 'drizzle-orm';

export class MedicalController {
  async obtenerHistorial(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id_mascota } = req.params;
      const historial = await db.select().from(historialMedico).where(eq(historialMedico.id_mascota, parseInt(id_mascota)));
      return res.json({ success: true, data: historial });
    } catch (error) { next(error); }
  }

  async crearHistorial(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id_mascota } = req.params;
      const { id_veterinario, id_cita, motivo_consulta, diagnostico, tratamiento, observaciones, peso, temperatura, frecuencia_cardiaca } = req.body;
      const [nuevoHistorial] = await db.insert(historialMedico).values({ id_mascota: parseInt(id_mascota), id_veterinario, id_cita: id_cita || null, motivo_consulta, diagnostico, tratamiento, observaciones, peso, temperatura, frecuencia_cardiaca }).returning();
      return res.json({ success: true, data: nuevoHistorial });
    } catch (error) { next(error); }
  }

  async obtenerDetalleHistorial(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const [historial] = await db.select().from(historialMedico).where(eq(historialMedico.id_historial, parseInt(id))).limit(1);
      if (!historial) return res.status(404).json({ success: false, error: 'No encontrado' });
      return res.json({ success: true, data: historial });
    } catch (error) { next(error); }
  }

  async agregarPrescripcion(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { medicamento, dosis, frecuencia, duracion, via_administracion, indicaciones } = req.body;
      const [nuevaPrescripcion] = await db.insert(prescripciones).values({ id_historial: parseInt(id), medicamento, dosis, frecuencia, duracion, via_administracion, indicaciones }).returning();
      return res.json({ success: true, data: nuevaPrescripcion });
    } catch (error) { next(error); }
  }

  async registrarVacuna(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { id_mascota, id_vacuna, id_veterinario, fecha_aplicacion, proxima_dosis, lote, numero_dosis } = req.body;
      const [nuevaVacuna] = await db.insert(registroVacunas).values({ id_mascota, id_vacuna, id_veterinario, id_historial: parseInt(id), fecha_aplicacion, proxima_dosis, lote, numero_dosis }).returning();
      return res.json({ success: true, data: nuevaVacuna });
    } catch (error) { next(error); }
  }
}
