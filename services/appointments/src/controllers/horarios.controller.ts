import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { db } from '../config/database';
import { horariosDisponibles } from '../schemas/horarios.schema';
import { citas } from '../schemas/citas.schema';
import { eq, and, sql } from 'drizzle-orm';

export class HorariosController {
  // ========== RUTAS PÚBLICAS (Para agendar citas) ==========
  
  // Obtener horarios disponibles de un veterinario en una fecha específica
  async obtenerHorariosDisponibles(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_personal, fecha, id_servicio } = req.query;

      if (!id_personal || !fecha) {
        return res.status(400).json({ 
          success: false, 
          error: 'id_personal y fecha son requeridos' 
        });
      }

      const personalId = parseInt(id_personal as string);
      const fechaConsulta = new Date(fecha as string);
      const diaSemana = fechaConsulta.getDay(); // 0=Domingo, 6=Sábado

      // 1. Obtener horarios de trabajo del veterinario para ese día
      const horariosVet = await db
        .select()
        .from(horariosDisponibles)
        .where(
          and(
            eq(horariosDisponibles.id_personal, personalId),
            eq(horariosDisponibles.dia_semana, diaSemana),
            eq(horariosDisponibles.activo, true)
          )
        );

      if (horariosVet.length === 0) {
        return res.json({ 
          success: true, 
          data: [],
          message: 'El veterinario no trabaja este día'
        });
      }

      // 2. Obtener citas ya agendadas para ese día
      const citasAgendadas = await db
        .select({
          fecha_hora: citas.fecha_hora
        })
        .from(citas)
        .where(
          and(
            eq(citas.id_veterinario, personalId),
            sql`DATE(${citas.fecha_hora}) = ${fecha}`
          )
        );

      // 3. Generar slots disponibles
      const slotsDisponibles: string[] = [];
      const horasOcupadas = citasAgendadas.map(c => {
        const hora = new Date(c.fecha_hora);
        return `${String(hora.getHours()).padStart(2, '0')}:${String(hora.getMinutes()).padStart(2, '0')}`;
      });

      for (const horario of horariosVet) {
        const [horaInicio, minInicio] = horario.hora_inicio.split(':').map(Number);
        const [horaFin, minFin] = horario.hora_fin.split(':').map(Number);

        let horaActual = horaInicio;
        let minActual = minInicio;

        while (horaActual < horaFin || (horaActual === horaFin && minActual < minFin)) {
          const slot = `${String(horaActual).padStart(2, '0')}:${String(minActual).padStart(2, '0')}`;
          
          if (!horasOcupadas.includes(slot)) {
            slotsDisponibles.push(slot);
          }

          // Incrementar 30 minutos
          minActual += 30;
          if (minActual >= 60) {
            horaActual += 1;
            minActual = 0;
          }
        }
      }

      return res.json({ 
        success: true, 
        data: slotsDisponibles.sort(),
        veterinario: personalId,
        fecha: fecha,
        dia_semana: diaSemana
      });

    } catch (error) {
      console.error('Error obteniendo horarios:', error);
      next(error);
    }
  }

  // Verificar si un veterinario está disponible en una fecha/hora específica
  async verificarDisponibilidad(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_personal, fecha_hora } = req.query;

      if (!id_personal || !fecha_hora) {
        return res.status(400).json({ 
          success: false, 
          error: 'id_personal y fecha_hora son requeridos' 
        });
      }

      const personalId = parseInt(id_personal as string);
      const fechaHoraConsulta = new Date(fecha_hora as string);
      const diaSemana = fechaHoraConsulta.getDay();
      const horaConsulta = `${String(fechaHoraConsulta.getHours()).padStart(2, '0')}:${String(fechaHoraConsulta.getMinutes()).padStart(2, '0')}`;

      // 1. Verificar que el vet trabaje ese día y a esa hora
      const [horarioVet] = await db
        .select()
        .from(horariosDisponibles)
        .where(
          and(
            eq(horariosDisponibles.id_personal, personalId),
            eq(horariosDisponibles.dia_semana, diaSemana),
            eq(horariosDisponibles.activo, true),
            sql`${horariosDisponibles.hora_inicio} <= ${horaConsulta}`,
            sql`${horariosDisponibles.hora_fin} > ${horaConsulta}`
          )
        )
        .limit(1);

      if (!horarioVet) {
        return res.json({ 
          success: true, 
          disponible: false,
          motivo: 'El veterinario no trabaja en este horario'
        });
      }

      // 2. Verificar que no haya cita agendada
      const [citaExistente] = await db
        .select()
        .from(citas)
        .where(
          and(
            eq(citas.id_veterinario, personalId),
            eq(citas.fecha_hora, fechaHoraConsulta)
          )
        )
        .limit(1);

      if (citaExistente) {
        return res.json({ 
          success: true, 
          disponible: false,
          motivo: 'Ya hay una cita agendada en este horario'
        });
      }

      return res.json({ 
        success: true, 
        disponible: true
      });

    } catch (error) {
      console.error('Error verificando disponibilidad:', error);
      next(error);
    }
  }

  // ========== RUTAS PROTEGIDAS (Para administración) ==========

  // Listar horarios de un veterinario
  async listar(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id_personal } = req.params;

      const horarios = await db
        .select()
        .from(horariosDisponibles)
        .where(eq(horariosDisponibles.id_personal, parseInt(id_personal)));

      return res.json({ 
        success: true, 
        data: horarios 
      });

    } catch (error) {
      next(error);
    }
  }

  // Crear un horario
  async crear(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id_personal } = req.params;
      const { dia_semana, hora_inicio, hora_fin } = req.body;

      if (dia_semana === undefined || !hora_inicio || !hora_fin) {
        return res.status(400).json({ 
          success: false, 
          error: 'dia_semana, hora_inicio y hora_fin son requeridos' 
        });
      }

      const [nuevoHorario] = await db
        .insert(horariosDisponibles)
        .values({
          id_personal: parseInt(id_personal),
          dia_semana,
          hora_inicio,
          hora_fin
        })
        .returning();

      return res.json({ 
        success: true, 
        data: nuevoHorario 
      });

    } catch (error) {
      next(error);
    }
  }

  // Actualizar un horario
  async actualizar(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id_horario } = req.params;
      const { dia_semana, hora_inicio, hora_fin, activo } = req.body;

      const [horarioActualizado] = await db
        .update(horariosDisponibles)
        .set({
          dia_semana: dia_semana !== undefined ? dia_semana : undefined,
          hora_inicio: hora_inicio || undefined,
          hora_fin: hora_fin || undefined,
          activo: activo !== undefined ? activo : undefined,
          updated_at: new Date()
        })
        .where(eq(horariosDisponibles.id_horario, parseInt(id_horario)))
        .returning();

      return res.json({ 
        success: true, 
        data: horarioActualizado 
      });

    } catch (error) {
      next(error);
    }
  }

  // Eliminar un horario
  async eliminar(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id_horario } = req.params;

      await db
        .delete(horariosDisponibles)
        .where(eq(horariosDisponibles.id_horario, parseInt(id_horario)));

      return res.json({ 
        success: true, 
        message: 'Horario eliminado correctamente' 
      });

    } catch (error) {
      next(error);
    }
  }
}