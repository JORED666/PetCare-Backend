import { Request, Response, NextFunction } from 'express';
import { db } from '../config/database';
import { personal } from '../schemas/personal.schema';
import { eq, ne } from 'drizzle-orm';
import { hashPassword, comparePassword } from '../utils/bcrypt.util';
import crypto from 'crypto';

export class PersonalController {
  // Admin registra nuevo personal
  async registrar(req: Request, res: Response, next: NextFunction) {
    try {
      // Validar que quien lo hace sea admin
      if (req.user?.rol !== 'ADMIN') {
        return res.status(403).json({
          success: false,
          error: 'Solo administradores pueden registrar personal'
        });
      }

      const { nombre, apellido, email, telefono, id_rol } = req.body;

      // Validar campos requeridos
      if (!nombre || !apellido || !email || !id_rol) {
        return res.status(400).json({
          success: false,
          error: 'Nombre, apellido, email y rol son requeridos'
        });
      }

      // Validar que no sea rol de admin
      if (id_rol === 1) {
        return res.status(403).json({
          success: false,
          error: 'No se puede crear otro administrador'
        });
      }

      // Verificar que el email no exista
      const [existente] = await db
        .select()
        .from(personal)
        .where(eq(personal.email, email))
        .limit(1);

      if (existente) {
        return res.status(400).json({
          success: false,
          error: 'Este email ya está registrado'
        });
      }

      // Generar contraseña temporal
      const passwordTemporal = crypto.randomBytes(8).toString('hex');
      const passwordHash = await hashPassword(passwordTemporal);

      // Crear el registro
      const [nuevoPersonal] = await db
        .insert(personal)
        .values({
          id_rol,
          nombre,
          apellido,
          email,
          telefono: telefono || null,
          cedula_profesional: null,
          especialidad: null,
          password_hash: passwordHash,
          password_temporal: true,
          activo: true
        })
        .returning();

      return res.json({
        success: true,
        message: 'Personal registrado exitosamente',
        data: {
          id: nuevoPersonal.id_personal,
          nombre: nuevoPersonal.nombre,
          apellido: nuevoPersonal.apellido,
          email: nuevoPersonal.email,
          rol: id_rol === 2 ? 'VETERINARIO' : 'RECEPCIONISTA',
          password_temporal: passwordTemporal
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Cambiar contraseña
  async cambiarPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { password_actual, password_nueva } = req.body;
      const userId = req.user?.id;

      if (!password_actual || !password_nueva) {
        return res.status(400).json({
          success: false,
          error: 'Contraseña actual y nueva son requeridas'
        });
      }

      const [empleado] = await db
        .select()
        .from(personal)
        .where(eq(personal.id_personal, userId))
        .limit(1);

      if (!empleado) {
        return res.status(404).json({
          success: false,
          error: 'Usuario no encontrado'
        });
      }

      // Validar contraseña actual
      const isValid = await comparePassword(password_actual, empleado.password_hash!);
      
      if (!isValid) {
        return res.status(401).json({
          success: false,
          error: 'Contraseña actual incorrecta'
        });
      }

      // Hash de la nueva contraseña
      const nuevaPasswordHash = await hashPassword(password_nueva);

      // Actualizar contraseña
      await db
        .update(personal)
        .set({
          password_hash: nuevaPasswordHash,
          password_temporal: false
        })
        .where(eq(personal.id_personal, userId));

      return res.json({
        success: true,
        message: 'Contraseña actualizada exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  // Listar todo el personal
  async listar(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user?.rol !== 'ADMIN') {
        return res.status(403).json({
          success: false,
          error: 'Solo administradores pueden ver el personal'
        });
      }

      const todo = await db
        .select()
        .from(personal)
        .where(ne(personal.id_rol, 1));

      return res.json({
        success: true,
        data: todo.map(p => ({
          id: p.id_personal,
          nombre: p.nombre,
          apellido: p.apellido,
          email: p.email,
          telefono: p.telefono,
          rol: p.id_rol === 2 ? 'VETERINARIO' : 'RECEPCIONISTA',
          activo: p.activo,
          password_temporal: p.password_temporal
        }))
      });
    } catch (error) {
      next(error);
    }
  }
}
