import { Role } from './Role';

export interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono?: string;
  rol: Role;
  avatar_url?: string;
}