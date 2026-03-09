import { IAgendaRepository } from '../../domain/repositories/IAgendaRepository';
import { GetAgendaResponse } from '../dtos/get-agenda/GetAgendaResponse';

export class GetAgendaByVeterinarioUseCase {
  constructor(private readonly agendaRepository: IAgendaRepository) {}

  async execute(vetId: number): Promise<GetAgendaResponse[]> {
    return this.agendaRepository.findByVeterinarioId(vetId);
  }
}