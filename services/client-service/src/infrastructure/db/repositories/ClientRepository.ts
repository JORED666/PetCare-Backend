import { eq } from 'drizzle-orm';
import { db } from '../database';
import { users } from '../drizzle/users.schema';
import { IClientRepository } from '../../../domain/repositories/IClientRepository';
import { User } from '../../../domain/entities/User';
import { ClientMapper } from '../mappers/ClientMapper';

export class ClientRepository implements IClientRepository {
  async findAll(): Promise<User[]> {
    const result = await db.select().from(users).where(eq(users.activo, true));
    return result.map(ClientMapper.toDomain);
  }

  async findById(id: number): Promise<User | null> {
    const [row] = await db.select().from(users).where(eq(users.id_user, id)).limit(1);
    if (!row) return null;
    return ClientMapper.toDomain(row);
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    const [updated] = await db.update(users).set({
      ...(data.nombre && { nombre: data.nombre }),
      ...(data.apellido && { apellido: data.apellido }),
      ...(data.email && { email: data.email }),
      ...(data.telefono !== undefined && { telefono: data.telefono }),
      updated_at: new Date()
    }).where(eq(users.id_user, id)).returning();

    if (!updated) throw new Error('Cliente no encontrado');
    return ClientMapper.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await db.update(users).set({ activo: false }).where(eq(users.id_user, id));
  }
}