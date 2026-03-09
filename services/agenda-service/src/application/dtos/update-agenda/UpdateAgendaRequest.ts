import { EstadoAgenda } from '../../../domain/entities/Agenda';

export interface UpdateAgendaRequest {
  estado: EstadoAgenda;
}