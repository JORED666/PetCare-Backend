import { eq } from 'drizzle-orm';
import { db } from '../database';
import { historial_mascotas } from '../drizzle/historial.schema';
import { IHistorialRepository } from '../../../domain/repositories/IHistorialRepository';
import { Historial } from '../../../domain/entities/Historial';
import { HistorialMapper } from '../mappers/HistorialMapper';

export class HistorialRepository implements IHistorialRepository {
  async findByMascotaId(mascotaId: number): Promise<Historial[]> {
    const result = await db.select().from(historial_mascotas)
      .where(eq(historial_mascotas.id_mascota, mascotaId));
    return result.map(HistorialMapper.toDomain);
  }

  async findById(id: number): Promise<Historial | null> {
    const [row] = await db.select().from(historial_mascotas)
      .where(eq(historial_mascotas.id_historial, id)).limit(1);
    if (!row) return null;
    return HistorialMapper.toDomain(row);
  }

  async create(historial: Omit<Historial, 'id'>): Promise<Historial> {
    const [nuevo] = await db.insert(historial_mascotas).values({
      id_mascota: historial.id_mascota,
      id_cita: historial.id_cita,
      id_veterinario: historial.id_veterinario,
      fecha: historial.fecha,
      diagnostico: historial.diagnostico,
      tratamiento: historial.tratamiento,
      observaciones: historial.observaciones
    }).returning();
    return HistorialMapper.toDomain(nuevo);
  }
}