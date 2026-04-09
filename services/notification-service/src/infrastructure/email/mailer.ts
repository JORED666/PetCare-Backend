import nodemailer from 'nodemailer';
import {
  getCitaAgendadaTemplate,
  getCitaConfirmadaTemplate,
  getCitaCanceladaTemplate,
  getRecordatorioCitaTemplate,
  getRecordatorio1hTemplate
} from './templates';
import { SendEmailRequest } from '../../application/dtos/send-email/SendEmailRequest';

export async function sendEmail(dto: SendEmailRequest): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let template: { subject: string; html: string };

  switch (dto.type) {
    case 'CITA_AGENDADA':
      template = getCitaAgendadaTemplate({
        nombre:   dto.data.nombre   || '',
        fecha:    dto.data.fecha    || '',
        hora:     dto.data.hora     || '',
        servicio: dto.data.servicio || ''
      });
      break;
    case 'CITA_CONFIRMADA':
      template = getCitaConfirmadaTemplate({
        nombre:      dto.data.nombre      || '',
        fecha:       dto.data.fecha       || '',
        hora:        dto.data.hora        || '',
        servicio:    dto.data.servicio    || '',
        veterinario: dto.data.veterinario || ''
      });
      break;
    case 'CITA_CANCELADA':
      template = getCitaCanceladaTemplate({
        nombre: dto.data.nombre || '',
        fecha:  dto.data.fecha  || '',
        motivo: dto.data.motivo
      });
      break;
    case 'RECORDATORIO_CITA':
      template = getRecordatorioCitaTemplate({
        nombre:   dto.data.nombre   || '',
        fecha:    dto.data.fecha    || '',
        hora:     dto.data.hora     || '',
        servicio: dto.data.servicio || ''
      });
      break;
    case 'RECORDATORIO_1H':
      template = getRecordatorio1hTemplate({
        nombre:   dto.data.nombre   || '',
        fecha:    dto.data.fecha    || '',
        hora:     dto.data.hora     || '',
        servicio: dto.data.servicio || ''
      });
      break;
    default:
      throw new Error(`Tipo de notificación no soportado: ${dto.type}`);
  }

  await transporter.sendMail({
    from: `"PetCare" <${process.env.GMAIL_USER}>`,
    to:      dto.to,
    subject: template.subject,
    html:    template.html
  });
}