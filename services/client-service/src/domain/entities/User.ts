import { Role } from './Role';

export interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string | null;
  activo: boolean;
  rol: Role;
}