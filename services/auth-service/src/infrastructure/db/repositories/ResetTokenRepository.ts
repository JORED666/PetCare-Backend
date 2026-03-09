import { eq } from 'drizzle-orm';
import { db } from '../database';
import { reset_tokens } from '../drizzle/reset_tokens.schema';
import { IResetTokenRepository } from '../../../domain/repositories/IResetTokenRepository';
import { ResetToken } from '../../../domain/entities/ResetToken';
import { ResetTokenMapper } from '../mappers/ResetTokenMapper';

export class ResetTokenRepository implements IResetTokenRepository {
  async create(userId: number, token: string, expiresAt: Date): Promise<ResetToken> {
    await db.delete(reset_tokens).where(eq(reset_tokens.user_id, userId));
    const [row] = await db.insert(reset_tokens).values({
      user_id: userId,
      token,
      expires_at: expiresAt,
      used: false
    }).returning();
    return ResetTokenMapper.toDomain(row);
  }

  async findByToken(token: string): Promise<ResetToken | null> {
    const [row] = await db.select().from(reset_tokens)
      .where(eq(reset_tokens.token, token)).limit(1);
    if (!row) return null;
    return ResetTokenMapper.toDomain(row);
  }

  async markAsUsed(id: number): Promise<void> {
    await db.update(reset_tokens).set({ used: true }).where(eq(reset_tokens.id, id));
  }

  async deleteByUserId(userId: number): Promise<void> {
    await db.delete(reset_tokens).where(eq(reset_tokens.user_id, userId));
  }
}