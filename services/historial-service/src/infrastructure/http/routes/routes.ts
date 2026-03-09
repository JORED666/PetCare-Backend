import { Router } from 'express';
import { GetHistorialByMascotaController } from '../controllers/historial/GetHistorialByMascotaController';
import { CreateHistorialController } from '../controllers/historial/CreateHistorialController';

const router = Router();

const getHistorialByMascotaController = new GetHistorialByMascotaController();
const createHistorialController = new CreateHistorialController();

router.get('/historial/mascota/:mascotaId', getHistorialByMascotaController.handle.bind(getHistorialByMascotaController));
router.post('/historial', createHistorialController.handle.bind(createHistorialController));

export default router;