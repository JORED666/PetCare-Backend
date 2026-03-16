import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { comparePassword } from '../../infrastructure/utils/bcrypt.util';
import { generateToken } from '../../infrastructure/utils/jwt.util';
import { LoginRequest } from '../dtos/login/LoginRequest';
import { LoginResponse } from '../dtos/login/LoginResponse';

export class LoginUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: LoginRequest): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) throw new Error('Credenciales inválidas');

    const isValid = await comparePassword(dto.password, user.password);
    if (!isValid) throw new Error('Credenciales inválidas');

    if ('activo' in user && !user.activo) throw new Error('Tu cuenta ha sido desactivada');

    const token = generateToken({ id: user.id, email: user.email, rol: user.rol });

    return {
      success: true as const,
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        telefono: ('telefono' in user ? user.telefono : undefined) ?? undefined,
        rol: user.rol,
        avatar_url: ('avatar_url' in user ? user.avatar_url : null) ?? null,
      },
    };
  }
}