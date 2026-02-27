import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'petcare-secret-key-2024';

interface JwtPayload {
  id: number;
  email: string;
  rol: string;
}

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '24h'
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
