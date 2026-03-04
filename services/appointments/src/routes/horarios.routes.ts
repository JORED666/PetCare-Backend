import { Router } from 'express';
import { HorariosController } from '../controllers/horarios.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const controller = new HorariosController();

// ===== RUTAS PÚBLICAS (sin auth) - Para agendar citas =====
router.get('/time-slots', controller.obtenerHorariosDisponibles.bind(controller));
router.get('/availability', controller.verificarDisponibilidad.bind(controller));

// ===== RUTAS PROTEGIDAS (con auth) - Para administración =====
router.use(authMiddleware);

router.get('/personal/:id_personal/horarios', controller.listar.bind(controller));
router.post('/personal/:id_personal/horarios', controller.crear.bind(controller));
router.put('/horarios/:id_horario', controller.actualizar.bind(controller));
router.delete('/horarios/:id_horario', controller.eliminar.bind(controller));

export default router;