import { Router } from 'express';
import { StatsController } from '../controllers/stats.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const controller = new StatsController();

router.use(authMiddleware);

router.get('/citas-mes', controller.citasDelMes.bind(controller));
router.get('/pacientes-activos', controller.pacientesActivos.bind(controller));
router.get('/pacientes-nuevos', controller.pacientesNuevos.bind(controller));
router.get('/ingresos-totales', controller.ingresosTotales.bind(controller));
router.get('/citas-grafica', controller.citasGrafica.bind(controller));
router.get('/rendimiento-veterinarios', controller.rendimientoVeterinarios.bind(controller));
router.get('/veterinario/:id_veterinario/pacientes-activos', controller.veterinarioPacientesActivos.bind(controller));
router.get('/distribucion-servicios', controller.distribucionServicios.bind(controller));

export default router;
