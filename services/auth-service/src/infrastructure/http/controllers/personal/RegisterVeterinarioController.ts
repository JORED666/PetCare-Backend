import { Response, NextFunction } from 'express';
import { UserRepository } from '../../../db/repositories/UserRepository';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { hashPassword } from '../../../utils/bcrypt.util';
import { Role } from '../../../../domain/entities/Role';

const userRepository = new UserRepository();

export class RegisterVeterinarioController {
  async handle(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (req.userRol !== 'ADMIN') {
        return res.status(403).json({ success: false, error: 'No autorizado' });
      }
      const { nombre, apellido, email, password, telefono, cedula_profesional, especialidad } = req.body;
      const existe = await userRepository.findByEmail(email);
      if (existe) throw new Error('El email ya está registrado');

      const hashed = await hashPassword(password);
      const veterinario = await userRepository.createVeterinario({
        nombre,
        apellido,
        email,
        password: hashed,
        rol: Role.VETERINARIO,
        telefono,
        cedula_profesional,
        especialidad,
        activo: true
      });
      res.status(201).json({ success: true, data: veterinario });
    } catch (error) {
      next(error);
    }
  }
}