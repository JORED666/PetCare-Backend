import { EstadoCita } from '../../../domain/entities/Cita';

export interface UpdateCitaResponse {
  id: number;
  estado: EstadoCita;
  updated_at?: Date;
}