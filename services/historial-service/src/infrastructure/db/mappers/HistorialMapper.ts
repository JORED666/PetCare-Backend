import { HistorialRecord } from '../drizzle/historial.schema';
import { Historial } from '../../../domain/entities/Historial';

export class HistorialMapper {
  static toDomain(row: HistorialRecord): Historial {
    return {
      id: row.id_historial,
      id_mascota: row.id_mascota,
      id_cita: row.id_cita,
      id_veterinario: row.id_veterinario,
      fecha: row.fecha,
      diagnostico: row.diagnostico,
      tratamiento: row.tratamiento,
      observaciones: row.observaciones
    };
  }
}