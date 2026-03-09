import { ResetTokenRecord } from '../drizzle/reset_tokens.schema';
import { ResetToken } from '../../../domain/entities/ResetToken';

export class ResetTokenMapper {
  static toDomain(row: ResetTokenRecord): ResetToken {
    return {
      id: row.id,
      user_id: row.user_id,
      token: row.token,
      expires_at: row.expires_at,
      used: row.used,
      created_at: row.created_at ?? undefined
    };
  }
}