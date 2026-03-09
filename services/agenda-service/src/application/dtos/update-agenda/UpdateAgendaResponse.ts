import { EstadoAgenda } from '../../../domain/entities/Agenda';

export interface UpdateAgendaResponse {
  id: number;
  estado: EstadoAgenda;
}