import { CitaRecord } from '../drizzle/citas.schema';
import { Cita, EstadoCita } from '../../../domain/entities/Cita';

export class CitaMapper {
  static toDomain(row: CitaRecord & { nombre_mascota?: string }): Cita {
    return {
      id:                    row.id_cita,
      id_user:               row.id_user,
      id_mascota:            row.id_mascota,
      id_servicio:           row.id_servicio,
      id_veterinario:        row.id_veterinario,
      id_agenda:             row.id_agenda,
      fecha:                 row.fecha,
      estado:                row.estado as EstadoCita,
      observaciones_cliente: row.observaciones_cliente,
      nombre_mascota:        row.nombre_mascota ?? undefined,
      created_at:            row.created_at ?? undefined,
      updated_at:            row.updated_at ?? undefined,
    };
  }
}