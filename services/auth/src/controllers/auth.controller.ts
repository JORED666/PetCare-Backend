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
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email y password son requeridos'
        });
      }

      // Primero buscar en la tabla de personal
      const [empleado] = await db
        .select()
        .from(personal)
        .where(eq(personal.email, email))
        .limit(1);

      if (empleado && empleado.password_hash) {
        const isValid = await comparePassword(password, empleado.password_hash);
        
        if (!isValid) {
          return res.status(401).json({
            success: false,
            error: 'Credenciales inválidas'
          });
        }

        if (!empleado.activo) {
          return res.status(403).json({
            success: false,
            error: 'Tu cuenta ha sido desactivada.'
          });
        }

        const token = generateToken({
          id: empleado.id_personal,
          email: empleado.email,
          rol: empleado.id_rol === 1 ? 'ADMIN' : 
               empleado.id_rol === 2 ? 'VETERINARIO' : 'RECEPCIONISTA'
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
                 empleado.id_rol === 2 ? 'VETERINARIO' : 'RECEPCIONISTA',
            password_temporal: empleado.password_temporal || false,
            foto_perfil: empleado.foto_perfil
          }
        });
      }

      // Si no está en personal, buscar en clientes
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

      const { hashPassword } = await import('../utils/bcrypt.util');
      const password_hash = await hashPassword(password);

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