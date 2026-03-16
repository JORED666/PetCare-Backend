import { UserRecord } from '../drizzle/users.schema';
import { VeterinarioRecord } from '../drizzle/veterinarios.schema';
import { User } from '../../../domain/entities/User';
import { Veterinario } from '../../../domain/entities/Veterinario';
import { Role } from '../../../domain/entities/Role';

const resolveRole = (idRol: number): Role => {
  switch (idRol) {
    case 1: return Role.ADMIN;
    case 2: return Role.VETERINARIO;
    default: return Role.USER;
  }
};

export class UserMapper {
  static toUserDomain(row: UserRecord): User {
    return {
      id: row.id_user,
      nombre: row.nombre,
      apellido: row.apellido,
      email: row.email,
      password: row.password,
      rol: resolveRole(row.id_rol),
      avatar_url: row.avatar_url ?? undefined,
    };
  }

  static toVeterinarioDomain(row: VeterinarioRecord): Veterinario {
    return {
      id: row.id_veterinario,
      nombre: row.nombre,
      apellido: row.apellido,
      email: row.email,
      password: row.password,
      rol: Role.VETERINARIO,
      telefono: row.telefono,
      cedula_profesional: row.cedula_profesional,
      especialidad: row.especialidad,
      activo: row.activo ?? true,
      avatar_url: row.avatar_url ?? undefined,
    };
  }
}