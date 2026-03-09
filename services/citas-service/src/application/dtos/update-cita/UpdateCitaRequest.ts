import { EstadoCita } from '../../../domain/entities/Cita';

export interface UpdateCitaRequest {
  estado: EstadoCita;
}