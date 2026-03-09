import { IHistorialRepository } from '../../domain/repositories/IHistorialRepository';
import { CreateHistorialRequest } from '../dtos/create-historial/CreateHistorialRequest';
import { CreateHistorialResponse } from '../dtos/create-historial/CreateHistorialResponse';

export class CreateHistorialUseCase {
  constructor(private readonly historialRepository: IHistorialRepository) {}

  async execute(dto: CreateHistorialRequest): Promise<CreateHistorialResponse> {
    const historial = await this.historialRepository.create({
      id_mascota: dto.id_mascota,
      id_cita: dto.id_cita,
      id_veterinario: dto.id_veterinario,
      fecha: new Date(),
      diagnostico: dto.diagnostico || null,
      tratamiento: dto.tratamiento || null,
      observaciones: dto.observaciones || null
    });
    return historial as CreateHistorialResponse;
  }
}