import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IResetTokenRepository } from '../../domain/repositories/IResetTokenRepository';
import { ResetPasswordRequest } from '../dtos/reset-password/ResetPasswordRequest';
import { hashPassword } from '../../infrastructure/utils/bcrypt.util';

export class ResetPasswordUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly resetTokenRepository: IResetTokenRepository
  ) {}

  async execute(dto: ResetPasswordRequest): Promise<void> {
    const resetToken = await this.resetTokenRepository.findByToken(dto.token);

    if (!resetToken) throw new Error('Token inválido');
    if (resetToken.used) throw new Error('Token ya utilizado');
    if (resetToken.expires_at < new Date()) throw new Error('Token expirado');

    const hashed = await hashPassword(dto.new_password);
    await this.userRepository.updatePassword(resetToken.user_id, hashed);
    await this.resetTokenRepository.markAsUsed(resetToken.id);
  }
}