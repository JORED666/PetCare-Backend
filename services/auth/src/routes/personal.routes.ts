import { Router } from 'express';
import { PersonalController } from '../controllers/personal.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const controller = new PersonalController();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Registrar personal (solo admin)
router.post('/registrar', controller.registrar.bind(controller));

// Listar personal (solo admin)
router.get('/listar', controller.listar.bind(controller));

// Cambiar contraseña (cualquier personal)
router.put('/cambiar-password', controller.cambiarPassword.bind(controller));

export default router;
