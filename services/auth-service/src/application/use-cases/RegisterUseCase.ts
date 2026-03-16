// RegisterUseCase

import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { hashPassword } from '../../infrastructure/utils/bcrypt.util';
import { generateToken } from '../../infrastructure/utils/jwt.util';
import { RegisterRequest } from '../dtos/register/RegisterRequest';
import { RegisterResponse } from '../dtos/register/RegisterResponse';
import { Role } from '../../domain/entities/Role';

export class RegisterUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: RegisterRequest, avatarUrl?: string): Promise<RegisterResponse> {
    const existe = await this.userRepository.findByEmail(dto.email);
    if (existe) throw new Error('El email ya está registrado');

    const password = await hashPassword(dto.password);

    const nuevoUser = await this.userRepository.create({
      nombre: dto.nombre,
      apellido: dto.apellido,
      email: dto.email,
      password,
      rol: Role.USER,
      avatar_url: avatarUrl,   
    });

    const token = generateToken({
      id: nuevoUser.id,
      email: nuevoUser.email,
      rol: nuevoUser.rol,
    });

    return {
      token,
      user: {
        id: nuevoUser.id,
        nombre: nuevoUser.nombre,
        apellido: nuevoUser.apellido,
        email: nuevoUser.email,
        rol: nuevoUser.rol,
        avatar_url: nuevoUser.avatar_url, 
      },
    };
  }
}