import { MascotaRecord } from '../drizzle/mascotas.schema';
import { Pet } from '../../../domain/entities/Pet';

export class PetMapper {
  static toDomain(row: MascotaRecord): Pet {
    return {
      id: row.id_mascota,
      id_user: row.id_user,
      especie: row.especie as 'Perro' | 'Gato',
      nombre: row.nombre,
      fecha_nacimiento: row.fecha_nacimiento ? new Date(row.fecha_nacimiento) : null,
      sexo: row.sexo,
      peso: row.peso ? parseFloat(row.peso) : null,
      activo: row.activo ?? true
    };
  }
}