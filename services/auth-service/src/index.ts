import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import routes from './infrastructure/http/routes/routes';
import { errorHandler } from './infrastructure/http/middlewares/error.middleware';

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: process.env.GOOGLE_CALLBACK_URL!
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const googleProfile = {
      id: profile.id,
      email: profile.emails?.[0]?.value || '',
      nombre: profile.name?.givenName || '',
      apellido: profile.name?.familyName || ''
    };
    done(null, googleProfile);
  } catch (error) {
    done(error);
  }
}));

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'auth-service', timestamp: new Date().toISOString() });
});

app.use('/api', routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Auth Service running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth`);
  console.log(`👥 Personal endpoints: http://localhost:${PORT}/api/personal`);
});

export default app;