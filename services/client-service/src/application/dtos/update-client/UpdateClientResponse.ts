export interface UpdateClientResponse {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string | null;
}