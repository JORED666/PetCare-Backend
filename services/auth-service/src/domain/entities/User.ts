import { Role } from './Role';

export interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol: Role;
  avatar_url?: string; 
}