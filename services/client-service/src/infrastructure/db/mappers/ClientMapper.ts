import { UserRecord } from '../drizzle/users.schema';
import { User } from '../../../domain/entities/User';
import { Role } from '../../../domain/entities/Role';

export class ClientMapper {
  static toDomain(row: UserRecord): User {
    return {
      id: row.id_user,
      nombre: row.nombre,
      apellido: row.apellido,
      email: row.email,
      telefono: row.telefono,
      activo: row.activo ?? true,
      rol: Role.USER
    };
  }
}