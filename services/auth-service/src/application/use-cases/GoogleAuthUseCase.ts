import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { generateToken } from '../../infrastructure/utils/jwt.util';
import { Role } from '../../domain/entities/Role';

export interface GoogleProfile {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
}

export class GoogleAuthUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(profile: GoogleProfile): Promise<string> {
    let user = await this.userRepository.findByEmail(profile.email);

    if (!user) {
      user = await this.userRepository.create({
        nombre: profile.nombre,
        apellido: profile.apellido,
        email: profile.email,
        password: `google_${profile.id}`,
        rol: Role.USER
      });
    }

    return generateToken({ id: user.id, email: user.email, rol: user.rol });
  }
}