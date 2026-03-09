export interface CreateCitaRequest {
  id_user: number;
  id_mascota: number;
  id_servicio: number;
  id_agenda: number;
  fecha: string;
  observaciones_cliente?: string;
}