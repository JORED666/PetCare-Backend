import { eq, and } from 'drizzle-orm';
import { db } from '../database';
import { mascotas } from '../drizzle/mascotas.schema';
import { IPetRepository } from '../../../domain/repositories/IPetRepository';
import { Pet } from '../../../domain/entities/Pet';
import { PetMapper } from '../mappers/PetMapper';

export class PetRepository implements IPetRepository {
  async findAll(): Promise<Pet[]> {
    const result = await db.select().from(mascotas).where(eq(mascotas.activo, true));
    return result.map(PetMapper.toDomain);
  }

  async findById(id: number): Promise<Pet | null> {
    const [row] = await db.select().from(mascotas).where(eq(mascotas.id_mascota, id)).limit(1);
    if (!row) return null;
    return PetMapper.toDomain(row);
  }

  async findByUserId(userId: number): Promise<Pet[]> {
    const result = await db.select().from(mascotas).where(
      and(eq(mascotas.id_user, userId), eq(mascotas.activo, true))
    );
    return result.map(PetMapper.toDomain);
  }

  async create(pet: Omit<Pet, 'id'>): Promise<Pet> {
    const [nuevo] = await db.insert(mascotas).values({
      id_user:          pet.id_user,
      especie:          pet.especie,
      nombre:           pet.nombre,
      raza:             pet.raza ?? null,
      fecha_nacimiento: pet.fecha_nacimiento?.toISOString().split('T')[0] || null,
      sexo:             pet.sexo,
      peso:             pet.peso?.toString() || null,
      activo:           true,
    }).returning();
    return PetMapper.toDomain(nuevo);
  }

  async update(id: number, data: Partial<Pet>): Promise<Pet> {
    const [updated] = await db.update(mascotas).set({
      ...(data.nombre && { nombre: data.nombre }),
      ...(data.especie && { especie: data.especie }),
      ...(data.raza !== undefined && { raza: data.raza }),
      ...(data.sexo !== undefined && { sexo: data.sexo }),
      ...(data.peso !== undefined && { peso: data.peso?.toString() }),
      ...(data.fecha_nacimiento !== undefined && {
        fecha_nacimiento: data.fecha_nacimiento?.toISOString().split('T')[0] || null,
      }),
      updated_at: new Date(),
    }).where(eq(mascotas.id_mascota, id)).returning();
    if (!updated) throw new Error('Mascota no encontrada');
    return PetMapper.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await db.update(mascotas).set({ activo: false }).where(eq(mascotas.id_mascota, id));
  }
}