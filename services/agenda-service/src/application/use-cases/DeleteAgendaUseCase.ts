import { IAgendaRepository } from '../../domain/repositories/IAgendaRepository';

export class DeleteAgendaUseCase {
  constructor(private readonly agendaRepository: IAgendaRepository) {}

  async execute(id: number): Promise<void> {
    const agenda = await this.agendaRepository.findById(id);
    if (!agenda) throw new Error('Agenda no encontrada');
    await this.agendaRepository.delete(id);
  }
}