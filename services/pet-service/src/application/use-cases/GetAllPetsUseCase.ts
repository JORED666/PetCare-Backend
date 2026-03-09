import { IPetRepository } from '../../domain/repositories/IPetRepository';
import { GetPetResponse } from '../dtos/get-pet/GetPetResponse';

export class GetAllPetsUseCase {
  constructor(private readonly petRepository: IPetRepository) {}

  async execute(): Promise<GetPetResponse[]> {
    return this.petRepository.findAll();
  }
}