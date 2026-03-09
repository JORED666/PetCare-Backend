import { and, between } from 'drizzle-orm';
import { db } from '../../infrastructure/db/database';
import { citas } from '../../infrastructure/db/drizzle/citas.schema';
import { users } from '../../infrastructure/db/drizzle/users.schema';
import { sendEmail } from '../../infrastructure/email/mailer';
import { eq } from 'drizzle-orm';

export class SendRecordatorioCitaUseCase {
  async executeRecordatorio24h(): Promise<void> {
    const ahora = new Date();
    const en24h = new Date(ahora.getTime() + 24 * 60 * 60 * 1000);
    const margen = new Date(en24h.getTime() + 5 * 60 * 1000); // +5 min margen

    await this.enviarRecordatorios(en24h, margen);
    console.log(`✅ Recordatorios 24h enviados`);
  }

  async executeRecordatorio1h(): Promise<void> {
    const ahora = new Date();
    const en1h = new Date(ahora.getTime() + 60 * 60 * 1000);
    const margen = new Date(en1h.getTime() + 5 * 60 * 1000);

    await this.enviarRecordatorios(en1h, margen);
    console.log(`✅ Recordatorios 1h enviados`);
  }

  private async enviarRecordatorios(desde: Date, hasta: Date): Promise<void> {
    const citasPendientes = await db
      .select({
        id_cita: citas.id_cita,
        fecha: citas.fecha,
        id_user: citas.id_user,
        estado: citas.estado
      })
      .from(citas)
      .where(
        and(
          between(citas.fecha, desde, hasta),
          eq(citas.estado, 'CONFIRMADA')
        )
      );

    for (const cita of citasPendientes) {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id_user, cita.id_user))
        .limit(1);

      if (!user) continue;

      const fecha = cita.fecha.toLocaleDateString('es-MX');
      const hora = cita.fecha.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });

      await sendEmail({
        to: user.email,
        type: 'RECORDATORIO_CITA',
        data: {
          nombre: `${user.nombre} ${user.apellido}`,
          fecha,
          hora,
          servicio: 'Tu cita en PetCare'
        }
      });
    }
  }
}