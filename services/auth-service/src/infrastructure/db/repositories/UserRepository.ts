import { eq } from 'drizzle-orm';
import { db } from '../database';
import { users } from '../drizzle/users.schema';
import { veterinarios } from '../drizzle/veterinarios.schema';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { User } from '../../../domain/entities/User';
import { Veterinario } from '../../../domain/entities/Veterinario';
import { UserMapper } from '../mappers/UserMapper';

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | Veterinario | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (user) return UserMapper.toUserDomain(user);

    const [vet] = await db.select().from(veterinarios).where(eq(veterinarios.email, email)).limit(1);
    if (vet) return UserMapper.toVeterinarioDomain(vet);

    return null;
  }

  async findById(id: number): Promise<User | Veterinario | null> {
    const [user] = await db.select().from(users).where(eq(users.id_user, id)).limit(1);
    if (user) return UserMapper.toUserDomain(user);

    const [vet] = await db.select().from(veterinarios).where(eq(veterinarios.id_veterinario, id)).limit(1);
    if (vet) return UserMapper.toVeterinarioDomain(vet);

    return null;
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const [nuevo] = await db.insert(users).values({
      id_rol: 3,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      password: user.password,
      activo: true
    }).returning();

    return UserMapper.toUserDomain(nuevo);
  }

  async createVeterinario(vet: Omit<Veterinario, 'id'>): Promise<Veterinario> {
    const [nuevo] = await db.insert(veterinarios).values({
      id_rol: 2,
      nombre: vet.nombre,
      apellido: vet.apellido,
      email: vet.email,
      password: vet.password,
      telefono: vet.telefono,
      cedula_profesional: vet.cedula_profesional,
      especialidad: vet.especialidad,
      activo: true
    }).returning();

    return UserMapper.toVeterinarioDomain(nuevo);
  }

  async updatePassword(id: number, password: string): Promise<void> {
    await db.update(users).set({ password }).where(eq(users.id_user, id));
    await db.update(veterinarios).set({ password }).where(eq(veterinarios.id_veterinario, id));
  }

  async delete(id: number): Promise<void> {
    await db.update(users).set({ activo: false }).where(eq(users.id_user, id));
    await db.update(veterinarios).set({ activo: false }).where(eq(veterinarios.id_veterinario, id));
  }
}