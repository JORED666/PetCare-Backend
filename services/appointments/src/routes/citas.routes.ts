import { Router } from 'express';
import { CitasController } from '../controllers/citas.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const controller = new CitasController();

// Rutas públicas (para agendar sin login)
router.get('/availability', controller.verificarDisponibilidad.bind(controller));
router.get('/time-slots', controller.obtenerHorariosDisponibles.bind(controller));
router.post('/', controller.crear.bind(controller));

// Rutas protegidas
router.get('/client/:id_cliente', authMiddleware, controller.listarPorCliente.bind(controller));
router.get('/:id', authMiddleware, controller.obtener.bind(controller));
router.put('/:id/cancel', authMiddleware, controller.cancelar.bind(controller));

export default router;
