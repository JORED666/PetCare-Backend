import { IPetRepository } from '../../domain/repositories/IPetRepository';
import { CreatePetRequest } from '../dtos/create-pet/CreatePetRequest';
import { CreatePetResponse } from '../dtos/create-pet/CreatePetResponse';

export class CreatePetUseCase {
  constructor(private readonly petRepository: IPetRepository) {}

  async execute(dto: CreatePetRequest): Promise<CreatePetResponse> {
    const pet = await this.petRepository.create({
      id_user: dto.id_user,
      especie: dto.especie,
      nombre: dto.nombre,
      fecha_nacimiento: dto.fecha_nacimiento ? new Date(dto.fecha_nacimiento) : null,
      sexo: dto.sexo || null,
      peso: dto.peso || null,
      activo: true
    });
    return pet;
  }
}