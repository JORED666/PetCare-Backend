import { IPetRepository } from '../../domain/repositories/IPetRepository';
import { GetPetResponse } from '../dtos/get-pet/GetPetResponse';

export class GetPetByIdUseCase {
  constructor(private readonly petRepository: IPetRepository) {}

  async execute(id: number): Promise<GetPetResponse> {
    const pet = await this.petRepository.findById(id);
    if (!pet) throw new Error('Mascota no encontrada');
    return pet;
  }
}