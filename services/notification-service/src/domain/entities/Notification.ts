export type NotificationType = 
  | 'CITA_CONFIRMADA'
  | 'CITA_CANCELADA'
  | 'RECORDATORIO_CITA'
  | 'CITA_AGENDADA'
  | 'RECORDATORIO_1H'; 

export interface Notification {
  to: string;
  type: NotificationType;
  data: Record<string, any>;
}