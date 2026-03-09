import { eq } from 'drizzle-orm';
import { db } from '../database';
import { agenda_veterinaria } from '../drizzle/agenda.schema';
import { IAgendaRepository } from '../../../domain/repositories/IAgendaRepository';
import { Agenda, EstadoAgenda } from '../../../domain/entities/Agenda';
import { AgendaMapper } from '../mappers/AgendaMapper';

export class AgendaRepository implements IAgendaRepository {
  async findByVeterinarioId(vetId: number): Promise<Agenda[]> {
    const result = await db.select().from(agenda_veterinaria)
      .where(eq(agenda_veterinaria.veterinario_id, vetId));
    return result.map(AgendaMapper.toDomain);
  }

  async findDisponibles(vetId: number): Promise<Agenda[]> {
    const result = await db.select().from(agenda_veterinaria)
      .where(eq(agenda_veterinaria.veterinario_id, vetId));
    return result.map(AgendaMapper.toDomain).filter(a => a.estado === 'disponible');
  }

  async findById(id: number): Promise<Agenda | null> {
    const [row] = await db.select().from(agenda_veterinaria)
      .where(eq(agenda_veterinaria.id, id)).limit(1);
    if (!row) return null;
    return AgendaMapper.toDomain(row);
  }

  async create(agenda: Omit<Agenda, 'id' | 'creado_en'>): Promise<Agenda> {
    const [nuevo] = await db.insert(agenda_veterinaria).values({
      veterinario_id: agenda.veterinario_id,
      fecha: agenda.fecha.toISOString().split('T')[0],
      dia_nombre: agenda.dia_nombre,
      hora_inicio: agenda.hora_inicio,
      hora_fin: agenda.hora_fin,
      estado: agenda.estado
    }).returning();
    return AgendaMapper.toDomain(nuevo);
  }

  async updateStatus(id: number, estado: EstadoAgenda): Promise<Agenda> {
    const [updated] = await db.update(agenda_veterinaria)
      .set({ estado }).where(eq(agenda_veterinaria.id, id)).returning();
    if (!updated) throw new Error('Agenda no encontrada');
    return AgendaMapper.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await db.delete(agenda_veterinaria).where(eq(agenda_veterinaria.id, id));
  }
}