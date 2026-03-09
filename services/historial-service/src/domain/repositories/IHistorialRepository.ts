import { Historial } from '../entities/Historial';

export interface IHistorialRepository {
  findByMascotaId(mascotaId: number): Promise<Historial[]>;
  findById(id: number): Promise<Historial | null>;
  create(historial: Omit<Historial, 'id'>): Promise<Historial>;
}