export type EstadoCita = 'PENDIENTE' | 'CONFIRMADA' | 'ATENDIDA' | 'CANCELADA';

export interface Cita {
  id: number;
  id_user: number;
  id_mascota: number;
  id_servicio: number;
  id_veterinario?: number | null;
  id_agenda?: number | null;
  fecha: Date;
  estado: EstadoCita;
  observaciones_cliente?: string | null;
  nombre_mascota?: string;
  created_at?: Date;
  updated_at?: Date;
}