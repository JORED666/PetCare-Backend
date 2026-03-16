import { Router } from 'express';
import passport from 'passport';
import { LoginController } from '../controllers/auth/LoginController';
import { RegisterController, uploadMiddleware as uploadUserMiddleware } from '../controllers/auth/RegisterController';
import { MeController } from '../controllers/auth/MeController';
import { RegisterVeterinarioController, uploadMiddleware as uploadVetMiddleware } from '../controllers/personal/RegisterVeterinarioController';
import { ListarVeterinariosController } from '../controllers/personal/ListarVeterinariosController';
import { CambiarPasswordController } from '../controllers/personal/CambiarPasswordController';
import { ForgotPasswordController } from '../controllers/auth/ForgotPasswordController';
import { ResetPasswordController } from '../controllers/auth/ResetPasswordController';
import { GoogleAuthController } from '../controllers/auth/GoogleAuthController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

const loginController = new LoginController();
const registerController = new RegisterController();
const meController = new MeController();
const registerVeterinarioController = new RegisterVeterinarioController();
const listarVeterinariosController = new ListarVeterinariosController();
const cambiarPasswordController = new CambiarPasswordController();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();
const googleAuthController = new GoogleAuthController();

router.post('/auth/login', loginController.handle.bind(loginController));
router.post('/auth/register', uploadUserMiddleware, registerController.handle.bind(registerController));
router.get('/auth/me', authMiddleware, meController.handle.bind(meController));

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/api/auth/google/failed' }),
  googleAuthController.handleCallback.bind(googleAuthController)
);
router.get('/auth/google/failed', (req, res) => {
  res.status(401).json({ success: false, error: 'Google authentication failed' });
});

router.post('/auth/forgot-password', forgotPasswordController.handle.bind(forgotPasswordController));
router.post('/auth/reset-password', resetPasswordController.handle.bind(resetPasswordController));

router.post('/veterinarios/registrar', authMiddleware, uploadVetMiddleware, registerVeterinarioController.handle.bind(registerVeterinarioController));
router.get('/veterinarios/listar', authMiddleware, listarVeterinariosController.handle.bind(listarVeterinariosController));
router.put('/veterinarios/cambiar-password', authMiddleware, cambiarPasswordController.handle.bind(cambiarPasswordController));

export default router;