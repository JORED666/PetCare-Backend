import { IClientRepository } from '../../domain/repositories/IClientRepository';
import { GetClientResponse } from '../dtos/get-client/GetClientResponse';

export class GetAllClientsUseCase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(): Promise<GetClientResponse[]> {
    return this.clientRepository.findAll();
  }
}