import { IClientRepository } from '../../domain/repositories/IClientRepository';
import { UpdateClientRequest } from '../dtos/update-client/UpdateClientRequest';
import { UpdateClientResponse } from '../dtos/update-client/UpdateClientResponse';

export class UpdateClientUseCase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(id: number, dto: UpdateClientRequest): Promise<UpdateClientResponse> {
    const updated = await this.clientRepository.update(id, dto);
    return {
      id: updated.id,
      nombre: updated.nombre,
      apellido: updated.apellido,
      email: updated.email,
      telefono: updated.telefono
    };
  }
}