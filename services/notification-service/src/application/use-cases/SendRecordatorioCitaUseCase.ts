// application/use-cases/SendRecordatorioCitaUseCase.ts
import { and, between, eq } from 'drizzle-orm';
import { db } from '../../infrastructure/db/database';
import { citas } from '../../infrastructure/db/drizzle/citas.schema';
import { users } from '../../infrastructure/db/drizzle/users.schema';
import { sendEmail } from '../../infrastructure/email/mailer';

export class SendRecordatorioCitaUseCase {

  async executeRecordatorio24h(): Promise<void> {
    const ahora = new Date();
    const en24h  = new Date(ahora.getTime() + 24 * 60 * 60 * 1000);
    const margen = new Date(en24h.getTime() + 5 * 60 * 1000);

    const citasPendientes = await db
      .select({
        id_cita: citas.id_cita,
        fecha:   citas.fecha,
        id_user: citas.id_user,
      })
      .from(citas)
      .where(
        and(
          between(citas.fecha, en24h, margen),
          eq(citas.estado, 'CONFIRMADA'),
          eq(citas.recordatorio_24h_enviado, false)  // ← solo las que no se enviaron
        )
      );

    for (const cita of citasPendientes) {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id_user, cita.id_user))
        .limit(1);

      if (!user) continue;

      await sendEmail({
        to:   user.email,
        type: 'RECORDATORIO_CITA',
        data: {
          nombre:   `${user.nombre} ${user.apellido}`,
          fecha:    cita.fecha.toLocaleDateString('es-MX'),
          hora:     cita.fecha.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
          servicio: 'Tu cita en PetCare'
        }
      });

      // ← marcar como enviado para no volver a mandar
      await db
        .update(citas)
        .set({ recordatorio_24h_enviado: true })
        .where(eq(citas.id_cita, cita.id_cita));
    }

    console.log(`✅ Recordatorios 24h enviados: ${citasPendientes.length}`);
  }

  async executeRecordatorio1h(): Promise<void> {
    const ahora  = new Date();
    const en1h   = new Date(ahora.getTime() + 60 * 60 * 1000);
    const margen = new Date(en1h.getTime() + 5 * 60 * 1000);

    const citasPendientes = await db
      .select({
        id_cita: citas.id_cita,
        fecha:   citas.fecha,
        id_user: citas.id_user,
      })
      .from(citas)
      .where(
        and(
          between(citas.fecha, en1h, margen),
          eq(citas.estado, 'CONFIRMADA'),
          eq(citas.recordatorio_1h_enviado, false)  // ← solo las que no se enviaron
        )
      );

    for (const cita of citasPendientes) {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id_user, cita.id_user))
        .limit(1);

      if (!user) continue;

      await sendEmail({
        to:   user.email,
        type: 'RECORDATORIO_CITA',
        data: {
          nombre:   `${user.nombre} ${user.apellido}`,
          fecha:    cita.fecha.toLocaleDateString('es-MX'),
          hora:     cita.fecha.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
          servicio: 'Tu cita en PetCare'
        }
      });

      // ← marcar como enviado
      await db
        .update(citas)
        .set({ recordatorio_1h_enviado: true })
        .where(eq(citas.id_cita, cita.id_cita));
    }

    console.log(`✅ Recordatorios 1h enviados: ${citasPendientes.length}`);
  }
}