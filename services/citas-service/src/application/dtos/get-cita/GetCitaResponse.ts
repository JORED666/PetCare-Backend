import { EstadoCita } from '../../../domain/entities/Cita';

export interface GetCitaResponse {
  id: number;
  id_user: number;
  id_mascota: number;
  id_servicio: number;
  id_veterinario?: number | null;
  id_agenda?: number | null;
  fecha: Date;
  estado: EstadoCita;
  observaciones_cliente?: string | null;
}