import cron from 'node-cron';
import { SendRecordatorioCitaUseCase } from '../../application/use-cases/SendRecordatorioCitaUseCase';

const useCase = new SendRecordatorioCitaUseCase();

cron.schedule('0 * * * *', async () => {
  console.log(`[CRON] ${new Date().toISOString()} — revisando recordatorios...`);
  try {
    await useCase.executeRecordatorio24h();
    await useCase.executeRecordatorio1h();
  } catch (err) {
    console.error('[CRON] Error:', err);
  }
});

console.log('[CRON] Recordatorios activos ✅');