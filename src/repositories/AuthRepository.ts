import { db } from '../config/database';
import { personal, clientes } from '../shared/schemas';
import { eq } from 'drizzle-orm';

export class AuthRepository {
  async findPersonalByEmail(email: string) {
    const [user] = await db.select().from(personal).where(eq(personal.email, email)).limit(1);
    return user;
  }

  async findClientByEmail(email: string) {
    const [user] = await db.select().from(clientes).where(eq(clientes.email, email)).limit(1);
    return user;
  }

  async createPersonal(data: any) {
    const [newPersonal] = await db.insert(personal).values(data).returning();
    return newPersonal;
  }

  async createClient(data: any) {
    const [newClient] = await db.insert(clientes).values(data).returning();
    return newClient;
  }

  async updatePersonalPassword(id: number, passwordHash: string) {
    const [updated] = await db.update(personal).set({ password_hash: passwordHash, password_temporal: false, updated_at: new Date() }).where(eq(personal.id_personal, id)).returning();
    return updated;
  }

  async listPersonal() {
    return await db.select({ id_personal: personal.id_personal, nombre: personal.nombre, apellido: personal.apellido, email: personal.email, telefono: personal.telefono, cedula_profesional: personal.cedula_profesional, especialidad: personal.especialidad, activo: personal.activo }).from(personal);
  }
}
