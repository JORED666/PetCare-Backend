import { Request, Response, NextFunction } from 'express';
import { db } from '../config/database';
import { clientes } from '../schemas/clientes.schema';
import { personal } from '../schemas/personal.schema';
import { eq } from 'drizzle-orm';
import { comparePassword } from '../utils/bcrypt.util';
import { generateToken } from '../utils/jwt.util';

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, tipo_usuario } = req.body;

      if (!email || !password || !tipo_usuario) {
        return res.status(400).json({
          success: false,
          error: 'Email, password y tipo_usuario son requeridos'
        });
      }

      if (tipo_usuario === 'CLIENTE') {
        const [cliente] = await db
          .select()
          .from(clientes)
          .where(eq(clientes.email, email))
          .limit(1);

        if (!cliente || !cliente.password_hash) {
          return res.status(401).json({
            success: false,
            error: 'Credenciales inválidas'
          });
        }

        const isValid = await comparePassword(password, cliente.password_hash);
        if (!isValid) {
          return res.status(401).json({
            success: false,
            error: 'Credenciales inválidas'
          });
        }

        const token = generateToken({
          id: cliente.id_cliente,
          email: cliente.email,
          rol: 'CLIENTE'
        });

        return res.json({
          success: true,
          token,
          user: {
            id: cliente.id_cliente,
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            email: cliente.email,
            rol: 'CLIENTE',
            password_temporal: cliente.password_temporal || false,
            foto_perfil: cliente.foto_perfil
          }
        });

      } else if (tipo_usuario === 'PERSONAL') {
        const [empleado] = await db
          .select()
          .from(personal)
          .where(eq(personal.email, email))
          .limit(1);

        if (!empleado || !empleado.password_hash) {
          return res.status(401).json({
            success: false,
            error: 'Credenciales inválidas'
          });
        }

        const isValid = await comparePassword(password, empleado.password_hash);
        if (!isValid) {
          return res.status(401).json({
            success: false,
            error: 'Credenciales inválidas'
          });
        }

        const token = generateToken({
          id: empleado.id_personal,
          email: empleado.email,
          rol: empleado.id_rol === 1 ? 'ADMIN' : 
               empleado.id_rol === 2 ? 'VETERINARIO_ADMIN' : 'VETERINARIO'
        });

        return res.json({
          success: true,
          token,
          user: {
            id: empleado.id_personal,
            nombre: empleado.nombre,
            apellido: empleado.apellido,
            email: empleado.email,
            rol: empleado.id_rol === 1 ? 'ADMIN' : 
                 empleado.id_rol === 2 ? 'VETERINARIO_ADMIN' : 'VETERINARIO',
            password_temporal: empleado.password_temporal || false,
            foto_perfil: empleado.foto_perfil
          }
        });

      } else {
        return res.status(400).json({
          success: false,
          error: 'tipo_usuario debe ser CLIENTE o PERSONAL'
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      res.json({
        success: true,
        user: req.user
      });
    } catch (error) {
      next(error);
    }
  }
}