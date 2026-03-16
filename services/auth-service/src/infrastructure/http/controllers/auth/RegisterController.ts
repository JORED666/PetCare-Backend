import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { RegisterUseCase } from '../../../../application/use-cases/RegisterUseCase';
import { UserRepository } from '../../../db/repositories/UserRepository';
import { uploadAvatar } from '../../../adapters/cloudinary/uploadService';

const storage = multer.memoryStorage();
export const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (_req, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Solo se permiten imágenes'));
    }
    cb(null, true);
  },
}).single('avatar');

const registerUseCase = new RegisterUseCase(new UserRepository());

export class RegisterController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      let avatarUrl: string | undefined;

      if (req.file) {
        avatarUrl = await uploadAvatar(req.file.buffer);
      }

      const result = await registerUseCase.execute(req.body, avatarUrl);
      res.status(201).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }
}