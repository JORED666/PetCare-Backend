import { Router } from 'express';
import { MedicalController } from '../controllers/medical.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const controller = new MedicalController();

router.use(authMiddleware);

router.get('/pet/:id_mascota/historial', controller.obtenerHistorial.bind(controller));
router.post('/pet/:id_mascota/historial', controller.crearHistorial.bind(controller));
router.get('/historial/:id', controller.obtenerDetalleHistorial.bind(controller));
router.post('/historial/:id/prescripcion', controller.agregarPrescripcion.bind(controller));
router.post('/historial/:id/vacuna', controller.registrarVacuna.bind(controller));

export default router;
