import { Router } from 'express';
import { GetAllCitasController } from '../controllers/citas/GetAllCitasController';
import { GetCitaByIdController } from '../controllers/citas/GetCitaByIdController';
import { GetCitasByUserIdController } from '../controllers/citas/GetCitasByUserIdController';
import { CreateCitaController } from '../controllers/citas/CreateCitaController';
import { UpdateCitaStatusController } from '../controllers/citas/UpdateCitaStatusController';
import { DeleteCitaController } from '../controllers/citas/DeleteCitaController';
import { GetCitasDetalleController } from '../controllers/citas/GetCitasDetalleController';

const router = Router();
const getAllCitasController      = new GetAllCitasController();
const getCitaByIdController      = new GetCitaByIdController();
const getCitasByUserIdController = new GetCitasByUserIdController();
const createCitaController       = new CreateCitaController();
const updateCitaStatusController = new UpdateCitaStatusController();
const deleteCitaController       = new DeleteCitaController();
const getCitasDetalleController  = new GetCitasDetalleController();

router.get('/citas/detalle',       getCitasDetalleController.handle.bind(getCitasDetalleController));
router.get('/citas/user/:userId',  getCitasByUserIdController.handle.bind(getCitasByUserIdController));
router.get('/citas',               getAllCitasController.handle.bind(getAllCitasController));
router.get('/citas/:id',           getCitaByIdController.handle.bind(getCitaByIdController));
router.post('/citas',              createCitaController.handle.bind(createCitaController));
router.put('/citas/:id/status',    updateCitaStatusController.handle.bind(updateCitaStatusController));
router.delete('/citas/:id',        deleteCitaController.handle.bind(deleteCitaController));

export default router;