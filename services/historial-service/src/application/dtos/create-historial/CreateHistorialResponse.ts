export interface CreateHistorialResponse {
  id: number;
  id_mascota: number;
  id_cita: number;
  id_veterinario: number;
  fecha: Date;
  diagnostico?: string | null;
  tratamiento?: string | null;
  observaciones?: string | null;
}