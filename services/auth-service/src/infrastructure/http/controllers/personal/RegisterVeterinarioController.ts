import { Response, NextFunction } from 'express';
import multer from 'multer';
import { UserRepository } from '../../../db/repositories/UserRepository';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { hashPassword } from '../../../utils/bcrypt.util';
import { Role } from '../../../../domain/entities/Role';
import { uploadAvatar } from '../../../adapters/cloudinary/uploadService';

const storage = multer.memoryStorage();
export const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (!file.mimetype.startsWith('image/')) return cb(new Error('Solo se permiten imágenes'));
    cb(null, true);
  },
}).single('avatar');

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

      let avatarUrl: string | undefined;
      if (req.file) {
        avatarUrl = await uploadAvatar(req.file.buffer);
      }

      const hashed = await hashPassword(password);
      const veterinario = await userRepository.createVeterinario({
        nombre, apellido, email,
        password: hashed,
        rol: Role.VETERINARIO,
        telefono,
        cedula_profesional,
        especialidad,
        activo: true,
        avatar_url: avatarUrl,
      });

      res.status(201).json({ success: true, data: veterinario });
    } catch (error) {
      next(error);
    }
  }
}