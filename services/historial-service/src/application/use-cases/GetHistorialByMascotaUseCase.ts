import { IHistorialRepository } from '../../domain/repositories/IHistorialRepository';
import { GetHistorialResponse } from '../dtos/get-historial/GetHistorialResponse';

export class GetHistorialByMascotaUseCase {
  constructor(private readonly historialRepository: IHistorialRepository) {}

  async execute(mascotaId: number): Promise<GetHistorialResponse[]> {
    return this.historialRepository.findByMascotaId(mascotaId);
  }
}