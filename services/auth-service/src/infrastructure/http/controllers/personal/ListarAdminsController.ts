import { Request, Response, NextFunction } from 'express';
import { db } from '../../../db/database';
import { users } from '../../../db/drizzle/users.schema';
import { eq } from 'drizzle-orm';

export class ListarAdminsController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const admins = await db.select().from(users).where(eq(users.id_rol, 1));
      res.json({ success: true, data: admins });
    } catch (error) {
      next(error);
    }
  }
}