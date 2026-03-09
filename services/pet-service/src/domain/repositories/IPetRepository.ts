import { Pet } from '../entities/Pet';

export interface IPetRepository {
  findAll(): Promise<Pet[]>;
  findById(id: number): Promise<Pet | null>;
  findByUserId(userId: number): Promise<Pet[]>;
  create(pet: Omit<Pet, 'id'>): Promise<Pet>;
  update(id: number, data: Partial<Pet>): Promise<Pet>;
  delete(id: number): Promise<void>;
}