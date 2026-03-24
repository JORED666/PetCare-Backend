import { Request, Response, NextFunction } from 'express';
import { UpdateProfileUseCase } from '../../../../application/use-cases/UpdateProfileUseCase';
import { UserRepository } from '../../../db/repositories/UserRepository';
import { uploadAvatar } from '../../../adapters/cloudinary/uploadService';
import multer from 'multer';

const updateProfileUseCase = new UpdateProfileUseCase(new UserRepository());
const upload = multer({ storage: multer.memoryStorage() });

export const uploadMiddleware = upload.single('foto_perfil');

export class UpdateProfileController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, rol, nombre, apellido, email, telefono, cedula_profesional } = req.body;

      let avatar_url: string | undefined;

      if (req.file) {
        avatar_url = await uploadAvatar(req.file.buffer);
      } else if (req.body.avatar_url) {
        avatar_url = req.body.avatar_url;
      }

      await updateProfileUseCase.execute(Number(id), rol, {
        nombre,
        apellido,
        email,
        telefono,
        cedula_profesional,
        avatar_url,
      });

      res.json({
        success: true,
        message: 'Perfil actualizado correctamente',
        data: { avatar_url: avatar_url ?? null },
      });
    } catch (error) {
      next(error);
    }
  }
}