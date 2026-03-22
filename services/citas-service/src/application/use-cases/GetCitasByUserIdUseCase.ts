import { ICitaRepository } from '../../domain/repositories/ICitaRepository';
import { Cita } from '../../domain/entities/Cita';

export class GetCitasByUserIdUseCase {
  constructor(private readonly citaRepository: ICitaRepository) {}
  async execute(userId: number): Promise<Cita[]> {
    return this.citaRepository.findByUserId(userId);
  }
}