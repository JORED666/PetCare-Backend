import { ICitaRepository } from '../../domain/repositories/ICitaRepository';
import { GetCitaResponse } from '../dtos/get-cita/GetCitaResponse';

export class GetCitaByIdUseCase {
  constructor(private readonly citaRepository: ICitaRepository) {}

  async execute(id: number): Promise<GetCitaResponse> {
    const cita = await this.citaRepository.findById(id);
    if (!cita) throw new Error('Cita no encontrada');
    return cita;
  }
}