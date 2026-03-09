import { ICitaRepository } from '../../domain/repositories/ICitaRepository';
import { CreateCitaRequest } from '../dtos/create-cita/CreateCitaRequest';
import { CreateCitaResponse } from '../dtos/create-cita/CreateCitaResponse';

export class CreateCitaUseCase {
  constructor(private readonly citaRepository: ICitaRepository) {}

  async execute(dto: CreateCitaRequest): Promise<CreateCitaResponse> {
    const cita = await this.citaRepository.create({
      id_user: dto.id_user,
      id_mascota: dto.id_mascota,
      id_servicio: dto.id_servicio,
      id_agenda: dto.id_agenda,
      id_veterinario: null,
      fecha: new Date(dto.fecha),
      estado: 'PENDIENTE',
      observaciones_cliente: dto.observaciones_cliente || null
    });
    return cita as CreateCitaResponse;
  }
}