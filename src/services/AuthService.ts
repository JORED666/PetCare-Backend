import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthRepository } from '../repositories/AuthRepository';
import { config } from '../config/env';
import { logger } from '../config/logger';

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async login(email: string, password: string) {
    logger.info('Login attempt:', email);

    // Buscar en personal
    let user = await this.authRepository.findPersonalByEmail(email);
    let userType = 'PERSONAL';

    // Si no existe, buscar en clientes
    if (!user) {
      user = await this.authRepository.findClientByEmail(email);
      userType = 'CLIENTE';
    }

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw new Error('Credenciales inválidas');
    }

    // Generar token
    const token = jwt.sign(
      {
        id: userType === 'PERSONAL' ? user.id_personal : user.id_cliente,
        email: user.email,
        rol: userType === 'PERSONAL' ? 'ADMIN' : 'CLIENTE'
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    return {
      token,
      user: {
        id: userType === 'PERSONAL' ? user.id_personal : user.id_cliente,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        rol: userType === 'PERSONAL' ? 'ADMIN' : 'CLIENTE',
        password_temporal: user.password_temporal
      }
    };
  }

  async registerClient(data: any) {
    logger.info('Registering new client:', data.email);

    // Verificar si ya existe
    const existing = await this.authRepository.findClientByEmail(data.email);
    if (existing) {
      throw new Error('El email ya está registrado');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 10);

    // Crear cliente
    const newClient = await this.authRepository.createClient({
      ...data,
      password_hash: passwordHash
    });

    return newClient;
  }

  async registerPersonal(data: any) {
    logger.info('Registering new personal:', data.email);

    const existing = await this.authRepository.findPersonalByEmail(data.email);
    if (existing) {
      throw new Error('El email ya está registrado');
    }

    // Generar contraseña temporal
    const tempPassword = `PetCare-${Date.now().toString().slice(-6)}`;
    const passwordHash = await bcrypt.hash(tempPassword, 10);

    const newPersonal = await this.authRepository.createPersonal({
      ...data,
      password_hash: passwordHash,
      password_temporal: true
    });

    return {
      personal: newPersonal,
      tempPassword
    };
  }

  async changePassword(userId: number, currentPassword: string, newPassword: string) {
    const user = await this.authRepository.findPersonalByEmail(''); // Necesitamos mejorar esto
    
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isValid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isValid) {
      throw new Error('Contraseña actual incorrecta');
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    return await this.authRepository.updatePersonalPassword(userId, newPasswordHash);
  }

  async listPersonal() {
    return await this.authRepository.listPersonal();
  }
}
