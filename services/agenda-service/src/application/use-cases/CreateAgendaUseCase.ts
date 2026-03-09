import { IAgendaRepository } from '../../domain/repositories/IAgendaRepository';
import { CreateAgendaRequest } from '../dtos/create-agenda/CreateAgendaRequest';
import { CreateAgendaResponse } from '../dtos/create-agenda/CreateAgendaResponse';

export class CreateAgendaUseCase {
  constructor(private readonly agendaRepository: IAgendaRepository) {}

  async execute(dto: CreateAgendaRequest): Promise<CreateAgendaResponse> {
    const agenda = await this.agendaRepository.create({
      veterinario_id: dto.veterinario_id,
      fecha: new Date(dto.fecha),
      dia_nombre: dto.dia_nombre,
      hora_inicio: dto.hora_inicio,
      hora_fin: dto.hora_fin,
      estado: 'disponible'
    });
    return agenda as CreateAgendaResponse;
  }
}