import { IPetRepository } from '../../domain/repositories/IPetRepository';
import { GetPetResponse } from '../dtos/get-pet/GetPetResponse';

export class GetPetsByUserIdUseCase {
  constructor(private readonly petRepository: IPetRepository) {}

  async execute(userId: number): Promise<GetPetResponse[]> {
    return this.petRepository.findByUserId(userId);
  }
}