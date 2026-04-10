import { ICitaRepository } from '../../domain/repositories/ICitaRepository';
import { CreateCitaRequest } from '../dtos/create-cita/CreateCitaRequest';
import { CreateCitaResponse } from '../dtos/create-cita/CreateCitaResponse';

export class CreateCitaUseCase {
  constructor(private readonly citaRepository: ICitaRepository) {}

  async execute(dto: CreateCitaRequest): Promise<CreateCitaResponse> {
    const citaExistente = await this.citaRepository.findByMascotaAndFecha(
      dto.id_mascota,
      new Date(dto.fecha)
    );

    if (citaExistente) {
      throw new Error('Ya existe una cita para esta mascota en esa fecha y hora');
    }

    const cita = await this.citaRepository.create({
      id_user:               dto.id_user,
      id_mascota:            dto.id_mascota,
      id_servicio:           dto.id_servicio,
      id_veterinario:        dto.id_veterinario ?? null,
      id_agenda:             dto.id_agenda      ?? null,
      fecha:                 new Date(dto.fecha),
      estado:                'PENDIENTE',
      observaciones_cliente: dto.observaciones_cliente || null,
    });

    if (dto.id_agenda) {
      try {
        await fetch(`${process.env.AGENDA_SERVICE_URL}/agenda/${dto.id_agenda}/status`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ estado: 'reservado' })
        });
      } catch (e) {
        console.error('Error al actualizar estado de agenda:', e);
      }
    }

    return cita as CreateCitaResponse;
  }
}