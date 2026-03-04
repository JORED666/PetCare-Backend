import { Request, Response, NextFunction } from 'express';
import { db } from '../config/database';
import { personal, clientes } from '../schemas';
import { passwordResetTokens } from '../schemas/password-reset.schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export class PasswordResetController {
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          error: 'Email es requerido'
        });
      }

      const [personalUser] = await db.select().from(personal).where(eq(personal.email, email)).limit(1);
      const [clientUser] = await db.select().from(clientes).where(eq(clientes.email, email)).limit(1);
      const userExists = !!(personalUser || clientUser);

      if (userExists) {
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

        await db.insert(passwordResetTokens).values({
          email,
          token,
          expires_at: expiresAt
        });

        console.log('🔑 PASSWORD RESET TOKEN GENERADO:');
        console.log('📧 Email:', email);
        console.log('🔗 Token:', token);
        console.log('⏰ Expira:', expiresAt);
        console.log('🌐 Link:', `http://localhost:3000/reset-password?token=${token}`);
      }

      return res.json({
        success: true,
        message: 'Si el email existe, recibirás instrucciones para restablecer tu contraseña'
      });
    } catch (error) {
      console.error('Error en forgot password:', error);
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res.status(400).json({
          success: false,
          error: 'Token y contraseña son requeridos'
        });
      }

      const [resetToken] = await db.select().from(passwordResetTokens).where(eq(passwordResetTokens.token, token)).limit(1);

      if (!resetToken) {
        return res.status(400).json({
          success: false,
          error: 'Token inválido'
        });
      }

      if (new Date() > resetToken.expires_at) {
        return res.status(400).json({
          success: false,
          error: 'Token expirado'
        });
      }

      if (resetToken.used) {
        return res.status(400).json({
          success: false,
          error: 'Token ya fue utilizado'
        });
      }

      const passwordHash = await bcrypt.hash(newPassword, 10);

      const [personalUser] = await db.select().from(personal).where(eq(personal.email, resetToken.email)).limit(1);

      if (personalUser) {
        await db.update(personal).set({ password_hash: passwordHash, password_temporal: false, updated_at: new Date() }).where(eq(personal.email, resetToken.email));
      } else {
        await db.update(clientes).set({ password_hash: passwordHash, updated_at: new Date() }).where(eq(clientes.email, resetToken.email));
      }

      await db.update(passwordResetTokens).set({ used: true }).where(eq(passwordResetTokens.token, token));

      return res.json({
        success: true,
        message: 'Contraseña actualizada correctamente'
      });
    } catch (error) {
      console.error('Error en reset password:', error);
      next(error);
    }
  }
}
