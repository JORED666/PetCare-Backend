import nodemailer from 'nodemailer';

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    this.transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Error de configuración de email:', error);
      } else {
        console.log('✅ Servidor de email listo');
      }
    });
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'PetCare <noreply@petcare.com>',
      to,
      subject: 'Recuperar contraseña - PetCare',
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #10b981; color: white; padding: 20px; text-align: center;">
              <h1>🐾 PetCare</h1>
            </div>
            <div style="background: #f9fafb; padding: 30px;">
              <h2>Recuperar Contraseña</h2>
              <p>Hola,</p>
              <p>Recibimos una solicitud para restablecer tu contraseña.</p>
              <div style="text-align: center; margin: 20px 0;">
                <a href="${resetLink}" style="background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">Restablecer Contraseña</a>
              </div>
              <p>Este enlace expira en 1 hora.</p>
              <p>Saludos,<br>El equipo de PetCare</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Hola, haz clic aquí para restablecer tu contraseña: ${resetLink}`
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('📧 Email enviado:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Error enviando email:', error);
      throw error;
    }
  }
}

export const emailService = new EmailService();
