import { eq } from 'drizzle-orm';
import { db } from '../database';
import { citas } from '../drizzle/citas.schema';
import { ICitaRepository } from '../../../domain/repositories/ICitaRepository';
import { Cita, EstadoCita } from '../../../domain/entities/Cita';
import { CitaMapper } from '../mappers/CitaMapper';

export class CitaRepository implements ICitaRepository {
  async findAll(): Promise<Cita[]> {
    const result = await db.select().from(citas);
    return result.map(CitaMapper.toDomain);
  }

  async findById(id: number): Promise<Cita | null> {
    const [row] = await db.select().from(citas).where(eq(citas.id_cita, id)).limit(1);
    if (!row) return null;
    return CitaMapper.toDomain(row);
  }

  async findByUserId(userId: number): Promise<Cita[]> {
    const result = await db.select().from(citas).where(eq(citas.id_user, userId));
    return result.map(CitaMapper.toDomain);
  }

  async findByVeterinarioId(vetId: number): Promise<Cita[]> {
    const result = await db.select().from(citas).where(eq(citas.id_veterinario, vetId));
    return result.map(CitaMapper.toDomain);
  }

  async create(cita: Omit<Cita, 'id' | 'created_at' | 'updated_at'>): Promise<Cita> {
    const [nuevo] = await db.insert(citas).values({
      id_user: cita.id_user,
      id_mascota: cita.id_mascota,
      id_servicio: cita.id_servicio,
      id_veterinario: cita.id_veterinario,
      id_agenda: cita.id_agenda,
      fecha: cita.fecha,
      estado: cita.estado,
      observaciones_cliente: cita.observaciones_cliente
    }).returning();
    return CitaMapper.toDomain(nuevo);
  }

  async updateStatus(id: number, estado: EstadoCita): Promise<Cita> {
    const [updated] = await db.update(citas).set({ estado, updated_at: new Date() })
      .where(eq(citas.id_cita, id)).returning();
    if (!updated) throw new Error('Cita no encontrada');
    return CitaMapper.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await db.delete(citas).where(eq(citas.id_cita, id));
  }
}