import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { db } from '../config/database';
import { horariosDisponibles } from '../schemas/horarios.schema';
import { eq, and } from 'drizzle-orm';

export class HorariosController {
  async listar(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id_personal } = req.params;

      const horarios = await db
        .select()
        .from(horariosDisponibles)
        .where(
          and(
            eq(horariosDisponibles.id_personal, parseInt(id_personal)),
            eq(horariosDisponibles.activo, true)
          )
        );

      return res.json({
        success: true,
        data: horarios
      });
    } catch (error) {
      next(error);
    }
  }

  async crear(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id_personal } = req.params;
      const { dia_semana, hora_inicio, hora_fin, duracion_cita } = req.body;

      if (req.user?.rol !== 'ADMIN' && req.user?.id !== parseInt(id_personal)) {
        return res.status(403).json({
          success: false,
          error: 'No tienes permisos para modificar este horario'
        });
      }

      if (!dia_semana || !hora_inicio || !hora_fin || !duracion_cita) {
        return res.status(400).json({
          success: false,
          error: 'Todos los campos son requeridos'
        });
      }

      const diasValidos = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'];
      if (!diasValidos.includes(dia_semana.toUpperCase())) {
        return res.status(400).json({
          success: false,
          error: 'Día de la semana no válido'
        });
      }

      const [nuevoHorario] = await db
        .insert(horariosDisponibles)
        .values({
          id_personal: parseInt(id_personal),
          dia_semana: dia_semana.toUpperCase(),
          hora_inicio,
          hora_fin,
          duracion_cita,
          activo: true
        })
        .returning();

      return res.json({
        success: true,
        message: 'Horario creado exitosamente',
        data: nuevoHorario
      });
    } catch (error) {
      next(error);
    }
  }

  async actualizar(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id_horario } = req.params;
      const { dia_semana, hora_inicio, hora_fin, duracion_cita } = req.body;

      const [horario] = await db
        .select()
        .from(horariosDisponibles)
        .where(eq(horariosDisponibles.id_horario, parseInt(id_horario)))
        .limit(1);

      if (!horario) {
        return res.status(404).json({
          success: false,
          error: 'Horario no encontrado'
        });
      }

      if (req.user?.rol !== 'ADMIN' && req.user?.id !== horario.id_personal) {
        return res.status(403).json({
          success: false,
          error: 'No tienes permisos para modificar este horario'
        });
      }

      const [horarioActualizado] = await db
        .update(horariosDisponibles)
        .set({
          dia_semana: dia_semana?.toUpperCase() || horario.dia_semana,
          hora_inicio: hora_inicio || horario.hora_inicio,
          hora_fin: hora_fin || horario.hora_fin,
          duracion_cita: duracion_cita || horario.duracion_cita,
          updated_at: new Date()
        })
        .where(eq(horariosDisponibles.id_horario, parseInt(id_horario)))
        .returning();

      return res.json({
        success: true,
        message: 'Horario actualizado exitosamente',
        data: horarioActualizado
      });
    } catch (error) {
      next(error);
    }
  }

  async eliminar(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id_horario } = req.params;

      const [horario] = await db
        .select()
        .from(horariosDisponibles)
        .where(eq(horariosDisponibles.id_horario, parseInt(id_horario)))
        .limit(1);

      if (!horario) {
        return res.status(404).json({
          success: false,
          error: 'Horario no encontrado'
        });
      }

      if (req.user?.rol !== 'ADMIN' && req.user?.id !== horario.id_personal) {
        return res.status(403).json({
          success: false,
          error: 'No tienes permisos para eliminar este horario'
        });
      }

      await db
        .update(horariosDisponibles)
        .set({ activo: false })
        .where(eq(horariosDisponibles.id_horario, parseInt(id_horario)));

      return res.json({
        success: true,
        message: 'Horario eliminado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }
}