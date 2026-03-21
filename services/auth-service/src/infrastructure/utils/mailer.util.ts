import nodemailer, { TransportOptions } from 'nodemailer';

function getTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    tls: {
      rejectUnauthorized: false
    },
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  } as TransportOptions);
}

export async function sendResetPasswordEmail(to: string, token: string): Promise<void> {
  const transporter = getTransporter();
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  await transporter.sendMail({
    from: `PetCare <${process.env.GMAIL_USER}>`,
    to,
    subject: 'Restablecer contraseña - PetCare',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4A90E2;">🐾 PetCare - Restablecer Contraseña</h2>
        <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
        <p>Haz clic en el siguiente botón para continuar:</p>
        <a href="${resetUrl}" 
          style="background-color: #4A90E2; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 4px; display: inline-block; margin: 16px 0;">
          Restablecer Contraseña
        </a>
        <p style="color: #666;">Este enlace expira en <strong>1 hora</strong>.</p>
        <p style="color: #666;">Si no solicitaste esto, ignora este correo.</p>
        <hr style="border: 1px solid #eee; margin: 24px 0;">
        <p style="color: #999; font-size: 12px;">PetCare - Cuidando a tus mascotas</p>
      </div>
    `
  });
}

export async function sendWelcomeEmail(to: string, nombre: string): Promise<void> {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `PetCare <${process.env.GMAIL_USER}>`,
    to,
    subject: 'Bienvenido a PetCare 🐾',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4A90E2;">🐾 Bienvenido a PetCare, ${nombre}!</h2>
        <p>Tu cuenta ha sido creada exitosamente.</p>
        <p>Ya puedes iniciar sesión y agendar citas para tus mascotas.</p>
        <hr style="border: 1px solid #eee; margin: 24px 0;">
        <p style="color: #999; font-size: 12px;">PetCare - Cuidando a tus mascotas</p>
      </div>
    `
  });
}