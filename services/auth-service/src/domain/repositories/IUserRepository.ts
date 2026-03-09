import { User } from '../entities/User';
import { Veterinario } from '../entities/Veterinario';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | Veterinario | null>;
  findById(id: number): Promise<User | Veterinario | null>;
  create(user: Omit<User, 'id'>): Promise<User>;
  createVeterinario(vet: Omit<Veterinario, 'id'>): Promise<Veterinario>;
  updatePassword(id: number, password: string): Promise<void>;
  delete(id: number): Promise<void>;
}