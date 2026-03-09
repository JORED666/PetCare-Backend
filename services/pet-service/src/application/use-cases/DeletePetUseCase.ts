import { IPetRepository } from '../../domain/repositories/IPetRepository';

export class DeletePetUseCase {
  constructor(private readonly petRepository: IPetRepository) {}

  async execute(id: number): Promise<void> {
    const pet = await this.petRepository.findById(id);
    if (!pet) throw new Error('Mascota no encontrada');
    await this.petRepository.delete(id);
  }
}