import { ICitaRepository } from '../../domain/repositories/ICitaRepository';
import { UpdateCitaRequest } from '../dtos/update-cita/UpdateCitaRequest';
import { UpdateCitaResponse } from '../dtos/update-cita/UpdateCitaResponse';

export class UpdateCitaStatusUseCase {
  constructor(private readonly citaRepository: ICitaRepository) {}

  async execute(id: number, dto: UpdateCitaRequest): Promise<UpdateCitaResponse> {
    const cita = await this.citaRepository.findById(id);
    if (!cita) throw new Error('Cita no encontrada');
    const updated = await this.citaRepository.updateStatus(id, dto.estado);
    return { id: updated.id, estado: updated.estado, updated_at: updated.updated_at };
  }
}