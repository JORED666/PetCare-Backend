import { AgendaRecord } from '../drizzle/agenda.schema';
import { Agenda, EstadoAgenda, DiaSemana } from '../../../domain/entities/Agenda';

export class AgendaMapper {
  static toDomain(row: AgendaRecord): Agenda {
    return {
      id: row.id,
      veterinario_id: row.veterinario_id,
      fecha: new Date(row.fecha),
      dia_nombre: row.dia_nombre as DiaSemana,
      hora_inicio: row.hora_inicio,
      hora_fin: row.hora_fin,
      estado: row.estado as EstadoAgenda,
      creado_en: row.creado_en ?? undefined
    };
  }
}