import { and, eq } from 'drizzle-orm';
import { db } from '../database';
import { citas } from '../drizzle/citas.schema';
import { mascotas } from '../drizzle/mascotas.schema';
import { users } from '../drizzle/users.schema';
import { veterinarios } from '../drizzle/veterinarios.schema';
import { servicios } from '../drizzle/servicios.schema';
import { ICitaRepository } from '../../../domain/repositories/ICitaRepository';
import { Cita, EstadoCita } from '../../../domain/entities/Cita';
import { CitaMapper } from '../mappers/CitaMapper';

export class CitaRepository implements ICitaRepository {
  async findAll(): Promise<Cita[]> {
    const result = await db
      .select({
        id_cita:               citas.id_cita,
        id_user:               citas.id_user,
        id_mascota:            citas.id_mascota,
        id_servicio:           citas.id_servicio,
        id_veterinario:        citas.id_veterinario,
        id_agenda:             citas.id_agenda,
        fecha:                 citas.fecha,
        estado:                citas.estado,
        observaciones_cliente: citas.observaciones_cliente,
        created_at:            citas.created_at,
        updated_at:            citas.updated_at,
        nombre_mascota:        mascotas.nombre,
        nombre_dueno:          users.nombre,
        apellido_dueno:        users.apellido,
        email_dueno:           users.email,
        telefono_dueno:        users.telefono,
        nombre_veterinario:    veterinarios.nombre,
        apellido_veterinario:  veterinarios.apellido,
        especialidad:          veterinarios.especialidad,
        nombre_servicio:       servicios.nombre,
        precio_servicio:       servicios.precio,
      })
      .from(citas)
      .leftJoin(mascotas,     eq(mascotas.id_mascota,         citas.id_mascota))
      .leftJoin(users,        eq(users.id_user,               citas.id_user))
      .leftJoin(veterinarios, eq(veterinarios.id_veterinario, citas.id_veterinario))
      .leftJoin(servicios,    eq(servicios.id_servicio,       citas.id_servicio));
    return result.map(row => CitaMapper.toDomain({
      ...row,
      nombre_mascota:       row.nombre_mascota       ?? undefined,
      nombre_dueno:         row.nombre_dueno         ?? undefined,
      apellido_dueno:       row.apellido_dueno       ?? undefined,
      email_dueno:          row.email_dueno          ?? undefined,
      telefono_dueno:       row.telefono_dueno       ?? undefined,
      nombre_veterinario:   row.nombre_veterinario   ?? undefined,
      apellido_veterinario: row.apellido_veterinario ?? undefined,
      especialidad:         row.especialidad         ?? undefined,
      nombre_servicio:      row.nombre_servicio      ?? undefined,
      precio_servicio:      row.precio_servicio      ?? undefined,
    }));
  }

  async findById(id: number): Promise<Cita | null> {
    const [row] = await db
      .select({
        id_cita:               citas.id_cita,
        id_user:               citas.id_user,
        id_mascota:            citas.id_mascota,
        id_servicio:           citas.id_servicio,
        id_veterinario:        citas.id_veterinario,
        id_agenda:             citas.id_agenda,
        fecha:                 citas.fecha,
        estado:                citas.estado,
        observaciones_cliente: citas.observaciones_cliente,
        created_at:            citas.created_at,
        updated_at:            citas.updated_at,
        nombre_mascota:        mascotas.nombre,
        nombre_dueno:          users.nombre,
        apellido_dueno:        users.apellido,
        email_dueno:           users.email,
        telefono_dueno:        users.telefono,
        nombre_veterinario:    veterinarios.nombre,
        apellido_veterinario:  veterinarios.apellido,
        especialidad:          veterinarios.especialidad,
        nombre_servicio:       servicios.nombre,
        precio_servicio:       servicios.precio,
      })
      .from(citas)
      .leftJoin(mascotas,     eq(mascotas.id_mascota,         citas.id_mascota))
      .leftJoin(users,        eq(users.id_user,               citas.id_user))
      .leftJoin(veterinarios, eq(veterinarios.id_veterinario, citas.id_veterinario))
      .leftJoin(servicios,    eq(servicios.id_servicio,       citas.id_servicio))
      .where(eq(citas.id_cita, id))
      .limit(1);
    if (!row) return null;
    return CitaMapper.toDomain({
      ...row,
      nombre_mascota:       row.nombre_mascota ?? undefined,
      nombre_dueno:         row.nombre_dueno ?? undefined,
      apellido_dueno:       row.apellido_dueno ?? undefined,
      email_dueno:          row.email_dueno ?? undefined,
      telefono_dueno:       row.telefono_dueno ?? undefined,
      nombre_veterinario:   row.nombre_veterinario ?? undefined,
      apellido_veterinario: row.apellido_veterinario ?? undefined,
      especialidad:         row.especialidad ?? undefined,
      nombre_servicio:      row.nombre_servicio ?? undefined,
      precio_servicio:      row.precio_servicio ?? undefined,
    });
  }

  async findByUserId(userId: number): Promise<Cita[]> {
    const result = await db
      .select({
        id_cita:               citas.id_cita,
        id_user:               citas.id_user,
        id_mascota:            citas.id_mascota,
        id_servicio:           citas.id_servicio,
        id_veterinario:        citas.id_veterinario,
        id_agenda:             citas.id_agenda,
        fecha:                 citas.fecha,
        estado:                citas.estado,
        observaciones_cliente: citas.observaciones_cliente,
        created_at:            citas.created_at,
        updated_at:            citas.updated_at,
        nombre_mascota:        mascotas.nombre,
      })
      .from(citas)
      .leftJoin(mascotas, eq(mascotas.id_mascota, citas.id_mascota))
      .where(eq(citas.id_user, userId));
    return result.map(row => CitaMapper.toDomain({
      ...row,
      nombre_mascota: row.nombre_mascota ?? undefined,
    }));
  }

  async findByVeterinarioId(vetId: number): Promise<Cita[]> {
    const result = await db.select().from(citas).where(eq(citas.id_veterinario, vetId));
    return result.map(CitaMapper.toDomain);
  }

  async findByMascotaAndFecha(id_mascota: number, fecha: Date): Promise<Cita | null> {
    const [row] = await db.select().from(citas)
      .where(and(eq(citas.id_mascota, id_mascota), eq(citas.fecha, fecha)))
      .limit(1);
    return row ? CitaMapper.toDomain(row) : null;
  }

  async create(cita: Omit<Cita, 'id' | 'created_at' | 'updated_at'>): Promise<Cita> {
    const [nuevo] = await db.insert(citas).values({
      id_user:               cita.id_user,
      id_mascota:            cita.id_mascota,
      id_servicio:           cita.id_servicio,
      id_veterinario:        cita.id_veterinario,
      id_agenda:             cita.id_agenda,
      fecha:                 cita.fecha,
      estado:                cita.estado,
      observaciones_cliente: cita.observaciones_cliente,
    }).returning();
    return CitaMapper.toDomain(nuevo);
  }

  async updateStatus(id: number, estado: EstadoCita): Promise<Cita> {
    const [updated] = await db.update(citas).set({ estado, updated_at: new Date() })
      .where(eq(citas.id_cita, id)).returning();
    if (!updated) throw new Error('Cita no encontrada');
    return CitaMapper.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await db.delete(citas).where(eq(citas.id_cita, id));
  }
}