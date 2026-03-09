import { Router } from 'express';
import { GetAllCitasController } from '../controllers/citas/GetAllCitasController';
import { GetCitaByIdController } from '../controllers/citas/GetCitaByIdController';
import { CreateCitaController } from '../controllers/citas/CreateCitaController';
import { UpdateCitaStatusController } from '../controllers/citas/UpdateCitaStatusController';
import { DeleteCitaController } from '../controllers/citas/DeleteCitaController';

const router = Router();

const getAllCitasController = new GetAllCitasController();
const getCitaByIdController = new GetCitaByIdController();
const createCitaController = new CreateCitaController();
const updateCitaStatusController = new UpdateCitaStatusController();
const deleteCitaController = new DeleteCitaController();

router.get('/citas', getAllCitasController.handle.bind(getAllCitasController));
router.get('/citas/:id', getCitaByIdController.handle.bind(getCitaByIdController));
router.post('/citas', createCitaController.handle.bind(createCitaController));
router.put('/citas/:id/status', updateCitaStatusController.handle.bind(updateCitaStatusController));
router.delete('/citas/:id', deleteCitaController.handle.bind(deleteCitaController));

export default router;