import { Request, Response, NextFunction } from 'express';
import { db } from '../config/database';
import { clientes } from '../schemas/clientes.schema';
import { eq } from 'drizzle-orm';
import { comparePassword } from '../utils/bcrypt.util';
import { generateToken } from '../utils/jwt.util';

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, tipo_usuario = 'CLIENTE' } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email, password son requeridos'
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

        res.json({
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
      } else {
        return res.status(400).json({
          success: false,
          error: 'Tipo de usuario no implementado aún'
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

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { nombre, apellido, email, password, telefono } = req.body;

      if (!nombre || !email || !password) {
        res.status(400).json({
          success: false,
          error: 'Nombre, email y password son requeridos'
        });
        return;
      }

      // Verificar si el email ya existe
      const [existe] = await db
        .select()
        .from(clientes)
        .where(eq(clientes.email, email))
        .limit(1);

      if (existe) {
        res.status(409).json({
          success: false,
          error: 'El email ya está registrado'
        });
        return;
      }

      // Hash del password
      const { hashPassword } = await import('../utils/bcrypt.util');
      const password_hash = await hashPassword(password);

      // Insertar cliente
      const [nuevoCliente] = await db
        .insert(clientes)
        .values({
          nombre,
          apellido: apellido || '',
          email,
          password_hash,
          telefono: telefono || null,
          password_temporal: false
        })
        .returning();

      const token = generateToken({
        id: nuevoCliente.id_cliente,
        email: nuevoCliente.email,
        rol: 'CLIENTE'
      });

      res.status(201).json({
        success: true,
        token,
        user: {
          id: nuevoCliente.id_cliente,
          nombre: nuevoCliente.nombre,
          apellido: nuevoCliente.apellido,
          email: nuevoCliente.email,
          rol: 'CLIENTE',
          password_temporal: false,
          foto_perfil: nuevoCliente.foto_perfil
        }
      });
    } catch (error) {
      next(error);
    }
  }
}
