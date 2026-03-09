export interface CreateHistorialRequest {
  id_mascota: number;
  id_cita: number;
  id_veterinario: number;
  diagnostico?: string;
  tratamiento?: string;
  observaciones?: string;
}