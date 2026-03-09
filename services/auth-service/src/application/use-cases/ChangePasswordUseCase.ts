import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { hashPassword, comparePassword } from '../../infrastructure/utils/bcrypt.util';
import { ChangePasswordRequest } from '../dtos/change-password/ChangePasswordRequest';

export class ChangePasswordUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: number, dto: ChangePasswordRequest): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isValid = await comparePassword(dto.password_actual, user.password);
    if (!isValid) {
      throw new Error('Contraseña actual incorrecta');
    }

    const nuevoHash = await hashPassword(dto.password_nueva);
    await this.userRepository.updatePassword(id, nuevoHash);
  }
}