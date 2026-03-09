export type NotificationType = 
  | 'CITA_CONFIRMADA'
  | 'CITA_CANCELADA'
  | 'RECORDATORIO_CITA'
  | 'CITA_AGENDADA';

export interface Notification {
  to: string;
  type: NotificationType;
  data: Record<string, any>;
}