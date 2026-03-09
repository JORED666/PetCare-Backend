import { User } from '../entities/User';

export interface IClientRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  update(id: number, data: Partial<User>): Promise<User>;
  delete(id: number): Promise<void>;
}