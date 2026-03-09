import { IAgendaRepository } from '../../domain/repositories/IAgendaRepository';
import { UpdateAgendaRequest } from '../dtos/update-agenda/UpdateAgendaRequest';
import { UpdateAgendaResponse } from '../dtos/update-agenda/UpdateAgendaResponse';

export class UpdateAgendaStatusUseCase {
  constructor(private readonly agendaRepository: IAgendaRepository) {}

  async execute(id: number, dto: UpdateAgendaRequest): Promise<UpdateAgendaResponse> {
    const agenda = await this.agendaRepository.findById(id);
    if (!agenda) throw new Error('Agenda no encontrada');
    const updated = await this.agendaRepository.updateStatus(id, dto.estado);
    return { id: updated.id, estado: updated.estado };
  }
}