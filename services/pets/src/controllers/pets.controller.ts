import { Request, Response, NextFunction } from 'express';
import { db } from '../config/database';
import { mascotas, especies, razas } from '../schemas';
import { eq } from 'drizzle-orm';

export class PetsController {
  // GET /api/pets - Listar todas las mascotas activas
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const allPets = await db
        .select()
        .from(mascotas)
        .where(eq(mascotas.activo, true));

      res.json({
        success: true,
        data: allPets
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/pets/:id - Obtener una mascota
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const [pet] = await db
        .select()
        .from(mascotas)
        .where(eq(mascotas.id_mascota, parseInt(id)))
        .limit(1);

      if (!pet) {
        return res.status(404).json({
          success: false,
          error: 'Mascota no encontrada'
        });
      }

      res.json({
        success: true,
        data: pet
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/pets/client/:clientId - Obtener mascotas de un cliente
  async getByClientId(req: Request, res: Response, next: NextFunction) {
    try {
      const { clientId } = req.params;

      const pets = await db
        .select()
        .from(mascotas)
        .where(eq(mascotas.id_cliente, parseInt(clientId)));

      res.json({
        success: true,
        data: pets
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/pets - Crear mascota
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { 
        id_cliente, 
        id_especie, 
        id_raza, 
        nombre, 
        fecha_nacimiento, 
        sexo, 
        peso_actual,  // ← CAMBIADO AQUÍ
        color, 
        observaciones 
      } = req.body;

      if (!id_cliente || !id_especie || !nombre) {
        return res.status(400).json({
          success: false,
          error: 'Cliente, especie y nombre son requeridos'
        });
      }

      const [newPet] = await db
        .insert(mascotas)
        .values({
          id_cliente,
          id_especie,
          id_raza: id_raza || null,
          nombre,
          fecha_nacimiento: fecha_nacimiento || null,
          sexo: sexo || null,
          peso_actual: peso_actual || null,
          color: color || null,
          observaciones: observaciones || null
        })
        .returning();

      res.status(201).json({
        success: true,
        data: newPet
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/pets/:id - Actualizar mascota
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const [updated] = await db
        .update(mascotas)
        .set({
          ...updates,
          updated_at: new Date()
        })
        .where(eq(mascotas.id_mascota, parseInt(id)))
        .returning();

      if (!updated) {
        return res.status(404).json({
          success: false,
          error: 'Mascota no encontrada'
        });
      }

      res.json({
        success: true,
        data: updated
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/pets/:id - Eliminar mascota (soft delete)
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const [deleted] = await db
        .update(mascotas)
        .set({ activo: false })
        .where(eq(mascotas.id_mascota, parseInt(id)))
        .returning();

      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Mascota no encontrada'
        });
      }

      res.json({
        success: true,
        message: 'Mascota eliminada correctamente'
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/pets/species - Listar todas las especies
  async getSpecies(req: Request, res: Response, next: NextFunction) {
    try {
      const allSpecies = await db.select().from(especies);

      res.json({
        success: true,
        data: allSpecies
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/pets/breeds?species_id=1 - Listar razas por especie
  async getBreeds(req: Request, res: Response, next: NextFunction) {
    try {
      const { species_id } = req.query;

      if (!species_id) {
        return res.status(400).json({
          success: false,
          error: 'species_id es requerido'
        });
      }

      const breeds = await db
        .select()
        .from(razas)
        .where(eq(razas.id_especie, parseInt(species_id as string)));

      res.json({
        success: true,
        data: breeds
      });
    } catch (error) {
      next(error);
    }
  }
}