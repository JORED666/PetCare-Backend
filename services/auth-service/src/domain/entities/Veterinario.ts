import { Role } from './Role';

export interface Veterinario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol: Role;
  telefono?: string | null;
  cedula_profesional?: string | null;
  especialidad?: string | null;
  activo: boolean;
  avatar_url?: string; 
}