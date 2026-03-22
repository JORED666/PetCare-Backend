import { Role } from '../../../domain/entities/Role';

export interface LoginResponse {
  success: true;
  token: string;
  user: {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono?: string;
    rol: Role;
    avatar_url: string | null;
    cedula_profesional?: string | null;
  };
}