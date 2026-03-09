import { IClientRepository } from '../../domain/repositories/IClientRepository';

export class DeleteClientUseCase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(id: number): Promise<void> {
    const client = await this.clientRepository.findById(id);
    if (!client) throw new Error('Cliente no encontrado');
    await this.clientRepository.delete(id);
  }
}