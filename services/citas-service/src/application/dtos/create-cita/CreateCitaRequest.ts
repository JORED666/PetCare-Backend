export interface CreateCitaRequest {
  id_user: number;
  id_mascota: number;
  id_servicio: number;
  id_veterinario?: number | null;
  id_agenda?: number | null;
  fecha: string;
  observaciones_cliente?: string;
}