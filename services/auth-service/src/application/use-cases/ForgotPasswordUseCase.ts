import crypto from 'crypto';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IResetTokenRepository } from '../../domain/repositories/IResetTokenRepository';
import { ForgotPasswordRequest } from '../dtos/reset-password/ForgotPasswordRequest';
import { sendResetPasswordEmail } from '../../infrastructure/utils/mailer.util';

export class ForgotPasswordUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly resetTokenRepository: IResetTokenRepository
  ) {}

  async execute(dto: ForgotPasswordRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) return; // No revelar si el email existe

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + parseInt(process.env.RESET_PASSWORD_EXPIRES_IN || '3600000'));

    await this.resetTokenRepository.create(user.id, token, expiresAt);
    await sendResetPasswordEmail(dto.email, token);
  }
}