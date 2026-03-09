import { NotificationType } from '../../../domain/entities/Notification';

export interface SendEmailRequest {
  to: string;
  type: NotificationType;
  data: {
    nombre?: string;
    fecha?: string;
    hora?: string;
    servicio?: string;
    veterinario?: string;
    motivo?: string;
  };
}