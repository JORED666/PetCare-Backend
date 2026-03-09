import { IClientRepository } from '../../domain/repositories/IClientRepository';
import { GetClientResponse } from '../dtos/get-client/GetClientResponse';

export class GetClientByIdUseCase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(id: number): Promise<GetClientResponse> {
    const client = await this.clientRepository.findById(id);
    if (!client) throw new Error('Cliente no encontrado');
    return client;
  }
}