import { UserRecord } from '../drizzle/users.schema';
import { User } from '../../../domain/entities/User';
import { Role } from '../../../domain/entities/Role';

const rolMap: Record<number, Role> = {
  1: Role.ADMIN,
  2: Role.VETERINARIO,
  3: Role.USER,
};

export class ClientMapper {
  static toDomain(row: UserRecord): User {
    return {
      id:         row.id_user,
      nombre:     row.nombre,
      apellido:   row.apellido,
      email:      row.email,
      telefono:   row.telefono,
      activo:     row.activo ?? true,
      rol:        rolMap[row.id_rol] ?? Role.USER,
      avatar_url: row.avatar_url ?? null,
    };
  }
}