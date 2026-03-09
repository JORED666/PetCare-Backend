export interface ResetToken {
  id: number;
  user_id: number;
  token: string;
  expires_at: Date;
  used: boolean;
  created_at?: Date;
}