export interface GetClientResponse {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string | null;
  activo: boolean;
}