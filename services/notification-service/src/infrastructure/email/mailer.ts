import { Resend } from 'resend'
import {
  getCitaAgendadaTemplate,
  getCitaConfirmadaTemplate,
  getCitaCanceladaTemplate,
  getRecordatorioCitaTemplate,
  getRecordatorio1hTemplate
} from './templates'
import { SendEmailRequest } from '../../application/dtos/send-email/SendEmailRequest'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(dto: SendEmailRequest): Promise<void> {
  let template: { subject: string; html: string }

  switch (dto.type) {
    case 'CITA_AGENDADA':
      template = getCitaAgendadaTemplate({
        nombre:   dto.data.nombre   || '',
        fecha:    dto.data.fecha    || '',
        hora:     dto.data.hora     || '',
        servicio: dto.data.servicio || ''
      })
      break
    case 'CITA_CONFIRMADA':
      template = getCitaConfirmadaTemplate({
        nombre:      dto.data.nombre      || '',
        fecha:       dto.data.fecha       || '',
        hora:        dto.data.hora        || '',
        servicio:    dto.data.servicio    || '',
        veterinario: dto.data.veterinario || ''
      })
      break
    case 'CITA_CANCELADA':
      template = getCitaCanceladaTemplate({
        nombre: dto.data.nombre || '',
        fecha:  dto.data.fecha  || '',
        motivo: dto.data.motivo
      })
      break
    case 'RECORDATORIO_CITA':
      template = getRecordatorioCitaTemplate({
        nombre:   dto.data.nombre   || '',
        fecha:    dto.data.fecha    || '',
        hora:     dto.data.hora     || '',
        servicio: dto.data.servicio || ''
      })
      break
    case 'RECORDATORIO_1H':
      template = getRecordatorio1hTemplate({
        nombre:   dto.data.nombre   || '',
        fecha:    dto.data.fecha    || '',
        hora:     dto.data.hora     || '',
        servicio: dto.data.servicio || ''
      })
      break
    default:
      throw new Error(`Tipo de notificación no soportado: ${dto.type}`)
  }

  await resend.emails.send({
    from: 'PetCare <noreply@mail.ameth.shop>',
    to:      dto.to,
    subject: template.subject,
    html:    template.html
  })
}