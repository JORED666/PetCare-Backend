import { CitaRecord } from '../drizzle/citas.schema';
import { Cita, EstadoCita } from '../../../domain/entities/Cita';

export class CitaMapper {
  static toDomain(row: CitaRecord & {
    nombre_mascota?:       string;
    nombre_dueno?:         string;
    apellido_dueno?:       string;
    email_dueno?:          string;
    telefono_dueno?:       string;
    nombre_veterinario?:   string;
    apellido_veterinario?: string;
    especialidad?:         string;
    nombre_servicio?:      string;
    precio_servicio?:      string;
  }): Cita {
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
      nombre_mascota:        row.nombre_mascota       ?? undefined,
      nombre_dueno:          row.nombre_dueno         ?? undefined,
      apellido_dueno:        row.apellido_dueno       ?? undefined,
      email_dueno:           row.email_dueno          ?? undefined,
      telefono_dueno:        row.telefono_dueno       ?? undefined,
      nombre_veterinario:    row.nombre_veterinario   ?? undefined,
      apellido_veterinario:  row.apellido_veterinario ?? undefined,
      especialidad:          row.especialidad         ?? undefined,
      nombre_servicio:       row.nombre_servicio      ?? undefined,
      precio_servicio:       row.precio_servicio      ?? undefined,
      created_at:            row.created_at           ?? undefined,
      updated_at:            row.updated_at           ?? undefined,
    };
  }
}