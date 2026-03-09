import { ICitaRepository } from '../../domain/repositories/ICitaRepository';

export class DeleteCitaUseCase {
  constructor(private readonly citaRepository: ICitaRepository) {}

  async execute(id: number): Promise<void> {
    const cita = await this.citaRepository.findById(id);
    if (!cita) throw new Error('Cita no encontrada');
    await this.citaRepository.delete(id);
  }
}