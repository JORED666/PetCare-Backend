import { EstadoAgenda, DiaSemana } from '../../../domain/entities/Agenda';

export interface CreateAgendaResponse {
  id: number;
  veterinario_id: number;
  fecha: Date;
  dia_nombre: DiaSemana;
  hora_inicio: string;
  hora_fin: string;
  estado: EstadoAgenda;
}