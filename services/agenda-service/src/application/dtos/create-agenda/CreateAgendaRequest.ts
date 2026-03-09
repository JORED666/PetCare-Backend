import { DiaSemana } from '../../../domain/entities/Agenda';

export interface CreateAgendaRequest {
  veterinario_id: number;
  fecha: string;
  dia_nombre: DiaSemana;
  hora_inicio: string;
  hora_fin: string;
}