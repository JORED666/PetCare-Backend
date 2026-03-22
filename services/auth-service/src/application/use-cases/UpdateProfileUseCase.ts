import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class UpdateProfileUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: number, rol: string, data: {
    nombre?: string;
    apellido?: string;
    email?: string;
    telefono?: string;
    cedula_profesional?: string;
  }): Promise<void> {
    await this.userRepository.updateProfile(id, rol, data);
  }
}