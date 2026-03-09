import { ICitaRepository } from '../../domain/repositories/ICitaRepository';
import { GetCitaResponse } from '../dtos/get-cita/GetCitaResponse';

export class GetAllCitasUseCase {
  constructor(private readonly citaRepository: ICitaRepository) {}

  async execute(): Promise<GetCitaResponse[]> {
    return this.citaRepository.findAll();
  }
}