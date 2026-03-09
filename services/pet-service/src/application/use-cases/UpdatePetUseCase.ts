import { IPetRepository } from '../../domain/repositories/IPetRepository';
import { UpdatePetRequest } from '../dtos/update-pet/UpdatePetRequest';
import { UpdatePetResponse } from '../dtos/update-pet/UpdatePetResponse';

export class UpdatePetUseCase {
  constructor(private readonly petRepository: IPetRepository) {}

  async execute(id: number, dto: UpdatePetRequest): Promise<UpdatePetResponse> {
    const pet = await this.petRepository.findById(id);
    if (!pet) throw new Error('Mascota no encontrada');
    return this.petRepository.update(id, {
      ...dto,
      fecha_nacimiento: dto.fecha_nacimiento ? new Date(dto.fecha_nacimiento) : undefined
    });
  }
}