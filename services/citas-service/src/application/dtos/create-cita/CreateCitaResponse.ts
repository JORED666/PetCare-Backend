import { EstadoCita } from '../../../domain/entities/Cita';

export interface CreateCitaResponse {
  id: number;
  id_user: number;
  id_mascota: number;
  id_servicio: number;
  id_agenda: number;
  fecha: Date;
  estado: EstadoCita;
  observaciones_cliente?: string | null;
}