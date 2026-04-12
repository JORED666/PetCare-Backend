export function getCitaAgendadaTemplate(data: {
  nombre: string;
  fecha: string;
  hora: string;
  servicio: string;
}): { subject: string; html: string } {
  return {
    subject: '📅 Cita Agendada - PetCare',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4A90E2;">🐾 PetCare - Cita Agendada</h2>
        <p>Hola <strong>${data.nombre}</strong>,</p>
        <p>Tu cita ha sido agendada exitosamente.</p>
        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p><strong>📅 Fecha:</strong> ${data.fecha}</p>
          <p><strong>🕐 Hora:</strong> ${data.hora}</p>
          <p><strong>🏥 Servicio:</strong> ${data.servicio}</p>
        </div>
        <p>Te esperamos. Si necesitas cancelar, hazlo con al menos 24 horas de anticipación.</p>
        <hr style="border: 1px solid #eee; margin: 24px 0;">
        <p style="color: #999; font-size: 12px;">PetCare - Cuidando a tus mascotas</p>
      </div>
    `
  };
}

export function getCitaConfirmadaTemplate(data: {
  nombre: string;
  fecha: string;
  hora: string;
  servicio: string;
  veterinario: string;
}): { subject: string; html: string } {
  return {
    subject: '✅ Cita Confirmada - PetCare',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4CAF50;">🐾 PetCare - Cita Confirmada</h2>
        <p>Hola <strong>${data.nombre}</strong>,</p>
        <p>Tu cita ha sido <strong>confirmada</strong>.</p>
        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p><strong>📅 Fecha:</strong> ${data.fecha}</p>
          <p><strong>🕐 Hora:</strong> ${data.hora}</p>
          <p><strong>🏥 Servicio:</strong> ${data.servicio}</p>
          <p><strong>👨‍⚕️ Veterinario:</strong> ${data.veterinario}</p>
        </div>
        <hr style="border: 1px solid #eee; margin: 24px 0;">
        <p style="color: #999; font-size: 12px;">PetCare - Cuidando a tus mascotas</p>
      </div>
    `
  };
}

export function getCitaCanceladaTemplate(data: {
  nombre: string;
  fecha: string;
  motivo?: string;
}): { subject: string; html: string } {
  return {
    subject: '❌ Cita Cancelada - PetCare',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #F44336;">🐾 PetCare - Cita Cancelada</h2>
        <p>Hola <strong>${data.nombre}</strong>,</p>
        <p>Tu cita del <strong>${data.fecha}</strong> ha sido cancelada.</p>
        ${data.motivo ? `<p><strong>Motivo:</strong> ${data.motivo}</p>` : ''}
        <p>Puedes agendar una nueva cita cuando lo desees.</p>
        <hr style="border: 1px solid #eee; margin: 24px 0;">
        <p style="color: #999; font-size: 12px;">PetCare - Cuidando a tus mascotas</p>
      </div>
    `
  };
}

export function getRecordatorioCitaTemplate(data: {
  nombre: string;
  fecha: string;
  hora: string;
  servicio: string;
}): { subject: string; html: string } {
  return {
    subject: '⏰ Recordatorio de Cita - PetCare',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF9800;">🐾 PetCare - Recordatorio de Cita</h2>
        <p>Hola <strong>${data.nombre}</strong>,</p>
        <p>Te recordamos que tienes una cita <strong>en 24 horas</strong>.</p>
        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p><strong>📅 Fecha:</strong> ${data.fecha}</p>
          <p><strong>🕐 Hora:</strong> ${data.hora}</p>
          <p><strong>🏥 Servicio:</strong> ${data.servicio}</p>
        </div>
        <hr style="border: 1px solid #eee; margin: 24px 0;">
        <p style="color: #999; font-size: 12px;">PetCare - Cuidando a tus mascotas</p>
      </div>
    `
  };
}

export function getRecordatorio1hTemplate(data: {
  nombre: string;
  fecha: string;
  hora: string;
  servicio: string;
}): { subject: string; html: string } {
  return {
    subject: '⏰ Tu cita es en 1 hora - PetCare',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #E91E63;">🐾 PetCare - ¡Tu cita es en 1 hora!</h2>
        <p>Hola <strong>${data.nombre}</strong>,</p>
        <p>Tu cita comienza <strong>en 1 hora</strong>. ¡Ya casi!</p>
        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p><strong>📅 Fecha:</strong> ${data.fecha}</p>
          <p><strong>🕐 Hora:</strong> ${data.hora}</p>
          <p><strong>🏥 Servicio:</strong> ${data.servicio}</p>
        </div>
        <hr style="border: 1px solid #eee; margin: 24px 0;">
        <p style="color: #999; font-size: 12px;">PetCare - Cuidando a tus mascotas</p>
      </div>
    `
  };
}