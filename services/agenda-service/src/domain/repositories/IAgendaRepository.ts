import { Agenda, EstadoAgenda } from '../entities/Agenda';

export interface IAgendaRepository {
  findByVeterinarioId(vetId: number): Promise<Agenda[]>;
  findDisponibles(vetId: number): Promise<Agenda[]>;
  findById(id: number): Promise<Agenda | null>;
  create(agenda: Omit<Agenda, 'id' | 'creado_en'>): Promise<Agenda>;
  updateStatus(id: number, estado: EstadoAgenda): Promise<Agenda>;
  delete(id: number): Promise<void>;
}