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
      console.log('Body recibido:', req.body);
      console.log('Archivo recibido:', req.file ? req.file.originalname : 'ninguno');

      const { id, rol, nombre, apellido, email, telefono, cedula_profesional } = req.body;

      if (!id || !rol) {
        res.status(400).json({ success: false, error: 'id y rol son requeridos' });
        return;
      }

      let avatar_url: string | undefined;

      if (req.file) {
        console.log('Subiendo imagen a Cloudinary...');
        avatar_url = await uploadAvatar(req.file.buffer);
        console.log('Avatar URL:', avatar_url);
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
      console.error('Error en UpdateProfileController:', error);
      next(error);
    }
  }
}