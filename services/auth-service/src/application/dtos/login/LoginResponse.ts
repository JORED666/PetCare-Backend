import { Role } from '../../../domain/entities/Role';

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    rol: Role;
  };
}