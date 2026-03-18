import { Cita, EstadoCita } from '../entities/Cita';

export interface ICitaRepository {
  findAll(): Promise<Cita[]>;
  findById(id: number): Promise<Cita | null>;
  findByUserId(userId: number): Promise<Cita[]>;
  findByVeterinarioId(vetId: number): Promise<Cita[]>;
  findByMascotaAndFecha(id_mascota: number, fecha: Date): Promise<Cita | null>;
  create(cita: Omit<Cita, 'id' | 'created_at' | 'updated_at'>): Promise<Cita>;
  updateStatus(id: number, estado: EstadoCita): Promise<Cita>;
  delete(id: number): Promise<void>;
}