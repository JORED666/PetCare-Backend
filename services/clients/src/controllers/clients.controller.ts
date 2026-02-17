import { Request, Response, NextFunction } from 'express';
import { db } from '../config/database';
import { clientes } from '../schemas/clientes.schema';
import { eq } from 'drizzle-orm';

export class ClientsController {
  // GET /api/clients - Listar todos los clientes
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const allClients = await db
        .select({
          id_cliente: clientes.id_cliente,
          nombre: clientes.nombre,
          apellido: clientes.apellido,
          email: clientes.email,
          telefono: clientes.telefono,
          direccion: clientes.direccion,
          foto_perfil: clientes.foto_perfil,
          activo: clientes.activo,
          created_at: clientes.created_at
        })
        .from(clientes)
        .where(eq(clientes.activo, true));

      res.json({
        success: true,
        data: allClients
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/clients/:id - Obtener un cliente
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const [cliente] = await db
        .select({
          id_cliente: clientes.id_cliente,
          nombre: clientes.nombre,
          apellido: clientes.apellido,
          email: clientes.email,
          telefono: clientes.telefono,
          direccion: clientes.direccion,
          foto_perfil: clientes.foto_perfil,
          activo: clientes.activo,
          created_at: clientes.created_at
        })
        .from(clientes)
        .where(eq(clientes.id_cliente, parseInt(id)))
        .limit(1);

      if (!cliente) {
        return res.status(404).json({
          success: false,
          error: 'Cliente no encontrado'
        });
      }

      res.json({
        success: true,
        data: cliente
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/clients - Crear cliente
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { nombre, apellido, email, telefono, direccion } = req.body;

      if (!nombre || !apellido || !email || !telefono) {
        return res.status(400).json({
          success: false,
          error: 'Nombre, apellido, email y teléfono son requeridos'
        });
      }

      const [newCliente] = await db
        .insert(clientes)
        .values({
          nombre,
          apellido,
          email,
          telefono,
          direccion: direccion || null
        })
        .returning();

      res.status(201).json({
        success: true,
        data: {
          id_cliente: newCliente.id_cliente,
          nombre: newCliente.nombre,
          apellido: newCliente.apellido,
          email: newCliente.email,
          telefono: newCliente.telefono,
          direccion: newCliente.direccion
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/clients/:id - Actualizar cliente
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { nombre, apellido, email, telefono, direccion, foto_perfil } = req.body;

      const [updated] = await db
        .update(clientes)
        .set({
          ...(nombre && { nombre }),
          ...(apellido && { apellido }),
          ...(email && { email }),
          ...(telefono && { telefono }),
          ...(direccion !== undefined && { direccion }),
          ...(foto_perfil !== undefined && { foto_perfil }),
          updated_at: new Date()
        })
        .where(eq(clientes.id_cliente, parseInt(id)))
        .returning();

      if (!updated) {
        return res.status(404).json({
          success: false,
          error: 'Cliente no encontrado'
        });
      }

      res.json({
        success: true,
        data: {
          id_cliente: updated.id_cliente,
          nombre: updated.nombre,
          apellido: updated.apellido,
          email: updated.email,
          telefono: updated.telefono,
          direccion: updated.direccion,
          foto_perfil: updated.foto_perfil
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/clients/:id - Eliminar cliente (soft delete)
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const [deleted] = await db
        .update(clientes)
        .set({ activo: false })
        .where(eq(clientes.id_cliente, parseInt(id)))
        .returning();

      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Cliente no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Cliente eliminado correctamente'
      });
    } catch (error) {
      next(error);
    }
  }
}
